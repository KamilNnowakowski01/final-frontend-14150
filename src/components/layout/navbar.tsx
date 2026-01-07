'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Brain } from "lucide-react";
import { SidebarContent } from "./sidebar-content";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 md:px-6 gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Logo for mobile (hidden on desktop since sidebar has it) */}
        <Link href="/dashboard" className="flex md:hidden items-center gap-2 font-bold text-lg">
          <Brain className="h-6 w-6 text-indigo-600" />
          <span>LinguaAI</span>
        </Link>

        <div className="flex-1" />

        {/* User info */}
        {user && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="hidden sm:inline-block text-muted-foreground">
              {user.email}
            </span>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
