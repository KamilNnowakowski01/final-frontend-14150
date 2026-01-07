import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { QUIZZES_API } from '@/lib/api-endpoints';
import { QuizSession, QuizSummaryStats } from '@/components/views/quiz/history/types';
import { startOfMonth, endOfMonth, differenceInMinutes, isWithinInterval } from 'date-fns';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';

interface QuizHistoryData {
  sessions: QuizSession[];
  stats: QuizSummaryStats;
}

async function fetchQuizHistory(userId: string): Promise<QuizHistoryData> {
  const res = await api.get(QUIZZES_API.getAllSessions(userId));
  let data = res.data;
  if (data.sessions) {
    data = data.sessions;
  }

  const mappedSessions: QuizSession[] = Array.isArray(data) ? data.map((session: any) => {
    let totalQuestions = 0;
    let correctAnswers = 0;

    if (session.packages && Array.isArray(session.packages)) {
      session.packages.forEach((pkg: any) => {
        if (pkg.items && Array.isArray(pkg.items)) {
          totalQuestions += pkg.items.length;
          pkg.items.forEach((item: any) => {
            const userAns = item.user_answer || item.userAnswer;
            const correctAns = item.correct_answer || item.correctAnswer;
            
            if (userAns === correctAns) {
              correctAnswers++;
            }
          });
        }
      });
    }

    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const startedAt = session.date_started || session.startedAt;
    const endedAt = session.date_ended || session.endedAt;
    const dateObj = startedAt ? new Date(startedAt) : new Date();

    return {
      id: session.id,
      date: dateObj,
      duration: endedAt && startedAt
        ? differenceInMinutes(new Date(endedAt), new Date(startedAt)) 
        : 0,
      totalQuestions,
      correctAnswers,
      score,
      status: session.status,
    };
  }) : [];

  // Filter and sort
  const completedSessions = mappedSessions
    .filter(s => s.status === 'completed' || s.totalQuestions > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Calculate stats
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthSessionsList = completedSessions.filter(s => 
    isWithinInterval(s.date, { start: monthStart, end: monthEnd })
  );

  const stats: QuizSummaryStats = {
    monthSessions: monthSessionsList.length,
    monthQuestions: monthSessionsList.reduce((acc, s) => acc + s.totalQuestions, 0),
    monthCorrectAnswers: monthSessionsList.reduce((acc, s) => acc + s.correctAnswers, 0),
    monthBestScore: monthSessionsList.reduce((max, s) => Math.max(max, s.score), 0),
    totalSessions: completedSessions.length,
  };

  return { sessions: completedSessions, stats };
}

export function useQuizHistory() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.quizSessions(user?.id ?? 0),
    queryFn: () => fetchQuizHistory(String(user!.id)),
    enabled: !!user,
  });

  const defaultStats: QuizSummaryStats = {
    monthSessions: 0,
    monthQuestions: 0,
    monthCorrectAnswers: 0,
    monthBestScore: 0,
    totalSessions: 0,
  };

  return {
    sessions: query.data?.sessions ?? [],
    stats: query.data?.stats ?? defaultStats,
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
