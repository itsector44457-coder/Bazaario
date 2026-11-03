'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Store, Star, ShoppingCart, Heart } from 'lucide-react';

export interface TrendingProductItem {
  id: string;
  name: string;
  category?: string;
  storeName: string;
  storeDistance: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: string;
  deliveryTag?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isWishlisted?: boolean;
}

interface TrendingProductCardProps {
  product: TrendingProductItem;
  onAddToCart?: (product: TrendingProductItem) => void;
  onToggleWishlist?: (id: string) => void;
  onClick?: (product: TrendingProductItem) => void;
  className?: string;
}

export default function TrendingProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onClick,
  className = '',
}: TrendingProductCardProps) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(product.isWishlisted ?? false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
    if (onToggleWishlist) onToggleWishlist(product.id);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      router.push(`/product?id=${product.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-3xl border border-gray-200/80 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer select-none shadow-2xs ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative h-56 w-full bg-slate-50 overflow-hidden flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Badge: Discount (Orange) or Delivery Tag (Green) */}
        {product.discountPercentage && (
          <span className="absolute top-3 left-3 bg-[#f59e0b] text-gray-950 text-[11px] font-black px-2 py-0.5 rounded-lg shadow-xs">
            {product.discountPercentage}
          </span>
        )}
        {!product.discountPercentage && product.deliveryTag && (
          <span className="absolute top-3 left-3 bg-[#10b981] text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg shadow-xs">
            {product.deliveryTag}
          </span>
        )}

        {/* Top-Right Wishlist Heart */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs text-gray-600 hover:text-rose-500 hover:scale-110 transition cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition ${
              wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-500 stroke-[2]'
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Store Name & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Store className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
            <span className="truncate font-semibold text-slate-600">
              {product.storeName} • {product.storeDistance}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-[#064e3b] transition tracking-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-black text-slate-900">{product.rating}</span>
            <span className="text-slate-400 font-medium">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900 tracking-tight">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Green Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add to cart"
            className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] active:scale-[0.95] text-white flex items-center justify-center shadow-xs hover:shadow transition cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
