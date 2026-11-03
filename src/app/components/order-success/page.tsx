'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import OrderSuccessHeader from '@/components/order-success/OrderSuccessHeader';
import OrderSuccessConfirmationCard from '@/components/order-success/OrderSuccessConfirmationCard';
import OrderSplitShopsCard from '@/components/order-success/OrderSplitShopsCard';
import OrderSuccessActions from '@/components/order-success/OrderSuccessActions';
import OrderSuccessView from '@/components/order-success/OrderSuccessView';

export default function OrderSuccessComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'header' | 'confirmation' | 'split' | 'actions'>('all');

  const usageCode = `import OrderSuccessHeader from '@/components/order-success/OrderSuccessHeader';
import OrderSuccessView from '@/components/order-success/OrderSuccessView';

export default function MyOrderSuccessPage() {
  return (
    <>
      <OrderSuccessHeader />
      <OrderSuccessView />
    </>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Order Success Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/order-success"
            className="text-xs font-bold text-[#059669] hover:underline px-3 py-1.5"
          >
            View Live Page →
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'Full Success View' },
          { id: 'header', label: '1. Completed Stepper Header' },
          { id: 'confirmation', label: '2. Confirmation Card' },
          { id: 'split', label: '3. Multi-Shop Split Card' },
          { id: 'actions', label: '4. Action Buttons' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#059669] text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
        {activeTab === 'all' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Full Order Placed Experience</h2>
              <p className="text-xs text-gray-500">
                Exact replica of Bazaario Order Success confirmation with split shop statuses and direct routing to live order tracking.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
              <OrderSuccessHeader />
              <div className="bg-[#fcfdfd]">
                <OrderSuccessView />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'header' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">4-Step Completed Header</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-2">
              <OrderSuccessHeader />
            </div>
          </div>
        )}

        {activeTab === 'confirmation' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-base font-bold text-gray-900">Order Confirmation Hero Card</h2>
            <OrderSuccessConfirmationCard />
          </div>
        )}

        {activeTab === 'split' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-base font-bold text-gray-900">Order Split Across Shops Card</h2>
            <OrderSplitShopsCard />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-4 max-w-xl mx-auto text-center">
            <h2 className="text-base font-bold text-gray-900">Action CTA Buttons</h2>
            <OrderSuccessActions
              onTrackOrder={() => alert('Navigate to /order-tracking')}
              onViewOrders={() => alert('Open orders modal')}
              onContinueShopping={() => alert('Navigate to home /')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

