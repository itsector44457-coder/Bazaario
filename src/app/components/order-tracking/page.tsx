'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import OrderTrackingHeader from '@/components/order-tracking/OrderTrackingHeader';
import OrderTrackingMap from '@/components/order-tracking/OrderTrackingMap';
import OrderStatusTimeline from '@/components/order-tracking/OrderStatusTimeline';
import ShopContactCard from '@/components/order-tracking/ShopContactCard';
import TrackingItemCard from '@/components/order-tracking/TrackingItemCard';
import OrderTrackingView from '@/components/order-tracking/OrderTrackingView';

export default function OrderTrackingComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'header' | 'map' | 'timeline' | 'contact' | 'item'>('all');

  const usageCode = `import OrderTrackingView from '@/components/order-tracking/OrderTrackingView';
import OrderTrackingMap from '@/components/order-tracking/OrderTrackingMap';
import OrderStatusTimeline from '@/components/order-tracking/OrderStatusTimeline';

export default function MyTrackingPage() {
  return <OrderTrackingView />;
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
          <span className="text-xs font-bold text-gray-900">Order Tracking Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/order-tracking"
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
          { id: 'all', label: 'Full Tracking View' },
          { id: 'header', label: '1. Tracking Header' },
          { id: 'map', label: '2. Live Route Map & Driver' },
          { id: 'timeline', label: '3. 5-Step Status Timeline' },
          { id: 'contact', label: '4. Shop Contact Card' },
          { id: 'item', label: '5. Item Details Card' },
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
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'all' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Full Live Order Tracking Flow</h2>
              <p className="text-xs text-gray-500">
                Interactive two-column live map with driver floating card, shop tabs switching, 5-step status timeline, and OTP sharing.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
              <OrderTrackingView />
            </div>
          </div>
        )}

        {activeTab === 'header' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Order Tracking Sub-Header</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <OrderTrackingHeader />
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-bold text-gray-900">Live Delivery Route Map & Driver Card</h2>
            <OrderTrackingMap />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-base font-bold text-gray-900">Order Status Timeline with Delivery OTP</h2>
            <OrderStatusTimeline otpCode="4 8 2 1" />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-base font-bold text-gray-900">Shop Contact Actions (Chat, WhatsApp, Call)</h2>
            <ShopContactCard />
          </div>
        )}

        {activeTab === 'item' && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-base font-bold text-gray-900">Tracking Item Summary & Actions</h2>
            <TrackingItemCard />
          </div>
        )}
      </div>
    </div>
  );
}

