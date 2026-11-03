'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export type SearchTabType = 'products' | 'shops';
export type SortOptionType = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance';

interface SearchResultsHeaderProps {
  query?: string;
  totalProducts?: number;
  totalShops?: number;
  radiusKm?: number;
  activeTab?: SearchTabType;
  onTabChange?: (tab: SearchTabType) => void;
  sortOption?: SortOptionType;
  onSortChange?: (sort: SortOptionType) => void;
  className?: string;
}

export default function SearchResultsHeader({
  query = 'headphones',
  totalProducts = 148,
  totalShops = 23,
  radiusKm = 5,
  activeTab = 'products',
  onTabChange,
  sortOption = 'relevance',
  onSortChange,
  className = '',
}: SearchResultsHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 pb-1 ${className}`}
    >
      {/* Left: Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
          {totalProducts} products from {totalShops} shops within {radiusKm} km
        </p>
      </div>

      {/* Right: Products / Shops toggle & Sort dropdown */}
      <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
        {/* Tab switch: Products vs Shops (23) */}
        <div className="flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/80">
          <button
            type="button"
            onClick={() => onTabChange?.('products')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#084c37] text-white shadow-xs'
                : 'text-gray-700 hover:text-gray-950'
            }`}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => onTabChange?.('shops')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'shops'
                ? 'bg-[#084c37] text-white shadow-xs'
                : 'text-gray-700 hover:text-gray-950'
            }`}
          >
            Shops ({totalShops})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => onSortChange?.(e.target.value as SortOptionType)}
            className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-medium rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-2xs hover:border-gray-300 transition"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="distance">Nearest First</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

