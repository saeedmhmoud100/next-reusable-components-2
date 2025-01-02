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

export function TablePagination() {
  const { state, config, dispatch } = useTable();
  const { page, totalPages } = state;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-4 flex justify-center">
      <div className="flex flex-col-reverse items-center gap-1">
        <p className="text-sm text-muted-foreground w-[100px]">
          Page {page} of {totalPages}
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