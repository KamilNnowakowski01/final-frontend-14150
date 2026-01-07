import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Nauka języków z <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Opanuj dowolny język z fiszkami, quizami i adaptacyjnym AI. 
          Ucz się efektywnie, gdziekolwiek jesteś.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/register">
              Rozpocznij za darmo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Zobacz funkcje</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
