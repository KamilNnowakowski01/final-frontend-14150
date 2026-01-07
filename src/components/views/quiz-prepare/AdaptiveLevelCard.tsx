import { Card } from "@/components/ui/card";
import { BrainCircuit, TrendingUp } from "lucide-react";

interface AdaptiveLevelCardProps {
  level: "A1-A2" | "B1-B2" | "C1-C2";
}

const levelInfo = {
  "A1-A2": { label: "Początkujący" },
  "B1-B2": { label: "Średnio zaawansowany" },
  "C1-C2": { label: "Zaawansowany" },
};

export function AdaptiveLevelCard({ level }: AdaptiveLevelCardProps) {
  const { label } = levelInfo[level];

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 relative overflow-hidden">
      {/* Delikatna ikona w tle – dokładnie jak w kartach statystyk fiszek */}
      <BrainCircuit className="absolute -top-4 -right-4 h-24 w-24 text-blue-600 opacity-10" />

      <div className="relative flex items-center justify-between gap-8">
        {/* Lewa strona – tytuł + opis */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-white/80 backdrop-blur shadow-sm">
            <BrainCircuit className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              Wyznaczono poziom
              <TrendingUp className="h-5 w-5 text-blue-900" />
            </h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Poziom został dostosowany na podstawie ostatniego wyniku quizu Adaptacyjnego AI
            </p>
          </div>
        </div>

        {/* Prawa strona – duży, wyraźny poziom */}
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600 leading-tight">
            {level}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {label}
          </p>
        </div>
      </div>
    </Card>
  );
}
