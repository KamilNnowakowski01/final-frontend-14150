'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
import Link from "next/link";
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <User className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Załóż konto</h1>
          <p className="text-muted-foreground">Dołącz do tysięcy uczących się już dziś</p>
        </div>

        <RegisterForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Masz już konto?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Zaloguj się tutaj
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
