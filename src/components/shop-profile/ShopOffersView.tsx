'use client';

import React from 'react';
import { Tag, Clock, ArrowRight } from 'lucide-react';

export default function ShopOffersView() {
  const offers = [
    {
      id: 'o-1',
      code: 'SHARMA10',
      title: 'Diwali Audio Special',
      discount: 'Extra 10% OFF',
      desc: 'Applicable on all ANC headphones, neckbands, and speakers above ₹1,499.',
      expiry: 'Valid till 5 Nov 2026',
    },
    {
      id: 'o-2',
      code: 'LOCALFIRST',
      title: 'First Local Order',
      discount: 'Flat ₹150 OFF',
      desc: 'Welcome offer for new shoppers living within 3km of Sharma Electronics.',
      expiry: 'Valid for next 14 days',
    },
    {
      id: 'o-3',
      code: 'FREEPICKUP',
      title: 'Zero Delivery Fee',
      discount: 'Free Delivery',
      desc: 'Free express 45-min delivery on all orders above ₹999.',
      expiry: 'Ongoing Store Special',
    },
    {
      id: 'o-4',
      code: 'WATCH25',
      title: 'Wearables Clearance',
      discount: '₹250 Cashback',
      desc: 'Buy any smartwatch and receive instant store credit on your next accessory.',
      expiry: 'Limited stock',
    },
  ];

  const handleCopy = (code: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      alert(`Coupon "${code}" copied!`);
    }
  };

  return (
    <div className="w-full space-y-4 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offers.map((off) => (
          <div
            key={off.id}
            className="bg-white rounded-3xl border border-gray-100 p-5 space-y-3 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                  {off.discount}
                </span>
                <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {off.expiry}
                </span>
              </div>
              <h4 className="font-bold text-gray-950 text-base">{off.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{off.desc}</p>
            </div>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-gray-100 px-3 py-1 rounded-lg text-gray-800">
                {off.code}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(off.code)}
                className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
              >
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

