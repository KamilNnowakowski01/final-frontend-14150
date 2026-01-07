import axios from 'axios';

/**
 * Wyciąga czytelną wiadomość błędu z odpowiedzi API
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Błąd z odpowiedzi serwera
    if (error.response?.data?.message) {
      const message = error.response.data.message;
      return Array.isArray(message) ? message.join(', ') : message;
    }
    
    // Błąd sieciowy
    if (error.code === 'ERR_NETWORK') {
      return 'Brak połączenia z serwerem';
    }
    
    // Timeout
    if (error.code === 'ECONNABORTED') {
      return 'Przekroczono limit czasu żądania';
    }
    
    // HTTP status messages
    switch (error.response?.status) {
      case 400:
        return 'Nieprawidłowe dane żądania';
      case 401:
        return 'Sesja wygasła, zaloguj się ponownie';
      case 403:
        return 'Brak uprawnień do wykonania tej operacji';
      case 404:
        return 'Nie znaleziono żądanego zasobu';
      case 500:
        return 'Błąd serwera, spróbuj ponownie później';
      default:
        return error.message || 'Wystąpił nieoczekiwany błąd';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Wystąpił nieoczekiwany błąd';
}

/**
 * Sprawdza czy błąd to błąd 401 (nieautoryzowany)
 */
export function isUnauthorizedError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

/**
 * Sprawdza czy błąd to błąd 404 (nie znaleziono)
 */
export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}
