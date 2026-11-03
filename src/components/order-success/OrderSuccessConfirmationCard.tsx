'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface OrderSuccessConfirmationCardProps {
  orderId?: string;
  customerName?: string;
  amountPaid?: number;
  paymentMethod?: string;
  placedOn?: string;
  className?: string;
}

export default function OrderSuccessConfirmationCard({
  orderId = '#BZ-48213',
  customerName = 'Rahul',
  amountPaid = 3896,
  paymentMethod = 'UPI · HDFC',
  placedOn = '29 Oct, 3:42 PM',
  className = '',
}: OrderSuccessConfirmationCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 text-center shadow-xs ${className}`}
    >
      {/* Big Green Success Check Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#059669] text-white mx-auto flex items-center justify-center shadow-md mb-6">
        <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
        Order placed successfully!
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8 font-normal leading-relaxed">
        Thank you, {customerName}. Your shops have been notified and are preparing your order.
      </p>

      {/* 4-Item Details Pill / Box */}
      <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-4 sm:p-5 max-w-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left sm:text-center">
          {/* 1. Order ID */}
          <div>
            <span className="block text-[11px] text-gray-400 font-medium mb-0.5">Order ID</span>
            <span className="block text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
              {orderId}
            </span>
          </div>

          {/* 2. Amount paid */}
          <div>
            <span className="block text-[11px] text-gray-400 font-medium mb-0.5">Amount paid</span>
            <span className="block text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
              ₹{amountPaid.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 3. Payment */}
          <div>
            <span className="block text-[11px] text-gray-400 font-medium mb-0.5">Payment</span>
            <span className="block text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
              {paymentMethod}
            </span>
          </div>

          {/* 4. Placed on */}
          <div>
            <span className="block text-[11px] text-gray-400 font-medium mb-0.5">Placed on</span>
            <span className="block text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
              {placedOn}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

