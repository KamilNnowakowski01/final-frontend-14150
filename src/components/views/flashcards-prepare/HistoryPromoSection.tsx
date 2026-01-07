import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, ChevronRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export function HistoryPromoSection() {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-white border-slate-200 overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col justify-between gap-6 h-full">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 hidden sm:block">
            <History className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <History className="h-5 w-5 sm:hidden text-indigo-600" />
              Historia i Statystyki
            </h3>
            <p className="text-slate-600 text-sm">
              Śledź swoje postępy, analizuj skuteczność nauki i przeglądaj zakończone sesje w szczegółowym widoku historii.
            </p>
          </div>
        </div>
        
        <Link href="/dashboard/flashcards/history" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full group border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all">
            <BarChart3 className="mr-2 h-4 w-4" />
            Zobacz historię
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
