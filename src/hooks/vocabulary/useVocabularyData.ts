import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { VocabularyWord } from "@/types/vocabulary";
import { useAuth } from '@/context/auth-context';
import { queryKeys } from '@/lib/query-client';
import { WORDS_API, REPETITIONS_API } from '@/lib/api-endpoints';

interface UseVocabularyDataReturn {
  words: VocabularyWord[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

async function fetchVocabularyData(userId: string): Promise<VocabularyWord[]> {
  // Fetch words and repetitions in parallel
  const [wordsRes, repetitionsRes] = await Promise.all([
    api.get(WORDS_API.getAllWords()),
    api.get(REPETITIONS_API.getAllRepetitions(userId))
  ]);

  const repetitions = repetitionsRes.data.repetitions || [];
  
  // Create maps for quick lookup
  const learnedWordIds = new Set(repetitions.map((r: any) => r.word?.id).filter(Boolean));
  const masteredWordIds = new Set(
    repetitions
      .filter((r: any) => r.easiness_factor > 2.8)
      .map((r: any) => r.word?.id)
      .filter(Boolean)
  );

  const mappedWords: VocabularyWord[] = wordsRes.data.map((item: any) => ({
    id: item.id,
    part_of_speech: item.part_of_speech || item.partOfSpeech || [],
    level: item.level,
    word: item.word,
    pronunciation: item.pronunciation,
    meaning: item.meanings ? item.meanings.map((m: any) => m.meaning) : [],
    learned: learnedWordIds.has(item.id),
    mastered: masteredWordIds.has(item.id),
  }));
  
  return mappedWords;
}

export function useVocabularyData(): UseVocabularyDataReturn {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: [...queryKeys.words, user?.id ?? 0],
    queryFn: () => fetchVocabularyData(String(user!.id)),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minuty - słownictwo rzadko się zmienia
  });

  return {
    words: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
    refresh: async () => { await query.refetch(); },
  };
}
