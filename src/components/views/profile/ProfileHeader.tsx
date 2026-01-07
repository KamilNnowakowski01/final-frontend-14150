import { User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export function ProfileHeader() {
  return (
    <PageHeader
      title="Mój Profil"
      description="Zarządzaj swoimi danymi i ustawieniami"
      icon={<User />}
    />
  );
}
