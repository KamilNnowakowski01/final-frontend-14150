import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

interface StartQuizSessionSectionProps {
  totalQuestions: number;
  estimatedTime?: number;
}

export function StartQuizSessionSection({
  totalQuestions,
  estimatedTime = 10,
}: StartQuizSessionSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">
          Gotowy do quizu?
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Masz <span className="font-bold text-indigo-600">{totalQuestions}</span> pytań do rozwiązania.
          Szacowany czas: ~{estimatedTime} minut.
        </p>
      </div>

      <Link href="/dashboard/quiz/session">
        <Button 
          size="lg" 
          className="h-14 px-8 text-lg gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105"
        >
          <Play className="h-5 w-5 fill-current" />
          Rozpocznij quiz
        </Button>
      </Link>
    </div>
  );
}
