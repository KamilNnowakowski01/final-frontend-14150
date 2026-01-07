
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Klasy CSS
const CONTROLS_WRAPPER_CLASS = "flex justify-center min-h-[100px] items-center w-full";
const SCORE_GRID_CLASS = "grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl animate-in slide-in-from-bottom-4 fade-in duration-300 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg";
const FLIP_BTN_CLASS = "h-16 px-16 text-xl font-bold shadow-xl hover:scale-105 transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white ring-4 ring-indigo-100";
const SCORE_BTN_BASE_CLASS = "h-20 flex flex-col gap-1 border-2 transition-all duration-200 hover:scale-105";

// Opcje ocen
const SCORE_OPTIONS = [
  {
    score: 1,
    label: "Nie wiem",
    sublabel: "Powtórz",
    className: "border-red-200 bg-red-50/50 text-red-700 hover:bg-red-100 hover:border-red-400 hover:shadow-md hover:shadow-red-100",
  },
  {
    score: 3,
    label: "Trudne",
    sublabel: "Wymaga pracy",
    className: "border-orange-200 bg-orange-50/50 text-orange-700 hover:bg-orange-100 hover:border-orange-400 hover:shadow-md hover:shadow-orange-100",
  },
  {
    score: 4,
    label: "Dobre",
    sublabel: "Pamiętam",
    className: "border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100",
  },
  {
    score: 5,
    label: "Łatwe",
    sublabel: "Perfekcyjnie",
    className: "border-green-200 bg-green-50/50 text-green-700 hover:bg-green-100 hover:border-green-400 hover:shadow-md hover:shadow-green-100",
  },
];

// Komponent przycisku oceny
function ScoreButton({ score, label, sublabel, className, onScore, submitting }: {
  score: number;
  label: string;
  sublabel: string;
  className: string;
  onScore: (score: number) => void;
  submitting: boolean;
}) {
  return (
    <Button
      variant="outline"
      className={cn(SCORE_BTN_BASE_CLASS, className)}
      onClick={() => onScore(score)}
      disabled={submitting}
    >
      <span className="font-bold text-lg">{label}</span>
      <span className="text-xs uppercase font-semibold opacity-70 tracking-wide">{sublabel}</span>
    </Button>
  );
}

interface SessionControlsProps {
  isFlipped: boolean;
  onFlip: () => void;
  onScore: (score: number) => void;
  submitting: boolean;
}

export function SessionControls({ isFlipped, onFlip, onScore, submitting }: SessionControlsProps) {
  return (
    <div className={CONTROLS_WRAPPER_CLASS}>
      {!isFlipped ? (
        <Button 
          size="lg" 
          className={FLIP_BTN_CLASS}
          onClick={onFlip}
        >
          Pokaż odpowiedź
        </Button>
      ) : (
        <div className={SCORE_GRID_CLASS}>
          {SCORE_OPTIONS.map(opt => (
            <ScoreButton
              key={opt.score}
              score={opt.score}
              label={opt.label}
              sublabel={opt.sublabel}
              className={opt.className}
              onScore={onScore}
              submitting={submitting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
