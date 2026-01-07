import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VocabularyAlphabetFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function VocabularyAlphabetFilter({
  selectedLetter,
  onLetterSelect,
}: VocabularyAlphabetFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
      <Button
        variant={selectedLetter === null ? "default" : "outline"}
        size="sm"
        className="w-8 h-8 p-0 text-xs font-medium"
        onClick={() => onLetterSelect(null)}
      >
        #
      </Button>
      {ALPHABET.map((letter) => (
        <Button
          key={letter}
          variant={selectedLetter === letter ? "default" : "outline"}
          size="sm"
          className={cn(
            "w-8 h-8 p-0 text-xs font-medium transition-all",
            selectedLetter === letter 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onLetterSelect(letter === selectedLetter ? null : letter)}
        >
          {letter}
        </Button>
      ))}
    </div>
  );
}
