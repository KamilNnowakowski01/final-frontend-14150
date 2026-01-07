export interface Session {
  id: string;
  date: Date;
  duration: number; // minuty
  totalCards: number;
  correct: number;
  incorrect: number;
  levels: string[];
  mode: string;
  // Detailed counts from backend stats
  newCards: number;
  reviewCards: number;
  repeatCards: number;
  masteredCards: number;
}

export interface SummaryStats {
  weekSessions: number;
  weekCards: number;
  currentStreak: number;
  bestStreak: number;
  avgAccuracy: number;
}
