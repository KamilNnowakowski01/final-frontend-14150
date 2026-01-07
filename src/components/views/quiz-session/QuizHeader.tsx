import { Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizHeaderProps {
  packageName: string;
  level: string;
  currentIndex: number;
  totalQuestions: number;
  packageIndex: number;
}

export function QuizHeader({ packageName, level, currentIndex, totalQuestions, packageIndex }: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-900">
          <Sparkles className="h-10 w-10 text-indigo-600" />
          Quiz
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Pakiet: <span className="text-indigo-600">{packageName}</span> • Poziom: <span className="text-indigo-600">{level}</span>
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                i < packageIndex 
                  ? "bg-green-500 border-green-500 text-white" 
                  : i === packageIndex
                  ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                  : "bg-gray-50 border-gray-200 text-gray-300"
              }`}
            >
              {i < packageIndex ? <Check className="w-5 h-5" /> : <div className={`w-2 h-2 rounded-full ${i === packageIndex ? "bg-indigo-700" : "bg-gray-300"}`} />}
            </div>
          ))}
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2 bg-indigo-50 text-indigo-700 border-indigo-100">
          Pytanie {currentIndex + 1} / {totalQuestions}
        </Badge>
      </div>
    </div>
  );
}
