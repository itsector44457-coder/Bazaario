'use client';

import React from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  Phone,
  Navigation,
  CheckCircle2,
} from 'lucide-react';

interface MerchantContactCardProps {
  storeName?: string;
  location?: string;
  openUntil?: string;
  rating?: number;
  responseRate?: string;
  yearsOnPlatform?: string;
  phone?: string;
  image?: string;
  onChatWithSeller?: () => void;
  onWhatsApp?: () => void;
  onCall?: () => void;
  onGetDirections?: () => void;
  className?: string;
}

export default function MerchantContactCard({
  storeName = 'Sharma Electronics',
  location = 'Lokhandwala, Andheri W · 1.2 km',
  openUntil = 'Open till 9:30 PM',
  rating = 4.6,
  responseRate = '98%',
  yearsOnPlatform = '6 yrs',
  phone = '+91 98XXX 21045',
  image = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
  onChatWithSeller,
  onWhatsApp,
  onCall,
  onGetDirections,
  className = '',
}: MerchantContactCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 space-y-4 shadow-2xs select-none ${className}`}
    >
      {/* 1. Header: Store photo & details */}
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={image}
            alt={storeName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-950 text-base truncate">
            {storeName}
          </h3>
          <p className="text-xs text-gray-500 truncate">{location}</p>
          <div className="flex items-center gap-1.5 text-xs text-[#059669] font-semibold mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>{openUntil}</span>
          </div>
        </div>
      </div>

      {/* 2. Stats Row (3 Columns) */}
      <div className="grid grid-cols-3 gap-2 bg-[#f8faf9] p-2.5 rounded-2xl text-center">
        <div>
          <p className="text-sm font-extrabold text-gray-900">{rating}★</p>
          <p className="text-[11px] text-gray-500 font-medium">Rating</p>
        </div>
        <div className="border-x border-gray-200">
          <p className="text-sm font-extrabold text-gray-900">{responseRate}</p>
          <p className="text-[11px] text-gray-500 font-medium">Response</p>
        </div>
        <div>
          <p className="text-sm font-extrabold text-gray-900">{yearsOnPlatform}</p>
          <p className="text-[11px] text-gray-500 font-medium">On Bazaario</p>
        </div>
      </div>

      {/* 3. Contact Actions */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-800">Contact the shop</p>

        {/* Chat with seller */}
        <button
          type="button"
          onClick={onChatWithSeller || (() => alert('Opening live chat with Sharma Electronics concierge...'))}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#084c37] hover:bg-[#063f2e] active:scale-98 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Chat with seller</span>
          </div>
          <span className="bg-emerald-500/30 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
            Replies ~5 min
          </span>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={onWhatsApp || (() => alert('Redirecting to WhatsApp with shopkeeper...'))}
          className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-[#e6f4ea] hover:bg-[#d4edd9] text-[#065f46] font-bold text-xs transition cursor-pointer"
        >
          <span className="text-sm font-bold">💬</span>
          <span>WhatsApp</span>
        </button>

        {/* Call shop */}
        <button
          type="button"
          onClick={onCall || (() => alert(`Calling ${phone}...`))}
          className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs transition cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-gray-600" />
          <span>Call {phone}</span>
        </button>

        {/* Get directions */}
        <button
          type="button"
          onClick={onGetDirections || (() => alert('Opening Google Maps directions to Lokhandwala, Andheri West...'))}
          className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs transition cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-emerald-700" />
          <span>Get directions</span>
        </button>
      </div>
    </div>
  );
}

