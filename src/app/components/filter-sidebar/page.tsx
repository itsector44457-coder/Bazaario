'use client';

import React, { useState } from 'react';
import FilterSidebar, { FilterState } from '@/components/filters/FilterSidebar';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function FilterSidebarPage() {
  const [copied, setCopied] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const usageCode = `import FilterSidebar from '@/components/filters/FilterSidebar';

export default function MyPage() {
  return (
    <FilterSidebar
      onApplyFilters={(filters) => console.log('Applied filters:', filters)}
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
          <span className="text-xs font-bold text-gray-900">FilterSidebar Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Filter Unit
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Left Navigation Filter Sidebar
          </h1>
          <p className="text-sm text-gray-500">
            Includes Category counters, Distance pills (1 km, 3 km, 5 km), Price range slider, Rating checkboxes, and Shop options (Open now, Home delivery, Store pickup, Verified only).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Live Component */}
          <div className="md:col-span-5 max-w-sm">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Live Preview (Interactive)
            </div>
            <FilterSidebar onApplyFilters={(f) => setActiveFilters(f)} />
          </div>

          {/* Right State & Code */}
          <div className="md:col-span-7 space-y-4">
            {activeFilters && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <p className="font-bold">Last Applied Filters:</p>
                <pre className="text-[11px] font-mono bg-white/70 p-3 rounded-xl overflow-x-auto">
                  {JSON.stringify(activeFilters, null, 2)}
                </pre>
              </div>
            )}

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
      </div>
    </div>
  );
}
