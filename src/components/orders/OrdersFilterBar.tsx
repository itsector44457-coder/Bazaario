'use client';

import React from 'react';
import { Search } from 'lucide-react';

export type OrderFilterTab = 'all' | 'active' | 'delivered' | 'cancelled';

interface OrdersFilterBarProps {
  currentFilter: OrderFilterTab;
  onFilterChange: (tab: OrderFilterTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export default function OrdersFilterBar({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  className = '',
}: OrdersFilterBarProps) {
  const tabs: { id: OrderFilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none ${className}`}
    >
      {/* 1. Filter Pills on Left */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#064e3b] text-white shadow-2xs'
                  : 'bg-white border border-gray-200/80 text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Search by order ID or item on Right */}
      <div className="relative min-w-[220px] sm:w-64">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by order ID or item"
          className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/80 rounded-2xl text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
        />
      </div>
    </div>
  );
}

