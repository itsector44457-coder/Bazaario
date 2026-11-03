'use client';

import React from 'react';
import Image from 'next/image';
import { Store, Home, Bike, Phone, MessageSquare, Star } from 'lucide-react';

interface OrderTrackingMapProps {
  storeName?: string;
  driverName?: string;
  driverRating?: number;
  driverVehicle?: string;
  driverPhoto?: string;
  etaMinutes?: number;
  etaTime?: string;
  distanceAway?: string;
  onCallDriver?: () => void;
  onChatDriver?: () => void;
  className?: string;
}

export default function OrderTrackingMap({
  storeName = 'Sharma Electronics',
  driverName = 'Imran Shaikh',
  driverRating = 4.9,
  driverVehicle = 'MH 02 EK 4471 · Honda Activa',
  driverPhoto = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  etaMinutes = 12,
  etaTime = '4:28 PM',
  distanceAway = '1.4 km away',
  onCallDriver,
  onChatDriver,
  className = '',
}: OrderTrackingMapProps) {
  return (
    <div
      className={`relative w-full h-[460px] sm:h-[500px] rounded-3xl overflow-hidden border border-gray-100 bg-[#e6f4ea] flex flex-col justify-between shadow-2xs select-none ${className}`}
    >
      {/* 1. Realistic SVG Grid Map Background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="map-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Soft Green Neighborhood Blocks */}
            <rect width="72" height="72" fill="#d8ede2" rx="4" />
            {/* White Street Grid Lines */}
            <path d="M 0 80 L 80 80 M 80 0 L 80 80" stroke="#ffffff" strokeWidth="8" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#map-grid)" />

        {/* Major Avenue / Highway diagonal lines */}
        <line x1="0" y1="200" x2="600" y2="200" stroke="#ffffff" strokeWidth="14" opacity="0.9" />
        <line x1="260" y1="0" x2="260" y2="500" stroke="#ffffff" strokeWidth="14" opacity="0.9" />

        {/* Delivery Route Curved Path */}
        <path
          d="M 120 370 Q 240 370 280 280 T 520 120"
          fill="none"
          stroke="#059669"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2. Top-Left Floating ETA Pill Card */}
      <div className="relative z-10 m-5">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-gray-100 max-w-[200px]">
          <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Arriving in
          </span>
          <span className="block text-2xl sm:text-3xl font-black text-[#059669] tracking-tight leading-none my-1">
            {etaMinutes} min
          </span>
          <span className="block text-[11px] font-medium text-gray-500">
            ETA {etaTime} · {distanceAway}
          </span>
        </div>
      </div>

      {/* 3. Interactive Route Markers (Store, Bike, Destination) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Store Marker (Bottom Left) */}
        <div className="absolute left-[80px] sm:left-[110px] top-[350px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#064e3b] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Store className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="mt-1 bg-white/95 text-gray-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs border border-gray-100 whitespace-nowrap">
            {storeName}
          </span>
        </div>

        {/* Live Delivery Partner Bike Marker (Middle of Route) */}
        <div className="absolute left-[44%] sm:left-[45%] top-[56%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping" />
            <div className="w-11 h-11 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-xl border-2 border-white relative z-10">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Destination Home Marker (Top Right) */}
        <div className="absolute right-[80px] sm:right-[110px] top-[110px] translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="mt-1 bg-white/95 text-gray-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs border border-gray-100 whitespace-nowrap">
            Home
          </span>
        </div>
      </div>

      {/* 4. Bottom Floating Driver Profile Card */}
      <div className="relative z-10 p-4 sm:p-5">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 p-3.5 sm:p-4 shadow-lg flex items-center justify-between gap-3">
          {/* Driver Photo & Details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 relative border-2 border-emerald-500">
              <Image
                src={driverPhoto}
                alt={driverName}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-gray-950 truncate">
                  {driverName}
                </h4>
                <div className="flex items-center gap-0.5 text-[#f59e0b] text-xs font-bold">
                  <Star className="w-3 h-3 fill-current stroke-none" />
                  <span>{driverRating}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 truncate mt-0.5 font-medium">
                Delivery partner · {driverVehicle}
              </p>
            </div>
          </div>

          {/* Quick Contact Actions (Call & Chat) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onCallDriver || (() => alert(`Calling ${driverName} (+91 98201 12345)`))}
              title={`Call ${driverName}`}
              className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#059669] flex items-center justify-center transition cursor-pointer"
            >
              <Phone className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={onChatDriver || (() => alert(`Opening chat with ${driverName}`))}
              title={`Chat with ${driverName}`}
              className="w-9 h-9 rounded-xl bg-[#064e3b] hover:bg-[#043d2e] text-white flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

