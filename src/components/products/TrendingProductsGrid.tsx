'use client';

import React, { useState } from 'react';
import TrendingProductCard, { TrendingProductItem } from './TrendingProductCard';

export const DEFAULT_TRENDING_PRODUCTS: TrendingProductItem[] = [
  {
    id: 'tp-1',
    name: 'Wireless ANC Headphones',
    category: 'electronics',
    storeName: 'Sharma Electronics',
    storeDistance: '1.2 km',
    price: 2499,
    originalPrice: 3199,
    discountPercentage: '-22%',
    rating: 4.5,
    reviewsCount: 214,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-2',
    name: 'Hand-block Cotton Kurta',
    category: 'fashion',
    storeName: 'Libas Boutique',
    storeDistance: '0.8 km',
    price: 899,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    isWishlisted: true,
  },
  {
    id: 'tp-3',
    name: 'Premium Basmati Rice 5 kg',
    category: 'grocery',
    storeName: 'Gupta Kirana Store',
    storeDistance: '0.4 km',
    price: 549,
    originalPrice: 620,
    deliveryTag: '30 min',
    rating: 4.6,
    reviewsCount: 402,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-4',
    name: 'Breeze Running Sneakers',
    category: 'sports',
    storeName: 'StepUp Footwear',
    storeDistance: '2.1 km',
    price: 1799,
    originalPrice: 2099,
    discountPercentage: '-15%',
    rating: 4.4,
    reviewsCount: 158,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-5',
    name: 'Ceramic Table Lamp',
    category: 'home',
    storeName: 'Casa Decor',
    storeDistance: '3.0 km',
    price: 1299,
    rating: 4.7,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-6',
    name: 'Fit Pro Smartwatch',
    category: 'electronics',
    storeName: 'Sharma Electronics',
    storeDistance: '1.2 km',
    price: 3499,
    originalPrice: 4999,
    discountPercentage: '-30%',
    rating: 4.3,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-7',
    name: 'Organic Turmeric Powder 200g',
    category: 'grocery',
    storeName: 'Spice Route India',
    storeDistance: '0.6 km',
    price: 420,
    originalPrice: 580,
    discountPercentage: '-28%',
    rating: 4.9,
    reviewsCount: 810,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-8',
    name: 'Aloe Vera & Neem Face Wash',
    category: 'beauty',
    storeName: 'Veda Organics',
    storeDistance: '1.5 km',
    price: 299,
    originalPrice: 450,
    discountPercentage: '-34%',
    rating: 4.4,
    reviewsCount: 530,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
  {
    id: 'tp-9',
    name: 'Atomic Habits – James Clear',
    category: 'books',
    storeName: 'Kitab Corner',
    storeDistance: '2.3 km',
    price: 399,
    originalPrice: 499,
    discountPercentage: '-20%',
    rating: 4.9,
    reviewsCount: 2200,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
  },
];

interface TrendingProductsGridProps {
  products?: TrendingProductItem[];
  activeCategoryId?: string;
  searchQuery?: string;
  onAddToCart?: (product: TrendingProductItem) => void;
  onToggleWishlist?: (id: string) => void;
  className?: string;
}

export default function TrendingProductsGrid({
  products = DEFAULT_TRENDING_PRODUCTS,
  activeCategoryId = 'all',
  searchQuery = '',
  onAddToCart,
  onToggleWishlist,
  className = '',
}: TrendingProductsGridProps) {
  const [sortOption, setSortOption] = useState('popular');

  // Client-side filter by category and search query
  const filteredProducts = products.filter((p) => {
    const matchCat = !activeCategoryId || activeCategoryId === 'all' || p.category === activeCategoryId;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.storeName.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  return (
    <section className={`w-full space-y-4 ${className}`} aria-label="Trending in your area">
      {/* Header with Sort Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Trending in your area
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {sortedProducts.length} best sellers from local shops this week
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-gray-500 font-medium">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-xs"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p className="text-sm font-medium">No products found for this filter.</p>
          <p className="text-xs text-gray-400 mt-1">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((prod) => (
            <TrendingProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { default as TrendingProductCard } from './TrendingProductCard';
