import { useState, useEffect } from "react";
import api from "@/lib/api";
import { VocabularyWord, Repetition } from "@/types/vocabulary";
import { WORDS_API, REPETITIONS_API, AUTH_API } from "@/lib/api-endpoints";

interface UseWordDetailsReturn {
  word: VocabularyWord | null;
  repetition: Repetition | null;
  loading: boolean;
  error: string | null;
}

export function useWordDetails(id: string): UseWordDetailsReturn {
  const [word, setWord] = useState<VocabularyWord | null>(null);
  const [repetition, setRepetition] = useState<Repetition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // 1. Fetch word details
        const wordRes = await api.get(WORDS_API.getWord(id));
        const foundWord = wordRes.data;

        if (!foundWord) {
          setError("Słowo nie zostało znalezione.");
          setLoading(false);
          return;
        }

        // 2. Fetch user profile and repetition data
        let foundRepetition: Repetition | null = null;
        try {
          const profileRes = await api.get(AUTH_API.profile());
          const userId = profileRes.data.id;
          
          const repetitionRes = await api.get(`${REPETITIONS_API.getAllRepetitions(userId)}?wordId=${id}`);
          const repetitions = repetitionRes.data.repetitions;
          if (repetitions && repetitions.length > 0) {
            foundRepetition = repetitions[0];
          }
        } catch (err) {
          console.warn("Failed to fetch repetition data (user might not be logged in or other error)", err);
        }

        setRepetition(foundRepetition);

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
        setWord(mappedWord);

      } catch (err) {
        console.error("Failed to fetch word details", err);
        setError("Wystąpił błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { word, repetition, loading, error };
}
