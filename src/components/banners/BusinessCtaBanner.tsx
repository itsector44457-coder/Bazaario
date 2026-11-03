'use client';

import React from 'react';
import Image from 'next/image';

interface BusinessCtaBannerProps {
  onRegisterShop?: () => void;
  className?: string;
}

export default function BusinessCtaBanner({
  onRegisterShop,
  className = '',
}: BusinessCtaBannerProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-sm p-6 sm:p-8 md:p-10 select-none ${className}`}
    >
      {/* Background Image: Indian local shopkeeper */}
      <Image
        src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1400&q=80"
        alt="Bazaario For Business Shop Owner"
        fill
        className="object-cover object-center brightness-[0.70]"
      />

      {/* Dark Forest Green Tint Overlay matching screenshot */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#063a2b] via-[#052e22]/90 to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          {/* Small Amber Badge */}
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#fbbf24] block">
            Bazaario For Business
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Own a shop? Reach thousands of buyers nearby.
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
            Zero listing fee • Pay only a small commission when you sell • Weekly payouts
          </p>
        </div>

        {/* Action Button: Register your shop */}
        <button
          type="button"
          onClick={onRegisterShop}
          className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] active:scale-[0.98] text-white font-black text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl shadow-md transition shrink-0 cursor-pointer self-start md:self-auto"
        >
          Register your shop
        </button>
      </div>
    </div>
  );
}
