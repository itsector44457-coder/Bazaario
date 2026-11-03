'use client';

import React from 'react';
import Image from 'next/image';
import { Store, ShoppingCart, Info } from 'lucide-react';

interface ProductLivePreviewCardProps {
  productName?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  storeName?: string;
  storeDistance?: string;
  visibility?: 'publish' | 'draft';
  onVisibilityChange?: (v: 'publish' | 'draft') => void;
  className?: string;
}

export default function ProductLivePreviewCard({
  productName = 'Wireless ANC Headphones – 40h Battery',
  price = 2499,
  originalPrice = 3199,
  image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  storeName = 'Sharma Electronics',
  storeDistance = '1.2 km',
  visibility = 'publish',
  onVisibilityChange,
  className = '',
}: ProductLivePreviewCardProps) {
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className={`space-y-4 select-none ${className}`}>
      {/* 1. Live Preview Label & Card */}
      <div>
        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-2">
          LIVE PREVIEW
        </span>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-3.5 space-y-3">
          {/* Product Image Area */}
          <div className="w-full aspect-square rounded-2xl bg-[#edf5f0] overflow-hidden relative border border-emerald-950/5">
            {discountPercent && (
              <span className="absolute top-3 left-3 z-10 bg-[#f59e0b] text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
                -{discountPercent}%
              </span>
            )}
            <Image
              src={image}
              alt={productName || 'Product Preview'}
              fill
              className="object-contain p-4 transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* Store Info */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Store className="w-3.5 h-3.5 text-[#059669] stroke-[2.2]" />
            <span className="truncate">
              {storeName} · {storeDistance}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-extrabold text-gray-950 truncate leading-snug">
            {productName || 'Product Name'}
          </h4>

          {/* Price & Cart CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-gray-950">
                ₹{price.toLocaleString('en-IN')}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              type="button"
              className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center hover:bg-[#047857] shadow-xs transition"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visibility Controls Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-extrabold text-gray-900 tracking-tight">
          Visibility
        </h4>

        {/* 2-Pill Switch (Publish / Draft) */}
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100">
          <button
            type="button"
            onClick={() => onVisibilityChange?.('publish')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              visibility === 'publish'
                ? 'bg-[#064e3b] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => onVisibilityChange?.('draft')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              visibility === 'draft'
                ? 'bg-white text-gray-900 shadow-xs border border-gray-200/60'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Draft
          </button>
        </div>

        {/* Bazaario 2-Hour Review Policy Note */}
        <div className="bg-[#eff6ff] border border-[#bfdbfe]/60 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-[#1e40af] leading-relaxed">
          <Info className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium">
            New products are checked by the Bazaario team and go live within 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

