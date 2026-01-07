'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Brain, Shuffle, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';
import { useFlashcardsSession } from '@/hooks/flashcards/useFlashcardsSession';
import { TodayStatsSection } from '@/components/views/flashcards-prepare/TodayStatsSection';
import { StartSessionSection } from '@/components/views/flashcards-prepare/StartSessionSection';
import { SessionCompletedBanner } from '@/components/views/flashcards-prepare/SessionCompletedBanner';
import { LevelOption } from '@/components/views/flashcards-prepare/LevelSelectionSection';
import { HistoryPromoSection } from '@/components/views/flashcards-prepare/HistoryPromoSection';
import { SettingsPromoSection } from '@/components/views/flashcards-prepare/SettingsPromoSection';

export default function FlashcardsPreparePage() {
  const router = useRouter();
  const { session, stats, loading, error } = useFlashcardsSession();

  const handleStartSession = () => {
    router.push('/dashboard/flashcards/session');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert />;

  const sessionStatus = session?.status;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Fiszki"
        description="Przygotuj się do dzisiejszej sesji nauki."
        icon={<Brain />}
      />

      <TodayStatsSection stats={stats} />
      <Separator />

      {sessionStatus === 'completed' ? (
        <SessionCompletedBanner />
      ) : (
        <StartSessionSection
          totalCards={stats.dueToday + stats.newToLearn}
          onStart={handleStartSession}
        />
      )}

      <Separator />

      <PromoGrid />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
    </div>
  );
}

function ErrorAlert() {
  return (
    <div className="p-8 text-center">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Błąd</AlertTitle>
        <AlertDescription>
          Nie udało się załadować sesji. Spróbuj odświeżyć stronę.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function PromoGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SettingsPromoSection />
      <HistoryPromoSection />
    </div>
  );
}
