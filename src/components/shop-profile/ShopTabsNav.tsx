'use client';

import React from 'react';

export type ShopTabType = 'products' | 'offers' | 'about' | 'reviews';

interface ShopTabsNavProps {
  activeTab?: ShopTabType;
  productsCount?: number;
  offersCount?: number;
  reviewsCount?: string;
  onTabChange?: (tab: ShopTabType) => void;
  className?: string;
}

export default function ShopTabsNav({
  activeTab = 'products',
  productsCount = 185,
  offersCount = 4,
  reviewsCount = '1.2k',
  onTabChange,
  className = '',
}: ShopTabsNavProps) {
  const tabs: { id: ShopTabType; label: string }[] = [
    { id: 'products', label: `Products (${productsCount})` },
    { id: 'offers', label: `Offers (${offersCount})` },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: `Reviews (${reviewsCount})` },
  ];

  return (
    <div className={`w-full border-b border-gray-100 select-none ${className}`}>
      <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer relative ${
                isSelected
                  ? 'text-[#064e3b] border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

