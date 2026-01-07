
import { Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const HEADER_WRAPPER_CLASS = "space-y-4";
const HEADER_ROW_CLASS = "flex items-center justify-between";
const TITLE_CLASS = "text-4xl font-bold flex items-center gap-3 text-slate-900";
const PACKAGE_INFO_CLASS = "text-muted-foreground mt-2 font-medium";
const STEPS_ROW_CLASS = "flex items-center gap-4";
const STEPS_CLASS = "flex gap-2";
const STEP_CIRCLE_CLASS = "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors";
const DOT_CLASS = "w-2 h-2 rounded-full";
const BADGE_CLASS = "text-lg px-4 py-2 bg-indigo-50 text-indigo-700 border-indigo-100";
const PROGRESS_WRAPPER_CLASS = "space-y-2";
const PROGRESS_ROW_CLASS = "flex justify-between text-sm font-medium text-muted-foreground";
const PROGRESS_BAR_CLASS = "h-2";

function QuizTitle() {
  return (
    <h1 className={TITLE_CLASS}>
      <Sparkles className="h-10 w-10 text-indigo-600" />
      Quiz
    </h1>
  );
}

function QuizPackageInfo({ displayPackage, level }: { displayPackage: string; level: string }) {
  return (
    <p className={PACKAGE_INFO_CLASS}>
      Pakiet: <span className="text-indigo-600">{displayPackage}</span> • Poziom: <span className="text-indigo-600">{level}</span>
    </p>
  );
}

function QuizStepsBadge({ packageIndex, currentIndex, totalQuestions }: { packageIndex: number; currentIndex: number; totalQuestions: number }) {
  return (
    <div className={STEPS_ROW_CLASS}>
      <ProgressSteps packageIndex={packageIndex} />
      <Badge variant="secondary" className={BADGE_CLASS}>
        Pytanie {currentIndex + 1} / {totalQuestions}
      </Badge>
    </div>
  );
}

function ProgressSteps({ packageIndex }: { packageIndex: number }) {
  return (
    <div className={STEPS_CLASS}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={
            STEP_CIRCLE_CLASS +
            ' ' +
            (i < packageIndex
              ? "bg-green-500 border-green-500 text-white"
              : i === packageIndex
              ? "bg-indigo-50 border-indigo-100 text-indigo-700"
              : "bg-gray-50 border-gray-200 text-gray-300")
          }
        >
          {i < packageIndex ? (
            <Check className="w-5 h-5" />
          ) : (
            <div className={DOT_CLASS + ' ' + (i === packageIndex ? "bg-indigo-700" : "bg-gray-300")}></div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizProgress({ currentIndex, totalQuestions, progress }: { currentIndex: number; totalQuestions: number; progress: number }) {
  return (
    <div className={PROGRESS_WRAPPER_CLASS}>
      <div className={PROGRESS_ROW_CLASS}>
        <span>Pytanie {currentIndex + 1} z {totalQuestions}</span>
        <span>{Math.round(progress)}% ukończono</span>
      </div>
      <Progress value={progress} className={PROGRESS_BAR_CLASS} />
    </div>
  );
}




function getDisplayPackageName(packageName: string): string {
  const match = /^package-(\d+)$/.exec(packageName);
  if (match) {
    return `Zestaw ${match[1]}`;
  }
  return packageName;
}

interface QuizSessionHeaderProps {
  packageName: string;
  level: string;
  currentIndex: number;
  totalQuestions: number;
  packageIndex: number;
  progress: number;
}
export function QuizSessionHeader({ packageName, level, currentIndex, totalQuestions, packageIndex, progress }: QuizSessionHeaderProps) {
  const displayPackage = getDisplayPackageName(packageName);
  return (
    <div className={HEADER_WRAPPER_CLASS}>
      <div className={HEADER_ROW_CLASS}>
        <div>
          <QuizTitle />
          <QuizPackageInfo displayPackage={displayPackage} level={level} />
        </div>
        <QuizStepsBadge packageIndex={packageIndex} currentIndex={currentIndex} totalQuestions={totalQuestions} />
      </div>
      <QuizProgress currentIndex={currentIndex} totalQuestions={totalQuestions} progress={progress} />
    </div>
  );
}
