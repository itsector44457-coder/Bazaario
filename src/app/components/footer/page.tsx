'use client';

import React, { useState } from 'react';
import Footer from '@/components/footer/Footer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function FooterPage() {
  const [copied, setCopied] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);

  const usageCode = `import Footer from '@/components/footer/Footer';

export default function MyPage() {
  return (
    <Footer
      onOpenOrders={() => setIsOrdersOpen(true)}
      onOpenMessages={() => alert('Support chat opened')}
      onRegisterShop={() => setIsSellerModalOpen(true)}
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
          <span className="text-xs font-bold text-gray-900">Footer Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Reusable Footer
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Bazaario Brand Footer
          </h1>
          <p className="text-sm text-gray-500">
            Features the dark forest green background, Bazaario brand mark, social links (Instagram, Facebook, Twitter, WhatsApp), and organized columns for Shoppers, Shop Owners, and Company.
          </p>
        </div>

        {/* Live Preview */}
        <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm space-y-2">
          <div className="bg-white p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider px-6">
            Live Preview (Interactive)
          </div>
          <Footer
            onOpenOrders={() => setIsOrdersOpen(true)}
            onOpenMessages={() => alert('Opening Bazaario Customer Concierge')}
            onRegisterShop={() => setIsSellerOpen(true)}
          />
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

      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <SellerModal isOpen={isSellerOpen} onClose={() => setIsSellerOpen(false)} />
    </div>
  );
}
