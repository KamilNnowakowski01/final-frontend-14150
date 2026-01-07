import { useState, useMemo } from "react";
import {
  VocabularyWord,
  VocabularyTab,
  VocabularyLevelFilter,
} from "@/types/vocabulary";
import { SortOrder } from "./types";

interface UseVocabularyFiltersProps {
  initialWords: VocabularyWord[];
}

interface UseVocabularyFiltersReturn {
  search: string;
  setSearch: (value: string) => void;
  levelFilter: VocabularyLevelFilter;
  setLevelFilter: (value: VocabularyLevelFilter) => void;
  tab: VocabularyTab;
  setTab: (value: VocabularyTab) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  selectedLetter: string | null;
  setSelectedLetter: (value: string | null) => void;
  filteredWords: VocabularyWord[];
}

export function useVocabularyFilters({
  initialWords,
}: UseVocabularyFiltersProps): UseVocabularyFiltersReturn {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<VocabularyLevelFilter>("all");
  const [tab, setTab] = useState<VocabularyTab>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return initialWords
      .filter((w) => {
        const matchesSearch =
          w.word.toLowerCase().includes(search.toLowerCase()) ||
          w.meaning.some((m) => m.toLowerCase().includes(search.toLowerCase()));
        
        const matchesLevel = levelFilter === "all" || w.level === levelFilter;
        
        const matchesTab =
          tab === "all" ||
          (tab === "not-started" && !w.learned) ||
          (tab === "in-progress" && w.learned && !w.mastered) ||
          (tab === "mastered" && w.mastered);
        
        const matchesLetter = selectedLetter === null || w.word.toLowerCase().startsWith(selectedLetter.toLowerCase());
        
        return matchesSearch && matchesLevel && matchesTab && matchesLetter;
      })
      .sort((a, b) => {
        if (sortOrder === "default") return 0;
        if (sortOrder === "asc") return a.word.localeCompare(b.word);
        return b.word.localeCompare(a.word);
      });
  }, [initialWords, search, levelFilter, tab, sortOrder, selectedLetter]);

  return {
    search,
    setSearch,
    levelFilter,
    setLevelFilter,
    tab,
    setTab,
    sortOrder,
    setSortOrder,
    selectedLetter,
    setSelectedLetter,
    filteredWords,
  };
}
