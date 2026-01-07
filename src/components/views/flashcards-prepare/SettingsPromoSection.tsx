import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ChevronRight } from "lucide-react";
import Link from "next/link";

export function SettingsPromoSection() {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-white border-slate-200 overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col justify-between gap-6 h-full">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg text-slate-600 hidden sm:block">
            <Settings className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Settings className="h-5 w-5 sm:hidden text-slate-600" />
              Ustawienia Nauki
            </h3>
            <p className="text-slate-600 text-sm">
              Dostosuj preferencje nauki, wybierz poziomy trudności i zarządzaj swoim kontem.
            </p>
          </div>
        </div>
        
        <Link href="/dashboard/settings" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full group border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all">
            Przejdź do ustawień
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
