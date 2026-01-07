import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useState } from "react";
import { Word } from "@/types/flashcards";
import { Button } from "@/components/ui/button";

interface FlashcardBackProps {
  word: Word;
  onSpeak: (text: string) => void;
}

const posMap: Record<string, string> = {
  noun: "rzeczownik",
  verb: "czasownik",
  adjective: "przymiotnik",
  adverb: "przysłówek",
  pronoun: "zaimek",
  preposition: "przyimek",
  conjunction: "spójnik",
  interjection: "wykrzyknik",
  article: "przedimek",
  numeral: "liczebnik",
  particle: "partykuła"
};

const translatePOS = (pos: string) => {
  const lower = pos.toLowerCase().trim();
  return posMap[lower] || pos;
};

export function FlashcardBack({ word, onSpeak }: FlashcardBackProps) {
  // Combine main translation and meanings into a list of translations
  const translations = [
    word.translation,
    ...(word.meanings?.map(m => m.meaning) || [])
  ].filter(Boolean);

  // Remove duplicates
  const uniqueTranslations = Array.from(new Set(translations));

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () =>
    setCurrentIndex((i) => (i > 0 ? i - 1 : uniqueTranslations.length - 1));
  const goNext = () =>
    setCurrentIndex((i) => (i < uniqueTranslations.length - 1 ? i + 1 : 0));

  const hasMultiple = uniqueTranslations.length > 1;

  const rawPos = word.partOfSpeech || word.part_of_speech;
  let partsOfSpeech: string[] = [];

  if (Array.isArray(rawPos)) {
    partsOfSpeech = rawPos;
  } else if (typeof rawPos === 'string') {
    partsOfSpeech = rawPos.split(',').map(p => p.trim()).filter(Boolean);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-xl w-full">
      <div className="space-y-5">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {partsOfSpeech.map((pos, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
              {translatePOS(pos)}
            </Badge>
          ))}
        </div>
        <h3 className="text-4xl font-bold text-primary">{word.word}</h3>
      </div>

      {word.pronunciation && (
        <div className="flex items-center justify-center flex-col gap-2">
          <p className="text-lg text-muted-foreground font-mono">
            {word.pronunciation}
          </p>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(word.word);
            }}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Tłumaczenie z nawigacją */}
      <div className="space-y-4 mt-10">
        <div className="flex items-center justify-center gap-2">
          {hasMultiple && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="h-8 w-8 shrink-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="text-center px-4 min-w-[230px]">
            <p className="text-2xl font-semibold text-indigo-600 break-words">
              {uniqueTranslations[currentIndex]}
            </p>
          </div>

          {hasMultiple && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="h-8 w-8 shrink-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        {hasMultiple && (
          <div className="flex justify-center gap-2">
            {uniqueTranslations.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  idx === currentIndex ? "w-6 bg-indigo-500" : "w-2 bg-indigo-200 hover:bg-indigo-300"
                }`}
                aria-label={`Przełącz na tłumaczenie ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Example sentence if available for the current meaning */}
      {word.meanings && word.meanings[currentIndex - 1]?.exampleSentence && currentIndex > 0 && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-left">
          <p className="text-sm text-slate-600 italic">
            "{word.meanings[currentIndex - 1].exampleSentence}"
          </p>
        </div>
      )}
    </div>
  );
}
