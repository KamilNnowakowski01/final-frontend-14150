import { useState } from "react";
import { QuizPackage } from "../types";
import { QuizReviewPlayer } from "./QuizReviewPlayer";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface QuizPackageViewerProps {
  pkg: QuizPackage;
}

export function QuizPackageViewer({ pkg }: QuizPackageViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!pkg.items || pkg.items.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">Brak pytań w tym zestawie.</div>;
  }

  const currentItem = pkg.items[selectedIndex];

  return (
    <div className="p-6 space-y-8 bg-slate-100">
      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pkg.items.map((item, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all border",
                isActive
                  ? "ring-2 ring-indigo-600 ring-offset-2 z-10"
                  : "hover:bg-slate-50",
                item.isCorrect
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              )}
              title={`Pytanie ${idx + 1}`}
            >
              {idx + 1}
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    item.isCorrect ? "bg-green-400" : "bg-red-400"
                  )}></span>
                  <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3",
                    item.isCorrect ? "bg-green-500" : "bg-red-500"
                  )}></span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Player View */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto" key={currentItem.id}>
        <QuizReviewPlayer item={currentItem} level={pkg.level} />
      </div>
    </div>
  );
}
