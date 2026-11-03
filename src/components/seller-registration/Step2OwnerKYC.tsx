'use client';

import React from 'react';
import { Upload, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

export interface OwnerKYCFormData {
  ownerName: string;
  email: string;
  phone: string;
  panNumber: string;
  panFileUploaded: boolean;
  aadhaarNumber: string;
  aadhaarFileUploaded: boolean;
  gstin: string;
}

interface Step2OwnerKYCProps {
  data: OwnerKYCFormData;
  onChange: (updates: Partial<OwnerKYCFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

export default function Step2OwnerKYC({
  data,
  onChange,
  onNext,
  onBack,
  className = '',
}: Step2OwnerKYCProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 select-none ${className}`}>
      {/* 1. Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
          Owner details & KYC verification
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Required by RBI guidelines and government regulations for business onboarding.
        </p>
      </div>

      {/* 2. Fields */}
      <div className="space-y-4">
        {/* Owner Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Owner full name (as per PAN) *
          </label>
          <input
            type="text"
            required
            value={data.ownerName}
            onChange={(e) => onChange({ ownerName: e.target.value })}
            placeholder="e.g. Rajesh Sharma"
            className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Owner email *
            </label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="rajesh.sharma@gmail.com"
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Mobile number *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+91 98330 21045"
                className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 pr-20 outline-none focus:border-[#059669] transition bg-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">
                Verified ✔
              </span>
            </div>
          </div>
        </div>

        {/* PAN Card & Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              PAN card number *
            </label>
            <input
              type="text"
              required
              maxLength={10}
              value={data.panNumber}
              onChange={(e) => onChange({ panNumber: e.target.value.toUpperCase() })}
              placeholder="ABCPS1234F"
              className="w-full text-xs sm:text-sm font-mono uppercase text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Upload PAN card photo/PDF *
            </label>
            <button
              type="button"
              onClick={() => onChange({ panFileUploaded: true })}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                data.panFileUploaded
                  ? 'border-emerald-300 bg-emerald-50/60 text-[#064e3b]'
                  : 'border-dashed border-gray-300 hover:border-[#059669] bg-white text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {data.panFileUploaded ? 'pan_card_rajesh.pdf (240 KB)' : 'Choose file...'}
                </span>
              </div>
              {data.panFileUploaded && (
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Aadhaar Card & Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Aadhaar number *
            </label>
            <input
              type="text"
              required
              maxLength={14}
              value={data.aadhaarNumber}
              onChange={(e) => onChange({ aadhaarNumber: e.target.value })}
              placeholder="XXXX XXXX 4821"
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Upload Aadhaar (front & back) *
            </label>
            <button
              type="button"
              onClick={() => onChange({ aadhaarFileUploaded: true })}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                data.aadhaarFileUploaded
                  ? 'border-emerald-300 bg-emerald-50/60 text-[#064e3b]'
                  : 'border-dashed border-gray-300 hover:border-[#059669] bg-white text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {data.aadhaarFileUploaded ? 'aadhaar_doc.pdf (480 KB)' : 'Choose file...'}
                </span>
              </div>
              {data.aadhaarFileUploaded && (
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* GSTIN (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-gray-800">
              GSTIN (Goods and Services Tax ID)
            </label>
            <span className="text-[11px] text-gray-400 font-medium">Optional for under ₹40 Lakhs</span>
          </div>
          <input
            type="text"
            value={data.gstin}
            onChange={(e) => onChange({ gstin: e.target.value.toUpperCase() })}
            placeholder="27ABCPS1234F1Z5"
            className="w-full text-xs sm:text-sm font-mono uppercase text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
          />
        </div>
      </div>

      {/* 3. Bottom Navigation */}
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
          className="bg-[#059669] hover:bg-[#047857] active:scale-98 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
        >
          <span>Save & continue</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

