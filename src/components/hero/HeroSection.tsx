'use client';

import React from 'react';
import HeroBanner, { HeroBannerSlide } from './HeroBanner';
import PromoCard from './PromoCard';

interface HeroSectionProps {
  slides?: HeroBannerSlide[];
  onExploreDeals?: () => void;
  onNearbyShops?: () => void;
  onShopGroceries?: () => void;
  onRegisterShop?: () => void;
  className?: string;
}

export default function HeroSection({
  slides,
  onExploreDeals,
  onNearbyShops,
  onShopGroceries,
  onRegisterShop,
  className = '',
}: HeroSectionProps) {
  return (
    <section className={`w-full ${className}`} aria-label="Hero Highlights">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Side: Large Hero Banner (8 Columns on desktop, full width on mobile) */}
        <div className="lg:col-span-8 flex flex-col justify-stretch">
          <HeroBanner
            slides={slides}
            onExploreDeals={onExploreDeals}
            onNearbyShops={onNearbyShops}
            className="h-full"
          />
        </div>

        {/* Right Side: 2 Stacked Promo Cards – hidden on mobile to save space */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between gap-4 sm:gap-5">
          {/* Card 1: Daily Fresh */}
          <PromoCard
            badge="DAILY FRESH"
            title="Groceries in 30 minutes"
            ctaText="Shop now"
            onCtaClick={onShopGroceries}
            variant="yellow"
            iconType="groceries"
            className="flex-1"
          />

          {/* Card 2: For Shop Owners */}
          <PromoCard
            badge="FOR SHOP OWNERS"
            title="Take your shop online today"
            ctaText="Register free"
            onCtaClick={onRegisterShop}
            variant="green"
            iconType="shop"
            className="flex-1"
          />
        </div>
      </div>
    </section>
  );
}
