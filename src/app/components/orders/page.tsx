'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import UserProfileCard from '@/components/orders/UserProfileCard';
import OrdersSidebarNav from '@/components/orders/OrdersSidebarNav';
import OrdersStatsGrid from '@/components/orders/OrdersStatsGrid';
import OrdersFilterBar from '@/components/orders/OrdersFilterBar';
import OrderCardItem from '@/components/orders/OrderCardItem';
import OrdersListView from '@/components/orders/OrdersListView';

export default function OrdersComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'profile' | 'nav' | 'stats' | 'card'>('all');

  const usageCode = `import UserProfileCard from '@/components/orders/UserProfileCard';
import OrdersSidebarNav from '@/components/orders/OrdersSidebarNav';
import OrdersListView from '@/components/orders/OrdersListView';

export default function MyOrdersPage() {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-8">
      <aside className="space-y-4">
        <UserProfileCard />
        <OrdersSidebarNav />
      </aside>
      <OrdersListView />
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
          <span className="text-xs font-bold text-gray-900">My Orders Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/orders"
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
          { id: 'all', label: 'Full Orders View' },
          { id: 'profile', label: '1. User Profile Card' },
          { id: 'nav', label: '2. Sidebar Navigation' },
          { id: 'stats', label: '3. Stats Metric Grid' },
          { id: 'card', label: '4. Order Card Items' },
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
              <h2 className="text-lg font-extrabold text-gray-900">Complete My Orders Experience</h2>
              <p className="text-xs text-gray-500">
                Exact replica of user order history dashboard with multi-status items, reordering, ratings, and filters.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
                <aside className="space-y-4">
                  <UserProfileCard />
                  <OrdersSidebarNav />
                </aside>
                <OrdersListView />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 max-w-xs">
            <h2 className="text-base font-bold text-gray-900">User Profile Summary Card</h2>
            <UserProfileCard />
          </div>
        )}

        {activeTab === 'nav' && (
          <div className="space-y-4 max-w-xs">
            <h2 className="text-base font-bold text-gray-900">Account Sidebar Navigation</h2>
            <OrdersSidebarNav />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-bold text-gray-900">Orders Statistics Metrics</h2>
            <OrdersStatsGrid />
          </div>
        )}

        {activeTab === 'card' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Individual Order Card Variations</h2>
            <OrderCardItem
              order={{
                id: '1',
                orderNumber: '#BZ-48213-A',
                dateStr: 'Today, 3:42 PM',
                status: 'out-for-delivery',
                statusLabel: 'Out for delivery',
                productTitle: 'Wireless ANC Headphones',
                storeName: 'Sharma Electronics',
                variantOrQty: 'Qty 1',
                price: 2529,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
                bgColor: '#edf5f0',
              }}
            />
            <OrderCardItem
              order={{
                id: '2',
                orderNumber: '#BZ-47102',
                dateStr: '22 Oct 2025',
                status: 'delivered',
                statusLabel: 'Delivered',
                productTitle: 'Basmati Rice 5 kg + 4 more items',
                storeName: 'Gupta Kirana Store',
                variantOrQty: '',
                price: 1284,
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
                bgColor: '#fcf8ee',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

