'use client';

import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import Image from 'next/image';

export interface HeroBannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  image: string;
}

const DEFAULT_SLIDES: HeroBannerSlide[] = [
  {
    id: 'slide-1',
    badge: 'Festive Bazaar - Up to 40% off',
    title: 'Shop from trusted local stores near you',
    subtitle: 'Order online, chat with the shopkeeper, or pick up in minutes.',
    primaryBtnText: 'Explore deals',
    secondaryBtnText: 'Nearby shops',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'slide-2',
    badge: 'Fresh Harvest Daily',
    title: 'Direct farm produce & organic grocery',
    subtitle: 'Harvested this morning, at your doorstep in 30 minutes.',
    primaryBtnText: 'Order Fresh',
    secondaryBtnText: 'View Farms',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'slide-3',
    badge: 'Artisanal & Handcrafted',
    title: 'Support authentic neighborhood makers',
    subtitle: 'Hand-thrown ceramics, woven textiles & indigenous crafts.',
    primaryBtnText: 'Discover Art',
    secondaryBtnText: 'Meet Artisans',
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1400&q=80',
  },
];

interface HeroBannerProps {
  slides?: HeroBannerSlide[];
  onExploreDeals?: () => void;
  onNearbyShops?: () => void;
  className?: string;
}

export default function HeroBanner({
  slides = DEFAULT_SLIDES,
  onExploreDeals,
  onNearbyShops,
  className = '',
}: HeroBannerProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = slides[activeSlide] || slides[0];

  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-sm min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none ${className}`}
    >
      {/* Background Image */}
      <Image
        src={current.image}
        alt={current.title}
        fill
        priority
        className="object-cover object-center transition-all duration-700 brightness-[0.82]"
      />

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent pointer-events-none" />

      {/* Top Tag Badge */}
      <div className="relative z-10 self-start">
        <div className="inline-flex items-center gap-2 bg-[#f59e0b] text-gray-950 font-extrabold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-sm">
          <Tag className="w-3.5 h-3.5 fill-gray-950 stroke-1" />
          <span>{current.badge}</span>
        </div>
      </div>

      {/* Center Main Text */}
      <div className="relative z-10 max-w-lg space-y-2.5 my-auto py-4">
        <h1 className="text-2xl sm:text-4xl md:text-[42px] font-black text-white tracking-tight leading-[1.15]">
          {current.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-normal max-w-md">
          {current.subtitle}
        </p>
      </div>

      {/* Bottom Row: Action Buttons & Carousel Dots */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExploreDeals}
            className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] active:scale-[0.98] text-white text-xs sm:text-sm font-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {current.primaryBtnText}
          </button>
          <button
            type="button"
            onClick={onNearbyShops}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 hover:border-white/60 active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition cursor-pointer"
          >
            {current.secondaryBtnText}
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-1.5 self-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-7 h-2 bg-white shadow-xs'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
