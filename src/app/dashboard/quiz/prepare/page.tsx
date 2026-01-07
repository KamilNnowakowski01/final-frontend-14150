'use client';

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Shuffle, GraduationCap, BrainCircuit, Target } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { QuizModeSelection } from "@/components/views/quiz-prepare/QuizModeSelection";
import { QuizLevelGrid } from "@/components/views/quiz-prepare/QuizLevelGrid";
import { StartQuizSessionSection } from "@/components/views/quiz-prepare/StartQuizSessionSection";
import { AdaptiveLevelCard } from "@/components/views/quiz-prepare/AdaptiveLevelCard";
import { QuizHistoryPromoSection } from "@/components/views/quiz-prepare/QuizHistoryPromoSection";

export default function QuizPreparePage() {
  // Główny tryb quizu (AI / Losowy / Dostosuj poziom)
  const [quizMode, setQuizMode] = useState<string>("adaptive-ai");

  // Wybrany poziom CEFR (tylko jeden, domyślnie B1-B2)
  const [selectedCefrLevel, setSelectedCefrLevel] = useState<string>("B1-B2");

  // Dane do przycisku startu
  const totalQuestions = 36;
  const estimatedTime = 9;

  // 3 opcje trybu – identyczne jak w fiszkach
  const modes = [
    {
      value: "adaptive-ai",
      label: "Adaptacyjny AI",
      icon: BrainCircuit,
      desc: "AI dobiera trudność pytań do Twojego poziomu",
    },
    {
      value: "random",
      label: "Losowy zestaw",
      icon: Shuffle,
      desc: "Mieszanka wszystkich poziomów i trudności",
    },
    {
      value: "selected-levels",
      label: "Dostosuj poziom",
      icon: GraduationCap,
      desc: "Wybierz konkretny zakres CEFR",
    },
  ];

  const handleModeChange = (value: string) => {
    setQuizMode(value);
    // Reset do B1-B2 gdy wychodzimy z trybu "Dostosuj poziom"
    if (value !== "selected-levels") {
      setSelectedCefrLevel("B1-B2");
    }
  };

  const showLevelGrid = quizMode === "selected-levels";

  return (
    <div className="space-y-8">
      {/* 1. Nagłówek + streak */}
      <PageHeader
        title="Quiz"
        description="Rozpocznij sesję i sprawdź swoją wiedzę!"
        icon={<Target />}
      />

      <AdaptiveLevelCard level="B1-B2" />

      <Separator />

      {/* 3. Start Quiz – duży przycisk na górze, jak w fiszkach */}
      <StartQuizSessionSection totalQuestions={totalQuestions} estimatedTime={estimatedTime} />

      <Separator />

      <QuizHistoryPromoSection />
    </div>
  );
}
