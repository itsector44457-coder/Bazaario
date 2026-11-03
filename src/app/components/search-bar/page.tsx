'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/navbar/SearchBar';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function SearchBarPage() {
  const [lastQuery, setLastQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search products, shops or categories...');
  const [copied, setCopied] = useState(false);

  const usageCode = `import SearchBar from '@/components/navbar/SearchBar';

export default function MyPage() {
  return (
    <SearchBar
      placeholder="${placeholder}"
      onSearch={(query) => console.log('Searching for:', query)}
      className="max-w-2xl"
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
          <span className="text-xs font-bold text-gray-900">SearchBar Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Isolated Component
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Instant Search Bar
          </h1>
          <p className="text-sm text-gray-500">
            Features the light gray rounded container, magnifying search icon, clear button, instant trending suggestions popover, and the exact vibrant emerald green &quot;Search&quot; button.
          </p>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Live Preview (Interactive)
          </div>
          <SearchBar
            placeholder={placeholder}
            onSearch={(q) => setLastQuery(q)}
            className="max-w-xl"
          />

          {lastQuery && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900">
              Query captured in parent component: <strong>&quot;{lastQuery}&quot;</strong>
            </div>
          )}
        </div>

        {/* Props & Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900">Configurable Props</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Placeholder Text
              </label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
              />
            </div>
          </div>

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
