'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function SearchPagination({
  currentPage = 1,
  totalPages = 17,
  onPageChange,
  className = '',
}: SearchPaginationProps) {
  const pages = [1, 2, 3, '...', totalPages];

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 pt-6 pb-4 select-none ${className}`}
    >
      {/* Prev Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
      </button>

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 font-medium"
            >
              ...
            </span>
          );
        }

        const isCurrent = currentPage === p;

        return (
          <button
            key={`page-${p}`}
            type="button"
            onClick={() => onPageChange?.(Number(p))}
            className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition cursor-pointer ${
              isCurrent
                ? 'bg-[#084c37] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-100 bg-white'
            }`}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4 stroke-[2.2]" />
      </button>
    </nav>
  );
}

