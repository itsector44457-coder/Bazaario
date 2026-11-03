'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store, Star } from 'lucide-react';
import Logo from '@/components/navbar/Logo';

interface AuthLayoutProps {
  children: ReactNode;
  activeTab: 'login' | 'signup';
}

export default function AuthLayout({ children, activeTab }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left Column: Atmospheric Indian Bazaar Visuals & Stats */}
      <div className="relative md:w-1/2 lg:w-[48%] min-h-[460px] md:min-h-screen bg-[#032a1d] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Background photo: Indian ethnic boutique and local bazaar */}
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80"
          alt="Bazaario Neighbourhood Market"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity brightness-[0.8]"
        />

        {/* Emerald Gradient Overlay for High Contrast Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021f15] via-[#043324]/85 to-[#043324]/90 pointer-events-none" />

        {/* 1. Top Logo */}
        <div className="relative z-10 self-start">
          <Logo variant="dark" size="md" />
        </div>

        {/* 2. Middle Hero Typography & 3 Stat Cards */}
        <div className="relative z-10 my-auto py-8 space-y-7 max-w-lg">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Your whole neighbourhood market, in one app.
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
              Shoppers discover local stores. Shop owners get online in minutes. Everyone wins.
            </p>
          </div>

          {/* 3 Glass Stat Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {/* Stat 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-white block">
                1,200+
              </span>
              <span className="text-[11px] text-emerald-200/70 font-medium block">
                Verified shops
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-white block">
                85k
              </span>
              <span className="text-[11px] text-emerald-200/70 font-medium block">
                Happy shoppers
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 space-y-0.5">
              <div className="flex items-center gap-0.5 text-xl sm:text-2xl font-black text-white">
                <span>4.8</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              </div>
              <span className="text-[11px] text-emerald-200/70 font-medium block">
                Average rating
              </span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Testimonial Pill Card */}
        <div className="relative z-10 pt-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3.5 max-w-md">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-emerald-500/30">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Sunita Gupta"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xs leading-snug">
              <p className="font-semibold text-white text-[13px]">
                &quot;My kirana store got 300 online orders in the first month.&quot;
              </p>
              <p className="text-emerald-200/70 text-[11px] mt-0.5 font-medium">
                — Sunita Gupta, Gupta Kirana Store
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="md:w-1/2 lg:w-[52%] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-10 md:py-16">
        <div className="w-full max-w-md space-y-6">
          {/* Top Segmented Log in / Sign up Pill Switcher */}
          <div className="bg-[#f3f4f6] p-1 rounded-2xl flex items-center max-w-sm mx-auto shadow-inner select-none">
            <Link
              href="/login"
              className={`flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={`flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Sign up
            </Link>
          </div>

          {/* Form Content Injected Here */}
          {children}
        </div>
      </div>
    </div>
  );
}
