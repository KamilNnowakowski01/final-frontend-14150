import { Loader2 } from "lucide-react";

interface QuizLoadingProps {
  message?: string;
  description?: string;
}

export function QuizLoading({ 
  message = "Przygotowujemy Twój quiz", 
  description = "Analizujemy materiał i generujemy unikalne pytania przy użyciu AI. \nTo może chwilę potrwać..." 
}: QuizLoadingProps) {
  return (
    <div className="flex flex-col h-[80vh] items-center justify-center gap-6 text-center px-4 animate-in fade-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        </div>
      </div>
      
      <div className="space-y-3 max-w-md">
        <h2 className="text-2xl font-bold text-slate-800">
          {message}
        </h2>
        <p className="text-slate-500 text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <div className="h-3 w-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-3 w-3 bg-indigo-600 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
