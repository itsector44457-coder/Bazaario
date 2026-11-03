'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export interface DealItem {
  id: string;
  name: string;
  storeName: string;
  storeDistance: string;
  price: number;
  discountPercentage: string;
  image: string;
}

const DEFAULT_DEALS: DealItem[] = [
  {
    id: 'deal-1',
    name: 'Vitamin C Skincare Kit',
    storeName: 'Glow Pharmacy',
    storeDistance: '1.5 km',
    price: 749,
    discountPercentage: '35% off',
    image: 'https://images.unsplash.com/photo-1608248597359-5489f66456f9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'deal-2',
    name: 'Leather Tote Bag',
    storeName: 'Libas Boutique',
    storeDistance: '0.8 km',
    price: 1999,
    discountPercentage: '20% off',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'deal-3',
    name: 'Steel Pressure Cooker 5L',
    storeName: 'Mehta Kitchenware',
    storeDistance: '2.4 km',
    price: 1649,
    discountPercentage: '18% off',
    image: 'https://images.unsplash.com/photo-1584990347449-39908cf8baee?auto=format&fit=crop&w=400&q=80',
  },
];

interface DealsOfDayProps {
  deals?: DealItem[];
  onSelectDeal?: (deal: DealItem) => void;
  onSeeAll?: () => void;
  className?: string;
}

export default function DealsOfDay({
  deals = DEFAULT_DEALS,
  onSelectDeal,
  onSeeAll,
  className = '',
}: DealsOfDayProps) {
  // Live countdown timer state: 5h 42m 18s
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <div
      className={`bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs space-y-4 select-none ${className}`}
    >
      {/* Top Header with Countdown Timer & See All */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-5 h-5 fill-white stroke-white" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base tracking-tight">Deals of the day</h3>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-xs text-slate-500 font-medium">Ends in</span>
              <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md text-[11px]">
                {format2(timeLeft.hours)}h : {format2(timeLeft.minutes)}m : {format2(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>

        {onSeeAll ? (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs sm:text-sm font-black text-[#10b981] hover:text-[#059669] transition cursor-pointer"
          >
            See all
          </button>
        ) : (
          <Link
            href="/search?q=deals"
            className="text-xs sm:text-sm font-black text-[#10b981] hover:text-[#059669] transition cursor-pointer"
          >
            See all
          </Link>
        )}
      </div>

      {/* 3 Deals Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => onSelectDeal && onSelectDeal(deal)}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/60 border border-gray-200/70 hover:border-emerald-500/40 hover:bg-white hover:shadow-xs transition cursor-pointer group"
          >
            {/* Image Box */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <Image src={deal.image} alt={deal.name} fill className="object-cover group-hover:scale-105 transition" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#064e3b] transition tracking-tight">
                {deal.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                {deal.storeName} • {deal.storeDistance}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-black text-slate-900">
                  ₹{deal.price.toLocaleString()}
                </span>
                <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-md border border-amber-200/60">
                  {deal.discountPercentage}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
