import { Card } from "@/components/ui/card";
import { Sparkles, CheckCircle } from "lucide-react";

interface Mode {
  value: string;
  label: string;
  icon: React.ElementType;
  desc: string;
}

interface QuizModeSelectionProps {
  selectedMode: string;
  onModeChange: (value: string) => void;
  modes: Mode[];
}

export function QuizModeSelection({
  selectedMode,
  onModeChange,
  modes,
}: QuizModeSelectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-600" />
        Wybierz tryb quizu
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Adaptacyjny AI, losowy zestaw lub konkretny poziom CEFR – Ty decydujesz!
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedMode === opt.value;

          return (
            <Card
              key={opt.value}
              className={`p-5 cursor-pointer transition-all hover:shadow-md relative ${
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : "border-gray-200 hover:border-purple-200"
              }`}
              onClick={() => onModeChange(opt.value)}
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
                  <div className="flex-1">
                    <h4 className="font-semibold">{opt.label}</h4>
                    <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-5 right-5 text-purple-600 animate-in zoom-in duration-300">
                  <CheckCircle className="h-6 w-6" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
