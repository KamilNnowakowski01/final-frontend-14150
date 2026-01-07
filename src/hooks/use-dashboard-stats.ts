'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { queryKeys } from '@/lib/query-client';
import { getApiErrorMessage } from '@/lib/api-error';
import { REPETITIONS_API, QUIZZES_API } from '@/lib/api-endpoints';

export interface DashboardStatsData {
  masteredWords: number;
  learningWords: number;
  monthQuizzes: number;
  monthBestScore: number;
}

export interface DashboardStats extends DashboardStatsData {
  loading: boolean;
  error: string | null;
}

async function fetchDashboardStats(userId: string): Promise<DashboardStatsData> {
  // Fetch both in parallel for better performance
  const [repetitionsRes, quizzesRes] = await Promise.all([
    api.get(REPETITIONS_API.getStats(userId)),
    api.get(QUIZZES_API.getAllSessions(userId)),
  ]);

  const repetitionsData = repetitionsRes.data;
  
  // Calculate total mastered and learning words across all levels
  let totalMastered = 0;
  let totalLearning = 0;
  
  Object.values(repetitionsData.stats || {}).forEach((levelStats: any) => {
    totalMastered += levelStats.mastered || 0;
    totalLearning += levelStats.learning || 0;
  });

  // Process quiz sessions
  let quizData = quizzesRes.data;
  if (quizData.sessions) {
    quizData = quizData.sessions;
  }

  const processedSessions = Array.isArray(quizData) 
    ? quizData.map((session: any) => {
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
        
        return {
          ...session,
          score,
          date: startedAt ? new Date(startedAt) : new Date(),
        };
      })
    : [];

  // Filter for current month and completed sessions
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
  
  const monthQuizSessions = processedSessions.filter((session: any) => {
    return session.status === 'completed' && 
           isWithinInterval(session.date, { start: monthStart, end: monthEnd });
  });

  return {
    masteredWords: totalMastered,
    learningWords: totalLearning,
    monthQuizzes: monthQuizSessions.length,
    monthBestScore: monthQuizSessions.reduce((max: number, session: any) => {
      return Math.max(max, session.score || 0);
    }, 0),
  };
}

export function useDashboardStats() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.dashboardStats(user?.id ?? 0),
    queryFn: () => fetchDashboardStats(String(user!.id)),
    enabled: !!user,
    staleTime: 30 * 1000, // 30 sekund - dashboard może być odświeżany częściej
  });

  const defaultStats: DashboardStatsData = {
    masteredWords: 0,
    learningWords: 0,
    monthQuizzes: 0,
    monthBestScore: 0,
  };

  return {
    ...(query.data ?? defaultStats),
    loading: query.isLoading,
    error: query.error ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
