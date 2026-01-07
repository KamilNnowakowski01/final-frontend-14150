import { Button } from "@/components/ui/button";
import { ChevronLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface QuizSessionDetailsHeaderProps {
  date: Date;
}

export function QuizSessionDetailsHeader({ date }: QuizSessionDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        className="pl-0 hover:pl-2 transition-all" 
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Wróć do historii
      </Button>
      
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Sparkles className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Szczegóły quizu</h1>
          <p className="text-muted-foreground">
            {format(date, "d MMMM yyyy, HH:mm", { locale: pl })}
          </p>
        </div>
      </div>
    </div>
  );
}
