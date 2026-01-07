export interface Word {
  id: string | number;
  part_of_speech: string | string[];
  level: string;
  word: string;
  pronunciation: string;
  meaning: string[];
}

export interface VocabularyWord extends Word {
  learned: boolean;
  mastered: boolean;
}

export interface VocabularyStats {
  total: number;
  notStarted: number;
  inProgress: number;
  mastered: number;
}

export type VocabularyTab = "all" | "not-started" | "in-progress" | "mastered";
export type VocabularyLevelFilter = "all" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Repetition {
  id: string;
  id_users: string;
  id_words: string;
  easiness_factor: number;
  repetitions: number;
  next_interval: number;
  date_next_rep: string;
  date_last_rep: string | null;
}
