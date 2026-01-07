"use client";

import { useQuizHistory } from "@/hooks/quizzes/useQuizHistory";
import { QuizHistoryHeader } from "@/components/views/quiz/history/QuizHistoryHeader";
import { QuizSummaryStatsSection } from "@/components/views/quiz/history/QuizSummaryStatsSection";
import { QuizSessionTable } from "@/components/views/quiz/history/QuizSessionTable";
import { Loader2 } from "lucide-react";

export default function QuizHistoryPage() {
  const { sessions, stats, loading, error } = useQuizHistory();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <QuizHistoryHeader />
      <QuizSummaryStatsSection stats={stats} />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ostatnie sesje</h2>
        <QuizSessionTable sessions={sessions} />
      </div>
    </div>
  );
}
