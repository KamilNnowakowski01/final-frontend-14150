import { cn } from "@/lib/utils";

interface QuizLevelGridProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
  show: boolean;
}

const cefrLevels = [
  { level: "A1-A2", label: "Początkujący" },
  { level: "B1-B2", label: "Średnio zaawansowany" },
  { level: "C1-C2", label: "Zaawansowany" },
];

export function QuizLevelGrid({ selectedLevel, onSelect, show }: QuizLevelGridProps) {
  if (!show) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <h4 className="text-sm font-medium mb-3 text-muted-foreground">
        Wybierz poziom trudności pytań:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cefrLevels.map((lvl) => {
          const isSelected = selectedLevel === lvl.level;
          return (
            <div
              key={lvl.level}
              onClick={() => onSelect(lvl.level)}
              className={`
                cursor-pointer rounded-lg border p-3 text-center transition-all
                ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md scale-105"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                }
              `}
            >
              <div className="text-lg font-bold">{lvl.level}</div>
              <div className={`text-[10px] uppercase tracking-wider mt-1 ${isSelected ? "text-indigo-100" : "text-muted-foreground"}`}>
                {lvl.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
