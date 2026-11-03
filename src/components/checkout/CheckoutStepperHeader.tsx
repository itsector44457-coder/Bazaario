'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Check } from 'lucide-react';
import Logo from '@/components/navbar/Logo';

export type CheckoutStepType = 'cart' | 'address' | 'payment' | 'done';

interface CheckoutStepperHeaderProps {
  currentStep?: CheckoutStepType;
  className?: string;
}

export default function CheckoutStepperHeader({
  currentStep = 'payment',
  className = '',
}: CheckoutStepperHeaderProps) {
  return (
    <header className={`w-full bg-white border-b border-gray-100 select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Left: Brand Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* 2. Center: 4-Step Checkout Stepper */}
          <nav
            aria-label="Checkout Progress"
            className="hidden md:flex items-center gap-2 sm:gap-3"
          >
            {/* Step 1: Cart (Completed) */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-[#059669]">Cart</span>
            </div>

            <div className="w-8 sm:w-12 h-0.5 bg-[#059669]" />

            {/* Step 2: Address (Completed) */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-[#059669]">Address</span>
            </div>

            <div className="w-8 sm:w-12 h-0.5 bg-[#059669]" />

            {/* Step 3: Payment (Active) */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                3
              </div>
              <span className="text-xs font-bold text-gray-950">Payment</span>
            </div>

            <div className="w-8 sm:w-12 h-0.5 bg-gray-200" />

            {/* Step 4: Done (Pending) */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-[10px] font-bold">
                4
              </div>
              <span className="text-xs font-medium text-gray-400">Done</span>
            </div>
          </nav>

          {/* 3. Right: 100% Secure Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#059669] stroke-[2.2]" />
            <span>100% secure</span>
          </div>
        </div>
      </div>
    </header>
  );
}

