'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brain, LayoutDashboard, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-indigo-900">FluentWords</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={cn(
                "font-medium hover:text-indigo-600 transition",
                pathname === "/" ? "text-indigo-600" : "text-muted-foreground"
              )}
            >
              Strona Główna
            </Link>
            <Link 
              href="/guide" 
              className={cn(
                "font-medium hover:text-indigo-600 transition",
                pathname === "/guide" ? "text-indigo-600" : "text-muted-foreground"
              )}
            >
              Przewodnik
            </Link>
            <Link href="/#about" className="text-muted-foreground hover:text-foreground transition">
              O nas
            </Link>
            <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Panel
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Zaloguj się</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Zarejestruj się</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
