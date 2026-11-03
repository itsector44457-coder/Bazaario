'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';
import AdminShopsView from '@/components/admin/AdminShopsView';

export default function AdminShopsComponentPage() {
  const [copied, setCopied] = useState(false);

  const usageCode = `import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeaderNav from '@/components/admin/AdminHeaderNav';
import AdminShopsView from '@/components/admin/AdminShopsView';

export default function MyAdminShopsPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex">
      <AdminSidebar activeTab="shops" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeaderNav />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <AdminShopsView />
        </main>
      </div>
    </div>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <span className="text-xs font-bold text-gray-900">AdminShopsView Component</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/shops"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1"
          >
            <span>Live Screen</span>
            <Sparkles className="w-3 h-3" />
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-950">Bazaario Admin Shops Directory Preview</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Super Admin merchant catalog: Live status pills, multi-criteria filters (category, area, status), 30D volume & GMV metrics, commission editing, and merchant drawer.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Component #35
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <AdminShopsView />
        </div>

        {/* Code Snippet Box */}
        <div className="mt-8 bg-gray-900 text-gray-100 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-800">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              Usage Example
            </span>
            <span className="text-[11px] text-gray-500">TypeScript / Next.js</span>
          </div>
          <pre className="text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed">
            {usageCode}
          </pre>
        </div>
      </div>
    </div>
  );
}

