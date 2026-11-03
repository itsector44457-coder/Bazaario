'use client';

import React from 'react';
import { FileCheck, ShieldCheck, PackagePlus, IndianRupee } from 'lucide-react';

interface SellerBenefitsSidebarProps {
  className?: string;
}

export default function SellerBenefitsSidebar({
  className = '',
}: SellerBenefitsSidebarProps) {
  const benefits = [
    {
      title: 'Register your shop',
      desc: 'Shop details, KYC & bank info',
      icon: FileCheck,
    },
    {
      title: 'Admin verification',
      desc: 'Approved within 24–48 hours',
      icon: ShieldCheck,
    },
    {
      title: 'List your products',
      desc: 'Add photos, prices & stock',
      icon: PackagePlus,
    },
    {
      title: 'Get orders & weekly payouts',
      desc: 'Money in your bank every Monday',
      icon: IndianRupee,
    },
  ];

  const commissions = [
    { category: 'Grocery & Staples', rate: '5%' },
    { category: 'Pharmacy', rate: '6%' },
    { category: 'Electronics', rate: '8%' },
    { category: 'Fashion & Footwear', rate: '12%' },
  ];

  return (
    <aside
      className={`w-full lg:w-[340px] xl:w-[380px] bg-[#064e3b] text-white rounded-3xl p-6 sm:p-8 flex-col justify-between space-y-8 select-none shadow-sm shrink-0 ${className}`}
    >
      {/* 1. Header & Benefits */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Take your shop online in 10 minutes
          </h2>
          <p className="text-xs text-emerald-200 mt-1.5 font-normal">
            Join 1,200+ local shops selling on Bazaario.
          </p>
        </div>

        {/* 4 Steps Checklist */}
        <div className="space-y-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-800/80 text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {b.title}
                  </h3>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Simple Pricing Box */}
      <div className="bg-[#053d2e] rounded-2xl p-5 border border-emerald-700/60 space-y-3">
        <div>
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
            SIMPLE PRICING
          </span>
          <h4 className="text-xl font-black text-white mt-0.5">
            ₹0 listing fee
          </h4>
          <p className="text-[11px] text-emerald-200/80 mt-0.5">
            Pay a small commission only when you sell:
          </p>
        </div>

        <div className="space-y-1.5 pt-1 text-xs">
          {commissions.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-emerald-100 font-medium"
            >
              <span className="text-[11px] text-emerald-200">{c.category}</span>
              <span className="font-bold text-white">{c.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

