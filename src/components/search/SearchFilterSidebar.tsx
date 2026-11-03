'use client';

import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';

export interface SearchFilterState {
  category: string;
  distance: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  rating: string;
  fulfilment: {
    homeDelivery: boolean;
    storePickup: boolean;
    cashOnDelivery: boolean;
  };
}

interface SearchFilterSidebarProps {
  initialFilters?: Partial<SearchFilterState>;
  onFilterChange?: (filters: SearchFilterState) => void;
  className?: string;
}

const CATEGORY_ITEMS = [
  { id: 'headphones', name: 'Headphones', count: 148 },
  { id: 'earbuds', name: 'Earbuds', count: 92 },
  { id: 'speakers', name: 'Speakers', count: 64 },
  { id: 'smartwatches', name: 'Smartwatches', count: 51 },
];

const DISTANCE_OPTIONS = ['1km', '3km', '5km', '10km'];

const BRAND_ITEMS = [
  { id: 'boat', name: 'boAt', count: 42 },
  { id: 'sony', name: 'Sony', count: 28 },
  { id: 'jbl', name: 'JBL', count: 31 },
  { id: 'noise', name: 'Noise', count: 19 },
];

const RATING_OPTIONS = [
  { id: '4plus', label: '4★+' },
  { id: '3plus', label: '3★+' },
  { id: 'any', label: 'Any' },
];

export default function SearchFilterSidebar({
  initialFilters,
  onFilterChange,
  className = '',
}: SearchFilterSidebarProps) {
  const [category, setCategory] = useState<string>(
    initialFilters?.category || 'headphones'
  );
  const [distance, setDistance] = useState<string>(
    initialFilters?.distance || '5km'
  );
  const [minPrice, setMinPrice] = useState<number>(
    initialFilters?.minPrice || 1000
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    initialFilters?.maxPrice || 5000
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialFilters?.brands || ['boat']
  );
  const [rating, setRating] = useState<string>(
    initialFilters?.rating || '4plus'
  );
  const [fulfilment, setFulfilment] = useState({
    homeDelivery: initialFilters?.fulfilment?.homeDelivery ?? true,
    storePickup: initialFilters?.fulfilment?.storePickup ?? true,
    cashOnDelivery: initialFilters?.fulfilment?.cashOnDelivery ?? false,
  });

  const toggleBrand = (brandId: string) => {
    const updated = selectedBrands.includes(brandId)
      ? selectedBrands.filter((b) => b !== brandId)
      : [...selectedBrands, brandId];
    setSelectedBrands(updated);
    notifyChange({ brands: updated });
  };

  const toggleFulfilment = (key: keyof typeof fulfilment) => {
    const updated = { ...fulfilment, [key]: !fulfilment[key] };
    setFulfilment(updated);
    notifyChange({ fulfilment: updated });
  };

  const notifyChange = (updates: Partial<SearchFilterState> = {}) => {
    if (onFilterChange) {
      onFilterChange({
        category,
        distance,
        minPrice,
        maxPrice,
        brands: selectedBrands,
        rating,
        fulfilment,
        ...updates,
      });
    }
  };

  return (
    <aside
      className={`w-full max-w-[270px] space-y-6 select-none text-gray-900 ${className}`}
      aria-label="Search Filters"
    >
      {/* 1. Category */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Category</h3>
        <div>
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-emerald-700 font-medium mb-1.5 transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Electronics</span>
          </button>
          <div className="space-y-1.5 pl-3 border-l-2 border-gray-100">
            {CATEGORY_ITEMS.map((item) => {
              const isSelected = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategory(item.id);
                    notifyChange({ category: item.id });
                  }}
                  className={`w-full text-left text-xs transition cursor-pointer flex items-center justify-between py-0.5 ${
                    isSelected
                      ? 'text-[#059669] font-bold'
                      : 'text-gray-600 hover:text-gray-900 font-medium'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={isSelected ? 'text-[#059669]' : 'text-gray-400'}>
                    ({item.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Distance */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Distance</h3>
        <div className="grid grid-cols-4 gap-1.5">
          {DISTANCE_OPTIONS.map((dist) => {
            const isSelected = distance === dist;
            return (
              <button
                key={dist}
                type="button"
                onClick={() => {
                  setDistance(dist);
                  notifyChange({ distance: dist });
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg text-center transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {dist}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Price</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium shadow-2xs">
            ₹{minPrice.toLocaleString()}
          </div>
          <span className="text-gray-400 text-xs font-medium">-</span>
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium shadow-2xs">
            ₹{maxPrice.toLocaleString()}
          </div>
        </div>

        {/* Dual slider visual */}
        <div className="relative pt-2 pb-1">
          <div className="h-1.5 w-full bg-gray-200 rounded-full relative">
            <div
              className="absolute h-full bg-[#059669] rounded-full"
              style={{
                left: `${((minPrice - 500) / 9500) * 100}%`,
                right: `${100 - ((maxPrice - 500) / 9500) * 100}%`,
              }}
            />
            {/* Left Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#059669] border-2 border-white rounded-full shadow-sm cursor-pointer -ml-2"
              style={{ left: `${((minPrice - 500) / 9500) * 100}%` }}
            />
            {/* Right Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#059669] border-2 border-white rounded-full shadow-sm cursor-pointer -ml-2"
              style={{ left: `${((maxPrice - 500) / 9500) * 100}%` }}
            />
          </div>
          {/* Native range inputs behind for interactivity */}
          <input
            type="range"
            min={500}
            max={5000}
            step={250}
            value={minPrice}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), maxPrice - 500);
              setMinPrice(val);
              notifyChange({ minPrice: val });
            }}
            className="absolute inset-0 opacity-0 pointer-events-auto cursor-pointer"
            aria-label="Minimum Price"
          />
        </div>
      </div>

      {/* 4. Brand */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Brand</h3>
        <div className="space-y-2">
          {BRAND_ITEMS.map((brand) => {
            const isChecked = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                onClick={() => toggleBrand(brand.id)}
                className="flex items-center justify-between text-xs text-gray-700 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      isChecked
                        ? 'bg-[#059669] border-[#059669] text-white'
                        : 'border-gray-300 bg-white group-hover:border-gray-400'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={isChecked ? 'font-semibold text-gray-900' : ''}>
                    {brand.name}
                  </span>
                </div>
                <span className="text-gray-400">{brand.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Rating */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Rating</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {RATING_OPTIONS.map((item) => {
            const isSelected = rating === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setRating(item.id);
                  notifyChange({ rating: item.id });
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg text-center transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Fulfilment */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-sm text-gray-900">Fulfilment</h3>
        <div className="space-y-2">
          <label
            onClick={() => toggleFulfilment('homeDelivery')}
            className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                fulfilment.homeDelivery
                  ? 'bg-[#059669] border-[#059669] text-white'
                  : 'border-gray-300 bg-white group-hover:border-gray-400'
              }`}
            >
              {fulfilment.homeDelivery && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={fulfilment.homeDelivery ? 'font-semibold text-gray-900' : ''}>
              Home delivery
            </span>
          </label>

          <label
            onClick={() => toggleFulfilment('storePickup')}
            className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                fulfilment.storePickup
                  ? 'bg-[#059669] border-[#059669] text-white'
                  : 'border-gray-300 bg-white group-hover:border-gray-400'
              }`}
            >
              {fulfilment.storePickup && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={fulfilment.storePickup ? 'font-semibold text-gray-900' : ''}>
              Store pickup
            </span>
          </label>

          <label
            onClick={() => toggleFulfilment('cashOnDelivery')}
            className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                fulfilment.cashOnDelivery
                  ? 'bg-[#059669] border-[#059669] text-white'
                  : 'border-gray-300 bg-white group-hover:border-gray-400'
              }`}
            >
              {fulfilment.cashOnDelivery && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={fulfilment.cashOnDelivery ? 'font-semibold text-gray-900' : ''}>
              Cash on delivery
            </span>
          </label>
        </div>
      </div>
    </aside>
  );
}

