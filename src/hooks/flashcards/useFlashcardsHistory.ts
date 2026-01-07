import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { FLASHCARDS_API } from '@/lib/api-endpoints';
import { Session, SummaryStats } from '@/components/views/flashcards/history/types';
import { startOfWeek, endOfWeek, differenceInMinutes } from 'date-fns';
import { pl } from 'date-fns/locale';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';

interface FlashcardsHistoryData {
  sessions: Session[];
  stats: SummaryStats;
}

async function fetchFlashcardsHistory(userId: string): Promise<FlashcardsHistoryData> {
  const res = await api.get(FLASHCARDS_API.getAllSessions(userId));
  
  let data = res.data;
  if (data.sessions) {
    data = data.sessions;
  }

  const mappedSessions: Session[] = Array.isArray(data) ? data.map((item: any) => ({
    id: item.id,
    date: new Date(item.startedAt),
    duration: item.endedAt 
      ? differenceInMinutes(new Date(item.endedAt), new Date(item.startedAt)) 
      : 0,
    totalCards: item.stats?.totalCards ?? 0,
    correct: item.stats?.masteredCards ?? 0,
    incorrect: item.stats?.repeatCards ?? 0,
    levels: item.settings?.levels || [],
    mode: item.settings?.mode || (item.type === 'default' ? 'adaptive-ai' : 'random'),
    newCards: item.stats?.newCards ?? 0,
    reviewCards: item.stats?.reviewCards ?? 0,
    repeatCards: item.stats?.repeatCards ?? 0,
    masteredCards: item.stats?.masteredCards ?? 0,
  })) : [];

  // Calculate Summary Stats
  const totalCards = mappedSessions.reduce((sum, s) => sum + s.totalCards, 0);
  const totalCorrect = mappedSessions.reduce((sum, s) => sum + s.correct, 0);
  const avgAccuracy = totalCards > 0 ? Math.round((totalCorrect / totalCards) * 100) : 0;

  const weekStart = startOfWeek(new Date(), { locale: pl });
  const weekEnd = endOfWeek(new Date(), { locale: pl });
  const weekSessionsList = mappedSessions.filter(
    (s) => s.date >= weekStart && s.date <= weekEnd
  );
  const weekSessions = weekSessionsList.length;
  const weekCards = weekSessionsList.reduce((sum, s) => sum + s.totalCards, 0);

  // Placeholder streak calculation
  const currentStreak = 0; 
  const bestStreak = 0;

  const stats: SummaryStats = {
    weekSessions,
    weekCards,
    currentStreak,
    bestStreak,
    avgAccuracy,
  };

  return { sessions: mappedSessions, stats };
}

export function useFlashcardsHistory() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.flashcardsSessions(user?.id ?? 0),
    queryFn: () => fetchFlashcardsHistory(String(user!.id)),
    enabled: !!user,
  });

  const defaultStats: SummaryStats = {
    weekSessions: 0,
    weekCards: 0,
    currentStreak: 0,
    bestStreak: 0,
    avgAccuracy: 0,
  };

  return {
    sessions: query.data?.sessions ?? [],
    stats: query.data?.stats ?? defaultStats,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
