"use client";

import { FlashcardsHistoryHeader } from "@/components/views/flashcards/history/FlashcardsHistoryHeader";
import { SessionTableWithPagination } from "@/components/views/flashcards/history/SessionTableWithPagination";
import { SummaryStatsSection } from "@/components/views/flashcards/history/SummaryStatsSection";
import { useFlashcardsHistory } from "@/hooks/flashcards/useFlashcardsHistory";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Komponent opakowujący logikę, aby użyć Suspense
function FlashcardsHistoryContent() {
  const { sessions, stats, loading, error } = useFlashcardsHistory();
  const router = useRouter();

  const handleDetails = (id: string) => {
    router.push(`/dashboard/flashcards/${id}`);
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <FlashcardsHistoryHeader />
      <SummaryStatsSection stats={stats} />
      <SessionTableWithPagination sessions={sessions} onDetails={handleDetails} />
    </div>
  );
}

export default function FlashcardsHistoryPage() {
  return (
    <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>}>
      <FlashcardsHistoryContent />
    </Suspense>
  );
}
