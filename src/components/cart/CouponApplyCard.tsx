'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface CouponApplyCardProps {
  initialCode?: string;
  isApplied?: boolean;
  onApplyCoupon?: (code: string) => void;
  onRemoveCoupon?: () => void;
  className?: string;
}

export default function CouponApplyCard({
  initialCode = 'LOCAL150',
  isApplied = true,
  onApplyCoupon,
  onRemoveCoupon,
  className = '',
}: CouponApplyCardProps) {
  const [couponCode, setCouponCode] = useState(initialCode);
  const [applied, setApplied] = useState(isApplied);

  const handleToggle = () => {
    if (applied) {
      setApplied(false);
      onRemoveCoupon?.();
    } else {
      if (!couponCode.trim()) return;
      setApplied(true);
      onApplyCoupon?.(couponCode.trim());
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 space-y-2.5 shadow-2xs select-none ${className}`}
    >
      <h3 className="font-bold text-gray-900 text-xs">Apply coupon</h3>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value.toUpperCase());
            if (applied) setApplied(false);
          }}
          placeholder="Enter coupon code"
          className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 shadow-2xs"
        />

        <button
          type="button"
          onClick={handleToggle}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer flex items-center gap-1 ${
            applied
              ? 'bg-[#e6f4ea] text-[#059669] border border-emerald-200/60'
              : 'bg-[#059669] text-white hover:bg-[#047857]'
          }`}
        >
          {applied ? (
            <>
              <span>Applied</span>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </>
          ) : (
            <span>Apply</span>
          )}
        </button>
      </div>
    </div>
  );
}

