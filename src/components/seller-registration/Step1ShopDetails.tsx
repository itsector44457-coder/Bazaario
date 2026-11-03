'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Check, Lock } from 'lucide-react';

export interface ShopDetailsFormData {
  shopName: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  openTime: string;
  closeTime: string;
  hasDelivery: boolean;
  hasPickup: boolean;
  photoUrl: string;
}

interface Step1ShopDetailsProps {
  data: ShopDetailsFormData;
  onChange: (updates: Partial<ShopDetailsFormData>) => void;
  onNext: () => void;
  className?: string;
}

const CATEGORIES = [
  'Electronics & Mobiles',
  'Grocery & Staples',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Pharmacy & Wellness',
  'Footwear & Accessories',
  'Bakery & Sweets',
];

export default function Step1ShopDetails({
  data,
  onChange,
  onNext,
  className = '',
}: Step1ShopDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 select-none ${className}`}>
      {/* 1. Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
          Tell us about your shop
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          This is what shoppers will see on your storefront.
        </p>
      </div>

      {/* 2. Fields */}
      <div className="space-y-4">
        {/* Shop Name */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Shop name *
          </label>
          <input
            type="text"
            required
            value={data.shopName}
            onChange={(e) => onChange({ shopName: e.target.value })}
            placeholder="e.g. Sharma Electronics"
            className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
          />
        </div>

        {/* Primary Category & Shop Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Primary category *
            </label>
            <select
              value={data.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Shop phone *
            </label>
            <input
              type="tel"
              required
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+91 98330 21045"
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
            />
          </div>
        </div>

        {/* Shop Address */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Shop address *
          </label>
          <input
            type="text"
            required
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Shop 14, Lokhandwala Market, Andheri West"
            className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
          />
        </div>

        {/* City & Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Mumbai"
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Pincode
            </label>
            <input
              type="text"
              value={data.pincode}
              onChange={(e) => onChange({ pincode: e.target.value })}
              placeholder="400053"
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
            />
          </div>
        </div>

        {/* Opening Hours & Fulfilment Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Opening hours
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={data.openTime}
                onChange={(e) => onChange({ openTime: e.target.value })}
                placeholder="10:00 AM"
                className="w-full text-xs text-gray-900 border border-gray-200 rounded-xl px-3 py-2.5 text-center outline-none focus:border-[#059669] transition bg-white"
              />
              <input
                type="text"
                value={data.closeTime}
                onChange={(e) => onChange({ closeTime: e.target.value })}
                placeholder="9:30 PM"
                className="w-full text-xs text-gray-900 border border-gray-200 rounded-xl px-3 py-2.5 text-center outline-none focus:border-[#059669] transition bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Fulfilment options
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange({ hasDelivery: !data.hasDelivery })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  data.hasDelivery
                    ? 'border-2 border-[#059669] bg-emerald-50/50 text-[#064e3b]'
                    : 'border-gray-200 bg-white text-gray-500'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center ${
                    data.hasDelivery ? 'bg-[#059669] text-white' : 'border border-gray-300'
                  }`}
                >
                  {data.hasDelivery && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => onChange({ hasPickup: !data.hasPickup })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  data.hasPickup
                    ? 'border-2 border-[#059669] bg-emerald-50/50 text-[#064e3b]'
                    : 'border-gray-200 bg-white text-gray-500'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center ${
                    data.hasPickup ? 'bg-[#059669] text-white' : 'border border-gray-300'
                  }`}
                >
                  {data.hasPickup && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>Pickup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shop Photos */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Shop photos
          </label>
          <div className="flex items-center gap-3">
            {/* Uploaded Store Photo */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden relative border border-gray-200 shadow-2xs">
              <Image
                src={data.photoUrl}
                alt={data.shopName}
                fill
                className="object-cover"
              />
            </div>

            {/* Add Photo Dashed Box */}
            <button
              type="button"
              onClick={() => alert('Select additional photos from device')}
              className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#059669] bg-gray-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#059669] transition cursor-pointer"
            >
              <Camera className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[11px] font-bold">Add photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Auto-Save & Submit CTA */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>Progress auto-saved</span>
        </div>

        <button
          type="submit"
          className="bg-[#059669] hover:bg-[#047857] active:scale-98 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
        >
          <span>Save & continue</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

