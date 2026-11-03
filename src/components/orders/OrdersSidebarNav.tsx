'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Heart,
  MessageSquare,
  Store,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';

export type OrdersNavSection =
  | 'orders'
  | 'wishlist'
  | 'messages'
  | 'followed-shops'
  | 'addresses'
  | 'payment-methods'
  | 'settings';

interface OrdersSidebarNavProps {
  activeSection?: OrdersNavSection;
  onSelectSection?: (section: OrdersNavSection) => void;
  className?: string;
}

export default function OrdersSidebarNav({
  activeSection = 'orders',
  onSelectSection,
  className = '',
}: OrdersSidebarNavProps) {
  const router = useRouter();
  const navItems = [
    {
      id: 'orders' as OrdersNavSection,
      label: 'My Orders',
      icon: Package,
    },
    {
      id: 'wishlist' as OrdersNavSection,
      label: 'Wishlist',
      icon: Heart,
      badge: '12',
      badgeColor: 'bg-gray-100 text-gray-500',
    },
    {
      id: 'messages' as OrdersNavSection,
      label: 'Messages',
      icon: MessageSquare,
      badge: '2',
      badgeColor: 'bg-[#f59e0b] text-white',
    },
    {
      id: 'followed-shops' as OrdersNavSection,
      label: 'Followed shops',
      icon: Store,
    },
    {
      id: 'addresses' as OrdersNavSection,
      label: 'Addresses',
      icon: MapPin,
    },
    {
      id: 'payment-methods' as OrdersNavSection,
      label: 'Payment methods',
      icon: CreditCard,
    },
    {
      id: 'settings' as OrdersNavSection,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <nav
      className={`w-full bg-white rounded-3xl border border-gray-100 p-3 shadow-2xs select-none space-y-1 ${className}`}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === 'messages') {
                router.push('/messages');
              } else if (item.id === 'orders') {
                router.push('/orders');
              } else if (onSelectSection) {
                onSelectSection(item.id);
              }
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
              isActive
                ? 'bg-[#e8f7f0] text-[#064e3b]'
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <IconComponent
                className={`w-4 h-4 stroke-[2] ${
                  isActive ? 'text-[#059669]' : 'text-gray-400'
                }`}
              />
              <span>{item.label}</span>
            </div>

            {item.badge && (
              <span
                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* Log out item */}
      <div className="pt-2 border-t border-gray-100 mt-2">
        <Link
          href="/login"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-500 hover:bg-red-50/50 transition"
        >
          <LogOut className="w-4 h-4 stroke-[2] text-red-400" />
          <span>Log out</span>
        </Link>
      </div>
    </nav>
  );
}

