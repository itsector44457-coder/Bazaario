'use client';

import React from 'react';
import { X } from 'lucide-react';

export interface ActiveFilterItem {
  id: string;
  label: string;
}

interface ActiveFiltersBarProps {
  filters?: ActiveFilterItem[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export const DEFAULT_ACTIVE_FILTERS: ActiveFilterItem[] = [
  { id: 'distance', label: 'Within 5 km' },
  { id: 'price', label: '₹1,000 – ₹5,000' },
  { id: 'rating', label: '4★ & above' },
  { id: 'open-now', label: 'Open now' },
];

export default function ActiveFiltersBar({
  filters = DEFAULT_ACTIVE_FILTERS,
  onRemoveFilter,
  onClearAll,
  className = '',
}: ActiveFiltersBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 flex-wrap pt-1 ${className}`}>
      {filters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#065f46] border border-[#a7f3d0] transition select-none"
        >
          <span>{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter?.(filter.id)}
            className="hover:bg-emerald-200/60 rounded-full p-0.5 text-[#065f46] transition cursor-pointer"
            aria-label={`Remove filter ${filter.label}`}
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </span>
      ))}

      {onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:text-gray-900 font-medium ml-1 transition cursor-pointer hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

