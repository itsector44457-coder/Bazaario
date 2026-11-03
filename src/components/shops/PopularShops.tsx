'use client';

import React from 'react';
import Link from 'next/link';
import ShopCard, { ShopItem } from './ShopCard';

export const DEFAULT_POPULAR_SHOPS: ShopItem[] = [
  {
    id: 'shop-1',
    name: 'Gupta Kirana Store',
    category: 'Grocery & Staples',
    distance: '0.4 km',
    rating: 4.7,
    deliveryTime: '25 min',
    productsCount: 640,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80',
    verified: true,
  },
  {
    id: 'shop-2',
    name: 'Libas Boutique',
    category: 'Fashion & Ethnic Wear',
    distance: '0.8 km',
    rating: 4.8,
    deliveryTime: '40 min',
    productsCount: 312,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    verified: true,
  },
  {
    id: 'shop-3',
    name: 'Sharma Electronics',
    category: 'Mobiles & Electronics',
    distance: '1.2 km',
    rating: 4.6,
    deliveryTime: '45 min',
    productsCount: 185,
    isOpen: false,
    openTimeText: 'Opens 10 AM',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
    verified: true,
  },
];

interface PopularShopsProps {
  shops?: ShopItem[];
  onSelectShop?: (shop: ShopItem) => void;
  onViewAllShops?: () => void;
  className?: string;
}

export default function PopularShops({
  shops = DEFAULT_POPULAR_SHOPS,
  onSelectShop,
  onViewAllShops,
  className = '',
}: PopularShopsProps) {
  return (
    <section className={`w-full space-y-4 ${className}`} aria-label="Popular Shops">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Popular shops near you
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Verified by Bazaario • within 3 km
          </p>
        </div>

        {onViewAllShops ? (
          <button
            type="button"
            onClick={onViewAllShops}
            className="text-xs sm:text-sm font-bold text-[#059669] hover:text-[#047857] transition"
          >
            View all shops
          </button>
        ) : (
          <Link
            href="/shops"
            className="text-xs sm:text-sm font-bold text-[#059669] hover:text-[#047857] transition"
          >
            View all shops
          </Link>
        )}
      </div>

      {/* Grid of 3 Shop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} onClick={onSelectShop} />
        ))}
      </div>
    </section>
  );
}

export { default as ShopCard } from './ShopCard';
