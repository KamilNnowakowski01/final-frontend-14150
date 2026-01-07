import { Sparkles } from "lucide-react";

export function QuizHistoryHeader() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
        <Sparkles className="h-10 w-10 text-indigo-600" />
        Historia quizów
      </h1>
      <p className="text-lg text-muted-foreground">
        Śledź swoje wyniki i postępy w quizach
      </p>
    </div>
  );
}
