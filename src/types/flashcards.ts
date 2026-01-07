export type FlashcardsSessionStatus = 'active' | 'completed';
export type FlashcardsItemStatus = 'new' | 'review';
export type FlashcardsItemStage = 'learning' | 'review' | 'passed';

export interface WordMeaning {
  id: string;
  wordId: string;
  meaning: string;
  exampleSentence?: string;
}

export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech?: string;
  part_of_speech?: string; // Fallback for snake_case
  level?: string;
  imageUrl?: string;
  meanings?: WordMeaning[];
}

export interface Repetition {
  id: string;
  userId: string;
  wordId: string;
  word?: Word;
  easinessFactor: number;
  interval: number;
  repetitionsCount: number;
  dateNextRep: string;
}

export interface FlashcardsItem {
  id: string;
  sessionId: string;
  repetitionId: string;
  repetition?: Repetition;
  status: FlashcardsItemStatus;
  stage: FlashcardsItemStage;
}

export interface FlashcardsSession {
  id: string;
  userId: string;
  status: FlashcardsSessionStatus;
  type: string;
  startedAt: string;
  endedAt?: string;
  items: FlashcardsItem[];
}
