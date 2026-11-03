'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  CheckCircle2,
  Award,
  MessageSquare,
  Phone,
  Navigation,
  UserPlus,
  Check,
} from 'lucide-react';

interface ShopProfileHeaderProps {
  shopName?: string;
  avatarText?: string;
  isVerified?: boolean;
  isTopRated?: boolean;
  address?: string;
  distance?: string;
  rating?: number;
  reviewsCount?: string;
  productsCount?: number;
  followersCount?: string;
  responseRate?: string;
  coverImage?: string;
  openStatusText?: string;
  onChat?: () => void;
  onWhatsApp?: () => void;
  onCall?: () => void;
  onGetDirections?: () => void;
  className?: string;
}

export default function ShopProfileHeader({
  shopName = 'Sharma Electronics',
  avatarText = 'SE',
  isVerified = true,
  isTopRated = true,
  address = 'Shop 14, Lokhandwala Market, Andheri West, Mumbai',
  distance = '1.2 km',
  rating = 4.6,
  reviewsCount = '1.2k reviews',
  productsCount = 185,
  followersCount = '3.4k followers',
  responseRate = '98% response rate',
  coverImage = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1600&q=85',
  openStatusText = 'Open · till 9:30 PM',
  onChat,
  onWhatsApp,
  onCall,
  onGetDirections,
  className = '',
}: ShopProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className={`w-full relative select-none ${className}`}>
      {/* 1. Cover Image */}
      <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-3xl overflow-hidden shadow-2xs border border-gray-100">
        <Image
          src={coverImage}
          alt={shopName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Floating Open Status Badge Top-Right */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          <span>{openStatusText}</span>
        </div>
      </div>

      {/* 2. Floating Shop Info Card */}
      <div className="relative -mt-14 sm:-mt-16 mx-3 sm:mx-6 bg-white rounded-3xl border border-gray-100 shadow-md p-4 sm:p-6 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Avatar + Title & Stats */}
          <div className="flex items-start gap-4">
            {/* Square Green Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-sm shrink-0 tracking-wider">
              {avatarText}
            </div>

            <div className="space-y-1.5 min-w-0">
              {/* Name & Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
                  {shopName}
                </h1>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Verified Seller</span>
                  </span>
                )}
                {isTopRated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Top Rated</span>
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">
                  {address} · {distance}
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-3 text-xs text-gray-600 font-medium flex-wrap pt-0.5">
                <span className="font-bold text-gray-900">
                  {rating}★ <span className="font-normal text-gray-500">({reviewsCount})</span>
                </span>
                <span>·</span>
                <span>
                  <strong className="text-gray-900">{productsCount}</strong> products
                </span>
                <span>·</span>
                <span>
                  <strong className="text-gray-900">{followersCount}</strong>
                </span>
                <span>·</span>
                <span>
                  <strong className="text-gray-900">{responseRate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contact Actions */}
          <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
            {/* Chat button */}
            <button
              type="button"
              onClick={onChat || (() => alert('Opening live chat with Sharma Electronics...'))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#084c37] hover:bg-[#063f2e] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>

            {/* WhatsApp button */}
            <button
              type="button"
              onClick={onWhatsApp || (() => alert('Redirecting to WhatsApp...'))}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e6f4ea] hover:bg-[#d4edd9] active:scale-95 text-[#065f46] font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              <span className="text-sm">💬</span>
              <span>WhatsApp</span>
            </button>

            {/* Phone button */}
            <button
              type="button"
              onClick={onCall || (() => alert('Calling +91 98201 44518...'))}
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 transition cursor-pointer shadow-2xs"
              aria-label="Call shop"
            >
              <Phone className="w-4 h-4 text-gray-600" />
            </button>

            {/* Navigation button */}
            <button
              type="button"
              onClick={onGetDirections || (() => alert('Opening Google Maps directions...'))}
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 transition cursor-pointer shadow-2xs"
              aria-label="Get directions"
            >
              <Navigation className="w-4 h-4 text-emerald-700" />
            </button>

            {/* Follow button */}
            <button
              type="button"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border font-bold text-xs sm:text-sm transition cursor-pointer active:scale-95 shadow-2xs ${
                isFollowing
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                  : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-gray-600" />
                  <span>+ Follow</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

