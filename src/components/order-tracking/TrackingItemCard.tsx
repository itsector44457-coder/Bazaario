'use client';

import React from 'react';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';

interface TrackingItemCardProps {
  itemName?: string;
  itemVariant?: string;
  itemPrice?: number;
  paidTotal?: number;
  itemImage?: string;
  bgColor?: string;
  onHelp?: () => void;
  onCancelItem?: () => void;
  className?: string;
}

export default function TrackingItemCard({
  itemName = 'Wireless ANC Headphones',
  itemVariant = 'Qty 1 · Midnight Black',
  itemPrice = 2499,
  paidTotal = 2529,
  itemImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  bgColor = '#edf5f0',
  onHelp,
  onCancelItem,
  className = '',
}: TrackingItemCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs space-y-4 select-none ${className}`}
    >
      {/* 1. Item Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 relative border border-gray-100"
            style={{ backgroundColor: bgColor }}
          >
            <Image
              src={itemImage}
              alt={itemName}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate">
              {itemName}
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">
              {itemVariant}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-gray-900 shrink-0">
          ₹{itemPrice.toLocaleString('en-IN')}
        </span>
      </div>

      {/* 2. Paid (incl. delivery) Total Line */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
        <span className="text-gray-500 font-medium">Paid (incl. delivery)</span>
        <span className="font-extrabold text-gray-900">
          ₹{paidTotal.toLocaleString('en-IN')}
        </span>
      </div>

      {/* 3. Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={onHelp || (() => alert('Opening help & support modal'))}
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 stroke-[2]" />
          <span>Help</span>
        </button>

        <button
          type="button"
          onClick={
            onCancelItem ||
            (() => {
              if (confirm('Are you sure you want to cancel this item?')) {
                alert('Cancellation request submitted.');
              }
            })
          }
          className="bg-white hover:bg-red-50/50 border border-red-200 text-red-600 hover:text-red-700 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer"
        >
          Cancel item
        </button>
      </div>
    </div>
  );
}

