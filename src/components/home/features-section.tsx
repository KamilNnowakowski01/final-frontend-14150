import { Card } from "@/components/ui/card";
import { BookOpen, Book, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Dlaczego FluentWords?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-9 w-9 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inteligentna nauka</h3>
            <p className="text-muted-foreground">
              Metoda fiszek z systemem powtórek SRS dostosowanym do Twojego tempa
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Book className="h-9 w-9 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Słownik</h3>
            <p className="text-muted-foreground">
              Ponad 15 000 słów angielskich z tłumaczeniami i kategoryzacją
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-9 w-9 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adaptacyjne quizy</h3>
            <p className="text-muted-foreground">
              Różne zadania w quizach dopasowane do Twojego poziomu i postępów
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
