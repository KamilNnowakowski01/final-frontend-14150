'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useLogin } from '@/hooks/auth/useLogin';

interface LoginFormViewProps {
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginFormView({
  email,
  password,
  showPassword,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit
}: LoginFormViewProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="jan@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Hasło</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-12"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-2"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logowanie...
          </>
        ) : (
          <>
            Zaloguj się
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    loading,
    togglePassword,
    handleSubmit
  } = useLogin();

  return (
    <LoginFormView
      email={email}
      password={password}
      showPassword={showPassword}
      error={error}
      loading={loading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onTogglePassword={togglePassword}
      onSubmit={handleSubmit}
    />
  );
}
