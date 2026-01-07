import { Settings } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export function SettingsHeader() {
  return (
    <PageHeader
      title="Ustawienia"
      description="Dostosuj aplikację do swoich potrzeb"
      icon={<Settings />}
    />
  );
}
