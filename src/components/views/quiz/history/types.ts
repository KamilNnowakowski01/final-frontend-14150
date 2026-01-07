export interface QuizSession {
  id: string;
  date: Date;
  duration: number; // in minutes
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  status: string;
}

export interface QuizSummaryStats {
  monthSessions: number;
  monthQuestions: number;
  monthCorrectAnswers: number;
  monthBestScore: number;
  totalSessions: number;
}

export interface QuizItem {
  id: string;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  answerA: string;
  answerB: string;
  answerC: string;
  isCorrect: boolean;
  type: string;
}

export interface QuizPackage {
  id: string;
  name: string;
  level: string;
  items: QuizItem[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface QuizSessionDetails extends QuizSession {
  packages: QuizPackage[];
}
