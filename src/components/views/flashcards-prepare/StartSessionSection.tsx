import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface StartSessionSectionProps {
  totalCards: number;
  onStart: () => void;
}

export function StartSessionSection({ totalCards, onStart }: StartSessionSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">
          Gotowy do nauki?
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Masz łącznie <span className="font-bold text-indigo-600">{totalCards}</span> kart do przerobienia w tej sesji.
          Regularność to klucz do sukcesu!
        </p>
      </div>

      <Button 
        size="lg" 
        className="h-14 px-8 text-lg gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105"
        onClick={onStart}
      >
        <Play className="h-5 w-5 fill-current" />
        Rozpocznij sesję
      </Button>
    </div>
  );
}
