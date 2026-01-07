"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFlashcardsHistory } from '@/hooks/flashcards/useFlashcardsHistory';
import { useQuizHistory } from '@/hooks/quizzes/useQuizHistory';
import { Loader2, Brain, Target, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { pl } from "date-fns/locale";
import Link from "next/link";

interface Activity {
  id: string;
  type: 'flashcards' | 'quiz';
  date: Date;
}

export function LastActivitySection() {
  const { sessions: flashcardSessions, loading: flashcardsLoading } = useFlashcardsHistory();
  const { sessions: quizSessions, loading: quizLoading } = useQuizHistory();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!flashcardsLoading && !quizLoading) {
      const flashcardActivities: Activity[] = flashcardSessions.map(s => ({
        id: s.id,
        type: 'flashcards',
        date: s.date
      }));

      const quizActivities: Activity[] = quizSessions.map(s => ({
        id: s.id,
        type: 'quiz',
        date: s.date
      }));

      const combined = [...flashcardActivities, ...quizActivities]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

      setActivities(combined);
    }
  }, [flashcardSessions, quizSessions, flashcardsLoading, quizLoading]);

  const loading = flashcardsLoading || quizLoading;

  if (loading) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          Ostatnia aktywność
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {activities.length > 0 && (
            <>
              {/* Timeline Line */}
              <div className="absolute left-[15px] top-1 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500 via-slate-300 to-slate-100" />

              {/* Now Indicator */}
              <div className="relative flex items-center gap-4 mb-6">
                <div className="relative z-10 flex h-3 w-3 ml-[10px] items-center justify-center rounded-full bg-indigo-600 ring-4 ring-indigo-50" />
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Teraz</span>
              </div>
            </>
          )}

          {activities.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Brak ostatniej aktywności
            </div>
          ) : (
            <>
              {activities.map((activity, index) => (
                <Link 
                  key={`${activity.type}-${activity.id}`} 
                href={activity.type === 'flashcards' ? `/dashboard/flashcards/${activity.id}` : `/dashboard/quiz/${activity.id}`}
                className="relative flex gap-4 pb-6 last:pb-0 group cursor-pointer"
              >
                {/* Icon bubble */}
                <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors
                  ${activity.type === 'flashcards' 
                    ? 'border-indigo-100 text-indigo-600 group-hover:border-indigo-600 group-hover:bg-indigo-50' 
                    : 'border-pink-100 text-pink-600 group-hover:border-pink-600 group-hover:bg-pink-50'
                  }`}
                >
                  {activity.type === 'flashcards' ? (
                    <Brain className="h-4 w-4" />
                  ) : (
                    <Target className="h-4 w-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {activity.type === 'flashcards' ? 'Sesja fiszek' : 'Quiz'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(activity.date, { addSuffix: true, locale: pl })}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {format(activity.date, 'dd.MM.yyyy')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/dashboard/history" className="relative flex items-center gap-4 pt-2 group cursor-pointer">
              <div className="relative z-10 flex h-2 w-2 ml-[12px] items-center justify-center rounded-full bg-slate-300 group-hover:bg-indigo-400 transition-colors" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">Przeszłość</span>
            </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
