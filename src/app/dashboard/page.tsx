'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Trophy,
  Clock,
  Activity,
  Layers,
  BrainCircuit,
  ArrowRight,
  GraduationCap,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import { VocabularyProgressSection } from "@/components/views/dashboard/VocabularyProgressSection";
import { LastActivitySection } from "@/components/views/dashboard/LastActivitySection";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { masteredWords, learningWords, monthQuizzes, monthBestScore, loading } = useDashboardStats();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Witaj ponownie!"
        description="Oto podsumowanie Twoich postępów w nauce."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nauczone słówka
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{masteredWords}</div>
                <p className="text-xs text-muted-foreground">
                  Opanowane słówka
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uczone słówka</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{learningWords}</div>
                <p className="text-xs text-muted-foreground">W trakcie nauki</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizy w tym miesiącu</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{monthQuizzes}</div>
                <p className="text-xs text-muted-foreground">Ukończone sesje</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rekord miesiąca</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{monthBestScore > 0 ? `${monthBestScore}%` : '-'}</div>
                <p className="text-xs text-muted-foreground">
                  Najlepszy wynik
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Layers className="h-5 w-5" />
              Fiszki
            </CardTitle>
            <CardDescription>
              Przeglądaj karty i ucz się nowych słówek
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/dashboard/flashcards/prepare">
                Rozpocznij naukę <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <BrainCircuit className="h-5 w-5" />
              Quiz
            </CardTitle>
            <CardDescription>
              Sprawdź swoją wiedzę w szybkim teście
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Link href="/dashboard/quiz/prepare">
                Rozpocznij quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <VocabularyProgressSection />
        <LastActivitySection />
      </div>
    </div>
  );
}
