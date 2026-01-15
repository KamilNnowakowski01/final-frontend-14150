import { Users, Globe, CheckCircle, Brain, BookOpen } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">O FluentWords</h2>
          <p className="text-lg text-muted-foreground">
            Jesteśmy platformą stworzoną przez pasjonatów języka angielskiego i technologii. 
            Wierzymy, że nauka może być przyjemna, skuteczna i dostępna dla każdego.
          </p>

          <h3 className="text-xl font-semibold pt-8">Dodatkowe informacje</h3>
          
            <div className="flex items-start gap-4 text-center max-w-2xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-500">Algorytm SM-2</h3>
                <p className="text-muted-foreground text-sm">
                  System powtórek wykorzystuje algorytm SM-2 (SuperMemo 2) opracowany przez dr. Piotra Woźniaka, 
                  który optymalizuje proces zapamiętywania poprzez inteligentne planowanie powtórek.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-center max-w-2xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-500">Dane leksykalne</h3>
                <p className="text-muted-foreground text-sm">
                  Warstwa danych leksykalnych została opracowana przy wykorzystaniu cyfrowego słownika 
                  autorstwa Tadeusza Piotrowskiego i Zygmunta Saloniego, udostępnionego w ramach projektu 
                  FreeDict na wolnych licencjach.
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 space-y-6">
          </div>
        </div>
      </div>
    </section>
  );
}
