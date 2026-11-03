'use client';

import React from 'react';
import { Tag } from 'lucide-react';

interface ProductOffersCardProps {
  offers?: { id: string; text: string; code?: string }[];
  className?: string;
}

const DEFAULT_OFFERS = [
  {
    id: 'off-1',
    text: 'Flat ₹150 off with code LOCAL150 on orders above ₹1,999',
    code: 'LOCAL150',
  },
  {
    id: 'off-2',
    text: '5% cashback on UPI payments',
  },
];

export default function ProductOffersCard({
  offers = DEFAULT_OFFERS,
  className = '',
}: ProductOffersCardProps) {
  const handleCopyCode = (code: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      alert(`Coupon code "${code}" copied!`);
    }
  };

  return (
    <div
      className={`w-full bg-[#fffbeb] border border-amber-200/80 rounded-3xl p-4 sm:p-5 space-y-2.5 select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
        <Tag className="w-3.5 h-3.5 text-amber-700" />
        <span>Offers</span>
      </div>

      <div className="space-y-2 text-xs text-amber-900/90 leading-relaxed font-medium">
        {offers.map((offer) => (
          <div key={offer.id} className="flex items-start gap-1.5">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <span>{offer.text}</span>
              {offer.code && (
                <button
                  type="button"
                  onClick={() => handleCopyCode(offer.code!)}
                  className="ml-1.5 font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                >
                  Copy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

