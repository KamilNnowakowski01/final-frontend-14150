import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizSession, QuizPackage, QuizSession } from '@/hooks/quizzes/useQuizSession';
import { AnswerLogEntry, saveQuizProgress, loadQuizProgress } from '@/lib/quizSessionUtils';

export function useQuizSessionPageLogic() {
  const router = useRouter();
  const {
    loading,
    initSession,
    getPackageDetails,
    submitPackage,
    generateNextPackage,
    finishSession
  } = useQuizSession();

  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentPackage, setCurrentPackage] = useState<QuizPackage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersLog, setAnswersLog] = useState<AnswerLogEntry[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const initialized = useRef(false);

  // --- Setup new package ---
  const setupNewPackage = useCallback((pkg: QuizPackage) => {
    if (!pkg.items) return;
    setCurrentPackage(pkg);
    setCurrentIndex(0);
    setAnswersLog([]);
    setSelectedAnswer("");
    localStorage.removeItem(`quiz_progress_${pkg.id}`);
  }, []);

  // --- Setup resumed package ---
  const setupResumedPackage = useCallback((pkg: QuizPackage) => {
    if (!pkg.items) return;
    setCurrentPackage(pkg);
    const restored = loadQuizProgress(pkg.id);
    if (restored) {
      setCurrentIndex(restored.index);
      setAnswersLog(restored.log);
      const currentItem = pkg.items[restored.index];
      const savedAnswer = restored.log.find((a: any) => a.itemId === currentItem?.id);
      setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
      return;
    }
    const firstUnanswered = pkg.items.findIndex(item => !item.user_answer);
    setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    setAnswersLog([]);
    setSelectedAnswer("");
  }, []);

  // --- Session Initialization ---
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      setIsInitializing(true);
      setLoadingMessage('Przygotowujemy Twój quiz');
      try {
        const sessionData = await initSession();
        if (!sessionData) return;
        setSession(sessionData);

        if (sessionData.packages && sessionData.packages.length > 0) {
          const sortedPackages = [...sessionData.packages].sort((a, b) => a.package.localeCompare(b.package));
          const lastPackageSummary = sortedPackages[sortedPackages.length - 1];
          const fullPackage = await getPackageDetails(sessionData.id, lastPackageSummary.id);
          if (fullPackage && fullPackage.items) {
            const isCompleted = fullPackage.items.every(item => item.user_answer);
            if (isCompleted) {
              if (sortedPackages.length >= 3) {
                try {
                  await finishSession();
                } catch (e) {
                  console.warn('Session finish call failed or already finished', e);
                }
                router.push('/dashboard/quiz/finish');
              } else {
                setLoadingMessage('Generujemy kolejny pakiet pytań...');
                const nextPkg = await generateNextPackage();
                if (nextPkg && nextPkg.items) setupNewPackage(nextPkg);
              }
            } else {
              setupResumedPackage(fullPackage);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize quiz:', error);
      } finally {
        setIsInitializing(false);
        setLoadingMessage(null);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishSession, generateNextPackage, getPackageDetails, initSession, router, setupNewPackage, setupResumedPackage]);

  // --- Persist Progress ---
  useEffect(() => {
    if (currentPackage) {
      saveQuizProgress(currentPackage.id, currentIndex, answersLog);
    }
  }, [currentIndex, answersLog, currentPackage]);

  // --- Handlers ---
  const handleAnswerSelect = useCallback((key: string) => {
    if (!currentPackage || !currentPackage.items) return;
    const currentQuestion = currentPackage.items[currentIndex];
    if (selectedAnswer === key) {
      setSelectedAnswer("");
      setAnswersLog(prev => prev.filter(item => item.itemId !== currentQuestion.id));
      return;
    }
    setSelectedAnswer(key);
    setAnswersLog(prev => {
      const existingIndex = prev.findIndex(item => item.itemId === currentQuestion.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { itemId: currentQuestion.id, answer: key };
        return updated;
      }
      return [...prev, { itemId: currentQuestion.id, answer: key }];
    });
  }, [currentIndex, currentPackage, selectedAnswer]);

  const handleNext = useCallback(async () => {
    if (!currentPackage || !selectedAnswer || !currentPackage.items) return;
    const isLastQuestion = currentIndex === currentPackage.items.length - 1;
    if (isLastQuestion) {
      setLoadingMessage('Zapisujemy Twoje odpowiedzi...');
      try {
        await submitPackage(currentPackage.id, answersLog);
        localStorage.removeItem(`quiz_progress_${currentPackage.id}`);
        if (currentPackage.package === 'package-3') {
          await finishSession();
          router.push('/dashboard/quiz/finish');
        } else {
          setLoadingMessage('Generujemy kolejny pakiet pytań...');
          const nextPkg = await generateNextPackage();
          if (nextPkg && nextPkg.items) setupNewPackage(nextPkg);
        }
      } catch (error) {
        console.error('Error submitting package:', error);
      } finally {
        setLoadingMessage(null);
      }
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = currentPackage.items[nextIndex];
      const savedAnswer = answersLog.find(a => a.itemId === nextItem.id);
      setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
    }
  }, [answersLog, currentIndex, currentPackage, finishSession, generateNextPackage, router, selectedAnswer, submitPackage, setupNewPackage]);

  return {
    loading,
    isInitializing,
    loadingMessage,
    session,
    currentPackage,
    currentIndex,
    answersLog,
    selectedAnswer,
    handleAnswerSelect,
    handleNext,
    setupNewPackage,
    setupResumedPackage,
    setSession,
    setCurrentPackage,
    setCurrentIndex,
    setAnswersLog,
    setSelectedAnswer,
  };
}
