'use client';

import { VocabularyView } from "@/components/views/vocabulary/VocabularyView";
import { useVocabularyData } from "@/components/views/vocabulary/hooks/useVocabularyData";
import { Loader2 } from "lucide-react";

export default function VocabularyPage() {
  const { words, loading } = useVocabularyData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return <VocabularyView initialWords={words} />;
}
