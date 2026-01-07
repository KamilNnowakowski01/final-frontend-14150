'use client';

import { useRouter } from 'next/navigation';
import { Trophy, Home, ArrowRight, Star, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { useQuizHistory } from '@/hooks/quizzes/useQuizHistory';

export default function QuizFinishPage() {
  const router = useRouter();
  
  const { sessions, loading } = useQuizHistory();
  const [latestSessionId, setLatestSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      // Assuming sessions are sorted by date desc in the hook
      setLatestSessionId(sessions[0].id);
    }
  }, [sessions]);

  const handleGoToDetails = () => {
    if (latestSessionId) {
      router.push(`/dashboard/quiz/${latestSessionId}`);
    } else {
      router.push('/dashboard/quiz/history');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in duration-700">
      <Card className="max-w-lg w-full p-8 text-center space-y-8 shadow-2xl border-2 border-indigo-100 bg-white/80 backdrop-blur-sm">
        
        {/* Icon Header */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-yellow-100 rounded-full animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full bg-yellow-50 rounded-full border-4 border-yellow-200">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Gratulacje!
          </h1>
          <p className="text-lg text-slate-600">
            Ukończyłeś wszystkie etapy quizu. Twój poziom językowy został zweryfikowany.
          </p>
        </div>

        {/* Stats or Info */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">
            Status
          </p>
          <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-xl">
            <Star className="w-5 h-5 fill-current" />
            Quiz Zakończony Pomyślnie
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-slate-200 hover:bg-slate-50"
            onClick={() => router.push('/dashboard/quiz/prepare')}
          >
            <Home className="mr-2 h-4 w-4" />
            Wróć do startu
          </Button>
          
          <Button 
            size="lg" 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
            onClick={handleGoToDetails}
            disabled={loading}
          >
            {latestSessionId ? 'Zobacz wynik' : 'Historia quizów'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="pt-2">
             <Button 
            variant="ghost"
            size="sm" 
            className="text-slate-500 hover:text-indigo-600"
            onClick={() => router.push('/dashboard/quiz/history')}
          >
            <History className="mr-2 h-4 w-4" />
            Przejdź do pełnej historii
          </Button>
        </div>
      </Card>
    </div>
  );
}
