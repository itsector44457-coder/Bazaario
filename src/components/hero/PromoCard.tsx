'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBasket, Store } from 'lucide-react';

export interface PromoCardProps {
  badge: string;
  title: string;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  variant: 'yellow' | 'green';
  iconType?: 'groceries' | 'shop';
  className?: string;
}

export default function PromoCard({
  badge,
  title,
  ctaText,
  ctaHref = '#',
  onCtaClick,
  variant,
  iconType = 'groceries',
  className = '',
}: PromoCardProps) {
  const isYellow = variant === 'yellow';

  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 flex items-center justify-between border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        isYellow
          ? 'bg-gradient-to-br from-[#fffdf7] via-[#fefce8] to-[#fef08a]/20 border-amber-200/80 hover:border-amber-300 shadow-2xs'
          : 'bg-gradient-to-br from-[#f6fcf8] via-[#f0fdf4] to-[#dcfce7]/30 border-emerald-200/80 hover:border-emerald-300 shadow-2xs'
      } ${className}`}
    >
      <div className="space-y-1.5 flex-1 pr-4">
        {/* Badge Label */}
        <span
          className={`text-[11px] font-black uppercase tracking-wider block ${
            isYellow ? 'text-[#b45309]' : 'text-[#047857]'
          }`}
        >
          {badge}
        </span>

        {/* Card Title */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
          {title}
        </h3>

        {/* CTA Link with Arrow */}
        {onCtaClick ? (
          <button
            type="button"
            onClick={onCtaClick}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold pt-1 transition group cursor-pointer ${
              isYellow
                ? 'text-[#b45309] hover:text-[#92400e]'
                : 'text-[#047857] hover:text-[#065f46]'
            }`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold pt-1 transition group cursor-pointer ${
              isYellow
                ? 'text-[#b45309] hover:text-[#92400e]'
                : 'text-[#047857] hover:text-[#065f46]'
            }`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Right Side Rounded Icon Box with subtle shadow */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
          isYellow
            ? 'bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white'
            : 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white'
        }`}
      >
        {iconType === 'groceries' ? (
          <ShoppingBasket className="w-7 h-7 stroke-[2.2]" />
        ) : (
          <Store className="w-7 h-7 stroke-[2.2]" />
        )}
      </div>
    </div>
  );
}
