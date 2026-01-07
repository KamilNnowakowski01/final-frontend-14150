import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  paginatedItems: T[];
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export function usePagination<T>({
  items,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Reset to first page if items change significantly (optional, but often desired behavior when filtering)
  // However, doing this inside the hook might be too opinionated if items change for other reasons.
  // A common pattern is to let the parent reset page when filters change.
  // For now, we'll keep it simple.

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Ensure current page is valid
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  // If the calculated safe page is different from state, we might want to update state, 
  // but doing it during render is bad. 
  // Usually, we just use the safe value for calculation.
  
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  return {
    currentPage: safeCurrentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
    totalItems,
  };
}
