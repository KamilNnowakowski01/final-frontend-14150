"use client";

import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  Settings,
  Target,
  GraduationCap,
  ArrowRight,
  Sparkles,
  BarChart3,
  Play,
  Trophy,
  Timer,
  LayoutGrid,
  CheckCircle2,
  Shuffle,
  Layers,
  Search,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GuideView() {
  return (
    <div className="pb-20">
      {/* Global Header */}
      <div className="w-full bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center py-16 space-y-4 px-4">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl mb-4 shadow-sm border border-slate-100">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Przewodnik po aplikacji
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Wszystko co musisz wiedzieć, aby uczyć się skutecznie i śledzić swoje
            postępy.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-12">
        <Tabs defaultValue="flashcards" className="w-full space-y-12">
        <div className="flex justify-center pt-8">
          <TabsList className="grid w-[400px] grid-cols-2 h-12">
            <TabsTrigger value="flashcards" className="text-base">
              Fiszki
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="text-base">
              Quizy
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="flashcards"
          className="space-y-16 animate-in fade-in-50 duration-500"
        >
          {/* Hero Section - Flashcards */}
          <div className="text-center space-y-6 py-6 md:py-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Opanuj język dzięki <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Inteligentnym Powtórkom
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Nasz algorytm dostosowuje się do Twojego tempa. Nie marnuj czasu
              na słowa, które już znasz. Skup się na tym, co sprawia Ci
              trudność.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                >
                  Rozpocznij naukę <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Steps Flow - Flashcards */}
          <div className="grid gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-100 via-indigo-200 to-transparent -translate-x-1/2" />

            {/* Step 1: Configuration */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-2 md:ml-auto">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  1. Dostosuj swoje tempo
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Na stronie Ustawienia możesz dostosować limity. Ty decydujesz,
                  ile nowych słów chcesz poznawać dziennie (domyślnie 10) i ile
                  maksymalnie powtórek (domyślnie 50) jesteś w stanie zrobić na
                  dzień.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-emerald-100 bg-emerald-50/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium text-slate-700">
                        <span>Nowe słowa</span>
                        <span>10 / dzień</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full w-[20%] bg-emerald-500" />
                      </div>
                      <div className="flex justify-between text-sm font-medium text-slate-700 pt-2">
                        <span>Limit powtórek</span>
                        <span>50 / dzień</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2: Level Selection */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-purple-100 bg-purple-50/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Random Set Card */}
                      <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-full text-slate-600">
                            <Shuffle className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              Losowy zestaw
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Mieszanka wszystkich poziomów
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Header Card */}
                      <div className="flex items-center justify-between p-3 bg-white border border-purple-100 rounded-xl shadow-sm ring-1 ring-purple-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-600 rounded-full text-white">
                            <GraduationCap className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              Dostosuj poziom
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Wybierz konkretny poziom
                            </div>
                          </div>
                        </div>
                        <div className="text-purple-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Level Cards */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="py-3 px-1 bg-white border rounded-lg text-center flex flex-col justify-center items-center gap-1">
                          <span className="text-xs font-bold text-slate-900">
                            A1-A2
                          </span>
                          <span className="text-[7px] text-slate-400 font-medium uppercase tracking-wider">
                            Początkujący
                          </span>
                        </div>
                        <div className="py-3 px-1 bg-purple-600 border-purple-600 border rounded-lg text-center flex flex-col justify-center items-center gap-1 shadow-md transform scale-105 ring-2 ring-purple-200 ring-offset-1 ring-offset-purple-50">
                          <span className="text-xs font-bold text-white">
                            B1-B2
                          </span>
                          <span className="text-[7px] text-purple-100 font-medium uppercase tracking-wider">
                            Średni
                          </span>
                        </div>
                        <div className="py-3 px-1 bg-white border rounded-lg text-center flex flex-col justify-center items-center gap-1">
                          <span className="text-xs font-bold text-slate-900">
                            C1-C2
                          </span>
                          <span className="text-[7px] text-slate-400 font-medium uppercase tracking-wider">
                            Zaawansowany
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-2">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  2. Wybierz swój poziom
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Niezależnie od tego, czy dopiero zaczynasz, czy szlifujesz
                  zaawansowane słownictwo - mamy materiały dla Ciebie. Wybierz
                  poziom (A1-A2, B1-B2, C1-C2) lub zdaj się na los podczas
                  wyboru nowego słownictwa do nauki.
                </p>
              </div>
            </div>

            {/* Step 3: Browse Flashcards */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-2 md:ml-auto">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  3. Przeglądaj fiszki
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Przeglądaj pełną bazę dostępnych słówek. Możesz wyszukiwać
                  konkretne zwroty, filtrować je według kategorii i wracać do
                  tych, które już poznałeś, aby utrwalić wiedzę poza
                  standardowym cyklem powtórek.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-blue-100 bg-blue-50/30">
                  <CardContent className="p-6">
                    <div className="bg-white rounded-xl border shadow-sm aspect-[4/3] flex flex-col relative overflow-hidden">
                      {/* Top bar */}
                      <div className="flex justify-between items-center p-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">
                          C1
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                          NOWE SŁOWO
                        </span>
                      </div>

                      {/* Center content */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <h4 className="text-3xl font-bold text-slate-900">
                          avowal
                        </h4>
                        <Volume2 className="h-5 w-5 text-slate-400" />
                      </div>

                      {/* Bottom hint */}
                      <div className="p-4 text-center border-t border-slate-50">
                        <span className="text-xs text-slate-400">
                          Kliknij, by odwrócić
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4: Active Learning */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-amber-100 bg-amber-50/30">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Nie wiem */}
                      <div className="p-4 rounded-xl border-2 border-red-200 bg-red-50/50 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="font-bold text-red-700">Nie wiem</span>
                        <span className="text-[10px] font-bold text-red-700/70 uppercase tracking-wider">
                          Powtórz
                        </span>
                      </div>
                      {/* Trudne */}
                      <div className="p-4 rounded-xl border-2 border-orange-200 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="font-bold text-orange-700">
                          Trudne
                        </span>
                        <span className="text-[10px] font-bold text-orange-700/70 uppercase tracking-wider">
                          Wymaga pracy
                        </span>
                      </div>
                      {/* Dobre */}
                      <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="font-bold text-blue-700">Dobre</span>
                        <span className="text-[10px] font-bold text-blue-700/70 uppercase tracking-wider">
                          Pamiętam
                        </span>
                      </div>
                      {/* Łatwe */}
                      <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50/50 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="font-bold text-green-700">Łatwe</span>
                        <span className="text-[10px] font-bold text-green-700/70 uppercase tracking-wider">
                          Perfekcyjnie
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-2">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  4. Aktywna nauka fiszek
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Podczas sesji nauki bądź ze sobą szczery. Pod fiszkami
                  znajduje się sekcja do odznaczania trudności przypomnienia
                  sobie słowa. Jeśli zaznaczysz "Nie wiem", karta wróci do
                  Ciebie jeszcze w tej samej sesji, abyś na pewno ją zapamiętał.
                  Jeśli zaznaczysz "Łatwe" odstęp do następnej powtórki będzie
                  większy niż przy innych opcjach. Algorytm uczy się Twojej
                  pamięci.
                </p>
              </div>
            </div>

            {/* Step 5: Algorithm */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-2 md:ml-auto">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  5. Zaufaj algorytmowi
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Nie musisz planować powtórek, pamiętaj tylko o regularności.
                  System automatycznie wyznaczy optymalny moment na
                  przypomnienie słowa - tuż przed tym, jak byś je zapomniał. To
                  naukowo udowodniona metoda <i>Spaced Repetition</i>.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-indigo-100 bg-indigo-50/30">
                  <CardContent className="p-6 flex items-center justify-center min-h-[160px]">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 text-indigo-400 mx-auto" />
                      <p className="text-sm font-medium text-indigo-900">
                        Krzywa zapominania
                      </p>
                      <p className="text-xs text-indigo-600/80">
                        Optymalizacja czasu nauki
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="quizzes"
          className="space-y-16 animate-in fade-in-50 duration-500"
        >
          {/* Hero Section - Quizzes */}
          <div className="text-center space-y-6 py-6 md:py-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Weryfikuj postępy w <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                Angażujących Quizach
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Testuj swoje umiejętności w różnych kategoriach. Rywalizuj sam ze
              sobą i obserwuj jak rośnie Twój poziom zaawansowania.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg gap-2 bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-200"
                >
                  Rozwiąż Quiz <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Steps Flow - Quizzes */}
          <div className="grid gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-100 via-pink-200 to-transparent -translate-x-1/2" />

            {/* Step 1: Weryfikuj wiedzę quizem */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-2 md:ml-auto">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  1. Weryfikuj wiedzę quizem
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Regularne sprawdzanie wiedzy to klucz do trwałego
                  zapamiętywania. Quizy pomagają utrwalić materiał i
                  zidentyfikować luki w wiedzy, zanim staną się problemem.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-blue-100 bg-blue-50/30">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Question Card */}
                      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
                        <div className="flex justify-between items-center">
                          <div className="px-3 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
                            <div className="h-2 w-16 bg-indigo-200 rounded-full" />
                          </div>
                          <div className="px-3 py-1.5 bg-slate-100 rounded-full">
                            <div className="h-2 w-20 bg-slate-300 rounded-full" />
                          </div>
                        </div>
                        <div className="space-y-2 w-full px-4 py-2">
                          <div className="h-4 bg-slate-100 rounded-full w-full" />
                          <div className="h-4 bg-slate-100 rounded-full w-[80%] mx-auto" />
                        </div>
                        <div className="h-2" />
                      </div>

                      {/* Answers */}
                      <div className="grid grid-cols-3 gap-3">
                        {/* Option A */}
                        <div className="bg-white rounded-xl border shadow-sm p-3 relative overflow-hidden h-20 flex items-center justify-center group hover:border-indigo-200 transition-colors">
                          <span className="absolute text-7xl font-black text-slate-200 opacity-40 select-none -bottom-4 -left-2">
                            A
                          </span>
                          <div className="h-2.5 w-16 bg-slate-100 rounded-full relative z-10" />
                        </div>
                        {/* Option B */}
                        <div className="bg-white rounded-xl border shadow-sm p-3 relative overflow-hidden h-20 flex items-center justify-center group hover:border-indigo-200 transition-colors">
                          <span className="absolute text-7xl font-black text-slate-200 opacity-40 select-none -bottom-4 -left-2">
                            B
                          </span>
                          <div className="h-2.5 w-12 bg-slate-100 rounded-full relative z-10" />
                        </div>
                        {/* Option C */}
                        <div className="bg-white rounded-xl border shadow-sm p-3 relative overflow-hidden h-20 flex items-center justify-center group hover:border-indigo-200 transition-colors">
                          <span className="absolute text-7xl font-black text-slate-200 opacity-40 select-none -bottom-4 -left-2">
                            C
                          </span>
                          <div className="h-2.5 w-14 bg-slate-100 rounded-full relative z-10" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2: Różne poziomy */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-purple-100 bg-purple-50/30">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4 min-h-[200px]">
                    <div className="px-6 py-2.5 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm shadow-sm min-w-[140px] text-center">
                      Poziom A1-A2
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm shadow-sm min-w-[140px] text-center">
                      Poziom B1-B2
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm shadow-sm min-w-[140px] text-center">
                      Poziom C1-C2
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-2">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  2. Różne poziomy i rodzaje pytań
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Wybieraj spośród różnych poziomów trudności (od A1 do C2) oraz
                  typów pytań. System oferuje różnorodne wyzwania, aby nauka nie
                  była monotonna.
                </p>
              </div>
            </div>

            {/* Step 3: Rozwiąż zestaw */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-2 md:ml-auto">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  3. Rozwiąż zestaw pytań
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Każda sesja to unikalny zestaw pytań. Skup się i odpowiadaj,
                  mając na uwadze czas. Twoim celem jest udzielenie jak
                  największej liczby poprawnych odpowiedzi w serii.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-pink-100 bg-pink-50/30">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-500 p-1">
                        <span>Zestaw 1 - Poziom B1-B2</span>
                        <span>8/12</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-pink-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4: Adaptacyjne dostosowanie */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-orange-100 bg-orange-50/30">
                  <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                    <svg viewBox="0 0 300 160" className="w-full max-w-[300px]">
                      <defs>
                        <marker id="arrow-guide" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-orange-300" />
                        </marker>
                      </defs>
                      
                      {/* Paths */}
                      <path 
                        d="M 20 80 L 80 80 C 120 80 120 30 160 30 L 200 30" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-orange-300"
                        markerEnd="url(#arrow-guide)"
                      />
                      <path 
                        d="M 80 80 L 200 80" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-orange-300"
                        markerEnd="url(#arrow-guide)"
                      />
                      <path 
                        d="M 80 80 C 120 80 120 130 160 130 L 200 130" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-orange-300"
                        markerEnd="url(#arrow-guide)"
                      />

                      {/* Intersection Dot */}
                      <circle cx="80" cy="80" r="4" className="fill-orange-500" />

                      {/* End Dots */}
                      <circle cx="215" cy="30" r="4" className="fill-orange-500" />
                      <circle cx="215" cy="80" r="4" className="fill-orange-500" />
                      <circle cx="215" cy="130" r="4" className="fill-orange-500" />

                      {/* Labels */}
                      <g className="text-xs font-semibold">
                        {/* Top */}
                        <rect x="225" y="18" width="70" height="24" rx="12" className="fill-orange-100" />
                        <text x="260" y="34" textAnchor="middle" className="fill-orange-700">75-100%</text>
                        
                        {/* Middle */}
                        <rect x="225" y="68" width="70" height="24" rx="12" className="fill-orange-100" />
                        <text x="260" y="84" textAnchor="middle" className="fill-orange-700">50-75%</text>
                        
                        {/* Bottom */}
                        <rect x="225" y="118" width="70" height="24" rx="12" className="fill-orange-100" />
                        <text x="260" y="134" textAnchor="middle" className="fill-orange-700">0-50%</text>
                      </g>
                    </svg>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-2">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  4. Adaptacyjne dostosowanie
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  System analizuje Twoje odpowiedzi w czasie rzeczywistym.
                  Słowa, które sprawiają Ci trudność, będą pojawiać się częściej
                  w przyszłych quizach, abyś mógł je lepiej utrwalić.
                </p>
              </div>
            </div>

            {/* Step 5: Analiza wyniku */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-2 md:ml-auto">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  5. Analiza wyniku quizu
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Po zakończeniu otrzymasz szczegółowy raport. Zobaczysz procent
                  poprawnych odpowiedzi, czas reakcji oraz listę słów, które
                  wymagają powtórki.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10" />
                <Card className="border-emerald-100 bg-emerald-50/30">
                  <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                    <Trophy className="h-24 w-24 text-emerald-500" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
