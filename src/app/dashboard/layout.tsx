'use client';

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { FlashcardsProvider } from "@/context/flashcards-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <FlashcardsProvider>
        {/* Używamy fixed inset-0, aby zagwarantować brak scrolla na body */}
        <div className="fixed inset-0 flex overflow-hidden bg-muted/10">
          {/* Sidebar – ukryty na mobile, widoczny na desktopie */}
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Główna treść */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </FlashcardsProvider>
    </ProtectedRoute>
  );
}