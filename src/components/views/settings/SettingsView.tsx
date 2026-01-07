"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Settings } from "lucide-react";
import { LearningSettingsSection } from "@/components/views/profile/LearningSettingsSection";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ustawienia"
        description="Dostosuj aplikację do swoich potrzeb"
        icon={<Settings />}
      />
      <div className="max-w-3xl">
        <LearningSettingsSection />
      </div>
    </div>
  );
}
