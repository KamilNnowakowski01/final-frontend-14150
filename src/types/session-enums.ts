/**
 * Enums for session statuses and item stages
 * Use these instead of magic strings in the application
 */

/** Status of a flashcard/quiz session */
export enum SessionStatus {
  /** Session is currently active */
  ACTIVE = 'active',
  /** Session has been completed */
  COMPLETED = 'completed',
  /** Session is pending/not started */
  PENDING = 'pending',
}

/** Stage of a flashcard item in the learning process */
export enum FlashcardStage {
  /** Item needs to be reviewed (first presentation) */
  REVIEW = 'review',
  /** Item is being learned (scored but not passed) */
  LEARNING = 'learning',
  /** Item has been passed (learned successfully) */
  PASSED = 'passed',
}

/** Status of a flashcard item */
export enum FlashcardItemStatus {
  /** New item, never seen before */
  NEW = 'new',
  /** Item is due for review */
  REVIEW = 'review',
  /** Item has been learned */
  LEARNED = 'learned',
}

/** Package names for quizzes */
export enum QuizPackage {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

/** Type guard to check if value is a valid SessionStatus */
export function isSessionStatus(value: string): value is SessionStatus {
  return Object.values(SessionStatus).includes(value as SessionStatus);
}

/** Type guard to check if value is a valid FlashcardStage */
export function isFlashcardStage(value: string): value is FlashcardStage {
  return Object.values(FlashcardStage).includes(value as FlashcardStage);
}
