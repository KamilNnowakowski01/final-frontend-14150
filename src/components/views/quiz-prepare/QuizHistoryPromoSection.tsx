import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, ChevronRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export function QuizHistoryPromoSection() {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-white border-slate-200 overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 hidden sm:block">
            <History className="h-8 w-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <History className="h-5 w-5 sm:hidden text-indigo-600" />
              Historia i Wyniki
            </h3>
            <p className="text-slate-600 max-w-md">
              Przeglądaj swoje wyniki z poprzednich quizów, analizuj postępy i sprawdzaj szczegóły rozwiązanych zestawów.
            </p>
          </div>
        </div>
        
        <Link href="/dashboard/quiz/history">
          <Button variant="outline" className="group border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all">
            <BarChart3 className="mr-2 h-4 w-4" />
            Zobacz historię
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
