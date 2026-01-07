
'use client';


import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizSessionHeader } from '@/components/views/quiz-session/QuizSessionHeader';
import { QuizQuestion } from '@/components/views/quiz-session/QuizQuestion';
import { QuizAnswers } from '@/components/views/quiz-session/QuizAnswers';
import { QuizLoading } from '@/components/views/quiz-session/QuizLoading';
import { QuizError } from '@/components/views/quiz-session/QuizError';
import { useQuizSessionPageLogic } from '@/lib/useQuizSessionPageLogic';
// --- Helpers ---
function getPackageIndex(packageName: string) {
  // Calculate package index (0, 1, 2) based on package name "package-X"
  return parseInt(packageName.split('-')[1] || '1', 10) - 1;
}

// --- View State Hook ---
function useQuizSessionViewState({
  isInitializing,
  loadingMessage,
  loading,
  currentPackage,
  currentIndex
}: {
  isInitializing: boolean;
  loadingMessage: string | null;
  loading: boolean;
  currentPackage: any;
  currentIndex: number;
}) {
  if (isInitializing || loadingMessage || (loading && !currentPackage)) {
    return { boundary: <QuizLoading message={loadingMessage || 'Przygotowujemy Twój quiz'} /> };
  }
  if (!currentPackage || !currentPackage.items || currentPackage.items.length === 0) {
    return { boundary: <QuizError message="Nie udało się załadować quizu." onRetry={() => window.location.reload()} /> };
  }
  const currentQuestion = currentPackage.items[currentIndex];
  if (!currentQuestion) {
    return { boundary: <QuizError message="Błąd danych pytania." onRetry={() => window.location.reload()} /> };
  }
  const totalQuestions = currentPackage.items.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const packageIndex = getPackageIndex(currentPackage.package);
  return {
    boundary: null,
    quizState: {
      currentQuestion,
      totalQuestions,
      progress,
      isLastQuestion,
      packageIndex,
    }
  };
}

// --- Usunięto: persistProgress, restoreProgress (przeniesione do utils) ---


// --- Subcomponents ---
function QuizSessionControls({ isLastQuestion, onNext, disabled }: { isLastQuestion: boolean; onNext: () => void; disabled: boolean; }) {
  return (
    <div className="flex justify-end pt-4">
      <Button
        size="lg"
        onClick={onNext}
        disabled={disabled}
        className="px-8 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isLastQuestion ? 'Zakończ rundę' : 'Następne pytanie'}
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

type QuizSessionContentProps = {
  currentPackage: any;
  currentIndex: number;
  selectedAnswer: string;
  handleAnswerSelect: (key: string) => void;
  handleNext: () => void;
  quizState: {
    currentQuestion: any;
    totalQuestions: number;
    progress: number;
    isLastQuestion: boolean;
    packageIndex: number;
  };
};

function QuizSessionContent({
  currentPackage,
  currentIndex,
  selectedAnswer,
  handleAnswerSelect,
  handleNext,
  quizState
}: QuizSessionContentProps) {
  const { currentQuestion, totalQuestions, progress, isLastQuestion, packageIndex } = quizState;
  return (
    <>
      <QuizSessionHeader
        packageName={currentPackage.package}
        level={currentPackage.level}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        packageIndex={packageIndex}
        progress={progress}
      />
      <QuizQuestion
        question={currentQuestion}
        level={currentPackage.level}
      />
      <QuizAnswers
        selectedAnswer={selectedAnswer}
        showResult={false}
        isCorrect={false}
        correctAnswer={currentQuestion.correct_answer}
        answers={{
          A: currentQuestion.answer_a,
          B: currentQuestion.answer_b,
          C: currentQuestion.answer_c,
        }}
        onSelect={handleAnswerSelect}
      />
      <QuizSessionControls
        isLastQuestion={isLastQuestion}
        onNext={handleNext}
        disabled={!selectedAnswer}
      />
    </>
  );
}

function QuizSessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {children}
    </div>
  );
}

export default function QuizSessionPage() {
  const {
    loading,
    isInitializing,
    loadingMessage,
    currentPackage,
    currentIndex,
    selectedAnswer,
    handleAnswerSelect,
    handleNext,
  } = useQuizSessionPageLogic();

  const { boundary, quizState } = useQuizSessionViewState({
    isInitializing,
    loadingMessage,
    loading,
    currentPackage,
    currentIndex,
  });
  if (boundary) return boundary;

  return (
    <QuizSessionLayout>
      <QuizSessionContent
        currentPackage={currentPackage}
        currentIndex={currentIndex}
        selectedAnswer={selectedAnswer}
        handleAnswerSelect={handleAnswerSelect}
        handleNext={handleNext}
        quizState={quizState!}
      />
    </QuizSessionLayout>
  );
}
