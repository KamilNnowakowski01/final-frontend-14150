import type { ReactNode } from "react";
import { VocabularyWord, VocabularyStats, VocabularyTab, VocabularyLevelFilter } from "@/types/vocabulary";

export type { VocabularyWord, VocabularyStats, VocabularyTab, VocabularyLevelFilter };

export type SortOrder = "asc" | "desc" | "default";

export interface VocabularyTableProps {
  words: VocabularyWord[];
}

export interface VocabularyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  levelFilter: VocabularyLevelFilter;
  onLevelFilterChange: (value: VocabularyLevelFilter) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}
