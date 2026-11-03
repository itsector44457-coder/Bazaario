'use client';

import React from 'react';
import { Percent } from 'lucide-react';

interface ShopPromoBannerProps {
  title?: string;
  description?: string;
  code?: string;
  expiryText?: string;
  className?: string;
}

export default function ShopPromoBanner({
  title = 'Diwali Dhamaka:',
  description = 'Extra 10% off on all audio products - Code',
  code = 'SHARMA10',
  expiryText = 'Ends in 3 days',
  className = '',
}: ShopPromoBannerProps) {
  const handleCopyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      alert(`Coupon code "${code}" copied to clipboard!`);
    }
  };

  return (
    <div
      className={`w-full bg-[#fffbeb] border border-amber-200/80 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs select-none shadow-2xs ${className}`}
    >
      {/* Left: Percent badge + text */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-lg bg-[#f59e0b] text-gray-950 flex items-center justify-center font-black shrink-0 shadow-2xs">
          <Percent className="w-3.5 h-3.5 stroke-[3]" />
        </div>
        <div className="text-amber-950 font-medium">
          <strong className="font-bold">{title}</strong> {description}{' '}
          <button
            type="button"
            onClick={handleCopyCode}
            className="font-black text-amber-950 hover:underline cursor-pointer"
            title="Click to copy code"
          >
            {code}
          </button>
        </div>
      </div>

      {/* Right: Expiry tag */}
      <span className="text-[11px] text-gray-500 font-medium shrink-0 self-end sm:self-auto">
        {expiryText}
      </span>
    </div>
  );
}

