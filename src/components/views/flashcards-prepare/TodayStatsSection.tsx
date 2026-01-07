import { Card } from "@/components/ui/card";
import { Sparkles, RotateCcw, CheckCircle } from "lucide-react";
import { TodayStats } from "@/hooks/flashcards/useFlashcardsSession";

interface TodayStatsSectionProps {
  stats: TodayStats;
}

export function TodayStatsSection({ stats }: TodayStatsSectionProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Nowe do nauki</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {stats.newToLearn}
            </p>
          </div>
          <Sparkles className="h-8 w-8 text-blue-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-violet-700">Fiszki na dziś</p>
            <p className="text-3xl font-bold text-violet-600 mt-1">
              {stats.dueToday}
            </p>
          </div>
          <RotateCcw className="h-8 w-8 text-violet-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-700">Do powtórki</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {stats.toReview}
            </p>
          </div>
          <RotateCcw className="h-8 w-8 text-red-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">Ukończone</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {stats.completedToday}
            </p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600 opacity-30" />
        </div>
      </Card>
    </div>
  );
}
