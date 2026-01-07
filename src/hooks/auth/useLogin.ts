import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { AUTH_API } from '@/lib/api-endpoints';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post(AUTH_API.login(), { email, password });
      
      // Save token and update context
      if (response.data.access_token && response.data.refresh_token) {
        await login(response.data.access_token, response.data.refresh_token);
      } else {
        setError('Nie otrzymano tokena logowania');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    loading,
    togglePassword,
    handleSubmit
  };
}
