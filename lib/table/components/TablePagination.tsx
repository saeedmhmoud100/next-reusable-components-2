"use client";

import { useTable } from '../context';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';
import { getVisiblePages } from '../utils/paginationUtils';
import {useEffect, useState} from "react";

export function TablePagination() {
  const { state, config, dispatch } = useTable();
  const { page, totalPages, total } = state;
  const paginationConfig = config.pagination;
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if(!isClient)
      setIsClient(true)
  }, [isClient]);

  if (!paginationConfig?.enabled || !isClient) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: newPage });
    }
  };

  const visiblePages = getVisiblePages(page, totalPages);
  const itemsPerPage = config.itemsPerPage || 10;

  // Only calculate and show range if we have total items
  const showRange = typeof total !== 'undefined';
  const start = showRange ? ((page - 1) * itemsPerPage) + 1 : null;
  const end = showRange ? Math.min(page * itemsPerPage, total) : null;


  return (
    <div className="mt-4 flex justify-center">
      <div className="flex flex-col-reverse items-center gap-1">
        <p className="text-sm text-muted-foreground">
          {showRange && (
              <div className="text-sm text-muted-foreground">
                Showing {start} to {end} of {total} results
              </div>
          )}
        </p>
        <Pagination className={cn(config.styles?.pagination)}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(page - 1)}
                className={cn(
                  "cursor-pointer",
                  page <= 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {visiblePages.map((pageNum, idx) => (
              <PaginationItem key={idx}>
                {pageNum === '...' ? (
                  <span className="px-4 py-2">{pageNum}</span>
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(Number(pageNum))}
                    isActive={page === Number(pageNum)}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={cn(
                  "cursor-pointer",
                  page >= totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}