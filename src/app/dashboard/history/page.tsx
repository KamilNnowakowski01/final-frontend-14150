import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, History as HistoryIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<HistoryIcon />}
        title="Historia nauki"
        description="Przeglądaj swoje postępy i wyniki z przeszłości"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/flashcards/history">
          <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                  <Brain className="h-6 w-6" />
                </div>
                Historia Fiszek
              </CardTitle>
              <CardDescription>
                Zobacz historię swoich sesji nauki słówek
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sprawdź, jak radziłeś sobie z powtórkami, ile słów opanowałeś i jak wyglądała Twoja regularność.
              </p>
              <Button variant="ghost" className="w-full justify-between group-hover:text-indigo-600">
                Przejdź do historii fiszek
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/quiz/history">
          <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-lg text-pink-600 group-hover:bg-pink-200 transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                Historia Quizów
              </CardTitle>
              <CardDescription>
                Przeglądaj wyniki rozwiązanych quizów
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Analizuj swoje wyniki w quizach, sprawdzaj poprawne odpowiedzi i śledź postępy w testach.
              </p>
              <Button variant="ghost" className="w-full justify-between group-hover:text-pink-600">
                Przejdź do historii quizów
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
