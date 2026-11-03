'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, Menu, Command } from 'lucide-react';

interface AdminHeaderNavProps {
  onOpenMobileMenu?: () => void;
  onOpenSidebar?: () => void;
  className?: string;
}

export default function AdminHeaderNav({
  onOpenMobileMenu,
  onOpenSidebar,
  className = '',
}: AdminHeaderNavProps) {
  const [searchVal, setSearchVal] = useState('');
  const handleOpen = onOpenMobileMenu || onOpenSidebar;

  return (
    <header
      className={`bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs ${className}`}
    >
      {/* Left: Mobile Drawer Trigger + Search Bar with ⌘K */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={handleOpen}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Open admin sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search shops, users, orders, products..."
            className="w-full pl-10 pr-12 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200/80 px-1.5 py-0.5 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>

      {/* Right: Notifications & Super Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Bell Notification with Red Badge */}
        <Link
          href="/admin/approvals"
          className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </Link>

        {/* Super Admin Profile: Neha Kapoor */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-150">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden relative border border-gray-200 ring-2 ring-emerald-500/20 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              alt="Neha Kapoor"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>

          <div className="hidden sm:block text-left leading-tight">
            <div className="text-xs font-black text-gray-900">Neha Kapoor</div>
            <div className="text-[10px] font-bold text-gray-400">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

