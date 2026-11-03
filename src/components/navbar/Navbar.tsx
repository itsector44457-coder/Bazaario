'use client';

import React from 'react';
import Header, { HeaderProps } from './Header';
import CategoryNav, { CategoryItem, DEFAULT_CATEGORIES } from './CategoryNav';

export interface NavbarProps extends HeaderProps {
  categories?: CategoryItem[];
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  deliveryPromoText?: string;
}

export default function Navbar({
  // Header props
  cartCount,
  unreadMessagesCount,
  userName,
  userAvatar,
  currentLocation,
  onLocationChange,
  onSearch,
  initialSearchQuery,
  onOpenCart,
  onOpenOrders,
  onOpenMessages,
  onOpenSellerModal,
  // CategoryNav props
  categories = DEFAULT_CATEGORIES,
  selectedCategory,
  onSelectCategory,
  deliveryPromoText,
  className = '',
}: NavbarProps) {
  return (
    <div className={`sticky top-0 z-40 bg-white shadow-xs ${className}`}>
      {/* 1. Main Header */}
      <Header
        cartCount={cartCount}
        unreadMessagesCount={unreadMessagesCount}
        userName={userName}
        userAvatar={userAvatar}
        currentLocation={currentLocation}
        onLocationChange={onLocationChange}
        onSearch={onSearch}
        initialSearchQuery={initialSearchQuery}
        onOpenCart={onOpenCart}
        onOpenOrders={onOpenOrders}
        onOpenMessages={onOpenMessages}
        onOpenSellerModal={onOpenSellerModal}
      />

      {/* 2. Sub-Category Navigation */}
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        deliveryPromoText={deliveryPromoText}
      />
    </div>
  );
}

// Re-export modular components for direct independent usage
export { default as Logo } from './Logo';
export { default as LocationSelector } from './LocationSelector';
export { default as SearchBar } from './SearchBar';
export { default as NavActions } from './NavActions';
export { default as Header } from './Header';
export { default as CategoryNav, DEFAULT_CATEGORIES } from './CategoryNav';
