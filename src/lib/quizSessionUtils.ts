// Typy i utilsy do quiz session page

export type AnswerLogEntry = {
  itemId: string;
  answer: string;
};

export function saveQuizProgress(pkgId: string, index: number, log: AnswerLogEntry[]) {
  localStorage.setItem(`quiz_progress_${pkgId}`, JSON.stringify({ index, log }));
}

export function loadQuizProgress(pkgId: string): { index: number; log: AnswerLogEntry[] } | null {
  const savedState = localStorage.getItem(`quiz_progress_${pkgId}`);
  if (savedState) {
    try {
      const { index, log } = JSON.parse(savedState);
      return { index, log };
    } catch (e) {
      console.error('Error parsing local storage', e);
    }
  }
  return null;
}
