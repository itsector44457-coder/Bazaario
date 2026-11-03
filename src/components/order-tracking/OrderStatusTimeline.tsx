'use client';

import React from 'react';
import { Check, Bike, Key } from 'lucide-react';

interface TimelineStep {
  title: string;
  time: string;
  subtitle?: string;
  status: 'completed' | 'current' | 'pending';
}

interface OrderStatusTimelineProps {
  otpCode?: string;
  className?: string;
}

const DEFAULT_STEPS: TimelineStep[] = [
  {
    title: 'Order placed',
    time: '3:42 PM',
    subtitle: 'Payment confirmed',
    status: 'completed',
  },
  {
    title: 'Accepted by shop',
    time: '3:44 PM',
    subtitle: 'Sharma Electronics',
    status: 'completed',
  },
  {
    title: 'Packed & handed over',
    time: '4:02 PM',
    status: 'completed',
  },
  {
    title: 'Out for delivery',
    time: '4:06 PM',
    subtitle: 'On the way',
    status: 'current',
  },
  {
    title: 'Delivered',
    time: 'Expected 4:28 PM',
    status: 'pending',
  },
];

export default function OrderStatusTimeline({
  otpCode = '4 8 2 1',
  className = '',
}: OrderStatusTimelineProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs space-y-6 ${className}`}
    >
      <h3 className="text-sm sm:text-base font-bold text-gray-950 tracking-tight">
        Order status
      </h3>

      {/* Vertical Stepper List */}
      <div className="relative pl-1 space-y-5">
        {DEFAULT_STEPS.map((step, idx) => {
          const isLast = idx === DEFAULT_STEPS.length - 1;

          return (
            <div key={idx} className="relative flex items-start gap-3.5">
              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={`absolute left-[11px] top-6 bottom-[-20px] w-0.5 ${
                    step.status === 'completed' ? 'bg-[#059669]' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Status Circle Node */}
              <div className="relative z-10 shrink-0">
                {step.status === 'completed' && (
                  <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {step.status === 'current' && (
                  <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-xs">
                    <Bike className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                )}

                {step.status === 'pending' && (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                )}
              </div>

              {/* Step Text Info */}
              <div className="min-w-0">
                <h4
                  className={`text-xs font-bold ${
                    step.status === 'current'
                      ? 'text-[#d97706]'
                      : step.status === 'completed'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </h4>

                <p className="text-[11px] text-gray-500 mt-0.5">
                  {step.time}
                  {step.subtitle ? ` · ${step.subtitle}` : ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share OTP Pill Banner */}
      <div className="bg-[#f0fdf7] text-gray-900 border border-emerald-100 rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs font-medium">
        <Key className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.2]" />
        <div>
          <span>Share OTP </span>
          <span className="font-black tracking-widest text-[#064e3b] text-sm">
            {otpCode}
          </span>
          <span className="text-gray-600"> with the delivery partner</span>
        </div>
      </div>
    </div>
  );
}

