'use client';

import React from 'react';
import { Compass } from 'lucide-react';

interface OrderSuccessActionsProps {
  onTrackOrder: () => void;
  onViewOrders: () => void;
  onContinueShopping: () => void;
  className?: string;
}

export default function OrderSuccessActions({
  onTrackOrder,
  onViewOrders,
  onContinueShopping,
  className = '',
}: OrderSuccessActionsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 ${className}`}>
      {/* 1. Track Order Button */}
      <button
        type="button"
        onClick={onTrackOrder}
        className="w-full sm:w-auto min-w-[160px] bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Compass className="w-4 h-4 stroke-[2.5]" />
        <span>Track order</span>
      </button>

      {/* 2. View My Orders Button */}
      <button
        type="button"
        onClick={onViewOrders}
        className="w-full sm:w-auto min-w-[160px] bg-white border border-[#059669] hover:bg-emerald-50/50 text-[#059669] font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition flex items-center justify-center cursor-pointer"
      >
        View my orders
      </button>

      {/* 3. Continue Shopping Button */}
      <button
        type="button"
        onClick={onContinueShopping}
        className="w-full sm:w-auto text-gray-700 hover:text-gray-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition flex items-center justify-center cursor-pointer"
      >
        Continue shopping
      </button>
    </div>
  );
}

