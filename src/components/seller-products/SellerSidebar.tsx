'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  Boxes,
  PlusCircle,
  MessageSquare,
  Wallet,
  Settings,
  ExternalLink,
  LogOut,
  CheckCircle2,
  X,
} from 'lucide-react';
import Logo from '@/components/navbar/Logo';

interface SellerSidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onAddProductClick?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

interface SellerNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: number;
  badgeColor?: string;
  onClick?: () => void;
}

export default function SellerSidebar({
  activeTab = 'products',
  onSelectTab,
  onAddProductClick,
  isOpenMobile = false,
  onCloseMobile,
  className = '',
}: SellerSidebarProps) {
  const navItems: SellerNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/seller-products' },
    { id: 'orders', label: 'Orders', icon: Package, href: '/seller-orders', badge: 4, badgeColor: 'bg-[#f59e0b]' },
    { id: 'products', label: 'Products', icon: Boxes, href: '/seller-products' },
    {
      id: 'add-product',
      label: 'Add Product',
      icon: PlusCircle,
      href: '/seller-add-product',
      onClick: onAddProductClick,
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/seller-messages', badge: 3, badgeColor: 'bg-[#10b981]' },
    { id: 'payouts', label: 'Earnings & Payouts', icon: Wallet, href: '/seller-earnings' },
    { id: 'settings', label: 'Shop Settings', icon: Settings, href: '/seller-settings' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-gradient-to-b from-[#063a2b] via-[#052e22] to-[#042018] text-white p-5 select-none w-64 lg:w-72 shadow-xl border-r border-emerald-900/40">
      {/* 1. Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="dark" size="sm" href="/seller-products" />
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-xs">
              SELLER
            </span>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60 transition"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Shop Info Card */}
        <div className="bg-[#03241b]/90 rounded-2xl p-3 border border-emerald-500/20 flex items-center gap-3 shadow-inner">
          <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 border border-emerald-500/30 ring-2 ring-emerald-500/20">
            <Image
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80"
              alt="Sharma Electronics"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-black text-white truncate">
              Sharma Electronics
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Verified · Live</span>
            </div>
          </div>
        </div>

        {/* 2. Navigation Items */}
        <nav className="space-y-1.5" aria-label="Seller menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'payouts' && (activeTab === 'earnings' || activeTab === 'earnings-payouts'));

            if (item.onClick) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-emerald-200/90 hover:bg-[#074f3c] hover:text-white`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href || '#'}
                onClick={() => {
                  onSelectTab?.(item.id);
                  onCloseMobile?.();
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/30'
                    : 'text-emerald-100/80 hover:bg-[#074f3c]/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 stroke-[2.2] ${
                      isActive ? 'text-white' : 'text-emerald-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`min-w-5 h-5 px-1.5 text-[10px] font-black text-white rounded-full flex items-center justify-center ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. Bottom Utility Actions */}
      <div className="pt-6 border-t border-emerald-900/60 space-y-2">
        <Link
          href="/shop"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-200 hover:text-white hover:bg-[#074f3c] rounded-xl transition"
        >
          <ExternalLink className="w-4 h-4 text-emerald-400 stroke-[2]" />
          <span>View storefront</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-200 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition"
        >
          <LogOut className="w-4 h-4 text-emerald-400 stroke-[2]" />
          <span>Log out</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden lg:flex shrink-0 min-h-screen ${className}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

