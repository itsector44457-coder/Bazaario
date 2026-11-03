'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/navbar/Logo';
import {
  LayoutDashboard,
  Store,
  Building2,
  ShieldAlert,
  Package,
  Users,
  Percent,
  FolderTree,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  badgeColor?: string;
}

export default function AdminSidebar({
  activeTab = 'dashboard',
  isOpenMobile = false,
  onCloseMobile,
  className = '',
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const overviewItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
  ];

  const marketplaceItems: NavItem[] = [
    {
      id: 'approvals',
      label: 'Shop Approvals',
      href: '/admin/approvals',
      icon: Store,
      badge: 12,
      badgeColor: 'bg-[#f59e0b]',
    },
    {
      id: 'shops',
      label: 'Shops',
      href: '/admin/shops',
      icon: Building2,
    },
    {
      id: 'moderation',
      label: 'Product Moderation',
      href: '/admin/moderation',
      icon: ShieldAlert,
      badge: 9,
      badgeColor: 'bg-[#f43f5e]',
    },
    {
      id: 'orders',
      label: 'Orders',
      href: '/admin/orders',
      icon: Package,
    },
    {
      id: 'users',
      label: 'Users',
      href: '/admin/users',
      icon: Users,
    },
  ];

  const financeItems: NavItem[] = [
    {
      id: 'finance',
      label: 'Commission & Payouts',
      href: '/admin/commission',
      icon: Percent,
    },
    {
      id: 'categories',
      label: 'Categories',
      href: '/admin/categories',
      icon: FolderTree,
    },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="space-y-1 pt-3 first:pt-0">
      <span className="block px-3.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
        {title}
      </span>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'dashboard' && (pathname === '/admin' || pathname === '/admin/dashboard')) ||
            (item.id === 'approvals' && (pathname === '/admin/approvals' || pathname === '/admin/shop-approvals')) ||
            (item.id === 'shops' && pathname === '/admin/shops') ||
            (item.id === 'moderation' && pathname === '/admin/moderation') ||
            (item.id === 'orders' && pathname === '/admin/orders') ||
            (item.id === 'users' && pathname === '/admin/users') ||
            (item.id === 'finance' && pathname === '/admin/commission') ||
            (item.id === 'categories' && pathname === '/admin/categories');

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 stroke-[2.2] ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`${item.badgeColor || 'bg-amber-500'} text-white text-[10px] font-black px-2 py-0.5 rounded-full`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-[#080d1a] text-white p-5 select-none w-64 lg:w-72">
      {/* 1. Brand Logo with ADMIN Badge */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="dark" size="sm" href="/admin" />
            <span className="bg-[#fbbf24] text-gray-950 text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-wider">
              ADMIN
            </span>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 2. Navigation Groups */}
        <nav className="space-y-4" aria-label="Admin Navigation">
          {renderNavGroup('OVERVIEW', overviewItems)}
          {renderNavGroup('MARKETPLACE', marketplaceItems)}
          {renderNavGroup('FINANCE & SETUP', financeItems)}
        </nav>
      </div>

      {/* 3. Bottom Links: View marketplace & Log out */}
      <div className="pt-6 border-t border-slate-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View marketplace</span>
        </Link>

        <button
          type="button"
          onClick={() => router.push('/login?role=admin')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden lg:block shrink-0 min-h-screen ${className}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

