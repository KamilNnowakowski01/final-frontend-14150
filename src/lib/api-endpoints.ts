/**
 * Centralized API endpoints for the application
 * Use these constants instead of hardcoding URLs in components/hooks
 */

/** Type for ID parameters - can be string or number */
type ID = string | number;

export const AUTH_API = {
  /** Login endpoint */
  login: () => `/auth/login`,
  
  /** Register new user */
  register: () => `/auth/register`,
  
  /** Get current user profile */
  me: () => `/auth/me`,
  
  /** Get user profile (alias for /me) */
  profile: () => `/auth/profile`,
  
  /** Delete user account */
  deleteProfile: () => `/auth/profile/delete`,
  
  /** Update user settings */
  updateSettings: () => `/auth/profile/settings`,
} as const;

export const FLASHCARDS_API = {
  /** Start or get current flashcards session */
  startSession: (userId: ID) => `/users/${userId}/flashcards-sessions/start`,
  
  /** Finish the current flashcards session */
  finishSession: (userId: ID) => `/users/${userId}/flashcards-sessions/finish`,
  
  /** Send score for a flashcard item */
  sendScore: (userId: ID, sessionId: ID, itemId: ID) =>
    `/users/${userId}/flashcards-sessions/${sessionId}/items/${itemId}/send-score`,
  
  /** Get flashcards session by ID */
  getSession: (userId: ID, sessionId: ID) =>
    `/users/${userId}/flashcards-sessions/${sessionId}`,
  
  /** Get all flashcards sessions for user */
  getAllSessions: (userId: ID) => `/users/${userId}/flashcards-sessions`,
} as const;

export const QUIZZES_API = {
  /** Start quiz session */
  startSession: (userId: ID) => `/users/${userId}/quizzes-sessions/start`,
  
  /** Initialize quiz session (alias for start) */
  initSession: (userId: ID) => `/users/${userId}/quizzes-sessions/init`,
  
  /** Get quiz session by ID */
  getSession: (userId: ID, sessionId: ID) =>
    `/users/${userId}/quizzes-sessions/${sessionId}`,
  
  /** Get quiz package details */
  getPackage: (userId: ID, sessionId: ID, packageId: ID) =>
    `/users/${userId}/quizzes-sessions/${sessionId}/packages/${packageId}`,
  
  /** Submit quiz package answers (using body with packageId and answers) */
  submitPackage: (userId: ID) =>
    `/users/${userId}/quizzes-sessions/submit-package`,
  
  /** Generate next quiz package */
  nextPackage: (userId: ID) =>
    `/users/${userId}/quizzes-sessions/next-package`,
  
  /** Finish quiz session */
  finishSession: (userId: ID) =>
    `/users/${userId}/quizzes-sessions/finish`,
  
  /** Get all quiz sessions for user */
  getAllSessions: (userId: ID) => `/users/${userId}/quizzes-sessions`,
} as const;

export const REPETITIONS_API = {
  /** Get repetition by ID */
  getRepetition: (userId: ID, repetitionId: ID) =>
    `/users/${userId}/repetitions/${repetitionId}`,
  
  /** Get all repetitions for user */
  getAllRepetitions: (userId: ID) => `/users/${userId}/repetitions`,
  
  /** Get repetitions statistics by level */
  getStats: (userId: ID) => `/users/${userId}/repetitions/stats`,
} as const;

export const WORDS_API = {
  /** Get word by ID */
  getWord: (wordId: ID) => `/words/${wordId}`,
  
  /** Get all words */
  getAllWords: () => `/words`,
} as const;
