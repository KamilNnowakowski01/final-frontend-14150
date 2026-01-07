import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';
import { REPETITIONS_API } from '@/lib/api-endpoints';

export interface LevelStats {
  level: string;
  total: number;
  totalUser: number;
  learning: number;
  mastered: number;
}

export interface RepetitionsStats {
  userId: string;
  stats: { [key: string]: LevelStats };
}

async function fetchRepetitionsStats(userId: string): Promise<RepetitionsStats> {
  const res = await api.get(REPETITIONS_API.getStats(userId));
  return res.data;
}

export function useRepetitionsStats() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.repetitionsStats(user?.id ?? 0),
    queryFn: () => fetchRepetitionsStats(String(user!.id)),
    enabled: !!user, // Nie wykonuj query jeśli nie ma użytkownika
  });

  return {
    stats: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
    // Dodatkowe stany z React Query
    isRefetching: query.isRefetching,
    isFetched: query.isFetched,
  };
}
