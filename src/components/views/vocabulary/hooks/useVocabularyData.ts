import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { VocabularyWord } from "@/types/vocabulary";
import { WORDS_API, REPETITIONS_API, AUTH_API } from '@/lib/api-endpoints';

interface UseVocabularyDataReturn {
  words: VocabularyWord[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useVocabularyData(): UseVocabularyDataReturn {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch user profile to get ID
      const profileRes = await api.get(AUTH_API.profile());
      const userId = profileRes.data.id;

      // 2. Fetch words and repetitions in parallel
      const [wordsRes, repetitionsRes] = await Promise.all([
        api.get(WORDS_API.getAllWords()),
        api.get(REPETITIONS_API.getAllRepetitions(userId))
      ]);

      const repetitions = repetitionsRes.data.repetitions;
      
      // Create maps for quick lookup
      const learnedWordIds = new Set(repetitions.map((r: any) => r.word.id));
      const masteredWordIds = new Set(
        repetitions
          .filter((r: any) => r.easiness_factor > 2.8)
          .map((r: any) => r.word.id)
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
      
      setWords(mappedWords);
    } catch (err) {
      console.error('Failed to fetch vocabulary data', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { words, loading, error, refresh: fetchData };
}
