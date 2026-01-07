import { Card } from "@/components/ui/card";
import { BookOpen, Trophy, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Dlaczego LinguaAI?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-9 w-9 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inteligentne fiszki</h3>
            <p className="text-muted-foreground">
              System SRS (Spaced Repetition) dostosowany do Twojego tempa
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-9 w-9 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quizy i wyzwania</h3>
            <p className="text-muted-foreground">
              Różne tryby: MCQ, tłumaczenie, wpisywanie, AI
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-9 w-9 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Postęp w czasie rzeczywistym</h3>
            <p className="text-muted-foreground">
              Statystyki, serie, poziomy, osiągnięcia
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
