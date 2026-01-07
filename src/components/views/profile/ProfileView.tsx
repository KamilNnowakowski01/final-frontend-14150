"use client";

import { useAuth } from "@/context/auth-context";
import { PageHeader } from "@/components/layout/PageHeader";
import { User } from "lucide-react";
import { ProfileInfo } from "./ProfileInfo";
import { DeleteAccountSection } from "./DeleteAccountSection";
import { Loader2 } from "lucide-react";

export function ProfileView() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <div>Nie jesteś zalogowany.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mój Profil"
        description="Zarządzaj swoimi danymi i ustawieniami"
        icon={<User />}
      />
      <div className="max-w-3xl">
        <ProfileInfo user={user} />
        <DeleteAccountSection />
      </div>
    </div>
  );
}
