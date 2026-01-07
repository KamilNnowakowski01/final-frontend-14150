import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, progress }: QuizProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <span>Pytanie {currentQuestion} z {totalQuestions}</span>
        <span>{Math.round(progress)}% ukończono</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
