import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export function VocabularyHeader() {
  return (
    <PageHeader
      title="Słownictwo"
      description="Przeglądaj, ucz się i utrwalaj słowa"
      icon={<BookOpen />}
    />
  );
}
