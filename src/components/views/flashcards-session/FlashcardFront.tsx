import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2 } from "lucide-react";
import { Word } from "@/types/flashcards";

interface FlashcardFrontProps {
  word: Word;
  onSpeak: (text: string) => void;
}

export function FlashcardFront({ word, onSpeak }: FlashcardFrontProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-primary text-center">{word.word}</h2>
      <Button
        size="icon"
        variant="ghost"
        className="h-12 w-12 rounded-full hover:bg-indigo-50"
        onClick={(e) => {
          e.stopPropagation();
          onSpeak(word.word);
        }}
      >
        <Volume2 className="h-6 w-6" />
      </Button>
    </div>
  );
}
