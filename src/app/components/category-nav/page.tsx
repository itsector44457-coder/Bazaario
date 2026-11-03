'use client';

import React, { useState } from 'react';
import CategoryNav, { DEFAULT_CATEGORIES } from '@/components/navbar/CategoryNav';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function CategoryNavPage() {
  const [selectedCat, setSelectedCat] = useState('grocery');
  const [promoText, setPromoText] = useState('Same-day delivery from 1,200+ local shops');
  const [copied, setCopied] = useState(false);

  const usageCode = `import CategoryNav from '@/components/navbar/CategoryNav';

export default function MyPage() {
  return (
    <CategoryNav
      selectedCategory="${selectedCat}"
      onSelectCategory={(id) => console.log('Selected category:', id)}
      deliveryPromoText="${promoText}"
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
      {/* Breadcrumb Header */}
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
          <span className="text-xs font-bold text-gray-900">Category Navbar Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Reusable Unit
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Category Sub-Navbar
          </h1>
          <p className="text-sm text-gray-500">
            Features &quot;All Categories&quot; mega flyout menu, horizontal category links, and right-hand side lightning same-day delivery banner with green bottom border.
          </p>
        </div>

        {/* Live Preview Box */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Live Preview (Interactive)
          </div>
          <CategoryNav
            selectedCategory={selectedCat}
            onSelectCategory={(id) => setSelectedCat(id)}
            deliveryPromoText={promoText}
          />

          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-center justify-between">
            <span>
              Active Selected Category: <strong className="text-emerald-800">{selectedCat}</strong>
            </span>
            <span className="text-gray-400">Try clicking &quot;All Categories&quot; or individual items!</span>
          </div>
        </div>

        {/* Playground & Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900">Configurable Props</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Right Badge Promo Text
              </label>
              <input
                type="text"
                value={promoText}
                onChange={(e) => setPromoText(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Select Active Category
              </label>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedCat === cat.id
                        ? 'bg-[#084c37] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code */}
          <div className="bg-zinc-900 rounded-2xl p-5 text-zinc-100 flex flex-col justify-between">
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
    </div>
  );
}
