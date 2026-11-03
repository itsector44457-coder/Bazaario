'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';

export interface ShopCatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: string;
  badge?: {
    text: string;
    variant: 'discount' | 'stock';
  };
  rating: number;
  reviewsCount: number;
  image: string;
  bgColor?: string;
}

interface ShopProductCardProps {
  product: ShopCatalogProduct;
  onAddToCart?: (product: ShopCatalogProduct) => void;
  onClick?: (product: ShopCatalogProduct) => void;
  className?: string;
}

export default function ShopProductCard({
  product,
  onAddToCart,
  onClick,
  className = '',
}: ShopProductCardProps) {
  const router = useRouter();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      router.push('/product');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-2xl border border-gray-100 hover:border-emerald-500/30 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer select-none ${className}`}
    >
      {/* Product Image Area */}
      <div
        className="relative h-52 sm:h-56 w-full overflow-hidden flex items-center justify-center p-4 transition-colors"
        style={{ backgroundColor: product.bgColor || '#f3f7f5' }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs z-10 ${
              product.badge.variant === 'discount'
                ? 'bg-[#fbbf24] text-gray-950 font-black'
                : 'bg-gray-900 text-white font-semibold'
            }`}
          >
            {product.badge.text}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 group-hover:text-[#084c37] transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-900">{product.rating}</span>
            <span className="text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Green Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add to cart"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#059669] hover:bg-[#047857] active:scale-95 text-white flex items-center justify-center shadow-2xs transition cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

