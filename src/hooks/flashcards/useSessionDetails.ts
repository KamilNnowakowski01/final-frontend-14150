import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { FLASHCARDS_API, REPETITIONS_API } from '@/lib/api-endpoints';
import { FlashcardStage, FlashcardItemStatus } from '@/types/session-enums';
import { Session } from '@/components/views/flashcards/history/types';
import { differenceInMinutes } from 'date-fns';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';

export interface SessionItem {
  id: string;
  wordId?: string;
  word: string;
  translation: string;
  status: string; // 'new', 'review'
  stage: string; // 'learning', 'passed', 'review'
  isCorrect: boolean;
  repetitionsCount?: number;
  easinessFactor?: number;
  nextReviewDate?: Date;
}

export interface SessionDetail extends Session {
  items: SessionItem[];
}

async function fetchSessionDetails(userId: string, sessionId: string): Promise<SessionDetail> {
  const res = await api.get(FLASHCARDS_API.getSession(userId, sessionId));
  const data = res.data;

  const initialItems: any[] = data.items || [];
  
  // Fetch repetition details for each item
  const itemsWithDetails = await Promise.all(initialItems.map(async (item: any) => {
    const repetitionId = item.id_repetitions || item.repetitionId;
    let repetitionDetails: any = {};
    let wordData: any = {};

    if (repetitionId) {
      try {
        const repRes = await api.get(REPETITIONS_API.getRepetition(userId, repetitionId));
        repetitionDetails = repRes.data;
        wordData = repetitionDetails.word || {};
      } catch (e) {
        console.warn(`Failed to fetch repetition ${repetitionId}`, e);
      }
    }

    const word = wordData.word || item.repetition?.word?.word || 'Unknown';
    const wordId = wordData.id || item.repetition?.word?.id;
    const translation = wordData.meanings?.[0]?.meaning || item.repetition?.word?.meanings?.[0]?.meaning || item.repetition?.word?.translation || 'Unknown';

    return {
      id: item.id,
      wordId,
      word,
      translation,
      status: item.status,
      stage: item.stage,
      isCorrect: item.stage === FlashcardStage.PASSED,
      repetitionsCount: repetitionDetails.repetitions,
      easinessFactor: repetitionDetails.easiness_factor,
      nextReviewDate: repetitionDetails.date_next_rep ? new Date(repetitionDetails.date_next_rep) : undefined,
    };
  }));

  const newCards = itemsWithDetails.filter(i => i.status === FlashcardItemStatus.NEW).length;
  const reviewCards = itemsWithDetails.filter(i => i.status === FlashcardItemStatus.REVIEW).length;
  const repeatCards = itemsWithDetails.filter(i => i.stage === FlashcardStage.LEARNING).length;
  const masteredCards = itemsWithDetails.filter(i => i.stage === FlashcardStage.PASSED).length;

  return {
    id: data.id,
    date: new Date(data.date_started || data.startedAt),
    duration: (data.date_ended || data.endedAt)
      ? differenceInMinutes(new Date(data.date_ended || data.endedAt), new Date(data.date_started || data.startedAt)) 
      : 0,
    totalCards: itemsWithDetails.length,
    correct: masteredCards,
    incorrect: repeatCards,
    levels: [], 
    mode: data.type === 'default' ? 'adaptive-ai' : 'random',
    newCards,
    reviewCards,
    repeatCards,
    masteredCards,
    items: itemsWithDetails
  };
}

export function useSessionDetails(sessionId: string) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.flashcardsSessionDetails(user?.id ?? 0, sessionId),
    queryFn: () => fetchSessionDetails(String(user!.id), sessionId),
    enabled: !!user && !!sessionId,
  });

  return {
    session: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
