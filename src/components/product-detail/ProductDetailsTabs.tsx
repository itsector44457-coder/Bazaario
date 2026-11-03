'use client';

import React, { useState } from 'react';

export type ProductTab = 'description' | 'specifications' | 'shipping';

interface ProductDetailsTabsProps {
  className?: string;
}

export default function ProductDetailsTabs({ className = '' }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>('description');

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-6 space-y-5 shadow-2xs select-none ${className}`}
    >
      {/* 1. Tabs Header */}
      <div className="flex items-center gap-6 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`pb-3 text-xs sm:text-sm font-bold transition cursor-pointer relative ${
            activeTab === 'description'
              ? 'text-gray-900 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Description
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specifications')}
          className={`pb-3 text-xs sm:text-sm font-bold transition cursor-pointer relative ${
            activeTab === 'specifications'
              ? 'text-gray-900 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Specifications
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 text-xs sm:text-sm font-bold transition cursor-pointer relative ${
            activeTab === 'shipping'
              ? 'text-gray-900 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Shipping & Returns
        </button>
      </div>

      {/* 2. Tab Content */}
      {activeTab === 'description' && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            Immerse yourself in rich, balanced sound with active noise cancellation that blocks
            up to 35dB of outside noise. Plush memory-foam ear cushions, 40 hours of playback,
            fast charge (10 min = 5 hrs) and dual-device Bluetooth 5.3 pairing make these perfect
            for commutes and work-from-home.
          </p>

          {/* 2-Column Key Value Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs sm:text-sm pt-2">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Brand</span>
              <span className="text-gray-900 font-bold">boAt</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Battery</span>
              <span className="text-gray-900 font-bold">40 hours</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Connectivity</span>
              <span className="text-gray-900 font-bold">Bluetooth 5.3</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Noise cancel</span>
              <span className="text-gray-900 font-bold">Hybrid ANC</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Weight</span>
              <span className="text-gray-900 font-bold">250 g</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-medium">Warranty</span>
              <span className="text-gray-900 font-bold">1 year</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specifications' && (
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-y-2.5 text-gray-700">
            <span className="text-gray-500 font-medium">Driver Size</span>
            <span className="font-semibold text-gray-900">40 mm Dynamic</span>

            <span className="text-gray-500 font-medium">Frequency Response</span>
            <span className="font-semibold text-gray-900">20 Hz – 20 kHz</span>

            <span className="text-gray-500 font-medium">Charging Port</span>
            <span className="font-semibold text-gray-900">Type-C Fast Charge</span>

            <span className="text-gray-500 font-medium">Microphone</span>
            <span className="font-semibold text-gray-900">Quad Mic with ENx™ Tech</span>

            <span className="text-gray-500 font-medium">Compatibility</span>
            <span className="font-semibold text-gray-900">iOS, Android, Windows, Mac</span>
          </div>
        </div>
      )}

      {activeTab === 'shipping' && (
        <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            <strong className="text-gray-900">Hyperlocal Delivery:</strong> Delivered directly
            from Sharma Electronics (Lokhandwala, Andheri West) via local delivery partner within
            45 minutes of order confirmation.
          </p>
          <p>
            <strong className="text-gray-900">Self Pickup:</strong> Orders are ready at the store
            counter in 20 minutes with zero delivery fee.
          </p>
          <p>
            <strong className="text-gray-900">7-Day Local Exchange:</strong> Need a different color
            or facing an issue? Walk right into Sharma Electronics or request a courier pickup at your doorstep.
          </p>
        </div>
      )}
    </div>
  );
}

