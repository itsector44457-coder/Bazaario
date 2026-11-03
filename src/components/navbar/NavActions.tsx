'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MessageSquare, Package, ShoppingCart, Store,
  ChevronDown, LogOut, Settings, Heart,
} from 'lucide-react';
import Image from 'next/image';

interface NavActionsProps {
  cartCount?: number;
  unreadMessagesCount?: number;
  userName?: string;
  userAvatar?: string;
  onOpenCart?: () => void;
  onOpenOrders?: () => void;
  onOpenMessages?: () => void;
  onOpenSellerModal?: () => void;
  className?: string;
}

export default function NavActions({
  cartCount = 3,
  unreadMessagesCount = 1,
  userName = 'Rahul',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  onOpenCart,
  onOpenOrders,
  onOpenMessages,
  onOpenSellerModal,
  className = '',
}: NavActionsProps) {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleCartClick = () => {
    if (onOpenCart) onOpenCart();
    else router.push('/cart');
  };

  const handleOrdersClick = () => {
    if (onOpenOrders) onOpenOrders();
    else router.push('/orders');
  };

  const handleMessagesClick = () => {
    if (onOpenMessages) onOpenMessages();
    else router.push('/messages');
  };

  const handleSellerClick = () => {
    if (onOpenSellerModal) onOpenSellerModal();
    else router.push('/seller-registration');
  };

  return (
    <div className={`flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0 ${className}`}>

      {/* Messages — hidden on mobile */}
      <button
        type="button"
        onClick={handleMessagesClick}
        aria-label="Messages & Support"
        className="relative hidden md:flex p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 text-gray-700" />
        {unreadMessagesCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
            {unreadMessagesCount}
          </span>
        )}
      </button>

      {/* Orders — hidden on mobile */}
      <button
        type="button"
        onClick={handleOrdersClick}
        aria-label="Your Orders"
        className="hidden md:flex p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
      >
        <Package className="w-5 h-5 text-gray-700" />
      </button>

      {/* Cart */}
      <button
        type="button"
        onClick={handleCartClick}
        aria-label="Shopping Cart"
        className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
      >
        <ShoppingCart className="w-5 h-5 text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-[#059669] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Profile Avatar + Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-gray-100 transition cursor-pointer focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-emerald-600/30">
            <Image
              src={userAvatar} alt={userName}
              width={32} height={32}
              className="object-cover w-full h-full"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-800 hidden md:inline-block">{userName}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-500 hidden md:inline-block transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
            </div>
            <div className="py-1">
              <button
                type="button"
                onClick={() => { handleOrdersClick(); setIsProfileMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition"
              >
                <Package className="w-4 h-4 text-gray-400" />
                <span>My Orders & Tracking</span>
              </button>
              <Link
                href="/cart"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition"
              >
                <Heart className="w-4 h-4 text-gray-400" />
                <span>Saved Wishlist</span>
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Account Settings</span>
              </Link>
            </div>
            <div className="pt-1 border-t border-gray-100 space-y-0.5">
              <Link
                href="/login"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition"
              >
                <span>Switch / Sign In</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <span>Create New Account</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Sell on Bazaario */}
      <button
        type="button"
        onClick={handleSellerClick}
        className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200/90 hover:border-emerald-500 bg-white hover:bg-emerald-50/50 text-slate-800 hover:text-[#064e3b] active:scale-[0.98] transition font-bold text-xs sm:text-sm shadow-2xs cursor-pointer"
      >
        <Store className="w-4 h-4 text-[#10b981] stroke-[2.2]" />
        <span>Sell on Bazaario</span>
      </button>
    </div>
  );
}
