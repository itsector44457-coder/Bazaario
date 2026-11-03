'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface SellerProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  bgColor?: string;
}

const DEFAULT_MORE_PRODUCTS: SellerProductItem[] = [
  {
    id: 'sp-3',
    name: 'Fit Pro Smartwatch',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    bgColor: '#edf5ee',
  },
  {
    id: 'sp-4',
    name: 'Rockerz 550',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
    bgColor: '#eef5f0',
  },
  {
    id: 'sp-5',
    name: 'Active 2 Watch',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f2f4f6',
  },
  {
    id: 'sp-6',
    name: 'Classic Wired Monitor',
    price: 4290,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    bgColor: '#f8f7f2',
  },
];

interface MoreFromSellerProps {
  sellerName?: string;
  products?: SellerProductItem[];
  onSelectProduct?: (product: SellerProductItem) => void;
  onVisitStore?: () => void;
  className?: string;
}

export default function MoreFromSeller({
  sellerName = 'Sharma Electronics',
  products = DEFAULT_MORE_PRODUCTS,
  onSelectProduct,
  onVisitStore,
  className = '',
}: MoreFromSellerProps) {
  return (
    <div className={`w-full space-y-4 select-none ${className}`}>
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
          More from {sellerName}
        </h2>
        {onVisitStore ? (
          <button
            type="button"
            onClick={onVisitStore}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#059669] hover:underline cursor-pointer"
          >
            <span>Visit store</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        ) : (
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#059669] hover:underline cursor-pointer"
          >
            <span>Visit store</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        )}
      </div>

      {/* 2. Grid of 4 Products */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct?.(prod)}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Image Area */}
            <div
              className="relative h-44 sm:h-48 w-full overflow-hidden flex items-center justify-center p-4 transition-colors"
              style={{ backgroundColor: prod.bgColor || '#f3f6f3' }}
            >
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title & Price */}
            <div className="p-3.5 space-y-1">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#084c37] transition">
                {prod.name}
              </h3>
              <p className="text-sm sm:text-base font-extrabold text-gray-950">
                ₹{prod.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

