'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Check, Edit3, Store, UserCheck, Landmark } from 'lucide-react';
import { ShopDetailsFormData } from './Step1ShopDetails';
import { OwnerKYCFormData } from './Step2OwnerKYC';
import { BankDetailsFormData } from './Step3BankDetails';

interface Step4ReviewProps {
  shopData: ShopDetailsFormData;
  kycData: OwnerKYCFormData;
  bankData: BankDetailsFormData;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  className?: string;
}

export default function Step4Review({
  shopData,
  kycData,
  bankData,
  onEditStep,
  onSubmit,
  onBack,
  className = '',
}: Step4ReviewProps) {
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 select-none ${className}`}>
      {/* 1. Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
          Review your application
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Please verify all details carefully before submitting for verification.
        </p>
      </div>

      {/* 2. Review Cards */}
      <div className="space-y-4 text-xs">
        {/* Card 1: Shop Details */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#059669]" />
              <h3 className="font-bold text-gray-950 text-sm">1. Shop Details</h3>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[#059669] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 flex-1">
              <div>
                <span className="text-gray-400 block text-[11px]">Shop Name</span>
                <span className="font-bold text-gray-900">{shopData.shopName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Category</span>
                <span className="font-bold text-gray-900">{shopData.category}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Phone</span>
                <span className="font-bold text-gray-900">{shopData.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Timing</span>
                <span className="font-bold text-gray-900">
                  {shopData.openTime} – {shopData.closeTime}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-[11px]">Address</span>
                <span className="font-medium text-gray-700">
                  {shopData.address}, {shopData.city} {shopData.pincode}
                </span>
              </div>
            </div>

            {/* Shop Photo Preview */}
            <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-gray-100">
              <Image
                src={shopData.photoUrl}
                alt="Shop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Owner & KYC */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#059669]" />
              <h3 className="font-bold text-gray-950 text-sm">2. Owner & KYC</h3>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[#059669] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4">
            <div>
              <span className="text-gray-400 block text-[11px]">Owner Name</span>
              <span className="font-bold text-gray-900">{kycData.ownerName}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Email</span>
              <span className="font-bold text-gray-900">{kycData.email}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Mobile</span>
              <span className="font-bold text-gray-900">{kycData.phone}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">PAN Number</span>
              <span className="font-mono font-bold text-gray-900">
                {kycData.panNumber} (Uploaded ✔)
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Aadhaar</span>
              <span className="font-mono font-bold text-gray-900">
                {kycData.aadhaarNumber} (Uploaded ✔)
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">GSTIN</span>
              <span className="font-mono font-bold text-gray-900">
                {kycData.gstin || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Bank & Payouts */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#059669]" />
              <h3 className="font-bold text-gray-950 text-sm">3. Bank & Payouts</h3>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-[#059669] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2.5 gap-x-4">
            <div>
              <span className="text-gray-400 block text-[11px]">Account Holder</span>
              <span className="font-bold text-gray-900 uppercase">
                {bankData.accountHolderName}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Bank</span>
              <span className="font-bold text-gray-900">
                {bankData.bankName} ({bankData.accountType})
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Account Number</span>
              <span className="font-mono font-bold text-gray-900">
                •••• •••• {bankData.accountNumber.slice(-4) || '5678'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">IFSC Code</span>
              <span className="font-mono font-bold text-gray-900">
                {bankData.ifscCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Terms & Declaration Checkbox */}
      <div className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#059669] w-4 h-4"
          />
          <span className="text-xs text-gray-700 leading-relaxed font-medium">
            I hereby declare that all the information provided above is accurate and authentic.
            I agree to Bazaario&apos;s Merchant Terms of Service, Listing Policies, and weekly payout commission deductions.
          </span>
        </label>
      </div>

      {/* 4. Bottom Navigation */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-950 px-3 py-2 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="bg-[#059669] hover:bg-[#047857] active:scale-98 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
        >
          <span>Submit application</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

