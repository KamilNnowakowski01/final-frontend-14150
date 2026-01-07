'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Domyślne opcje dla wszystkich query
        staleTime: 60 * 1000, // 1 minuta - dane są "świeże" przez 1 minutę
        gcTime: 5 * 60 * 1000, // 5 minut - cache jest trzymany przez 5 minut (dawniej cacheTime)
        retry: 1, // Ponawiaj nieudane requesty raz
        refetchOnWindowFocus: false, // Nie odświeżaj przy focus okna (możesz zmienić na true)
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: zawsze twórz nowego klienta
    return makeQueryClient();
  } else {
    // Browser: użyj istniejącego klienta lub stwórz nowego
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Używamy useState z funkcją inicjalizującą, aby zapewnić stabilność klienta
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Eksportujemy też klucze query do ponownego użycia
export const queryKeys = {
  // Auth
  user: ['user'] as const,
  
  // Vocabulary
  words: ['words'] as const,
  word: (id: string) => ['word', id] as const,
  
  // Repetitions
  repetitions: (userId: string | number) => ['repetitions', userId] as const,
  repetitionsStats: (userId: string | number) => ['repetitions', userId, 'stats'] as const,
  repetition: (userId: string | number, repId: string) => ['repetitions', userId, repId] as const,
  
  // Flashcards
  flashcardsSession: (userId: string | number) => ['flashcards', userId, 'session'] as const,
  flashcardsSessions: (userId: string | number) => ['flashcards', userId, 'sessions'] as const,
  flashcardsSessionDetails: (userId: string | number, sessionId: string) => 
    ['flashcards', userId, 'sessions', sessionId] as const,
  
  // Quizzes
  quizSession: (userId: string | number) => ['quizzes', userId, 'session'] as const,
  quizSessions: (userId: string | number) => ['quizzes', userId, 'sessions'] as const,
  quizSessionDetails: (userId: string | number, sessionId: string) => 
    ['quizzes', userId, 'sessions', sessionId] as const,
  
  // Dashboard
  dashboardStats: (userId: string | number) => ['dashboard', userId, 'stats'] as const,
} as const;
