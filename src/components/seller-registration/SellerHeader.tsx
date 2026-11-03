'use client';

import React from 'react';
import Link from 'next/link';
import { Headphones } from 'lucide-react';
import Logo from '@/components/navbar/Logo';

interface SellerHeaderProps {
  className?: string;
}

export default function SellerHeader({ className = '' }: SellerHeaderProps) {
  return (
    <header className={`w-full bg-white border-b border-gray-100 select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Left: Bazaario Logo + for Business Badge */}
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="bg-[#fef3c7] text-[#92400e] text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-amber-200/60">
              for Business
            </span>
          </div>

          {/* 2. Right: Seller Help Phone & Login Link */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-gray-600 font-medium">
              <Headphones className="w-4 h-4 text-[#059669] stroke-[2]" />
              <span>Seller help: </span>
              <span className="font-bold text-gray-900">1800-210-4455</span>
            </div>

            <div className="text-gray-500">
              <span>Already registered? </span>
              <Link
                href="/login?role=seller"
                className="font-bold text-[#059669] hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

