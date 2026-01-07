import { PageHeader } from "@/components/layout/PageHeader";

interface WordHeaderProps {
  word: string;
}

export function WordHeader({ word }: WordHeaderProps) {
  return (
    <PageHeader
      title={`Słowo: ${word}`}
      description="Szczegółowe informacje dla wybranego słowa"
      backHref="/dashboard/vocabulary"
    />
  );
}
