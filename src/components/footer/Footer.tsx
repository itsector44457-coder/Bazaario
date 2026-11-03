'use client';

import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';
import Logo from '@/components/navbar/Logo';

interface FooterProps {
  onOpenOrders?: () => void;
  onOpenMessages?: () => void;
  onRegisterShop?: () => void;
  className?: string;
}

export default function Footer({
  onOpenOrders,
  onOpenMessages,
  onRegisterShop,
  className = '',
}: FooterProps) {
  return (
    <footer
      className={`w-full bg-[#042d1f] text-white pt-14 pb-8 select-none ${className}`}
      aria-label="Bazaario Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Brand & Bio (Spans 5 cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* Logo */}
            <Logo variant="dark" size="md" />

            {/* Description */}
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              Your neighbourhood bazaar, online. Discover, chat and order from verified local shops.
            </p>

            {/* Social Icons Row (Instagram, Facebook, Twitter, WhatsApp) */}
            <div className="flex items-center gap-3 pt-1 text-emerald-300/80">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-800/80 flex items-center justify-center hover:text-white hover:border-emerald-500 hover:bg-emerald-900/40 transition cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-800/80 flex items-center justify-center hover:text-white hover:border-emerald-500 hover:bg-emerald-900/40 transition cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-800/80 flex items-center justify-center hover:text-white hover:border-emerald-500 hover:bg-emerald-900/40 transition cursor-pointer"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-800/80 flex items-center justify-center hover:text-white hover:border-emerald-500 hover:bg-emerald-900/40 transition cursor-pointer"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.761.888 2.79.889h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.765-5.768-5.765zm3.385 8.163c-.144.405-.837.774-1.17.822-.311.045-.694.053-1.12-.083a8.91 8.91 0 0 1-1.282-.578 8.01 8.01 0 0 1-2.453-2.316c-.237-.367-.48-.908-.48-1.42 0-.585.304-.874.412-.988.109-.115.237-.144.316-.144.079 0 .159.001.228.005.074.004.173-.028.27.206.101.244.348.848.379.911.031.063.051.137.009.221-.042.084-.063.136-.126.21-.063.074-.132.165-.189.222-.063.063-.129.131-.055.258.074.127.329.544.707.88.487.433.898.567 1.025.63.127.063.201.053.275-.032.074-.085.316-.369.4-.496.084-.127.169-.106.285-.063.116.042.738.348.865.411.127.063.211.095.243.148.032.053.032.306-.112.711z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shoppers */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Shoppers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/70">
              <li>
                {onOpenOrders ? (
                  <button
                    type="button"
                    onClick={onOpenOrders}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    My Orders
                  </button>
                ) : (
                  <Link href="/orders" className="hover:text-white transition">
                    My Orders
                  </Link>
                )}
              </li>
              <li>
                {onOpenOrders ? (
                  <button type="button" onClick={onOpenOrders} className="hover:text-white transition cursor-pointer text-left">Track Order</button>
                ) : (
                  <Link href="/order-tracking" className="hover:text-white transition">Track Order</Link>
                )}
              </li>
              <li>
                {onOpenMessages ? (
                  <button
                    type="button"
                    onClick={onOpenMessages}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    Messages
                  </button>
                ) : (
                  <Link href="/messages" className="hover:text-white transition">
                    Messages
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Owners */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Shop Owners
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/70">
              <li>
                {onRegisterShop ? (
                  <button type="button" onClick={onRegisterShop} className="hover:text-white transition cursor-pointer text-left">
                    Register shop
                  </button>
                ) : (
                  <Link href="/seller-registration" className="hover:text-white transition">Register shop</Link>
                )}
              </li>
              <li>
                {onRegisterShop ? (
                  <button type="button" onClick={onRegisterShop} className="hover:text-white transition cursor-pointer text-left">
                    Seller dashboard
                  </button>
                ) : (
                  <Link href="/seller-products" className="hover:text-white transition">Seller dashboard</Link>
                )}
              </li>
              <li>
                <Link href="/seller-earnings" className="hover:text-white transition">
                  Commission & payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/70">
              <li><Link href="/login" className="hover:text-white transition">About</Link></li>
              <li><Link href="/login?role=shopper" className="hover:text-white transition">Help center</Link></li>
              <li><Link href="/login?role=admin" className="hover:text-white transition">Admin login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Centered Copyright Bar */}
        <div className="pt-8 text-center">
          <p className="text-xs text-emerald-200/50 font-medium">
            © 2025 Bazaario Marketplace Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
