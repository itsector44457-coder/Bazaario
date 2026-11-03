'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export interface FilterState {
  category: string;
  distance: string;
  maxPrice: number;
  minRating: number;
  openNow: boolean;
  homeDelivery: boolean;
  storePickup: boolean;
  verifiedOnly: boolean;
}

interface FilterSidebarProps {
  initialFilters?: Partial<FilterState>;
  onApplyFilters?: (filters: FilterState) => void;
  className?: string;
}

const CATEGORY_FILTERS = [
  { id: 'all', name: 'All', count: '12.4k' },
  { id: 'grocery', name: 'Grocery & Staples', count: '3,210' },
  { id: 'fashion', name: 'Fashion & Ethnic', count: '2,854' },
  { id: 'electronics', name: 'Electronics', count: '1,920' },
  { id: 'home', name: 'Home & Decor', count: '1,402' },
  { id: 'pharmacy', name: 'Pharmacy & Beauty', count: '988' },
];

export default function FilterSidebar({
  initialFilters,
  onApplyFilters,
  className = '',
}: FilterSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.category || 'all'
  );
  const [distance, setDistance] = useState(initialFilters?.distance || '3 km');
  const [price, setPrice] = useState(initialFilters?.maxPrice || 6000);
  const [minRating, setMinRating] = useState<number>(initialFilters?.minRating || 4);
  const [openNow, setOpenNow] = useState(initialFilters?.openNow ?? true);
  const [homeDelivery, setHomeDelivery] = useState(
    initialFilters?.homeDelivery ?? false
  );
  const [storePickup, setStorePickup] = useState(
    initialFilters?.storePickup ?? false
  );
  const [verifiedOnly, setVerifiedOnly] = useState(
    initialFilters?.verifiedOnly ?? false
  );

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        category: selectedCategory,
        distance,
        maxPrice: price,
        minRating,
        openNow,
        homeDelivery,
        storePickup,
        verifiedOnly,
      });
    }
  };

  return (
    <aside className={`w-full space-y-5 select-none ${className}`}>
      {/* 1. Categories Card */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
        <h3 className="font-bold text-gray-900 text-base">Categories</h3>
        <div className="space-y-1">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#dcfce7] text-[#065f46] font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
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

      {/* 2. Filters Card (Distance, Price, Rating, Shop Options) */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-5">
        {/* Distance */}
        <div className="space-y-2.5">
          <label className="block text-sm font-bold text-gray-900">Distance</label>
          <div className="grid grid-cols-3 gap-2">
            {['1 km', '3 km', '5 km'].map((dist) => {
              const isSelected = distance === dist;
              return (
                <button
                  key={dist}
                  type="button"
                  onClick={() => setDistance(dist)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#059669] border-[#059669] text-white shadow-xs'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-bold text-gray-900">
            <span>Price range</span>
            <span className="text-xs text-emerald-800 font-bold">
              Up to ₹{price.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={10000}
            step={250}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#059669] cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <span>₹0</span>
            <span>₹10,000+</span>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">Rating</label>
          <div className="space-y-2 text-xs text-gray-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={minRating === 4}
                onChange={() => setMinRating(minRating === 4 ? 0 : 4)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium">4.0 & above</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={minRating === 3}
                onChange={() => setMinRating(minRating === 3 ? 0 : 3)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium">3.0 & above</span>
              </div>
            </label>
          </div>
        </div>

        {/* Shop Options */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-900">Shop options</label>
          <div className="space-y-2 text-xs text-gray-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <span>Open now</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={homeDelivery}
                onChange={(e) => setHomeDelivery(e.target.checked)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <span>Home delivery</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={storePickup}
                onChange={(e) => setStorePickup(e.target.checked)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <span>Store pickup</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669]"
              />
              <span>Verified shops only</span>
            </label>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full bg-[#084c37] hover:bg-[#063d2c] active:scale-[0.98] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
        >
          Apply filters
        </button>
      </div>
    </aside>
  );
}
