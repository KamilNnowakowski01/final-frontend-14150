import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AUTH_API } from '@/lib/api-endpoints';

export function useRegister() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError('Hasła nie są takie same');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      setLoading(false);
      return;
    }

    try {
      await api.post(AUTH_API.register(), {
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email,
        password: form.password,
      });

      // Redirect to login on success
      router.push('/login');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  return {
    form,
    showPassword,
    showConfirm,
    error,
    loading,
    handleChange,
    togglePassword,
    toggleConfirm,
    handleSubmit
  };
}
