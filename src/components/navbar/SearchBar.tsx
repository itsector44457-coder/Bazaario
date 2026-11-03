'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  initialQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const POPULAR_SEARCHES = [
  'Organic Cold-Pressed Oils',
  'Noise Cancelling Headphones',
  'Matcha Tea Set',
  'Fresh Alphonso Mangoes',
  'Italian Leather Bag',
  'Handmade Scented Candles',
];

export default function SearchBar({
  placeholder = 'Search products, shops or categories...',
  initialQuery = '',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    if (onSearch) {
      onSearch(query.trim());
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    setIsFocused(false);
  };

  const handleQuickSelect = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    } else {
      router.push(`/search?q=${encodeURIComponent(text)}`);
    }
    setIsFocused(false);
  };

  return (
    <div
      ref={searchContainerRef}
      className={`relative w-full max-w-2xl ${className}`}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center w-full"
      >
        <div
          className={`flex items-center w-full bg-slate-100/80 rounded-xl sm:rounded-2xl pl-3.5 pr-1.5 py-1 transition-all duration-200 border ${
            isFocused
              ? 'border-[#10b981] bg-white ring-3 ring-[#10b981]/15 shadow-sm'
              : 'border-transparent hover:border-slate-300/80 hover:bg-slate-100'
          }`}
        >
          {/* Search Icon */}
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />

          {/* Text Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium focus:outline-hidden"
          />

          {/* Clear button if text entered */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                if (onSearch) onSearch('');
              }}
              className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Premium Green Search Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center justify-center shrink-0 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Instant Suggestions Dropdown */}
      {isFocused && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Trending Searches on Bazaario</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleQuickSelect(item)}
                className="text-xs bg-gray-50 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 px-3 py-1.5 rounded-xl border border-gray-200/60 transition flex items-center gap-1.5"
              >
                <span>{item}</span>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>Fast instant local results</span>
            <span className="text-emerald-700 font-medium">1,200+ active shops</span>
          </div>
        </div>
      )}
    </div>
  );
}
