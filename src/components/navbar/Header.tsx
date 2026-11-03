'use client';

import React from 'react';
import Logo from './Logo';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';
import NavActions from './NavActions';

export interface HeaderProps {
  cartCount?: number;
  unreadMessagesCount?: number;
  userName?: string;
  userAvatar?: string;
  currentLocation?: string;
  onLocationChange?: (location: string) => void;
  onSearch?: (query: string) => void;
  initialSearchQuery?: string;
  onOpenCart?: () => void;
  onOpenOrders?: () => void;
  onOpenMessages?: () => void;
  onOpenSellerModal?: () => void;
  className?: string;
}

export default function Header({
  cartCount = 3,
  unreadMessagesCount = 1,
  userName = 'Rahul',
  userAvatar,
  currentLocation = 'Andheri West, Mumbai',
  onLocationChange,
  onSearch,
  initialSearchQuery,
  onOpenCart,
  onOpenOrders,
  onOpenMessages,
  onOpenSellerModal,
  className = '',
}: HeaderProps) {
  return (
    <header className={`w-full bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12">
        {/* Main row */}
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4 lg:gap-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 lg:gap-8 shrink-0">
            <Logo />
            <div className="hidden sm:block border-l border-gray-200 h-8" />
            <LocationSelector
              currentLocation={currentLocation}
              onLocationChange={onLocationChange}
              className="hidden sm:block"
            />
          </div>

          {/* Center: Search Bar – hidden on mobile (shown below) */}
          <div className="hidden sm:flex flex-1 justify-center max-w-2xl px-2">
            <SearchBar initialQuery={initialSearchQuery} onSearch={onSearch} />
          </div>

          {/* Right: Actions */}
          <NavActions
            cartCount={cartCount}
            unreadMessagesCount={unreadMessagesCount}
            userName={userName}
            userAvatar={userAvatar}
            onOpenCart={onOpenCart}
            onOpenOrders={onOpenOrders}
            onOpenMessages={onOpenMessages}
            onOpenSellerModal={onOpenSellerModal}
          />
        </div>

        {/* Mobile: full-width search row */}
        <div className="sm:hidden pb-2.5 pt-0">
          <SearchBar initialQuery={initialSearchQuery} onSearch={onSearch} />
        </div>

        {/* Mobile: Location bar */}
        <div className="sm:hidden pb-2.5 flex items-center gap-2 border-t border-gray-100 pt-2">
          <LocationSelector
            currentLocation={currentLocation}
            onLocationChange={onLocationChange}
          />
        </div>
      </div>
    </header>
  );
}
