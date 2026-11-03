'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import Logo from '@/components/navbar/Logo';

export type CheckoutStep = 'cart' | 'address' | 'payment' | 'done';

interface CartHeaderStepperProps {
  currentStep?: CheckoutStep;
  className?: string;
}

export default function CartHeaderStepper({
  currentStep = 'cart',
  className = '',
}: CartHeaderStepperProps) {
  const steps: { id: CheckoutStep; num: number; label: string }[] = [
    { id: 'cart', num: 1, label: 'Cart' },
    { id: 'address', num: 2, label: 'Address' },
    { id: 'payment', num: 3, label: 'Payment' },
    { id: 'done', num: 4, label: 'Done' },
  ];

  const currentIdx = steps.findIndex((s) => s.id === currentStep);

  return (
    <header className={`w-full bg-white border-b border-gray-100 select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Left: Bazaario Brand Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* 2. Center: Checkout Stepper */}
          <nav
            aria-label="Checkout Progress"
            className="hidden md:flex items-center gap-2 sm:gap-3"
          >
            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isPast = idx < currentIdx;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#059669] text-white shadow-xs'
                          : isPast
                          ? 'bg-[#059669] text-white'
                          : 'border border-gray-300 text-gray-500 bg-white'
                      }`}
                    >
                      {step.num}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="w-8 sm:w-12 h-px bg-gray-200" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* 3. Right: Secure Checkout Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <Lock className="w-3.5 h-3.5 text-[#059669] stroke-[2.2]" />
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </header>
  );
}

