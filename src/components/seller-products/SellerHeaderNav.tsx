'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Bell, Menu } from 'lucide-react';

interface SellerHeaderNavProps {
  onOpenMobileMenu?: () => void;
  className?: string;
}

export default function SellerHeaderNav({
  onOpenMobileMenu,
  className = '',
}: SellerHeaderNavProps) {
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className={`bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs ${className}`}>
      {/* Left: Mobile Drawer Trigger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search orders, products, customers..."
            className="w-full pl-10 pr-4 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/15 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Right: Shop Open Status + Notification + Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Shop Open Status Pill */}
        <button
          type="button"
          onClick={() => setIsShopOpen(!isShopOpen)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
            isShopOpen
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
          title="Click to toggle shop opening hours"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isShopOpen ? 'bg-[#10b981] animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span className="hidden sm:inline">
            {isShopOpen ? 'Shop open' : 'Shop closed'}
          </span>
          <span className="sm:hidden">{isShopOpen ? 'Open' : 'Closed'}</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Notifications"
          onClick={() => alert('You have 4 new incoming orders and 1 low-stock alert')}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#f59e0b] rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200 ring-1 ring-emerald-600/20">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
              alt="Rajesh Sharma"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-bold text-gray-800 hidden md:inline">
            Rajesh Sharma
          </span>
        </div>
      </div>
    </header>
  );
}

