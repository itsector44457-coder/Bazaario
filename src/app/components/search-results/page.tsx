'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';
import SearchResultsView from '@/components/search/SearchResultsView';

export default function SearchResultsComponentPage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const usageCode = `import SearchResultsView from '@/components/search/SearchResultsView';

export default function MySearchPage() {
  return (
    <SearchResultsView
      searchQuery="headphones"
      onAddToCart={(product) => console.log('Added to cart:', product.name)}
      onVisitShop={(shop) => console.log('Visit shop:', shop)}
    />
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = (product: { name: string; price: number }) => {
    setToastMessage(`Added "${product.name}" (₹${product.price}) to cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">SearchResultsView Component</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/search?q=headphones"
            className="text-xs font-semibold text-[#084c37] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
          >
            Open Live Search Page →
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Search & Discovery
          </span>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search Results Grid & Layout</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Complete search results view with breadcrumbs, active filter chips, interactive sidebar, responsive product cards, top-shop featured banner, and pagination.
          </p>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Interactive Live Preview
            </span>
            {toastMessage && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-in fade-in">
                {toastMessage}
              </span>
            )}
          </div>
          <div className="p-4 sm:p-6">
            <SearchResultsView
              searchQuery="headphones"
              onAddToCart={handleAddToCart}
              onVisitShop={(shop) => alert(`Visit shop: ${shop}`)}
            />
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-gray-900 rounded-2xl p-5 text-gray-100 text-xs font-mono relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Usage Code</span>
            </div>
            <button
              onClick={copyCode}
              type="button"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto text-gray-300">
            <code>{usageCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

