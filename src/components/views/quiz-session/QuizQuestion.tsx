import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizItem } from "@/hooks/quizzes/useQuizSession";

interface QuizQuestionProps {
  question: QuizItem;
  level: string;
}

export function QuizQuestion({ question, level }: QuizQuestionProps) {
  const typeLabel: Record<string, string> = {
    matching: "Dopasuj znaczenie",
    synonimOrAntonym: "Synonim / Antonim",
    clouze: "Uzupełnij lukę",
  };

  return (
    <Card className="w-full border-2 shadow-xl bg-white overflow-hidden">
      {/* Górne badge’y – poziom po lewej, typ po prawej */}
      <div className="flex justify-between px-5 py-4 border-b bg-slate-50/50">
        <Badge variant="outline" className="text-sm font-medium border-indigo-200 text-indigo-700 bg-indigo-50">
          Poziom {level}
        </Badge>
        <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300">
          {typeLabel[question.type] || "Pytanie"}
        </Badge>
      </div>

      {/* Pytanie – wyśrodkowane, maksymalna szerokość */}
      <div className="px-10 py-12 text-center min-h-[240px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-800">
          {question.question}
        </h2>
      </div>
    </Card>
  );
}
