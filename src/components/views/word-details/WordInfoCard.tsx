import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Volume2, Activity, Calendar, Repeat } from "lucide-react";
import { VocabularyWord, Repetition } from "@/types/vocabulary";

interface WordInfoCardProps {
  wordData: VocabularyWord;
  repetition: Repetition | null;
}

export function WordInfoCard({ wordData, repetition }: WordInfoCardProps) {
  return (
    <Card className="p-6 md:p-8 bg-white shadow-lg border-0 max-w-3xl mx-auto">
      <div className="space-y-7">
        {/* 1. Meta Info: Level, Part of Speech, Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {/* Left: Level + Part of Speech */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">Poziom:</span>
              <Badge variant="outline" className="text-xs font-medium px-2">
                {wordData.level}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">
                Część mowy:
              </span>
              <Badge variant="secondary" className="text-xs capitalize px-2">
                {Array.isArray(wordData.part_of_speech)
                  ? wordData.part_of_speech.join(", ")
                  : wordData.part_of_speech}
              </Badge>
            </div>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Status:</span>
            {wordData.mastered ? (
              <Badge className="bg-green-600 text-white text-xs">
                Nauczone
              </Badge>
            ) : wordData.learned ? (
              <Badge className="bg-violet-600 text-white text-xs">Uczone</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                Nieprzerobione
              </Badge>
            )}
          </div>
        </div>



        <Separator className="my-5" />

        {/* 2. Main Content: Word + Pronunciation + Audio */}
        <div className="text-center space-y-4 p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {wordData.word}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-lg md:text-xl font-mono text-foreground tracking-wider">
              {wordData.pronunciation}
            </p>
            <Button size="sm" variant="ghost" className="h-9 gap-2">
              <Volume2 className="h-4 w-4" />
              Odtwórz
            </Button>
          </div>
        </div>

        <Separator className="my-5" />

        {/* 3. Meanings */}
        <div className="text-center space-y-3 pb-12 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Tłumaczenie</h3>
          <ol className="inline-block text-left space-y-2 ml-1">
            {wordData.meaning.map((meaning, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary font-bold text-sm w-6 text-right">
                  {index + 1}.
                </span>
                <span className="text-foreground font-medium text-base">
                  {meaning}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {repetition && (
          <>
            <div className="text-xs text-muted-foreground text-left mt-8 mb-2">
              Informacje o powtórce fiszki
            </div>
            <Separator className="mb-6" />
            <div className="grid grid-cols-3 gap-4 text-center pb-2">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Repeat className="h-3 w-3" /> Powtórki
                </span>
                <span className="font-semibold text-sm">{repetition.repetitions}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Łatwość
                </span>
                <span className="font-semibold text-sm">{repetition.easiness_factor.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Następna
                </span>
                <span className="font-semibold text-sm">
                  {new Date(repetition.date_next_rep).toLocaleDateString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
