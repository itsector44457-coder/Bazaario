'use client';

import React from 'react';
import { Store } from 'lucide-react';

interface ShopInfoCardProps {
  monSatTimings?: string;
  sundayTimings?: string;
  deliveryRadius?: string;
  paymentMethods?: string;
  gstin?: string;
  className?: string;
}

export default function ShopInfoCard({
  monSatTimings = '10 AM – 9:30 PM',
  sundayTimings = '11 AM – 6 PM',
  deliveryRadius = '6 km',
  paymentMethods = 'UPI, Card, COD',
  gstin = '27AAB...125',
  className = '',
}: ShopInfoCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 space-y-4 shadow-2xs select-none ${className}`}
    >
      <h3 className="font-bold text-gray-950 text-sm">Shop info</h3>

      {/* Decorative Store Icon Circle */}
      <div className="w-full bg-[#f0f9f4] rounded-2xl py-5 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
          <Store className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* Key-Value Details */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-gray-600">
          <span className="text-gray-500 font-medium">Mon - Sat</span>
          <span className="font-bold text-gray-900">{monSatTimings}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="text-gray-500 font-medium">Sunday</span>
          <span className="font-bold text-gray-900">{sundayTimings}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="text-gray-500 font-medium">Delivery radius</span>
          <span className="font-bold text-gray-900">{deliveryRadius}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="text-gray-500 font-medium">Payments</span>
          <span className="font-bold text-gray-900">{paymentMethods}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="text-gray-500 font-medium">GSTIN</span>
          <span className="font-bold text-gray-900 font-mono text-[11px]">{gstin}</span>
        </div>
      </div>
    </div>
  );
}

