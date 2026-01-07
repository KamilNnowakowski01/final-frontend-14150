interface CefrLevelGridProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
  show: boolean;
}

export function CefrLevelGrid({
  selectedLevel,
  onSelect,
  show,
}: CefrLevelGridProps) {
  if (!show) return null;

  const levels = [
    { level: "A1_A2", label: "Początkujący", display: "A1-A2" },
    { level: "B1_B2", label: "Średnio zaawansowany", display: "B1-B2" },
    { level: "C1_C2", label: "Zaawansowany", display: "C1-C2" },
  ];

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <h4 className="text-sm font-medium mb-3 text-muted-foreground">
        Wybierz poziom zaawansowania:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {levels.map((lvl) => {
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
              <div className="text-lg font-bold">{lvl.display}</div>
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
