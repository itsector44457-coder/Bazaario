'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';
import TopShopBanner from '@/components/search/TopShopBanner';

export default function TopShopBannerPage() {
  const [copied, setCopied] = useState(false);
  const [visitAlert, setVisitAlert] = useState('');

  const usageCode = `import TopShopBanner from '@/components/search/TopShopBanner';

export default function MyPage() {
  return (
    <TopShopBanner
      categoryKeyword="HEADPHONES"
      shopName="Sharma Electronics"
      stockCountText="38 headphones in stock"
      rating={4.6}
      distance="1.2 km away"
      deliveryTime="Delivers in 45 min"
      onVisitShop={() => console.log('Visiting Sharma Electronics')}
    />
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisit = () => {
    setVisitAlert('Navigating to Sharma Electronics storefront...');
    setTimeout(() => setVisitAlert(''), 2500);
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
          <span className="text-xs font-bold text-gray-900">TopShopBanner Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Featured Merchant
        </span>
      </div>

      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Top Shop Featured Banner</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            A high-converting promotional merchant unit displayed in category and search result lists for the top nearby seller.
          </p>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Live Preview
            </span>
            {visitAlert && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                {visitAlert}
              </span>
            )}
          </div>

          <TopShopBanner
            categoryKeyword="HEADPHONES"
            shopName="Sharma Electronics"
            stockCountText="38 headphones in stock"
            rating={4.6}
            distance="1.2 km away"
            deliveryTime="Delivers in 45 min"
            onVisitShop={handleVisit}
          />
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

