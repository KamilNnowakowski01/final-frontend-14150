"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { SessionTable } from "./SessionTable";
import { Session } from "./types";

interface SessionTableWithPaginationProps {
  sessions: Session[];
  onDetails: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

export function SessionTableWithPagination({
  sessions,
  onDetails,
}: SessionTableWithPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.max(1, Math.ceil(sessions.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sessions.length);
  const currentSessions = sessions.slice(startIndex, endIndex);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="space-y-6">
      {/* Tabela */}
      <SessionTable sessions={currentSessions} onDetails={onDetails} />

      {/* Kontener z informacją po lewej + paginacją po prawej */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ml-3 mr-3">
        {/* Tekst po lewej */}
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {sessions.length === 0
            ? "Brak sesji do wyświetlenia"
            : `Wyświetlono ${startIndex + 1}–${endIndex} z ${
                sessions.length
              } sesji`}
        </div>

        {/* Paginacja po prawej */}
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={createPageURL(currentPage - 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      router.push(createPageURL(currentPage - 1));
                    }
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {visiblePages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={createPageURL(page)}
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(createPageURL(page));
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={createPageURL(currentPage + 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      router.push(createPageURL(currentPage + 1));
                    }
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
