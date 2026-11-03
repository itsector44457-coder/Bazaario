'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface OrderTrackingHeaderProps {
  orderId?: string;
  orderTime?: string;
  shopsCount?: number;
  activeShopTab?: string;
  onSelectShopTab?: (shopId: string) => void;
  className?: string;
}

const SHOPS = [
  { id: 'sharma', name: 'Sharma Electronics' },
  { id: 'libas', name: 'Libas Boutique' },
  { id: 'gupta', name: 'Gupta Kirana' },
];

export default function OrderTrackingHeader({
  orderId = '#BZ-48213',
  orderTime = '3:42 PM',
  shopsCount = 3,
  activeShopTab = 'sharma',
  onSelectShopTab,
  className = '',
}: OrderTrackingHeaderProps) {
  return (
    <div className={`space-y-4 select-none ${className}`}>
      {/* Back to Orders Link */}
      <div>
        <Link
          href="/order-success"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back to My Orders</span>
        </Link>
      </div>

      {/* Main Title Row & Shop Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title + Meta */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Track order {orderId}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Placed today at {orderTime} · {shopsCount} shops
          </p>
        </div>

        {/* Shop Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl self-start sm:self-auto overflow-x-auto">
          {SHOPS.map((shop) => {
            const isActive = shop.id === activeShopTab;
            return (
              <button
                key={shop.id}
                type="button"
                onClick={() => onSelectShopTab && onSelectShopTab(shop.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#064e3b] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-200/50'
                }`}
              >
                {shop.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

