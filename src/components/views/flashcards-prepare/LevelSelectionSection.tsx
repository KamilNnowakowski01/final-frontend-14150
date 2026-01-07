import { Card } from "@/components/ui/card";
import { Sparkles, CheckCircle } from "lucide-react";

export interface LevelOption {
  value: string;
  label: string;
  icon: React.ElementType;
  desc: string;
}

interface LevelSelectionSectionProps {
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  levelOptions: LevelOption[];
}

export function LevelSelectionSection({
  selectedLevel,
  onLevelChange,
  levelOptions,
}: LevelSelectionSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-600" />
        Wybierz sposób nauki
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Wybierz sposób dodawania nowych fiszek do nauki.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {levelOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedLevel === opt.value;
          return (
            <Card
              key={opt.value}
              className={`p-5 cursor-pointer transition-all hover:shadow-md relative ${
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : "border-gray-200 hover:border-purple-200"
              }`}
              onClick={() => onLevelChange(opt.value)}
            >
              <div className="flex items-start justify-between pr-16">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`p-2 rounded-full ${
                      isSelected ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isSelected ? "text-purple-900" : "text-gray-900"}`}>
                      {opt.label}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute top-5 right-5">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
