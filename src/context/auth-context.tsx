'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AUTH_API } from '@/lib/api-endpoints';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  // Add other fields as needed
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(AUTH_API.me());
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Don't clear tokens here immediately, let the interceptor handle 401s
      // But if it's a hard fail on initial load, maybe we should?
      // For now, let's keep it simple. If /me fails, we assume invalid session.
      // Ideally, checkAuth should also try to refresh if 401.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    await checkAuth();
    router.push('/dashboard');
    router.refresh();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
