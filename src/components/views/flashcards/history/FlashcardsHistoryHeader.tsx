import { BookOpen } from "lucide-react";

export function FlashcardsHistoryHeader() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
        <BookOpen className="h-10 w-10 text-indigo-600" />
        Historia fiszek
      </h1>
      <p className="text-lg text-muted-foreground">
        Śledź postępy i analizuj swoją naukę
      </p>
    </div>
  );
}
