import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { QUIZZES_API } from '@/lib/api-endpoints';
import { QuizSessionDetails, QuizPackage, QuizItem } from '@/components/views/quiz/history/types';
import { differenceInMinutes } from 'date-fns';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';

async function fetchQuizSessionDetails(userId: string, sessionId: string): Promise<QuizSessionDetails> {
  const res = await api.get(QUIZZES_API.getSession(userId, sessionId));
  const data = res.data;

  // Map data
  const packages: QuizPackage[] = (data.packages || []).map((pkg: any) => {
    const items: QuizItem[] = (pkg.items || []).map((item: any) => {
      const userAns = item.user_answer || item.userAnswer;
      const correctAns = item.correct_answer || item.correctAnswer;
      const isCorrect = userAns === correctAns;

      return {
        id: item.id,
        question: item.question,
        userAnswer: userAns,
        correctAnswer: correctAns,
        answerA: item.answer_a || item.answerA,
        answerB: item.answer_b || item.answerB,
        answerC: item.answer_c || item.answerC,
        isCorrect,
        type: item.type,
      };
    });

    const totalQuestions = items.length;
    const correctAnswers = items.filter(i => i.isCorrect).length;
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      id: pkg.id,
      name: pkg.package,
      level: pkg.level,
      items,
      score,
      totalQuestions,
      correctAnswers,
    };
  });

  // Sort packages by name
  packages.sort((a, b) => a.name.localeCompare(b.name));

  const totalQuestions = packages.reduce((acc, p) => acc + p.totalQuestions, 0);
  const correctAnswers = packages.reduce((acc, p) => acc + p.correctAnswers, 0);
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const startedAt = data.date_started || data.startedAt;
  const endedAt = data.date_ended || data.endedAt;

  return {
    id: data.id,
    date: startedAt ? new Date(startedAt) : new Date(),
    duration: endedAt && startedAt
      ? differenceInMinutes(new Date(endedAt), new Date(startedAt))
      : 0,
    totalQuestions,
    correctAnswers,
    score,
    status: data.status,
    packages,
  };
}

export function useQuizSessionDetails(sessionId: string) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.quizSessionDetails(user?.id ?? 0, sessionId),
    queryFn: () => fetchQuizSessionDetails(String(user!.id), sessionId),
    enabled: !!user && !!sessionId,
  });

  return {
    session: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
