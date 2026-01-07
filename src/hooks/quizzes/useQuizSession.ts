import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { QUIZZES_API } from '@/lib/api-endpoints';
import { SessionStatus } from '@/types/session-enums';
import { getApiErrorMessage, isUnauthorizedError } from '@/lib/api-error';

export interface QuizItem {
  id: string;
  type: string;
  question: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  correct_answer: string;
  user_answer?: string;
}

export interface QuizPackage {
  id: string;
  id_quizzes_sessions?: string;
  package: string;
  level: string;
  items?: QuizItem[];
  created_at?: string;
}

export interface QuizSession {
  id: string;
  status: string;
  packages?: QuizPackage[];
}

export function useQuizSession() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Validates user authentication
   * @returns true if user is authenticated, false otherwise
   */
  const validateUser = useCallback((): boolean => {
    if (!user) {
      toast.error('Brak autoryzacji', {
        description: 'Musisz być zalogowany, aby kontynuować',
      });
      return false;
    }
    return true;
  }, [user]);

  /**
   * Generic error handler for API calls
   */
  const handleApiError = useCallback((err: unknown, context: string): void => {
    const errorMessage = getApiErrorMessage(err);
    setError(errorMessage);
    
    console.error(`${context}:`, errorMessage, err);
    
    toast.error(`Wystąpił błąd: ${context}`, {
      description: errorMessage,
    });

    if (isUnauthorizedError(err)) {
      toast.error('Sesja wygasła', {
        description: 'Zostaniesz przekierowany do logowania',
      });
    }
  }, []);

  /**
   * Initializes or resumes a quiz session
   * @returns Quiz session with packages or null if user not authenticated
   */
  const initSession = useCallback(async (): Promise<QuizSession | null> => {
    if (!validateUser()) return null;

    setError(null);
    setLoading(true);

    try {
      const startRes = await api.post(QUIZZES_API.startSession(user!.id));
      let sessionData = startRes.data;

      // Fetch session details if packages not included
      if (!sessionData.packages) {
        const detailsRes = await api.get(QUIZZES_API.getSession(user!.id, sessionData.id));
        sessionData = detailsRes.data;
      }

      return sessionData as QuizSession;
    } catch (err) {
      handleApiError(err, 'Inicjalizacja sesji quizu');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, validateUser, handleApiError]);

  /**
   * Fetches details for a specific quiz package
   * @param sessionId - Quiz session ID
   * @param packageId - Package ID to fetch
   * @returns Quiz package with items or null if user not authenticated
   */
  const getPackageDetails = useCallback(async (
    sessionId: string,
    packageId: string
  ): Promise<QuizPackage | null> => {
    if (!validateUser()) return null;

    setError(null);
    setLoading(true);

    try {
      const res = await api.get(QUIZZES_API.getPackage(user!.id, sessionId, packageId));
      return res.data as QuizPackage;
    } catch (err) {
      handleApiError(err, 'Pobieranie pakietu quizu');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, validateUser, handleApiError]);

  /**
   * Submits answers for an entire quiz package
   * @param packageId - Package ID to submit
   * @param answers - Array of user answers
   */
  const submitPackage = useCallback(async (
    packageId: string,
    answers: { itemId: string; answer: string }[]
  ): Promise<void> => {
    if (!validateUser()) return;

    if (!answers || answers.length === 0) {
      toast.error('Brak odpowiedzi', {
        description: 'Musisz odpowiedzieć na wszystkie pytania',
      });
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await api.post(QUIZZES_API.submitPackage(user!.id), {
        packageId,
        answers,
      });
    } catch (err) {
      handleApiError(err, 'Wysyłanie odpowiedzi');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, validateUser, handleApiError]);

  /**
   * Generates the next quiz package using AI
   * @returns Newly generated quiz package or null if user not authenticated
   */
  const generateNextPackage = useCallback(async (): Promise<QuizPackage | null> => {
    if (!validateUser()) return null;

    setError(null);
    setLoading(true);

    try {
      const res = await api.post(QUIZZES_API.nextPackage(user!.id));
      let pkg = res.data as QuizPackage;

      // Fetch package details if items not included
      if (!pkg.items && pkg.id && pkg.id_quizzes_sessions) {
        const detailsRes = await api.get(
          QUIZZES_API.getPackage(user!.id, pkg.id_quizzes_sessions, pkg.id)
        );
        pkg = detailsRes.data;
      }

      return pkg;
    } catch (err) {
      handleApiError(err, 'Generowanie pakietu');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, validateUser, handleApiError]);

  /**
   * Completes the current quiz session
   * Validates that all required packages are completed
   */
  const finishSession = useCallback(async (): Promise<void> => {
    if (!validateUser()) return;

    setError(null);
    setLoading(true);

    try {
      await api.post(QUIZZES_API.finishSession(user!.id));
    } catch (err) {
      handleApiError(err, 'Kończenie sesji');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, validateUser, handleApiError]);

  return {
    loading,
    error,
    initSession,
    getPackageDetails,
    submitPackage,
    generateNextPackage,
    finishSession,
  };
}
