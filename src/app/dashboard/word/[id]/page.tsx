"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useWordDetails } from "@/components/views/word-details/hooks/useWordDetails";
import { WordHeader } from "@/components/views/word-details/WordHeader";
import { WordInfoCard } from "@/components/views/word-details/WordInfoCard";

interface WordDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WordDetailPage({ params }: WordDetailPageProps) {
  const { id } = use(params);
  const { word, repetition, loading, error } = useWordDetails(id);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center p-8">
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-destructive">{error || "Nie znaleziono słowa."}</p>
        <Button asChild>
          <Link href="/dashboard/vocabulary">Wróć do listy</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <WordHeader word={word.word} />
        <Separator />
        <WordInfoCard wordData={word} repetition={repetition} />
      </div>
    </div>
  );
}
