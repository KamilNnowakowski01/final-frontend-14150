'use client';

import { Flashcard } from '@/components/views/flashcards-session/Flashcard';
import { useFlashcardsSession } from '@/hooks/flashcards/useFlashcardsSession';
import { SessionLoading } from '@/components/views/flashcards-session/SessionLoading';
import { SessionHeader } from '@/components/views/flashcards-session/SessionHeader';
import { SessionControls } from '@/components/views/flashcards-session/SessionControls';
import { TodayStatsSection } from '@/components/views/flashcards-prepare/TodayStatsSection';
import { Word, FlashcardsItemStatus, FlashcardsItemStage } from '@/types/flashcards';


export default function FlashcardsSessionPage() {
  const {
    session,
    loading,
    currentItem,
    progress,
    completedItems,
    totalItems,
    isFlipped,
    setIsFlipped,
    submitting,
    handleScore,
    stats,
  } = useFlashcardsSession();

  // Loading or session not ready
  if (loading || !session || !currentItem) {
    return <SessionLoading />;
  }

  const word = currentItem.repetition?.word;

  if (!word) {
    return (
      <ErrorMessage message="Błąd danych: Brak słowa dla elementu sesji." />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <SessionHeader
        progress={progress}
        completedItems={completedItems}
        totalItems={totalItems}
      />

      <TodayStatsSection stats={stats} />

      <FlashcardArea
        word={word}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        status={currentItem.status}
        stage={currentItem.stage}
      />

      <SessionControls
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
        onScore={handleScore}
        submitting={submitting}
      />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-8 text-center text-red-500">
      {message}
    </div>
  );
}

type FlashcardAreaProps = {
  word: Word;
  isFlipped: boolean;
  setIsFlipped: (v: boolean) => void;
  status: FlashcardsItemStatus;
  stage: FlashcardsItemStage;
};

function FlashcardArea({ word, isFlipped, setIsFlipped, status, stage }: FlashcardAreaProps) {
  return (
    <div className="py-4">
      <Flashcard
        word={word}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        status={status}
        stage={stage}
      />
    </div>
  );
}
