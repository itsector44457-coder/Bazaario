'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Hourglass,
  Check,
  Search,
  Shield,
  Rocket,
  AlertTriangle,
  Percent,
  Headphones,
  ChevronRight,
  Plus,
} from 'lucide-react';
import Logo from '@/components/navbar/Logo';

interface SellerVerificationViewProps {
  shopName?: string;
  applicationId?: string;
  submittedTime?: string;
  expectedDate?: string;
  ownerName?: string;
  className?: string;
}

export default function SellerVerificationView({
  shopName = 'Sharma Electronics',
  applicationId = '#APP-2291',
  submittedTime = 'Today, 11:20 AM',
  expectedDate = '31 Oct',
  ownerName = 'Rajesh Sharma',
  className = '',
}: SellerVerificationViewProps) {
  return (
    <div className={`space-y-5 select-none ${className}`}>
      {/* 1. Top Header */}
      <header className="bg-white border-b border-gray-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="bg-[#fef3c7] text-[#92400e] text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-amber-200/60">
              for Business
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-gray-900 hidden sm:inline">
              {ownerName}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                alt={ownerName}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Top Hero Banner: Application Under Review */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Hourglass & Status Description */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center shrink-0 border border-amber-200/60 shadow-2xs">
            <Hourglass className="w-7 h-7 stroke-[2]" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-block bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
              UNDER REVIEW
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
              Your shop application is being verified
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">
              Our team is checking <span className="font-semibold text-gray-700">{shopName}&apos;s</span> documents. You&apos;ll get an SMS & email once approved — usually within 24–48 hours.
            </p>
          </div>
        </div>

        {/* Right: Metadata 3 Rows */}
        <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-4 sm:p-5 shrink-0 min-w-[200px] space-y-2 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Application</span>
            <span className="font-bold text-gray-900">{applicationId}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Submitted</span>
            <span className="font-bold text-gray-900">{submittedTime}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Expected by</span>
            <span className="font-bold text-gray-900">{expectedDate}</span>
          </div>
        </div>
      </div>

      {/* 3. Lower Two-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Progress Stepper, Missing Photo Alert, Status Badges */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-extrabold text-gray-950 tracking-tight">
            Verification progress
          </h2>

          {/* 4-Step Stepper */}
          <div className="grid grid-cols-4 gap-2 text-center relative">
            {/* Step 1: Submitted */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs mb-2">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-gray-900">Submitted</span>
              <span className="text-[10px] text-gray-400 mt-0.5">29 Oct, 11:20 AM</span>
            </div>

            {/* Step 2: Document check (Active) */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-xs mb-2">
                <Search className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-[#b45309]">Document check</span>
              <span className="text-[10px] text-amber-600 font-medium mt-0.5">In progress</span>
            </div>

            {/* Step 3: Admin approval */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                <Shield className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-xs font-medium text-gray-400">Admin approval</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Pending</span>
            </div>

            {/* Step 4: Shop goes live */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                <Rocket className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-xs font-medium text-gray-400">Shop goes live</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Start selling</span>
            </div>
          </div>

          {/* Action Needed Alert Card */}
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-red-950">
                  Action needed: Shop front photo missing
                </h3>
                <p className="text-[11px] text-red-800/80 mt-0.5">
                  Upload a clear photo of your shop with the signboard visible to speed up approval.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Opening photo upload modal')}
              className="bg-[#dc2626] hover:bg-[#b91c1c] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer shrink-0 self-start sm:self-center"
            >
              Upload now
            </button>
          </div>

          {/* 3 Status verification chips */}
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            <span className="bg-[#e6f4ea] text-[#059669] border border-emerald-200/60 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              PAN verified
            </span>

            <span className="bg-[#e6f4ea] text-[#059669] border border-emerald-200/60 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Bank account verified
            </span>

            <span className="bg-amber-50 text-amber-800 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 stroke-[2]" />
              Aadhaar under review
            </span>
          </div>
        </div>

        {/* Right Column: While you wait, Help & Preview */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: While You Wait - Add First Product */}
          <div className="bg-[#064e3b] text-white rounded-3xl p-6 space-y-4 shadow-xs">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                WHILE YOU WAIT
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">
                Get your catalogue ready
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                Add products now as drafts — they&apos;ll go live the moment you&apos;re approved.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert('Add product modal')}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add first product</span>
            </button>
          </div>

          {/* Card 2: How commission works */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  How commission works
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  8% on Electronics · weekly payouts
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Card 3: Talk to seller support */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  Talk to seller support
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Mon–Sat, 9 AM – 8 PM
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Bottom Link: Preview seller dashboard */}
          <div className="text-center pt-2">
            <Link
              href="/seller-products"
              className="text-xs font-bold text-gray-500 hover:text-emerald-700 transition"
            >
              Preview your seller dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

