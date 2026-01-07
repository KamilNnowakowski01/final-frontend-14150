import { Users, Globe, CheckCircle } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">O LinguaAI</h2>
          <p className="text-lg text-muted-foreground">
            Jesteśmy platformą stworzoną przez pasjonatów języków i technologii. 
            Wierzymy, że nauka może być przyjemna, skuteczna i dostępna dla każdego.
          </p>
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <span>10 000+ użytkowników</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>15+ języków</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span>98% skuteczności</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
