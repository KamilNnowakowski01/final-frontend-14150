import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizAnswersProps {
  selectedAnswer: string;
  showResult: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  answers: { A: string; B: string; C: string };
  onSelect: (answer: string) => void;
}


const ANSWERS_WRAPPER_CLASS = "space-y-6 max-w-4xl mx-auto";
const ANSWERS_GRID_CLASS = "grid grid-cols-1 md:grid-cols-3 gap-6";
const ANSWER_BTN_BASE_CLASS = "relative h-32 rounded-2xl border-2 overflow-hidden transition-all duration-300 flex items-center justify-start px-10 text-left font-medium text-lg";
const ANSWER_LETTER_CLASS = "text-9xl font-black select-none pr-20 transition-colors duration-300";
const ANSWER_TEXT_CLASS = "relative z-10 flex items-center justify-center w-full h-full px-10";
const ANSWER_ICON_CLASS = "absolute top-3 right-3 h-10 w-10 z-20";

type OptionLetter = "A" | "B" | "C";

function QuizAnswerButton({
  letter,
  answer,
  isSelected,
  isCorrectAnswer,
  showResult,
  isCorrect,
  onSelect,
  disabled
}: {
  letter: OptionLetter;
  answer: string;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  showResult: boolean;
  isCorrect: boolean;
  onSelect: (letter: OptionLetter) => void;
  disabled: boolean;
}) {
  const buttonClasses = cn(
    ANSWER_BTN_BASE_CLASS,
    // Stan przed odpowiedzią
    !showResult && isSelected
      ? "border-purple-400 bg-purple-400/10 shadow-xl scale-105 ring-purple-200/30"
      : !showResult && !isSelected
      ? "border-gray-300 hover:border-purple-300 hover:bg-purple-400/5 bg-white"
      : "bg-white",
    // Stan po odpowiedzi
    showResult && isCorrectAnswer
      ? "bg-emerald-50/80 border-emerald-500 border-4 shadow-2xl scale-105 ring-emerald-200/40"
      : showResult && isSelected && !isCorrect
      ? "bg-red-50/80 border-red-500 border-4 opacity-90"
      : showResult
      ? "opacity-40 grayscale"
      : ""
  );
  const letterClasses = cn(
    ANSWER_LETTER_CLASS,
    !showResult && isSelected
      ? "text-purple-200/40"
      : showResult && isCorrectAnswer
      ? "text-emerald-200/30"
      : "text-gray-200/25"
  );
  return (
    <button
      disabled={disabled}
      onClick={() => onSelect(letter)}
      className={buttonClasses}
    >
      {/* Tło z literą */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className={letterClasses}>{letter}</span>
      </div>
      {/* Tekst odpowiedzi */}
      <div className={ANSWER_TEXT_CLASS}>
        <p className="text-lg font-medium leading-relaxed text-center">
          {answer}
        </p>
      </div>
      {/* Ikony */}
      {showResult && isCorrectAnswer && (
        <CheckCircle className={cn(ANSWER_ICON_CLASS, "text-emerald-600")} />
      )}
      {showResult && isSelected && !isCorrect && (
        <XCircle className={cn(ANSWER_ICON_CLASS, "text-red-600")} />
      )}
    </button>
  );
}

export function QuizAnswers({
  selectedAnswer,
  showResult,
  isCorrect,
  correctAnswer,
  answers,
  onSelect,
}: QuizAnswersProps) {
  const options: OptionLetter[] = ["A", "B", "C"];
  return (
    <div className={ANSWERS_WRAPPER_CLASS}>
      <div className={ANSWERS_GRID_CLASS}>
        {options.map((letter) => (
          <QuizAnswerButton
            key={letter}
            letter={letter}
            answer={answers[letter]}
            isSelected={selectedAnswer === letter}
            isCorrectAnswer={letter === correctAnswer}
            showResult={showResult}
            isCorrect={isCorrect}
            onSelect={onSelect}
            disabled={showResult}
          />
        ))}
      </div>
    </div>
  );
}
