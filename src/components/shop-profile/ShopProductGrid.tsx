'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ShopProductCard, { ShopCatalogProduct } from './ShopProductCard';

export const SHARMA_PRODUCTS: ShopCatalogProduct[] = [
  {
    id: 'shp-1',
    name: 'Wireless ANC Headphones',
    category: 'headphones',
    price: 2499,
    originalPrice: 3199,
    discountPercentage: '-22%',
    badge: { text: '-22%', variant: 'discount' },
    rating: 4.5,
    reviewsCount: 214,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    bgColor: '#edf5f0',
  },
  {
    id: 'shp-2',
    name: 'Fit Pro Smartwatch',
    category: 'smartwatches',
    price: 3499,
    originalPrice: 4999,
    discountPercentage: '-30%',
    badge: { text: '-30%', variant: 'discount' },
    rating: 4.3,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    bgColor: '#eff5ec',
  },
  {
    id: 'shp-3',
    name: 'Rockerz 550 Headphones',
    category: 'headphones',
    price: 1599,
    rating: 4.4,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
    bgColor: '#edf5f0',
  },
  {
    id: 'shp-4',
    name: 'Active 2 Smartwatch',
    category: 'smartwatches',
    price: 2199,
    rating: 4.1,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f1f4f6',
  },
  {
    id: 'shp-5',
    name: 'Classic Wired Monitor',
    category: 'headphones',
    price: 4290,
    badge: { text: 'Only 2 left', variant: 'stock' },
    rating: 4.6,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f7f6f1',
  },
  {
    id: 'shp-6',
    name: 'Fit Pro Smartwatch LTE',
    category: 'smartwatches',
    price: 4799,
    rating: 4.5,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f1f5ee',
  },
  {
    id: 'shp-7',
    name: 'Fast Charging Braided Cable 65W',
    category: 'chargers',
    price: 399,
    originalPrice: 599,
    rating: 4.6,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f4f5f7',
  },
  {
    id: 'shp-8',
    name: 'Dual Port GaN Fast Charger 33W',
    category: 'chargers',
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f2f5f4',
  },
  {
    id: 'shp-9',
    name: 'Nord CE 3 5G Mobile 128GB',
    category: 'mobiles',
    price: 18999,
    originalPrice: 21999,
    rating: 4.5,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f0f3f6',
  },
];

interface ShopProductGridProps {
  products?: ShopCatalogProduct[];
  selectedCategory?: string;
  onAddToCart?: (product: ShopCatalogProduct) => void;
  className?: string;
}

export default function ShopProductGrid({
  products = SHARMA_PRODUCTS,
  selectedCategory = 'all',
  onAddToCart,
  className = '',
}: ShopProductGridProps) {
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter by category
  const filtered = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  const displayedProducts = sorted.slice(0, visibleCount);

  return (
    <div className={`w-full space-y-5 select-none ${className}`}>
      {/* 1. Header Bar: Showing Count & Sort Dropdown */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-semibold text-gray-700">
          Showing <span className="text-gray-900 font-bold">{sorted.length}</span> products
        </p>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded-xl pl-3.5 pr-8 py-1.5 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-2xs hover:border-gray-300"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Products 3-Column Grid */}
      {displayedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-100">
          <p className="font-semibold text-sm">No products in this category yet.</p>
          <p className="text-xs text-gray-400 mt-1">Check back later or browse other categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {displayedProducts.map((prod) => (
            <ShopProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* 3. Load More Products Button (Image 2) */}
      {visibleCount < sorted.length && (
        <div className="pt-3 pb-4 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="w-full sm:w-auto px-12 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-98 text-gray-800 font-bold text-xs sm:text-sm shadow-2xs transition cursor-pointer text-center"
          >
            Load more products
          </button>
        </div>
      )}
    </div>
  );
}

