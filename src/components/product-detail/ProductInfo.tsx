'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  CheckCircle2,
  Clock,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Bike,
  Footprints,
  RotateCcw,
  ShieldCheck,
  Banknote,
} from 'lucide-react';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: 'black', name: 'Midnight Black', hex: '#18181b' },
  { id: 'gray', name: 'Cloud Grey', hex: '#e2e8f0' },
  { id: 'green', name: 'Forest Green', hex: '#064e3b' },
  { id: 'blue', name: 'Sky Blue', hex: '#bae6fd' },
];

interface ProductInfoProps {
  sellerName?: string;
  sellerVerified?: boolean;
  title?: string;
  rating?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  soldThisWeek?: number;
  price?: number;
  originalPrice?: number;
  saveAmount?: number;
  emiText?: string;
  stockCount?: number;
  onAddToCart?: (quantity: number, color: string, fulfilment: 'delivery' | 'pickup') => void;
  onBuyNow?: (quantity: number, color: string, fulfilment: 'delivery' | 'pickup') => void;
  className?: string;
}

export default function ProductInfo({
  sellerName = 'Sharma Electronics',
  sellerVerified = true,
  title = 'Wireless ANC Headphones – 40h Battery',
  rating = 4.5,
  ratingsCount = 214,
  reviewsCount = 58,
  soldThisWeek = 120,
  price = 2499,
  originalPrice = 3199,
  saveAmount = 700,
  emiText = 'Inclusive of all taxes · EMI from ₹417/month',
  stockCount = 8,
  onAddToCart,
  onBuyNow,
  className = '',
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [fulfilmentType, setFulfilmentType] = useState<'delivery' | 'pickup'>('delivery');

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < stockCount) setQuantity(quantity + 1);
  };

  return (
    <div className={`w-full space-y-5 select-none text-gray-900 ${className}`}>
      {/* 1. Seller Link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-[#059669] font-bold hover:underline cursor-pointer"
      >
        <Store className="w-4 h-4 text-[#059669]" />
        <span>{sellerName}</span>
        {sellerVerified && (
          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] fill-emerald-100" />
        )}
      </Link>

      {/* 2. Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-snug">
        {title}
      </h1>

      {/* 3. Rating & Social Proof */}
      <div className="flex items-center gap-2.5 text-xs text-gray-500 flex-wrap">
        <span className="bg-[#059669] text-white px-2 py-0.5 rounded-md font-bold text-xs flex items-center gap-0.5">
          <span>{rating}</span>
          <span>★</span>
        </span>
        <span>{ratingsCount} ratings</span>
        <span>·</span>
        <span>{reviewsCount} reviews</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1 text-[#059669] font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>{soldThisWeek} sold this week</span>
        </span>
      </div>

      {/* 4. Pricing Box */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-950">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-base text-gray-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
          {saveAmount && (
            <span className="text-xs sm:text-sm font-bold text-[#f59e0b]">
              Save ₹{saveAmount.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 font-medium">{emiText}</p>
      </div>

      {/* 5. Color Selector */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-gray-900">
          <span>Colour: </span>
          <span className="font-medium text-gray-700">{selectedColor.name}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {COLOR_OPTIONS.map((col) => {
            const isSelected = selectedColor.id === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setSelectedColor(col)}
                className={`w-7 h-7 rounded-full transition-all cursor-pointer border ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110 border-gray-400'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                aria-label={col.name}
              />
            );
          })}
        </div>
      </div>

      {/* 6. Quantity Stepper & Stock status */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-gray-900">Quantity</span>
        <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-gray-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
          <span className="w-2 h-2 rounded-full bg-[#059669]" />
          <span>{stockCount} in stock</span>
        </span>
      </div>

      {/* 7. CTA Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(quantity, selectedColor.name, fulfilmentType)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-[#059669] text-[#059669] bg-white hover:bg-emerald-50 active:scale-95 transition font-bold text-xs sm:text-sm cursor-pointer shadow-2xs"
        >
          <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
          <span>Add to cart</span>
        </button>

        {/* Buy Now */}
        <button
          type="button"
          onClick={() => onBuyNow?.(quantity, selectedColor.name, fulfilmentType)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#059669] hover:bg-[#047857] active:scale-95 text-white transition font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Buy now</span>
        </button>
      </div>

      {/* 8. Fulfilment Options Card */}
      <div className="border border-gray-100 rounded-2xl bg-white p-3.5 space-y-3 shadow-2xs">
        {/* Option 1: Home Delivery */}
        <div
          onClick={() => setFulfilmentType('delivery')}
          className={`flex items-start gap-3 p-2 rounded-xl transition cursor-pointer ${
            fulfilmentType === 'delivery' ? 'bg-emerald-50/50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="mt-0.5">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                fulfilmentType === 'delivery'
                  ? 'border-[#059669]'
                  : 'border-gray-300'
              }`}
            >
              {fulfilmentType === 'delivery' && (
                <div className="w-2 h-2 rounded-full bg-[#059669]" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Bike className="w-4 h-4 text-[#059669] shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-900">Home delivery</p>
              <p className="text-[11px] text-gray-500">
                Arrives today in 45 min · ₹30 delivery
              </p>
            </div>
          </div>
        </div>

        {/* Option 2: Store Pickup */}
        <div
          onClick={() => setFulfilmentType('pickup')}
          className={`flex items-start gap-3 p-2 rounded-xl transition cursor-pointer ${
            fulfilmentType === 'pickup' ? 'bg-emerald-50/50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="mt-0.5">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                fulfilmentType === 'pickup'
                  ? 'border-[#059669]'
                  : 'border-gray-300'
              }`}
            >
              {fulfilmentType === 'pickup' && (
                <div className="w-2 h-2 rounded-full bg-[#059669]" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Footprints className="w-4 h-4 text-gray-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-900">Store pickup</p>
              <p className="text-[11px] text-gray-500">
                Ready in 20 min · Free · 1.2 km away
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Trust Highlights */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white border border-gray-100 rounded-xl py-2 px-2 text-center shadow-2xs">
          <RotateCcw className="w-4 h-4 mx-auto text-[#059669] mb-1" />
          <p className="text-[11px] font-bold text-gray-800">7-day return</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl py-2 px-2 text-center shadow-2xs">
          <ShieldCheck className="w-4 h-4 mx-auto text-[#059669] mb-1" />
          <p className="text-[11px] font-bold text-gray-800">1-yr warranty</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl py-2 px-2 text-center shadow-2xs">
          <Banknote className="w-4 h-4 mx-auto text-[#059669] mb-1" />
          <p className="text-[11px] font-bold text-gray-800">COD available</p>
        </div>
      </div>
    </div>
  );
}

