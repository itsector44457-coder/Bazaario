'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Star, Bike, Clock } from 'lucide-react';

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  deliveryTime: string;
  productsCount: number;
  isOpen: boolean;
  openTimeText?: string;
  image: string;
  verified?: boolean;
}

interface ShopCardProps {
  shop: ShopItem;
  onClick?: (shop: ShopItem) => void;
  className?: string;
}

export default function ShopCard({ shop, onClick, className = '' }: ShopCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(shop);
    } else {
      router.push(`/shop?id=${shop.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group bg-white rounded-3xl border border-gray-200/80 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer select-none shadow-2xs ${className}`}
    >
      {/* Shop Image with Status Badge */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge (Open now / Opens 10 AM) */}
        <div className="absolute top-3 left-3">
          {shop.isOpen ? (
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open now</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs text-amber-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{shop.openTimeText || 'Opens 10 AM'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shop Details */}
      <div className="p-4 space-y-2.5">
        <div>
          {/* Shop Name + Verified Check */}
          <div className="flex items-center gap-1.5">
            <h3 className="font-black text-slate-900 text-base group-hover:text-[#064e3b] transition truncate tracking-tight">
              {shop.name}
            </h3>
            {shop.verified !== false && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
            )}
          </div>

          {/* Subtitle: Category • Distance */}
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {shop.category} • {shop.distance}
          </p>
        </div>

        {/* Metrics Row: Rating, Bike Delivery, Products Count */}
        <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 border-t border-gray-100">
          {/* Rating */}
          <div className="flex items-center gap-1 font-black text-emerald-700">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{shop.rating}</span>
          </div>

          {/* Delivery Time with Bike Icon */}
          <div className="flex items-center gap-1 font-semibold text-slate-600">
            <Bike className="w-3.5 h-3.5 text-slate-400" />
            <span>{shop.deliveryTime}</span>
          </div>

          {/* Products Count */}
          <span className="text-slate-300">•</span>
          <span className="font-medium text-slate-500">{shop.productsCount} products</span>
        </div>
      </div>
    </div>
  );
}
