'use client';

import React from 'react';
import Image from 'next/image';
import { Store, ShieldCheck, Clock, MapPin, Award } from 'lucide-react';

export default function ShopAboutView() {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-2xs select-none">
      <div>
        <h3 className="text-lg font-bold text-gray-950">About Sharma Electronics</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
          Founded in 2018 in the heart of Lokhandwala Market, Sharma Electronics has been
          Andheri&apos;s premier destination for genuine consumer electronics, premium audio gear,
          smart wearables, and mobile accessories. We pride ourselves on transparent local pricing,
          instant 45-minute hyperlocal delivery, and hands-on after-sales support right at our store counter.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-[#f8faf9] p-4 rounded-2xl space-y-1.5 border border-gray-100">
          <ShieldCheck className="w-5 h-5 text-[#059669]" />
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm">100% Genuine Warranty</h4>
          <p className="text-[11px] text-gray-500">Official brand-authorized stock with valid GST invoice.</p>
        </div>

        <div className="bg-[#f8faf9] p-4 rounded-2xl space-y-1.5 border border-gray-100">
          <Clock className="w-5 h-5 text-[#059669]" />
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm">45-Min Express Delivery</h4>
          <p className="text-[11px] text-gray-500">Fast delivery across Andheri West, Juhu, and Versova.</p>
        </div>

        <div className="bg-[#f8faf9] p-4 rounded-2xl space-y-1.5 border border-gray-100">
          <Award className="w-5 h-5 text-[#059669]" />
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Top Rated Merchant</h4>
          <p className="text-[11px] text-gray-500">Over 1,200 verified 5-star neighborhood ratings.</p>
        </div>
      </div>

      {/* Store Photos */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Storefront Photos</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="relative h-32 rounded-2xl overflow-hidden border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80"
              alt="Store Counter"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-32 rounded-2xl overflow-hidden border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
              alt="Headphones Shelf"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-32 rounded-2xl overflow-hidden border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80"
              alt="Smartwatch Display"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

