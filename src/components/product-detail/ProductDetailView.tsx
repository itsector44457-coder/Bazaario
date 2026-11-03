'use client';

import React from 'react';
import ProductBreadcrumb from './ProductBreadcrumb';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import MerchantContactCard from './MerchantContactCard';
import ProductOffersCard from './ProductOffersCard';
import ProductDetailsTabs from './ProductDetailsTabs';
import CustomerReviewsCard from './CustomerReviewsCard';
import MoreFromSeller, { SellerProductItem } from './MoreFromSeller';

interface ProductDetailViewProps {
  onAddToCart?: (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    fulfilment: string;
  }) => void;
  onBuyNow?: (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    fulfilment: string;
  }) => void;
  onSelectMoreProduct?: (product: SellerProductItem) => void;
  className?: string;
}

export default function ProductDetailView({
  onAddToCart,
  onBuyNow,
  onSelectMoreProduct,
  className = '',
}: ProductDetailViewProps) {
  const handleAddToCart = (quantity: number, color: string, fulfilment: 'delivery' | 'pickup') => {
    onAddToCart?.({
      id: 'prod-wireless-anc',
      name: 'Wireless ANC Headphones – 40h Battery',
      price: 2499,
      quantity,
      color,
      fulfilment,
    });
  };

  const handleBuyNow = (quantity: number, color: string, fulfilment: 'delivery' | 'pickup') => {
    onBuyNow?.({
      id: 'prod-wireless-anc',
      name: 'Wireless ANC Headphones – 40h Battery',
      price: 2499,
      quantity,
      color,
      fulfilment,
    });
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 space-y-6 sm:space-y-8 ${className}`}>
      {/* 1. Breadcrumbs */}
      <ProductBreadcrumb
        category="Electronics"
        subCategory="Headphones"
        productName="Wireless ANC Headphones"
      />

      {/* 2. Top Hero: Gallery + Info + Merchant (stacks on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Gallery – full width on mobile */}
        <div className="lg:col-span-5 w-full">
          <ProductGallery discountText="22% OFF" />
        </div>

        {/* Product Info – full width on mobile */}
        <div className="lg:col-span-4 w-full">
          <ProductInfo
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        {/* Merchant + Offers (moves below info on mobile) */}
        <div className="lg:col-span-3 w-full space-y-4">
          <MerchantContactCard
            storeName="Sharma Electronics"
            location="Lokhandwala, Andheri W · 1.2 km"
            openUntil="Open till 9:30 PM"
            rating={4.6}
            responseRate="98%"
            yearsOnPlatform="6 yrs"
          />
          <ProductOffersCard />
        </div>
      </div>

      {/* 3. Details Tabs + Reviews (stacks on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start pt-2">
        <div className="lg:col-span-7 w-full">
          <ProductDetailsTabs />
        </div>
        <div className="lg:col-span-5 w-full">
          <CustomerReviewsCard />
        </div>
      </div>

      {/* 4. More from Seller */}
      <div className="pt-2 pb-20 lg:pb-0">
        <MoreFromSeller onSelectProduct={onSelectMoreProduct} />
      </div>

      {/* Mobile sticky bottom bar: Add to Cart + Buy Now */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3 lg:hidden">
        <div className="flex-1">
          <p className="text-[11px] text-gray-500">Wireless ANC Headphones</p>
          <p className="text-base font-extrabold text-gray-950 leading-tight">₹2,499
            <span className="text-xs font-normal text-gray-400 line-through ml-2">₹3,199</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleAddToCart(1, 'Midnight Black', 'delivery')}
          className="px-4 py-3 rounded-2xl border-2 border-[#059669] text-[#059669] text-xs font-extrabold hover:bg-emerald-50 transition"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => handleBuyNow(1, 'Midnight Black', 'delivery')}
          className="px-5 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-extrabold shadow-lg shadow-emerald-200 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

