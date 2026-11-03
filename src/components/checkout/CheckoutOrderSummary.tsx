'use client';

import React from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export interface CheckoutItem {
  id: string;
  name: string;
  store: string;
  quantity: number;
  price: number;
  image: string;
  bgColor?: string;
}

interface CheckoutOrderSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  delivery: number;
  coupon: number;
  platformFee: number;
  total: number;
  onPay: () => void;
  onEditCart: () => void;
  className?: string;
}

export default function CheckoutOrderSummary({
  items,
  subtotal,
  delivery,
  coupon,
  platformFee,
  total,
  onPay,
  onEditCart,
  className = '',
}: CheckoutOrderSummaryProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs select-none sticky top-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Order summary</h3>
        <button
          type="button"
          onClick={onEditCart}
          className="text-xs sm:text-sm font-semibold text-[#059669] hover:underline cursor-pointer"
        >
          Edit cart
        </button>
      </div>

      {/* Item list */}
      <div className="space-y-3.5 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative border border-gray-100"
                style={{ backgroundColor: item.bgColor || '#f3f4f6' }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {item.store} · ×{item.quantity}
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-gray-900 shrink-0">
              ₹{item.price.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* Breakdown */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-gray-600">
          <span className="font-medium">Subtotal</span>
          <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <span className="font-medium">Delivery</span>
          <span className="font-bold text-gray-900">₹{delivery}</span>
        </div>

        {coupon > 0 && (
          <div className="flex justify-between items-center text-[#059669]">
            <span className="font-medium">Coupon</span>
            <span className="font-bold">-₹{coupon.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span className="font-medium">Platform fee</span>
          <span className="font-bold text-gray-900">₹{platformFee}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* To pay */}
      <div className="flex justify-between items-baseline mb-5">
        <span className="text-sm font-bold text-gray-900">To pay</span>
        <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Pay CTA Button */}
      <button
        type="button"
        onClick={onPay}
        className="w-full bg-[#059669] hover:bg-[#047857] active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2 text-sm"
      >
        <Lock className="w-4 h-4 stroke-[2.5]" />
        <span>Pay ₹{total.toLocaleString('en-IN')}</span>
      </button>

      {/* Disclaimer */}
      <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
        By placing this order you agree to Bazaario&apos;s Terms. Each shop will receive its part of your order separately.
      </p>
    </div>
  );
}
