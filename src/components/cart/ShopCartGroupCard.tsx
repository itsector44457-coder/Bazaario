'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  MessageSquare,
  Bookmark,
  Trash2,
  Minus,
  Plus,
} from 'lucide-react';

export interface ShopCartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  bgColor?: string;
}

export interface ShopGroupData {
  shopId: string;
  shopName: string;
  avatarText: string;
  avatarBg: string;
  isVerified?: boolean;
  deliveryTime: string;
  deliveryFee: number;
  fulfilmentType: 'delivery' | 'pickup';
  item: ShopCartItem;
}

interface ShopCartGroupCardProps {
  data: ShopGroupData;
  onUpdateQuantity: (newQty: number) => void;
  onRemoveItem: () => void;
  onSaveForLater: () => void;
  onToggleFulfilment: (type: 'delivery' | 'pickup') => void;
  onChatWithShop?: () => void;
  className?: string;
}

export default function ShopCartGroupCard({
  data,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  onToggleFulfilment,
  onChatWithShop,
  className = '',
}: ShopCartGroupCardProps) {
  const { item } = data;
  const router = useRouter();

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 space-y-4 shadow-2xs select-none ${className}`}
    >
      {/* 1. Shop Header */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar Square */}
          <div
            className="w-7 h-7 rounded-lg text-white font-black text-xs flex items-center justify-center shrink-0 tracking-wider shadow-2xs"
            style={{ backgroundColor: data.avatarBg }}
          >
            {data.avatarText}
          </div>

          {/* Shop Name & Verified Badge */}
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-gray-950 text-sm">{data.shopName}</h3>
            {data.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] fill-emerald-100" />
            )}
          </div>
        </div>

        {/* Chat with shop button */}
        <button
          type="button"
          onClick={
            onChatWithShop ||
            (() => router.push('/messages'))
          }
          className="flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:underline cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat with shop</span>
        </button>
      </div>

      {/* 2. Product Item Row */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Image */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-2"
            style={{ backgroundColor: item.bgColor || '#f3f7f5' }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-1.5"
            />
          </div>

          {/* Details */}
          <div className="space-y-1 min-w-0 flex-1">
            <h4 className="font-bold text-gray-950 text-sm sm:text-base leading-snug line-clamp-1">
              {item.name}
            </h4>
            <p className="text-xs text-gray-500 font-medium">{item.variant}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-base sm:text-lg font-extrabold text-gray-950">
                ₹{item.price.toLocaleString()}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Save for later & Remove */}
            <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 font-medium">
              <button
                type="button"
                onClick={onSaveForLater}
                className="flex items-center gap-1 hover:text-gray-900 transition cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save for later</span>
              </button>
              <button
                type="button"
                onClick={onRemoveItem}
                className="flex items-center gap-1 hover:text-rose-600 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 sm:w-8 text-center text-xs font-bold text-gray-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Fulfilment Selector Bar */}
      <div className="flex items-center gap-5 pt-3 border-t border-gray-50 text-xs font-semibold text-gray-700 flex-wrap">
        {/* Delivery Radio */}
        <label
          onClick={() => onToggleFulfilment('delivery')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
              data.fulfilmentType === 'delivery'
                ? 'border-[#059669]'
                : 'border-gray-300'
            }`}
          >
            {data.fulfilmentType === 'delivery' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            )}
          </span>
          <span
            className={
              data.fulfilmentType === 'delivery'
                ? 'text-gray-900 font-bold'
                : 'text-gray-600'
            }
          >
            Delivery · {data.deliveryTime} · ₹{data.deliveryFee}
          </span>
        </label>

        {/* Pickup Radio */}
        <label
          onClick={() => onToggleFulfilment('pickup')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
              data.fulfilmentType === 'pickup'
                ? 'border-[#059669]'
                : 'border-gray-300'
            }`}
          >
            {data.fulfilmentType === 'pickup' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            )}
          </span>
          <span
            className={
              data.fulfilmentType === 'pickup'
                ? 'text-gray-900 font-bold'
                : 'text-gray-600'
            }
          >
            Store pickup · Free
          </span>
        </label>
      </div>
    </div>
  );
}

