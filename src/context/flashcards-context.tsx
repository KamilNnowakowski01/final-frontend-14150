'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { FlashcardsSession } from "@/types/flashcards";
import { useAuth } from '@/context/auth-context';
import { FLASHCARDS_API } from '@/lib/api-endpoints';
import { FlashcardStage, FlashcardItemStatus } from '@/types/session-enums';

export interface TodayStats {
  newToLearn: number;
  dueToday: number;
  toReview: number;
  completedToday: number;
}

interface FlashcardsContextType {
  session: FlashcardsSession | null;
  stats: TodayStats;
  loading: boolean;
  error: Error | null;
  refreshSession: () => Promise<void>;
}

const FlashcardsContext = createContext<FlashcardsContextType | undefined>(undefined);

export function FlashcardsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [session, setSession] = useState<FlashcardsSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<TodayStats>({
    newToLearn: 0,
    dueToday: 0,
    toReview: 0,
    completedToday: 0,
  });

  const fetchSession = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      // Fetch or start the session
      const sessionRes = await api.post(FLASHCARDS_API.startSession(user.id));
      const sessionData: FlashcardsSession = sessionRes.data;
      
      setSession(sessionData);

      // Calculate stats from session items
      // Nowe do nauki: status='new' i jeszcze nie ruszone (stage='review')
      const newToLearn = sessionData.items.filter(
        item => item.status === FlashcardItemStatus.NEW && item.stage === FlashcardStage.REVIEW
      ).length;
      
      // Fiszki na dziś (powtórki): status='review' i jeszcze nie ruszone (stage='review')
      const dueToday = sessionData.items.filter(
        item => item.status === FlashcardItemStatus.REVIEW && item.stage === FlashcardStage.REVIEW
      ).length;
      
      // Do powtórki: ocenione ale nie zaliczone (stage='learning')
      const toReview = sessionData.items.filter(
        item => item.stage === FlashcardStage.LEARNING
      ).length;
      
      // Ukończone: zaliczone (stage='passed')
      const completedToday = sessionData.items.filter(
        item => item.stage === FlashcardStage.PASSED
      ).length;

      setStats({
        newToLearn,
        dueToday,
        toReview,
        completedToday
      });
      setError(null);
    } catch (e) {
      console.error("Failed to init session", e);
      setError(e instanceof Error ? e : new Error('Failed to init session'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <FlashcardsContext.Provider value={{ session, stats, loading, error, refreshSession: fetchSession }}>
      {children}
    </FlashcardsContext.Provider>
  );
}

export function useFlashcards() {
  const context = useContext(FlashcardsContext);
  if (context === undefined) {
    throw new Error('useFlashcards must be used within a FlashcardsProvider');
  }
  return context;
}
