'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import SearchBreadcrumb from './SearchBreadcrumb';
import SearchResultsHeader, { SearchTabType, SortOptionType } from './SearchResultsHeader';
import ActiveFiltersBar, { ActiveFilterItem, DEFAULT_ACTIVE_FILTERS } from './ActiveFiltersBar';
import SearchFilterSidebar, { SearchFilterState } from './SearchFilterSidebar';
import SearchProductCard, { SearchProductItem } from './SearchProductCard';
import TopShopBanner from './TopShopBanner';
import SearchPagination from './SearchPagination';
import ShopCard, { ShopItem } from '../shops/ShopCard';

export const SEARCH_PRODUCTS_PART_1: SearchProductItem[] = [
  {
    id: 'sp-1',
    name: 'Wireless ANC Headphones',
    storeName: 'Sharma Electronics',
    storeDistance: '1.2 km',
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
    id: 'sp-2',
    name: 'Studio Bass Over-ear',
    storeName: 'Digital Point',
    storeDistance: '2.8 km',
    price: 1899,
    rating: 4.2,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f4eff5',
  },
  {
    id: 'sp-3',
    name: 'Fit Pro Smartwatch',
    storeName: 'Sharma Electronics',
    storeDistance: '1.2 km',
    price: 3499,
    originalPrice: 4999,
    badge: { text: 'Bestseller', variant: 'bestseller' },
    rating: 4.3,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f0f5ed',
  },
  {
    id: 'sp-4',
    name: 'Rockerz 550 Headphones',
    storeName: 'Mobile Hub Andheri',
    storeDistance: '0.9 km',
    price: 1599,
    originalPrice: 1799,
    badge: { text: '-10%', variant: 'discount' },
    rating: 4.4,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
    bgColor: '#eef5f0',
  },
  {
    id: 'sp-5',
    name: 'Active 2 Smartwatch',
    storeName: 'Digital Point',
    storeDistance: '2.8 km',
    price: 2199,
    rating: 4.1,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f2f4f6',
  },
  {
    id: 'sp-6',
    name: 'Classic Wired Monitor',
    storeName: 'Sound Gallery',
    storeDistance: '4.1 km',
    price: 4290,
    badge: { text: 'Only 2 left', variant: 'stock' },
    rating: 4.6,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f7f6f0',
  },
];

export const SEARCH_PRODUCTS_PART_2: SearchProductItem[] = [
  {
    id: 'sp-7',
    name: 'Pulse Smart Band',
    storeName: 'Mobile Hub Andheri',
    storeDistance: '0.9 km',
    price: 1299,
    rating: 4.0,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    bgColor: '#eef6f0',
  },
  {
    id: 'sp-8',
    name: 'Travel ANC Lite',
    storeName: 'Sound Gallery',
    storeDistance: '4.1 km',
    price: 2099,
    rating: 4.3,
    reviewsCount: 129,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80',
    bgColor: '#edf5f1',
  },
  {
    id: 'sp-9',
    name: 'Fit Pro Smartwatch LTE',
    storeName: 'Sharma Electronics',
    storeDistance: '1.2 km',
    price: 4799,
    rating: 4.5,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f1f5ee',
  },
];

const SEARCH_SHOPS: ShopItem[] = [
  {
    id: 'shop-1',
    name: 'Sharma Electronics',
    category: 'Electronics & Audio',
    distance: '1.2 km',
    deliveryTime: '45 min',
    rating: 4.6,
    productsCount: 38,
    isOpen: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'shop-2',
    name: 'Mobile Hub Andheri',
    category: 'Mobile Accessories & Audio',
    distance: '0.9 km',
    deliveryTime: '30 min',
    rating: 4.4,
    productsCount: 65,
    isOpen: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'shop-3',
    name: 'Sound Gallery',
    category: 'Hi-Fi Audio & Studio Gear',
    distance: '4.1 km',
    deliveryTime: '60 min',
    rating: 4.8,
    productsCount: 42,
    isOpen: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'shop-4',
    name: 'Digital Point',
    category: 'Gadgets & Wearables',
    distance: '2.8 km',
    deliveryTime: '40 min',
    rating: 4.3,
    productsCount: 54,
    isOpen: false,
    openTimeText: 'Opens 10 AM',
    verified: false,
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  },
];

interface SearchResultsViewProps {
  searchQuery?: string;
  onAddToCart?: (product: SearchProductItem) => void;
  onVisitShop?: (shopName: string) => void;
  className?: string;
}

export default function SearchResultsView({
  searchQuery = 'headphones',
  onAddToCart,
  onVisitShop,
  className = '',
}: SearchResultsViewProps) {
  const [activeTab, setActiveTab] = useState<SearchTabType>('products');
  const [sortOption, setSortOption] = useState<SortOptionType>('relevance');
  const [activeFilters, setActiveFilters] = useState<ActiveFilterItem[]>(DEFAULT_ACTIVE_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 space-y-5 ${className}`}>
      {/* 1. Breadcrumb */}
      <SearchBreadcrumb category="Electronics" subCategory="Headphones" />

      {/* 2. Header: title, tabs, sort */}
      <SearchResultsHeader
        query={searchQuery}
        totalProducts={148}
        totalShops={23}
        radiusKm={5}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* 3. Mobile filter button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
        </button>
        <ActiveFiltersBar
          filters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      </div>

      {/* 4. Active filters (desktop only) */}
      <div className="hidden lg:block">
        <ActiveFiltersBar
          filters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      </div>

      {/* 5. Main Body: Filter Sidebar + Results Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 pt-1">
        {/* Filter Sidebar – desktop only (inline) */}
        <div className="hidden lg:block w-[270px] shrink-0">
          <SearchFilterSidebar />
        </div>

        {/* Search Results */}
        <div className="flex-1 w-full space-y-6">
          {activeTab === 'products' ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {SEARCH_PRODUCTS_PART_1.map((prod) => (
                  <SearchProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>

              <TopShopBanner
                categoryKeyword="HEADPHONES"
                shopName="Sharma Electronics"
                stockCountText="38 headphones in stock"
                rating={4.6}
                distance="1.2 km away"
                deliveryTime="Delivers in 45 min"
                onVisitShop={() => onVisitShop?.('Sharma Electronics')}
              />

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {SEARCH_PRODUCTS_PART_2.map((prod) => (
                  <SearchProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>

              <SearchPagination
                currentPage={currentPage}
                totalPages={17}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SEARCH_SHOPS.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
              <span className="text-sm font-extrabold text-gray-900">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SearchFilterSidebar />
            </div>
            <div className="px-4 py-3 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white text-sm font-extrabold py-3 rounded-2xl transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
