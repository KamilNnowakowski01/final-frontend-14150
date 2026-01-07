import type { ReactNode } from "react";
import { VocabularyWord, VocabularyStats, VocabularyTab, VocabularyLevelFilter } from "@/types/vocabulary";

export type { VocabularyWord, VocabularyStats, VocabularyTab, VocabularyLevelFilter };

export interface VocabularyTableProps {
  words: VocabularyWord[];
}

export type SortOrder = "asc" | "desc" | "default";

export interface VocabularyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  levelFilter: VocabularyLevelFilter;
  onLevelFilterChange: (value: VocabularyLevelFilter) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

export interface VocabularyTabsProps {
  tab: VocabularyTab;
  onTabChange: (value: VocabularyTab) => void;
  filteredWords: VocabularyWord[];
  children: ReactNode;
}
