import { useState, useEffect, useCallback } from 'react';
import { QuizItem, QuizPackage } from './useQuizSession';

interface UseQuizStateProps {
  currentPackage: QuizPackage | null;
}

export function useQuizState({ currentPackage }: UseQuizStateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answersLog, setAnswersLog] = useState<Array<{itemId: string, answer: string}>>([]);

  // 1. Restore state logic
  useEffect(() => {
    if (!currentPackage?.items) return;

    const savedState = localStorage.getItem(`quiz_progress_${currentPackage.id}`);
    
    if (savedState) {
      try {
        const { index, log } = JSON.parse(savedState);
        setCurrentIndex(index);
        setAnswersLog(log);
        
        // Restore selection for current question
        const currentItem = currentPackage.items[index];
        const savedAnswer = log.find((a: any) => a.itemId === currentItem?.id);
        setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
      } catch (e) {
        console.error("Failed to parse saved quiz state", e);
        localStorage.removeItem(`quiz_progress_${currentPackage.id}`);
      }
    } else {
      // Resume from backend state (find first unanswered)
      const firstUnansweredIndex = currentPackage.items.findIndex(item => !item.user_answer);
      setCurrentIndex(firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0);
      setSelectedAnswer("");
      setAnswersLog([]);
    }
  }, [currentPackage]);

  // 2. Persist state logic
  useEffect(() => {
    if (currentPackage) {
      localStorage.setItem(`quiz_progress_${currentPackage.id}`, JSON.stringify({
        index: currentIndex,
        log: answersLog
      }));
    }
  }, [currentIndex, answersLog, currentPackage]);

  // 3. Actions
  const selectAnswer = useCallback((key: string, currentQuestionId: string) => {
    setSelectedAnswer(key);
    setAnswersLog(prev => {
      const existingIndex = prev.findIndex(item => item.itemId === currentQuestionId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { itemId: currentQuestionId, answer: key };
        return updated;
      }
      return [...prev, { itemId: currentQuestionId, answer: key }];
    });
  }, []);

  const goToNextQuestion = useCallback((questions: QuizItem[]) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      // Restore answer if we are revisiting a question (though currently we only go forward)
      const nextItem = questions[nextIndex];
      const savedAnswer = answersLog.find(a => a.itemId === nextItem.id);
      setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
    }
  }, [currentIndex, answersLog]);

  const clearProgress = useCallback(() => {
    if (currentPackage) {
      localStorage.removeItem(`quiz_progress_${currentPackage.id}`);
    }
  }, [currentPackage]);

  return {
    currentIndex,
    selectedAnswer,
    answersLog,
    selectAnswer,
    goToNextQuestion,
    clearProgress
  };
}
