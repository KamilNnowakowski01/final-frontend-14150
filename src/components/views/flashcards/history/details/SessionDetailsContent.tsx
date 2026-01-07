"use client";

import { useSessionDetails } from "@/hooks/flashcards/useSessionDetails";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { SessionStatsCards } from "./SessionStatsCards";
import { SessionItemsTable } from "./SessionItemsTable";

interface SessionDetailsContentProps {
  sessionId: string;
}

export default function SessionDetailsContent({ sessionId }: SessionDetailsContentProps) {
  const { session, loading, error } = useSessionDetails(sessionId);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <div className="text-red-500">{error || "Nie znaleziono sesji."}</div>
        <Button onClick={() => router.back()}>Wróć</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Szczegóły sesji</h1>
          <p className="text-muted-foreground">
            {format(session.date, "dd MMMM yyyy, HH:mm", { locale: pl })} • {session.duration} min
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <SessionStatsCards session={session} />

      {/* Items Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Lista słówek ({session.items.length})</h2>
        <SessionItemsTable items={session.items} />
      </div>
    </div>
  );
}
