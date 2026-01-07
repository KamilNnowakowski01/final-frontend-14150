import { useQuery } from '@tanstack/react-query';
import api from "@/lib/api";
import { VocabularyWord, Repetition } from "@/types/vocabulary";
import { useAuth } from '@/context/auth-context';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';
import { WORDS_API, REPETITIONS_API } from '@/lib/api-endpoints';

interface WordDetailsData {
  word: VocabularyWord;
  repetition: Repetition | null;
}

interface UseWordDetailsReturn {
  word: VocabularyWord | null;
  repetition: Repetition | null;
  loading: boolean;
  error: string | null;
}

async function fetchWordDetails(wordId: string, userId?: string): Promise<WordDetailsData> {
  // 1. Fetch word details
  const wordRes = await api.get(WORDS_API.getWord(wordId));
  const foundWord = wordRes.data;

  if (!foundWord) {
    throw new Error("Słowo nie zostało znalezione.");
  }

  // 2. Fetch repetition data if user is logged in
  let foundRepetition: Repetition | null = null;
  if (userId) {
    try {
      const repetitionRes = await api.get(`${REPETITIONS_API.getAllRepetitions(userId)}?wordId=${wordId}`);
      const repetitions = repetitionRes.data.repetitions;
      if (repetitions && repetitions.length > 0) {
        foundRepetition = repetitions[0];
      }
    } catch (err) {
      console.warn("Failed to fetch repetition data", err);
    }
  }

  const mappedWord: VocabularyWord = {
    id: foundWord.id,
    part_of_speech: foundWord.part_of_speech || foundWord.partOfSpeech || 'other',
    level: foundWord.level,
    word: foundWord.word,
    pronunciation: foundWord.pronunciation,
    meaning: foundWord.meanings ? foundWord.meanings.map((m: any) => m.meaning) : [],
    learned: !!foundRepetition,
    mastered: foundRepetition ? foundRepetition.easiness_factor > 2.8 : false,
  };

  return { word: mappedWord, repetition: foundRepetition };
}

export function useWordDetails(id: string): UseWordDetailsReturn {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.word(id),
    queryFn: () => fetchWordDetails(id, user?.id ? String(user.id) : undefined),
    enabled: !!id,
  });

  return {
    word: query.data?.word ?? null,
    repetition: query.data?.repetition ?? null,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
  };
}
