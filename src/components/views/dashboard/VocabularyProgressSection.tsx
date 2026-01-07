"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRepetitionsStats } from "@/hooks/repetitions/useRepetitionsStats";
import { Loader2 } from "lucide-react";

export function VocabularyProgressSection() {
  const { stats, loading, error } = useRepetitionsStats();

  if (loading) {
    return (
      <Card className="min-h-[300px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className="min-h-[300px] flex items-center justify-center text-red-500">
        {error || "Brak danych"}
      </Card>
    );
  }

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <Card className="col-span-full lg:col-span-2 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Postępy w słownictwie</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center gap-4">
          {levels.map((level) => {
            const levelStats = stats.stats[level];
            if (!levelStats) return null;

            const total = levelStats.total || 1; // Avoid division by zero
            const masteredPct = (levelStats.mastered / total) * 100;
            const learningPct = (levelStats.learning / total) * 100;
            // The rest is remaining

            return (
              <div key={level} className="flex items-center gap-4">
                <span className="w-8 font-bold text-slate-700">{level}</span>
                
                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden flex">
                  {/* Mastered - Dark Purple */}
                  <div 
                    className="h-full bg-purple-600 transition-all duration-500" 
                    style={{ width: `${masteredPct}%` }}
                  />
                  {/* Learning - Light Purple */}
                  <div 
                    className="h-full bg-purple-300 transition-all duration-500" 
                    style={{ width: `${learningPct}%` }}
                  />
                  {/* Remaining is just the background color (slate-100) */}
                </div>

                <div className="min-w-[100px] text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {Math.round((levelStats.totalUser / levelStats.total) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {levelStats.totalUser} / {levelStats.total}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-6 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="text-sm text-slate-600">Nauczone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-300" />
            <span className="text-sm text-slate-600">Uczone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
            <span className="text-sm text-slate-600">Nieprzerobione</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
