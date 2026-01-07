import { Card } from "@/components/ui/card";
import { Calendar, Trophy, Flame, TrendingUp } from "lucide-react";
import { QuizSummaryStats } from "./types";

interface QuizSummaryStatsSectionProps {
  stats: QuizSummaryStats;
}

export function QuizSummaryStatsSection({ stats }: QuizSummaryStatsSectionProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-700">Quizy w tym miesiącu</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{stats.monthSessions}</p>
          </div>
          <Calendar className="h-8 w-8 text-indigo-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">Pytania w tym miesiącu</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.monthQuestions}</p>
          </div>
          <Trophy className="h-8 w-8 text-green-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-700">Rekord miesiąca</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{stats.monthBestScore}%</p>
          </div>
          <Flame className="h-8 w-8 text-orange-600 opacity-30" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-700">Poprawne odpowiedzi</p>
            <p className="text-3xl font-bold text-cyan-600 mt-1">{stats.monthCorrectAnswers}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-cyan-600 opacity-30" />
        </div>
      </Card>
    </div>
  );
}
