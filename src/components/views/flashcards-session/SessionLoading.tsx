import { Loader2 } from "lucide-react";

export function SessionLoading() {
  return (
    <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      <p className="text-muted-foreground animate-pulse">Ładowanie sesji...</p>
    </div>
  );
}
