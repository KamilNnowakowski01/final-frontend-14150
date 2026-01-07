'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useRegister } from '@/hooks/auth/useRegister';

// 1. Definiujemy interfejs dla propsów widoku
interface RegisterFormViewProps {
  form: ReturnType<typeof useRegister>['form'];
  showPassword: boolean;
  showConfirm: boolean;
  error: string;
  loading: boolean;
  onChange: (field: keyof ReturnType<typeof useRegister>['form'], value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirm: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

// 2. Komponent Prezentacyjny ("Dumb") - IDEALNY DO STORYBOOKA
// Nie ma tu żadnej logiki biznesowej, tylko wyświetlanie.
export function RegisterFormView({
  form,
  showPassword,
  showConfirm,
  error,
  loading,
  onChange,
  onTogglePassword,
  onToggleConfirm,
  onSubmit
}: RegisterFormViewProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="name">Imię</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Jan"
              className="pl-10"
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname">Nazwisko</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="surname"
              type="text"
              placeholder="Kowalski"
              className="pl-10"
              value={form.surname}
              onChange={(e) => onChange('surname', e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="jan@example.com"
            className="pl-10"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
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
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            value={form.password}
            onChange={(e) => onChange('password', e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            value={form.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={onToggleConfirm}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
            Rejestracja...
          </>
        ) : (
          <>
            Zarejestruj się
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

// 3. Komponent Kontenerowy ("Smart") - Ten używamy w aplikacji
// Łączy logikę (hook) z widokiem.
export function RegisterForm() {
  const {
    form,
    showPassword,
    showConfirm,
    error,
    loading,
    handleChange,
    togglePassword,
    toggleConfirm,
    handleSubmit
  } = useRegister();

  return (
    <RegisterFormView
      form={form}
      showPassword={showPassword}
      showConfirm={showConfirm}
      error={error}
      loading={loading}
      onChange={handleChange}
      onTogglePassword={togglePassword}
      onToggleConfirm={toggleConfirm}
      onSubmit={handleSubmit}
    />
  );
}
