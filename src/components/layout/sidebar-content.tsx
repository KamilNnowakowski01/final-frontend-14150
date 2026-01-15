'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  User,
  Brain,
  Target,
  Map,
  History
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

const navItems = [
  { href: "/guide", label: "Przewodnik", icon: Map },
  { href: "/dashboard", label: "Pulpit", icon: LayoutDashboard },
  { href: "/dashboard/vocabulary", label: "Słownik", icon: BookOpen },
  { href: "/dashboard/flashcards/prepare", label: "Fiszki", icon: Brain },
  { href: "/dashboard/quiz/prepare", label: "Quiz", icon: Target },
  { href: "/dashboard/history", label: "Historia", icon: History },
];

export function SidebarContent() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-900">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          FluentWords
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-indigo-100 text-indigo-700"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        
        <Link href="/dashboard/profile">
          <Button 
            variant={pathname === "/dashboard/profile" ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start gap-3 mb-1",
              pathname === "/dashboard/profile" && "bg-indigo-100 text-indigo-700"
            )}
          >
            <User className="h-4 w-4" />
            Profil
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button 
            variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start gap-3",
              pathname === "/dashboard/settings" && "bg-indigo-100 text-indigo-700"
            )}
          >
            <Settings className="h-4 w-4" />
            Ustawienia
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 mt-2 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Wyloguj
        </Button>
      </div>
    </div>
  );
}
