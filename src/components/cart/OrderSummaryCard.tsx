'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OrderSummaryCardProps {
  totalItemsCount?: number;
  subtotal?: number;
  deliveryFee?: number;
  shopsCount?: number;
  couponCode?: string;
  couponDiscount?: number;
  platformFee?: number;
  total?: number;
  totalSavings?: number;
  onProceedToCheckout?: () => void;
  className?: string;
}

export default function OrderSummaryCard({
  totalItemsCount = 3,
  subtotal = 3947,
  deliveryFee = 90,
  shopsCount = 3,
  couponCode = 'LOCAL150',
  couponDiscount = 150,
  platformFee = 9,
  total = 3896,
  totalSavings = 921,
  onProceedToCheckout,
  className = '',
}: OrderSummaryCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 space-y-4 shadow-2xs select-none ${className}`}
    >
      <h3 className="font-extrabold text-gray-950 text-base">Order summary</h3>

      {/* Breakdown lines */}
      <div className="space-y-2.5 text-xs">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-gray-600">
          <span className="font-medium">Subtotal ({totalItemsCount} items)</span>
          <span className="font-bold text-gray-950">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Delivery fee */}
        <div className="flex items-center justify-between text-gray-600">
          <span className="font-medium">Delivery ({shopsCount} shops)</span>
          <span className="font-bold text-gray-950">
            {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
          </span>
        </div>

        {/* Coupon Discount */}
        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-[#059669] font-medium">
            <span>Coupon {couponCode}</span>
            <span className="font-bold">-₹{couponDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Platform Fee */}
        <div className="flex items-center justify-between text-gray-600">
          <span className="font-medium">Platform fee</span>
          <span className="font-bold text-gray-950">₹{platformFee}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between">
        <span className="font-bold text-gray-950 text-sm">Total</span>
        <span className="font-black text-xl sm:text-2xl text-gray-950">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Savings pill banner */}
      {totalSavings > 0 && (
        <div className="bg-[#e6f4ea] text-[#065f46] rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200/60">
          <span className="text-sm">🌱</span>
          <span>You&apos;re saving ₹{totalSavings.toLocaleString('en-IN')} on this order</span>
        </div>
      )}

      {/* Big Checkout CTA */}
      <button
        type="button"
        onClick={onProceedToCheckout}
        className="w-full bg-[#059669] hover:bg-[#047857] active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
      >
        <span>Proceed to checkout</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Payment Trust Badges */}
      <div className="pt-1 flex items-center justify-center gap-3 text-gray-400 text-[11px] font-bold">
        <span className="bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded text-gray-600 font-serif italic text-xs">
          VISA
        </span>
        <span className="bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded text-gray-600 font-sans text-xs">
          Mastercard
        </span>
        <span className="bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded text-gray-600 font-sans text-xs">
          G Pay
        </span>
        <span className="bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded text-gray-600 font-mono text-xs">
          UPI
        </span>
      </div>
    </div>
  );
}
