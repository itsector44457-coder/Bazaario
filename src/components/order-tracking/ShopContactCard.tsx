'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Phone, MessageCircle } from 'lucide-react';

interface ShopContactCardProps {
  shopName?: string;
  phoneNumber?: string;
  onChat?: () => void;
  onWhatsApp?: () => void;
  onCall?: () => void;
  className?: string;
}

export default function ShopContactCard({
  shopName = 'Sharma Electronics',
  phoneNumber = '+91 98XXX 21045',
  onChat,
  onWhatsApp,
  onCall,
  className = '',
}: ShopContactCardProps) {
  const router = useRouter();
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs space-y-3.5 select-none ${className}`}
    >
      <h3 className="text-xs sm:text-sm font-bold text-gray-950 tracking-tight">
        Need something? Contact the shop
      </h3>

      {/* 3 Buttons Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* 1. In-App Chat Button */}
        <button
          type="button"
          onClick={onChat || (() => router.push('/messages'))}
          className="bg-[#064e3b] hover:bg-[#053d2e] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
          <span>Chat</span>
        </button>

        {/* 2. WhatsApp Button */}
        <button
          type="button"
          onClick={onWhatsApp || (() => alert(`Opening WhatsApp chat with ${shopName}`))}
          className="bg-[#e8f7f0] hover:bg-[#d8f0e4] text-[#059669] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-200/50 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>WhatsApp</span>
        </button>

        {/* 3. Call Button */}
        <button
          type="button"
          onClick={onCall || (() => alert(`Calling ${shopName} at ${phoneNumber}`))}
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 stroke-[2]" />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
}

