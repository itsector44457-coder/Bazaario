'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Package, MessageSquare, ShoppingCart } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount?: number;
  unreadMessagesCount?: number;
  className?: string;
}

export default function MobileBottomNav({
  cartCount = 3,
  unreadMessagesCount = 2,
  className = '',
}: MobileBottomNavProps) {
  const pathname = usePathname();

  // Hide on seller dashboard, seller onboarding & admin pages
  if (pathname?.startsWith('/seller') || pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Search',
      href: '/search?q=headphones',
      icon: Search,
      isActive: pathname.startsWith('/search'),
    },
    {
      label: 'Orders',
      href: '/orders',
      icon: Package,
      isActive: pathname.startsWith('/orders') || pathname.startsWith('/order-tracking'),
    },
    {
      label: 'Chat',
      href: '/messages',
      icon: MessageSquare,
      isActive: pathname.startsWith('/messages'),
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: 'bg-[#f59e0b]',
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: ShoppingCart,
      isActive: pathname.startsWith('/cart') || pathname.startsWith('/checkout'),
      badge: cartCount > 0 ? cartCount : undefined,
      badgeColor: 'bg-[#059669]',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] select-none safe-area-pb ${className}`}
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition relative ${
                active ? 'text-[#059669]' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    active ? 'stroke-[2.5] scale-110' : 'stroke-[1.8]'
                  }`}
                />

                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-white text-[9px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-white shadow-xs ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-1 font-bold tracking-tight transition-all ${
                  active ? 'text-[#059669]' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>

              {active && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#059669] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

