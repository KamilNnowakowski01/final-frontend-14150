import { Filter } from "lucide-react";

export function VocabularyEmptyState() {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <Filter className="h-12 w-12 mx-auto mb-3 opacity-30" />
      <p>Brak słów spełniających kryteria</p>
    </div>
  );
}
