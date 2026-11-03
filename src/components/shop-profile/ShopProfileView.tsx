'use client';

import React, { useState } from 'react';
import ShopProfileHeader from './ShopProfileHeader';
import ShopTabsNav, { ShopTabType } from './ShopTabsNav';
import ShopPromoBanner from './ShopPromoBanner';
import ShopCategorySidebar from './ShopCategorySidebar';
import ShopInfoCard from './ShopInfoCard';
import ShopProductGrid from './ShopProductGrid';
import ShopOffersView from './ShopOffersView';
import ShopAboutView from './ShopAboutView';
import ShopReviewsView from './ShopReviewsView';
import { ShopCatalogProduct } from './ShopProductCard';

const MOBILE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'mobiles', label: 'Mobiles' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'cables', label: 'Cables' },
  { id: 'speakers', label: 'Speakers' },
];

interface ShopProfileViewProps {
  onAddToCart?: (product: ShopCatalogProduct) => void;
  className?: string;
}

export default function ShopProfileView({
  onAddToCart,
  className = '',
}: ShopProfileViewProps) {
  const [activeTab, setActiveTab] = useState<ShopTabType>('products');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 space-y-5 ${className}`}>
      {/* 1. Shop Header */}
      <ShopProfileHeader />

      {/* 2. Tabs Navigation */}
      <ShopTabsNav
        activeTab={activeTab}
        productsCount={185}
        offersCount={4}
        reviewsCount="1.2k"
        onTabChange={setActiveTab}
      />

      {/* 3. Promo Banner */}
      <ShopPromoBanner />

      {/* 4. Mobile: horizontal category scroll (Products tab only) */}
      {activeTab === 'products' && (
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {MOBILE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#059669] text-white border-[#059669]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#059669] hover:text-[#059669]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* 5. Main Body: 2-Column on lg+, stacked on mobile */}
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-7 pt-1">
        {/* Left sidebar: desktop only */}
        <div className="hidden lg:flex flex-col w-[260px] space-y-5 shrink-0">
          <ShopCategorySidebar
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ShopInfoCard />
        </div>

        {/* Right: Tab Content */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === 'products' && (
            <ShopProductGrid
              selectedCategory={selectedCategory}
              onAddToCart={onAddToCart}
            />
          )}
          {activeTab === 'offers' && <ShopOffersView />}
          {activeTab === 'about' && (
            <div className="space-y-5">
              <ShopAboutView />
              {/* Shop info below About content on mobile */}
              <div className="lg:hidden">
                <ShopInfoCard />
              </div>
            </div>
          )}
          {activeTab === 'reviews' && <ShopReviewsView />}
        </div>
      </div>
    </div>
  );
}
