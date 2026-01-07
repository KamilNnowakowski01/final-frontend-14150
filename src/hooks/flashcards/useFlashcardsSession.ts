import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFlashcards, type TodayStats } from '@/context/flashcards-context';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { FLASHCARDS_API } from '@/lib/api-endpoints';
import { SessionStatus, FlashcardStage } from '@/types/session-enums';
import { getApiErrorMessage, isUnauthorizedError } from '@/lib/api-error';

// Re-export types for convenience
export type { TodayStats };

export function useFlashcardsSession() {
  const router = useRouter();
  const { user } = useAuth();
  const { session, loading, refreshSession, stats, error } = useFlashcards();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const finishingRef = useRef(false);

  // Memoized user ID to prevent unnecessary re-renders
  const userId = user?.id;
  const sessionId = session?.id;

  // Filter items that are not passed yet
  const activeItems = useMemo(() => {
    if (!session) return [];
    const items = session.items.filter(item => item.stage !== FlashcardStage.PASSED);
    
    // Sort items: 'review' first, then 'learning' (pushed to back)
    return items.sort((a, b) => {
      if (a.stage === FlashcardStage.REVIEW && b.stage === FlashcardStage.LEARNING) return -1;
      if (a.stage === FlashcardStage.LEARNING && b.stage === FlashcardStage.REVIEW) return 1;
      return 0;
    });
  }, [session]);

  // Calculate progress
  const totalItems = session?.items.length || 0;
  const completedItems = totalItems - activeItems.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  // Current item to learn
  const currentItem = activeItems.length > 0 ? activeItems[0] : null;
  const currentItemId = currentItem?.id;

  // Handle session completion - redirect when done
  useEffect(() => {
    const handleSessionCompletion = async () => {
      if (!userId || !session) return;

      // If session is already completed, redirect immediately
      if (session.status === SessionStatus.COMPLETED) {
        router.replace('/dashboard/flashcards/finish');
        return;
      }

      // If session is active but no items left, finish it
      if (activeItems.length === 0 && !finishingRef.current) {
        try {
          finishingRef.current = true;
          await api.post(FLASHCARDS_API.finishSession(userId));
          await refreshSession();
          router.push('/dashboard/flashcards/finish');
        } catch (err) {
          const errorMessage = getApiErrorMessage(err);
          console.error('Failed to finish session:', errorMessage, err);
          toast.error('Nie udało się zakończyć sesji', {
            description: errorMessage,
          });
          
          // Handle unauthorized errors by redirecting to login
          if (isUnauthorizedError(err)) {
            router.push('/login');
          }
        } finally {
          finishingRef.current = false;
        }
      }
    };

    handleSessionCompletion();
  }, [session?.status, activeItems.length, userId, refreshSession, router]);

  // Reset flip state when item changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentItemId]);

  // Redirect to prepare if no session
  useEffect(() => {
    if (!loading && !session) {
      router.push('/dashboard/flashcards/prepare');
    }
  }, [loading, session, router]);

  /**
   * Validates score submission prerequisites
   * @returns true if validation passes, false otherwise
   */
  const validateScoreSubmission = useCallback((score: number): boolean => {
    if (!currentItemId || !userId || !sessionId) {
      toast.error('Brak aktywnej fiszki', {
        description: 'Nie można wysłać oceny bez aktywnej fiszki',
      });
      return false;
    }

    if (score < 0 || score > 5) {
      toast.error('Nieprawidłowa ocena', {
        description: 'Ocena musi być w zakresie 0-5',
      });
      return false;
    }

    return true;
  }, [currentItemId, userId, sessionId]);

  /**
   * Handles score submission errors with appropriate user feedback
   */
  const handleScoreError = useCallback((err: unknown, score: number) => {
    const errorMessage = getApiErrorMessage(err);
    setScoreError(errorMessage);
    
    console.error('Failed to send score:', errorMessage, err);
    
    toast.error('Nie udało się wysłać oceny', {
      description: errorMessage,
      action: {
        label: 'Spróbuj ponownie',
        onClick: () => handleScore(score),
      },
    });

    if (isUnauthorizedError(err)) {
      toast.error('Sesja wygasła', {
        description: 'Zostaniesz przekierowany do logowania',
      });
      setTimeout(() => router.push('/login'), 2000);
    }
  }, [router]);

  /**
   * Submits user's score for the current flashcard item.
   * Uses SM-2 algorithm for spaced repetition calculations.
   * 
   * @param score - Quality rating (0-5): 0=total blackout, 5=perfect recall
   */
  const handleScore = useCallback(async (score: number): Promise<void> => {
    if (!validateScoreSubmission(score)) return;

    setScoreError(null);
    setSubmitting(true);

    try {
      await api.post(FLASHCARDS_API.sendScore(userId!, sessionId!, currentItemId!), {
        score
      });

      await refreshSession();
    } catch (err) {
      handleScoreError(err, score);
    } finally {
      setSubmitting(false);
    }
  }, [
    validateScoreSubmission,
    handleScoreError,
    userId,
    sessionId,
    currentItemId,
    refreshSession,
  ]);

  return {
    session,
    loading,
    error,
    scoreError,
    currentItem,
    progress,
    completedItems,
    totalItems,
    isFlipped,
    setIsFlipped,
    submitting,
    handleScore,
    hasActiveItems: activeItems.length > 0,
    stats
  };
}
