'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Phone,
  MessageCircle,
  Navigation,
  Bike,
  Star,
  Flag,
} from 'lucide-react';

interface ChatShopDetailsSidebarProps {
  shopName?: string;
  shopAddress?: string;
  shopRating?: number;
  openUntil?: string;
  shopPhoto?: string;
  linkedOrderId?: string;
  linkedOrderStatus?: string;
  linkedOrderEta?: string;
  onCall?: () => void;
  onWhatsApp?: () => void;
  onDirections?: () => void;
  className?: string;
}

export default function ChatShopDetailsSidebar({
  shopName = 'Sharma Electronics',
  shopAddress = 'Lokhandwala Market, Andheri W',
  shopRating = 4.8,
  openUntil = 'Open till 9:30 PM',
  shopPhoto = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
  linkedOrderId = '#BZ-48213-A',
  linkedOrderStatus = 'Out for delivery',
  linkedOrderEta = '12 min',
  onCall,
  onWhatsApp,
  onDirections,
  className = '',
}: ChatShopDetailsSidebarProps) {
  const router = useRouter();

  return (
    <div
      className={`w-full md:w-72 lg:w-80 bg-white border-l border-gray-100 p-5 flex flex-col justify-between select-none space-y-6 ${className}`}
    >
      <div className="space-y-5">
        {/* 1. Shop Image & Info Card */}
        <div className="space-y-3">
          <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-gray-100 shadow-2xs">
            <Image
              src={shopPhoto}
              alt={shopName}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-gray-950 tracking-tight">
              {shopName}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{shopAddress}</p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mt-1">
              <span className="flex items-center gap-0.5 text-[#f59e0b]">
                <Star className="w-3.5 h-3.5 fill-current stroke-none" />
                <span>{shopRating}</span>
              </span>
              <span>·</span>
              <span className="text-gray-500 font-normal">{openUntil}</span>
            </div>
          </div>

          {/* 3 Contact Pills (Call, WhatsApp, Directions) */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={onCall || (() => alert(`Calling ${shopName}`))}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl border border-gray-200/90 text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
              <span>Call</span>
            </button>

            <button
              type="button"
              onClick={onWhatsApp || (() => alert(`WhatsApp ${shopName}`))}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl border border-emerald-200/60 text-[11px] font-bold text-[#059669] bg-[#e8f7f0] hover:bg-[#d8f0e4] transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#059669] stroke-[2.2]" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={
                onDirections ||
                (() => alert(`Directions to ${shopName} in Google Maps`))
              }
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl border border-gray-200/90 text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
              <span>Directions</span>
            </button>
          </div>
        </div>

        {/* 2. Linked Order Box */}
        {linkedOrderId && (
          <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-4 space-y-3">
            <div>
              <span className="block text-[11px] text-gray-400 font-medium">
                Linked order
              </span>
              <span className="block text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                {linkedOrderId}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#d97706] mt-0.5">
                <Bike className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>
                  {linkedOrderStatus} · {linkedOrderEta}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/order-tracking')}
              className="w-full bg-[#064e3b] hover:bg-[#043d2e] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
            >
              Track order
            </button>
          </div>
        )}

        {/* 3. Visit Shop Button */}
        <button
          type="button"
          onClick={() => router.push('/shop')}
          className="w-full bg-white hover:bg-emerald-50/50 border border-[#059669] text-[#059669] py-2.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          Visit shop
        </button>
      </div>

      {/* 4. Report Shop Link */}
      <div className="pt-4 border-t border-gray-100 text-center">
        <button
          type="button"
          onClick={() => alert(`Report modal for ${shopName}`)}
          className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-500 transition cursor-pointer"
        >
          <Flag className="w-3 h-3 stroke-[2]" />
          <span>Report this shop</span>
        </button>
      </div>
    </div>
  );
}

