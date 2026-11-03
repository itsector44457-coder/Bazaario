'use client';

import React, { useState } from 'react';
import Logo from '@/components/navbar/Logo';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function LogoPage() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [copied, setCopied] = useState(false);

  const usageCode = `import Logo from '@/components/navbar/Logo';

export default function MyPage() {
  return (
    <Logo size="${size}" />
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
          <span className="text-xs font-bold text-gray-900">Logo Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Brand Identity
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Bazaario Brand Logo
          </h1>
          <p className="text-sm text-gray-500">
            Official Bazaario brand mark: deep forest green rounded square icon with white storefront symbol and matching typography.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center space-y-6">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Live Preview
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center min-w-[280px]">
            <Logo size={size} />
          </div>

          <div className="flex items-center gap-3">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  size === s
                    ? 'bg-[#084c37] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Size: {s}
              </button>
            ))}
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
  );
}
