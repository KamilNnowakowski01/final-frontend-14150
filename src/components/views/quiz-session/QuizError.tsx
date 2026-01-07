import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface QuizErrorProps {
  message: string;
  onRetry: () => void;
}

export function QuizError({ message, onRetry }: QuizErrorProps) {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center gap-6 text-center px-4">
      <div className="bg-red-50 p-4 rounded-full">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">Wystąpił problem</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">{message}</p>
      </div>
      <Button onClick={onRetry} variant="outline" className="mt-2">
        Spróbuj ponownie
      </Button>
    </div>
  );
}
