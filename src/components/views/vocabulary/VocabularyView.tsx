"use client";

import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { VocabularyWord, VocabularyStats } from "@/types/vocabulary";

import { useVocabularyFilters } from "./hooks/useVocabularyFilters";
import { usePagination } from "@/hooks/common/usePagination";

import { PageHeader } from "@/components/layout/PageHeader";
import { BookOpen } from "lucide-react";
import { VocabularyStatsSection } from "./VocabularyStatsSection";
import { VocabularyFilters } from "./VocabularyFilters";
import { VocabularyAlphabetFilter } from "./VocabularyAlphabetFilter";
import { VocabularyTabs } from "./VocabularyTabs";
import { VocabularyTable } from "./VocabularyTable";
import { VocabularyEmptyState } from "./VocabularyEmptyState";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VocabularyViewProps {
  initialWords: VocabularyWord[];
}

export function VocabularyView({ initialWords }: VocabularyViewProps) {
  // Custom hook for filtering logic
  const {
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
  } = useVocabularyFilters({ initialWords });

  // Custom hook for pagination logic
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems: paginatedWords,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({ items: filteredWords, initialPageSize: 10 });

  // Reset page when filters change (handled by effect here to connect the two hooks)
  useEffect(() => {
    setCurrentPage(1);
  }, [search, levelFilter, tab, sortOrder, selectedLetter, setCurrentPage]);

  const stats: VocabularyStats = {
    total: initialWords.length,
    inProgress: initialWords.filter((w) => w.learned && !w.mastered).length,
    mastered: initialWords.filter((w) => w.mastered).length,
    notStarted: initialWords.filter((w) => !w.learned).length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Słownictwo"
        description="Przeglądaj, ucz się i utrwalaj słowa"
        icon={<BookOpen />}
      />
      <Separator />
      <VocabularyStatsSection stats={stats} />
      <Separator />
      <VocabularyFilters
        search={search}
        onSearchChange={setSearch}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <VocabularyAlphabetFilter 
        selectedLetter={selectedLetter} 
        onLetterSelect={setSelectedLetter} 
      />
      <VocabularyTabs tab={tab} onTabChange={setTab} filteredWords={filteredWords}>
        {filteredWords.length > 0 ? (
          <Card className="p-0 overflow-hidden">
            <VocabularyTable words={paginatedWords} />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-gray-50/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Pokaż</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-[70px] h-8 bg-white">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>na stronę</span>
                <span className="ml-2">
                  (Wyniki {startIndex + 1}-{endIndex} z {totalItems})
                </span>
              </div>

              {totalPages > 1 && (
                <Pagination className="w-auto mx-0">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(p => p - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer bg-white"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first, last, current, and neighbors
                        return page === 1 || 
                               page === totalPages || 
                               Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        // Add ellipsis logic if needed, simplified here
                        const prevPage = array[index - 1];
                        const showEllipsis = prevPage && page - prevPage > 1;

                        return (
                          <div key={page} className="flex items-center">
                            {showEllipsis && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(page);
                                }}
                                className="bg-white"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </div>
                        );
                      })}

                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(p => p + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer bg-white"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </Card>
        ) : (
          <VocabularyEmptyState />
        )}
      </VocabularyTabs>
    </div>
  );
}
