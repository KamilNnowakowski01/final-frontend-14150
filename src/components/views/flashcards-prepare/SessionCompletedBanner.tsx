import { CheckCircle2 } from "lucide-react";

export function SessionCompletedBanner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 bg-green-50 rounded-xl border border-dashed border-green-300 animate-in fade-in duration-500">
      <div className="bg-white p-4 rounded-full shadow-sm ring-4 ring-green-100">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-green-900">
          Gratulacje!
        </h2>
        <p className="text-green-700 max-w-md mx-auto text-lg font-medium">
          Dzisiejsza sesja nauki jest już wykonana.
        </p>
        <p className="text-green-600/80 text-sm">
          Wróć jutro po nową porcję wiedzy!
        </p>
      </div>
    </div>
  );
}
