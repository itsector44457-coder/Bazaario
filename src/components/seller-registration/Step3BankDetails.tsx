'use client';

import React from 'react';
import { Upload, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

export interface BankDetailsFormData {
  accountHolderName: string;
  bankName: string;
  accountType: 'current' | 'savings';
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  chequeFileUploaded: boolean;
}

interface Step3BankDetailsProps {
  data: BankDetailsFormData;
  onChange: (updates: Partial<BankDetailsFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

const BANKS = [
  'HDFC Bank',
  'State Bank of India',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
];

export default function Step3BankDetails({
  data,
  onChange,
  onNext,
  onBack,
  className = '',
}: Step3BankDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 select-none ${className}`}>
      {/* 1. Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
          Bank account for weekly payouts
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          All order earnings will be transferred directly to this account every Monday.
        </p>
      </div>

      {/* 2. Fields */}
      <div className="space-y-4">
        {/* Account Holder Name */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Account holder name (as per bank passbook) *
          </label>
          <input
            type="text"
            required
            value={data.accountHolderName}
            onChange={(e) => onChange({ accountHolderName: e.target.value })}
            placeholder="e.g. SHARMA ELECTRONICS"
            className="w-full text-xs sm:text-sm uppercase text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
          />
        </div>

        {/* Bank Name & Account Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Bank name *
            </label>
            <select
              value={data.bankName}
              onChange={(e) => onChange({ bankName: e.target.value })}
              className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white cursor-pointer"
            >
              {BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Account type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange({ accountType: 'current' })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                  data.accountType === 'current'
                    ? 'border-2 border-[#059669] bg-emerald-50/50 text-[#064e3b]'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                Current Account
              </button>
              <button
                type="button"
                onClick={() => onChange({ accountType: 'savings' })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                  data.accountType === 'savings'
                    ? 'border-2 border-[#059669] bg-emerald-50/50 text-[#064e3b]'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                Savings Account
              </button>
            </div>
          </div>
        </div>

        {/* Account Number & Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Bank account number *
            </label>
            <input
              type="password"
              required
              value={data.accountNumber}
              onChange={(e) => onChange({ accountNumber: e.target.value })}
              placeholder="50200012345678"
              className="w-full text-xs sm:text-sm font-mono text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Re-enter account number *
            </label>
            <input
              type="text"
              required
              value={data.confirmAccountNumber}
              onChange={(e) => onChange({ confirmAccountNumber: e.target.value })}
              placeholder="50200012345678"
              className="w-full text-xs sm:text-sm font-mono text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
            />
          </div>
        </div>

        {/* IFSC Code & Cancelled Cheque */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              IFSC code *
            </label>
            <input
              type="text"
              required
              maxLength={11}
              value={data.ifscCode}
              onChange={(e) => onChange({ ifscCode: e.target.value.toUpperCase() })}
              placeholder="HDFC0000240"
              className="w-full text-xs sm:text-sm font-mono uppercase text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition bg-white"
            />
            <span className="block text-[11px] text-[#059669] font-bold mt-1">
              ✔ Verified: HDFC Bank, Andheri West Branch
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Cancelled cheque / Passbook photo *
            </label>
            <button
              type="button"
              onClick={() => onChange({ chequeFileUploaded: true })}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                data.chequeFileUploaded
                  ? 'border-emerald-300 bg-emerald-50/60 text-[#064e3b]'
                  : 'border-dashed border-gray-300 hover:border-[#059669] bg-white text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {data.chequeFileUploaded ? 'cancelled_cheque.pdf ✔' : 'Upload cheque photo...'}
                </span>
              </div>
              {data.chequeFileUploaded && (
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Security badge note */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-gray-700 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
          <span>100% encrypted bank verification with instant penny-drop validation.</span>
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

