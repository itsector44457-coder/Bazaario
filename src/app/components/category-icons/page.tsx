'use client';

import React, { useState } from 'react';
import CategoryIconBar, { CATEGORY_ICON_ITEMS } from '@/components/categories/CategoryIconBar';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function CategoryIconsPage() {
  const [activeCategory, setActiveCategory] = useState('grocery');
  const [copied, setCopied] = useState(false);

  const usageCode = `import CategoryIconBar from '@/components/categories/CategoryIconBar';

export default function MyPage() {
  const [selectedCat, setSelectedCat] = useState('grocery');

  return (
    <CategoryIconBar
      activeCategoryId={selectedCat}
      onSelectCategory={(id) => setSelectedCat(id)}
    />
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Breadcrumb */}
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
          <span className="text-xs font-bold text-gray-900">CategoryIconBar Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Interactive Unit
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Category Icon Strip
          </h1>
          <p className="text-sm text-gray-500">
            Horizontal row of 8 pastel-toned category cards: Grocery, Fashion, Electronics, Home, Pharmacy, Footwear, Kitchen, and More.
          </p>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Live Interactive Preview (Click any card to select)
          </div>

          <CategoryIconBar
            activeCategoryId={activeCategory}
            onSelectCategory={(id) => setActiveCategory(id)}
          />

          <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-center justify-between">
            <span>
              Active Selected Category: <strong className="text-emerald-800 uppercase">{activeCategory}</strong>
            </span>
            <span className="text-gray-400">Total 8 departments available</span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-zinc-900 rounded-2xl p-5 text-zinc-100 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold text-zinc-300">
                Integration Code
              </span>
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono bg-black/50 p-4 rounded-xl overflow-x-auto text-emerald-300/90 leading-relaxed">
            {usageCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
