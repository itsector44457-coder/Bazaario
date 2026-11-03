'use client';

import React from 'react';

export interface ShopCategoryItem {
  id: string;
  name: string;
  count: number;
}

const DEFAULT_SHOP_CATEGORIES: ShopCategoryItem[] = [
  { id: 'all', name: 'All', count: 185 },
  { id: 'headphones', name: 'Headphones', count: 38 },
  { id: 'smartwatches', name: 'Smartwatches', count: 24 },
  { id: 'mobiles', name: 'Mobiles', count: 52 },
  { id: 'chargers', name: 'Chargers & Cables', count: 71 },
];

interface ShopCategorySidebarProps {
  categories?: ShopCategoryItem[];
  selectedCategoryId?: string;
  onSelectCategory?: (id: string) => void;
  className?: string;
}

export default function ShopCategorySidebar({
  categories = DEFAULT_SHOP_CATEGORIES,
  selectedCategoryId = 'all',
  onSelectCategory,
  className = '',
}: ShopCategorySidebarProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 space-y-3 shadow-2xs select-none ${className}`}
    >
      <h3 className="font-bold text-gray-950 text-sm">Shop categories</h3>
      <div className="space-y-1">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory?.(cat.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-[13px] transition cursor-pointer ${
                isSelected
                  ? 'bg-[#e6f4ea] text-[#065f46] font-bold shadow-2xs'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[11px] ${
                  isSelected ? 'text-[#065f46] font-bold' : 'text-gray-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

