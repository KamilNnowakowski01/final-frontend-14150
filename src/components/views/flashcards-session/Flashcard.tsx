
import { Card } from "@/components/ui/card";
import { Word, FlashcardsItemStatus, FlashcardsItemStage } from "@/types/flashcards";
import { FlashcardFront } from "./FlashcardFront";
import { FlashcardBack } from "./FlashcardBack";
import { cn } from "@/lib/utils";





type StatusLabel = { text: string; color: string } | null;

type NormalizedWord = Word & { partOfSpeech?: string };
// Klasy CSS dla badge, karty i elementów wewnętrznych
const LEVEL_BADGE_CLASS = "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider z-10 bg-slate-100 text-slate-600 border border-slate-200";
const STATUS_BADGE_BASE_CLASS = "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider z-10";
const FLASHCARD_CLASSNAME = "relative w-full max-w-2xl h-[450px] cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 select-none";
const FLASHCARD_WRAPPER_CLASS = "flex justify-center w-full";
const FLASHCARD_CONTENT_CLASS = "absolute inset-0 flex flex-col items-center justify-center p-8 text-center";
const FLASHCARD_HINT_CLASS = "absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-60";
// Funkcja normalizująca word
function normalizeWord(word: Word): NormalizedWord {
  return {
    ...word,
    partOfSpeech: word.partOfSpeech || (word as any).part_of_speech,
  };
}
// Komponent badge poziomu
function FlashcardLevelBadge({ level }: { level: string }) {
  return (
    <div className={LEVEL_BADGE_CLASS}>{level}</div>
  );
}

// Komponent badge statusu
function FlashcardStatusBadge({ statusInfo }: { statusInfo: Exclude<StatusLabel, null> }) {
  return (
    <div className={cn(STATUS_BADGE_BASE_CLASS, statusInfo.color)}>
      {statusInfo.text}
    </div>
  );
}

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

function getBorderColor(stage: FlashcardsItemStage, status: FlashcardsItemStatus): string {
  if (stage === "passed") return "border-green-500 shadow-green-100";
  if (stage === "learning") return "border-red-400 shadow-red-100";
  if (status === "new") return "border-blue-400 shadow-blue-100";
  if (status === "review") return "border-purple-400 shadow-purple-100";
  return "border-border";
}

function getStatusLabel(stage: FlashcardsItemStage, status: FlashcardsItemStatus): StatusLabel {
  if (stage === "passed") return { text: "Ukończone", color: "text-green-600 bg-green-50" };
  if (stage === "learning") return { text: "Do powtórki", color: "text-red-600 bg-red-50" };
  if (status === "new") return { text: "Nowe słowo", color: "text-blue-600 bg-blue-50" };
  if (status === "review") return { text: "Powtórka", color: "text-purple-600 bg-purple-50" };
  return null;
}

interface FlashcardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  status: FlashcardsItemStatus;
  stage: FlashcardsItemStage;
}

export function Flashcard({ word, isFlipped, onFlip, status, stage }: FlashcardProps) {
  const normalizedWord = normalizeWord(word);
  const statusInfo = getStatusLabel(stage, status);

  return (
    <div className={FLASHCARD_WRAPPER_CLASS}>
      <Card
        className={cn(
          FLASHCARD_CLASSNAME,
          getBorderColor(stage, status)
        )}
        onClick={onFlip}
      >
        {word.level && <FlashcardLevelBadge level={word.level} />}
        {statusInfo && <FlashcardStatusBadge statusInfo={statusInfo} />}

        <div className={FLASHCARD_CONTENT_CLASS}>
          {!isFlipped ? (
            <FlashcardFront word={normalizedWord} onSpeak={speak} />
          ) : (
            <FlashcardBack word={normalizedWord} onSpeak={speak} />
          )}
        </div>

        <div className={FLASHCARD_HINT_CLASS}>
          Kliknij, by odwrócić
        </div>
      </Card>
    </div>
  );
}
