import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizItem } from "../types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuizReviewPlayerProps {
  item: QuizItem;
  level: string;
}

export function QuizReviewPlayer({ item, level }: QuizReviewPlayerProps) {
  const typeLabel: Record<string, string> = {
    matching: "Dopasuj znaczenie",
    synonimOrAntonym: "Synonim / Antonim",
    clouze: "Uzupełnij lukę",
  };

  const options = ["A", "B", "C"] as const;
  const answersMap = { A: item.answerA, B: item.answerB, C: item.answerC };

  return (
    <div className="space-y-8">
      {/* Question Card */}
      <Card className="w-full border-2 shadow-xl bg-white overflow-hidden">
        <div className="flex justify-between px-5 py-4 border-b bg-slate-50/50">
          <Badge variant="outline" className="text-sm font-medium border-indigo-200 text-indigo-700 bg-indigo-50">
            Poziom {level}
          </Badge>
          <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300">
            {typeLabel[item.type] || "Pytanie"}
          </Badge>
        </div>

        <div className="px-10 py-12 text-center min-h-[240px] flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-800">
            {item.question}
          </h2>
        </div>
      </Card>

      {/* Answers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((letter) => {
          // Normalize to uppercase for comparison just in case
          const userAnswer = item.userAnswer?.toUpperCase();
          const correctAnswer = item.correctAnswer?.toUpperCase();
          
          const isSelected = userAnswer === letter;
          const isCorrectAnswer = correctAnswer === letter;

          const buttonClasses = cn(
            "relative h-32 rounded-2xl border-2 overflow-hidden transition-all duration-300",
            "flex items-center justify-start px-10 text-left",
            "font-medium text-lg cursor-default",
            
            // Styles based on result
            isCorrectAnswer
              ? "bg-emerald-50/80 border-emerald-500 border-4 shadow-2xl scale-105 ring-emerald-200/40"
              : isSelected && !isCorrectAnswer
              ? "bg-red-50/80 border-red-500 border-4 opacity-90"
              : "opacity-40 grayscale bg-white border-gray-300"
          );

          return (
            <div key={letter} className={buttonClasses}>
              {/* Background Letter */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className={cn(
                    "text-9xl font-black select-none pr-20 transition-colors duration-300",
                    isCorrectAnswer
                      ? "text-emerald-200/30"
                      : "text-gray-200/25"
                  )}
                >
                  {letter}
                </span>
              </div>

              {/* Answer Text */}
              <div className="relative z-10 flex items-center justify-center w-full h-full px-10">
                <p className="text-lg font-medium leading-relaxed text-center">
                  {answersMap[letter]}
                </p>
              </div>

              {/* Icons */}
              {isCorrectAnswer && (
                <CheckCircle className="absolute top-3 right-3 h-10 w-10 text-emerald-600 z-20" />
              )}
              {isSelected && !isCorrectAnswer && (
                <XCircle className="absolute top-3 right-3 h-10 w-10 text-red-600 z-20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
