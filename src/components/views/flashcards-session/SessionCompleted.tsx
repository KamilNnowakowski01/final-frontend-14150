import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, History } from "lucide-react";
import { useRouter } from "next/navigation";

export function SessionCompleted() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center justify-center min-h-[60vh]">
      
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="relative bg-gradient-to-br from-green-100 to-emerald-50 w-40 h-40 rounded-full flex items-center justify-center shadow-xl border-4 border-white ring-4 ring-green-50 transform transition-transform duration-500 hover:scale-105">
          <Trophy className="h-20 w-20 text-green-600 drop-shadow-sm" />
        </div>
      </div>
      
      <div className="space-y-6 text-center max-w-lg w-full">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sesja zakończona!</h2>
          <p className="text-slate-500 text-lg">
            Świetna robota! Kolejny krok do płynności językowej za Tobą.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-8 justify-center w-full">
          <Button 
            variant="outline" 
            size="lg"
            className="h-14 px-8 border-2 hover:bg-slate-50 text-slate-600 gap-2"
            onClick={() => router.push('/dashboard')}
          >
            <History className="h-5 w-5" />
            Przeglądnij historię fiszek!
          </Button>
          <Button 
            size="lg" 
            className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 gap-2"
            onClick={() => router.push('/dashboard/flashcards/prepare')}
          >
            Wróć do strony fiszek
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
