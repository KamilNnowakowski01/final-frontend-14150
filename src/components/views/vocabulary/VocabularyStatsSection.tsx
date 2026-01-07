import { Card } from "@/components/ui/card";
import { Target, Brain } from "lucide-react";
import { VocabularyStats } from "./types";

interface VocabularyStatsSectionProps {
  stats: VocabularyStats;
}

export function VocabularyStatsSection({ stats }: VocabularyStatsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Wszystkie słowa</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-700">Nieprzerobione</p>
            <p className="text-3xl font-bold text-orange-600">{stats.notStarted}</p>
          </div>
          <Target className="h-7 w-7 text-orange-600 opacity-30" />
        </div>
      </Card>
      <Card className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-violet-700">Uczone</p>
            <p className="text-3xl font-bold text-violet-600">{stats.inProgress}</p>
          </div>
          <Target className="h-7 w-7 text-violet-600 opacity-30" />
        </div>
      </Card>
      <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700">Nauczone</p>
            <p className="text-3xl font-bold text-green-600">{stats.mastered}</p>
          </div>
          <Brain className="h-7 w-7 text-green-600 opacity-30" />
        </div>
      </Card>
    </div>
  );
}
