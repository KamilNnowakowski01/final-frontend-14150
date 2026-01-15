// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BaseLayout } from "@/components/layout/base-layout";
import { AuthProvider } from "@/context/auth-context";
import { QueryProvider } from "@/lib/query-client";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentWords – Nauka angielskiego z AI",
  description: "FluentWords - Personalizowana nauka słownictwa z fiszkami, quizami i spaced repetition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-foreground`}>
        <QueryProvider>
          <AuthProvider>
            <BaseLayout>
              {children}
            </BaseLayout>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}