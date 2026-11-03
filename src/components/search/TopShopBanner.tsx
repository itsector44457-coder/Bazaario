'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

interface TopShopBannerProps {
  categoryKeyword?: string;
  shopName?: string;
  verified?: boolean;
  stockCountText?: string;
  rating?: number;
  distance?: string;
  deliveryTime?: string;
  image?: string;
  onVisitShop?: () => void;
  className?: string;
}

export default function TopShopBanner({
  categoryKeyword = 'HEADPHONES',
  shopName = 'Sharma Electronics',
  verified = true,
  stockCountText = '38 headphones in stock',
  rating = 4.6,
  distance = '1.2 km away',
  deliveryTime = 'Delivers in 45 min',
  image = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
  onVisitShop,
  className = '',
}: TopShopBannerProps) {
  const router = useRouter();

  const handleVisit = () => {
    if (onVisitShop) {
      onVisitShop();
    } else {
      router.push('/shop');
    }
  };

  return (
    <div
      className={`w-full bg-[#084c37] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm select-none ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Shop Image Thumbnail */}
        <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-emerald-700/60 shadow-xs">
          <Image
            src={image}
            alt={shopName}
            fill
            className="object-cover"
          />
        </div>

        {/* Shop Information */}
        <div className="space-y-0.5">
          <p className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#fbbf24]">
            TOP SHOP FOR {categoryKeyword}
          </p>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base sm:text-xl font-bold tracking-tight text-white">
              {shopName}
            </h3>
            {verified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            )}
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium">
            {stockCountText} · {rating}★ · {distance} · {deliveryTime}
          </p>
        </div>
      </div>

      {/* Right: Visit Shop Button */}
      <button
        type="button"
        onClick={handleVisit}
        className="w-full sm:w-auto bg-white hover:bg-emerald-50 active:scale-95 text-[#084c37] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer text-center"
      >
        Visit shop
      </button>
    </div>
  );
}

