"use client";

import { useQuizSessionDetails } from "@/hooks/quizzes/useQuizSessionDetails";
import { QuizSessionDetailsHeader } from "@/components/views/quiz/history/details/QuizSessionDetailsHeader";
import { QuizSessionStats } from "@/components/views/quiz/history/details/QuizSessionStats";
import { QuizPackageList } from "@/components/views/quiz/history/details/QuizPackageList";
import { Loader2, Play } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizSessionDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { session, loading, error } = useQuizSessionDetails(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        {error || "Nie znaleziono sesji"}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <QuizSessionDetailsHeader date={session.date} />
      <QuizSessionStats session={session} />
      <div className="space-y-4">
        {session.status === 'active' ? (
          <Card className="border-indigo-100 bg-indigo-50/30">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-600">
                <Play className="h-8 w-8 fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  Ta sesja jest w toku
                </h3>
                <p className="text-slate-600 max-w-md">
                  Ten quiz nie został jeszcze zakończony. Kliknij poniżej, aby powrócić do rozwiązywania pytań.
                </p>
              </div>
              <Link href="/dashboard/quiz/session">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                  Wznów quiz <Play className="h-4 w-4 fill-current" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-tight">Zestawy pytań</h2>
            <QuizPackageList packages={session.packages} />
          </>
        )}
      </div>
    </div>
  );
}
