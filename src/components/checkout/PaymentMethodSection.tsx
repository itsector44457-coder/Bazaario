'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  CreditCard,
  Landmark,
  Banknote,
  CheckCircle2,
  Check,
} from 'lucide-react';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

interface PaymentMethodSectionProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (m: PaymentMethod) => void;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode; badge?: string }[] = [
  {
    id: 'upi',
    label: 'UPI',
    icon: <Smartphone className="w-4 h-4" />,
    badge: '5% back',
  },
  {
    id: 'card',
    label: 'Credit / Debit card',
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: 'netbanking',
    label: 'Net banking',
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    id: 'cod',
    label: 'Cash on delivery',
    icon: <Banknote className="w-4 h-4" />,
  },
];

function UpiPanel() {
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [upiId, setUpiId] = useState('rahulverma@okhdfc');
  const [isVerified, setIsVerified] = useState(true);

  return (
    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Pay using any UPI app</h3>

      {/* 3 UPI App buttons */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <button
          type="button"
          onClick={() => setSelectedApp('gpay')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
            selectedApp === 'gpay'
              ? 'border-[#059669] bg-emerald-50/50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <span className="font-extrabold tracking-tight text-gray-800">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">P</span>
            <span className="text-[#FBBC05]">a</span>
            <span className="text-[#34A853]">y</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedApp('phonepe')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
            selectedApp === 'phonepe'
              ? 'border-[#059669] bg-emerald-50/50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <span className="text-[#5f259f] font-extrabold tracking-tight">PhonePe</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedApp('paytm')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
            selectedApp === 'paytm'
              ? 'border-[#059669] bg-emerald-50/50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <span className="text-[#002e6e] font-extrabold tracking-tight">
            Pay<span className="text-[#00b9f5]">tm</span>
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-full border-t border-gray-200" />
        <span className="absolute bg-white px-3 text-[11px] text-gray-400 font-medium">
          or enter UPI ID
        </span>
      </div>

      {/* UPI ID input + Verify */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={upiId}
          onChange={(e) => {
            setUpiId(e.target.value);
            setIsVerified(false);
          }}
          placeholder="yourname@okhdfcbank"
          className="flex-1 text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
        />
        <button
          type="button"
          onClick={() => setIsVerified(true)}
          className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold transition cursor-pointer shrink-0"
        >
          Verify
        </button>
      </div>

      {/* Verified Status row */}
      {isVerified && (
        <div className="flex items-center gap-1.5 text-xs text-[#059669] font-bold mt-1">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Verified: RAHUL VERMA</span>
        </div>
      )}
    </div>
  );
}

function CardPanel() {
  return (
    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Credit or Debit Card</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Card number (XXXX XXXX XXXX XXXX)"
          className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="MM / YY"
            className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition"
          />
          <input
            type="password"
            maxLength={4}
            placeholder="CVV"
            className="w-full text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#059669] transition"
          />
        </div>
      </div>
    </div>
  );
}

function NetBankingPanel() {
  return (
    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Popular Banks</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((b) => (
          <label
            key={b}
            className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition"
          >
            <input type="radio" name="nb-bank" className="accent-[#059669]" />
            <span className="font-semibold text-gray-800">{b}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CODPanel() {
  return (
    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center text-xs">
      <h3 className="text-sm font-bold text-gray-900 mb-1">Cash on Delivery</h3>
      <p className="text-gray-500 mb-2">
        Pay ₹3,896 with exact cash or scan the delivery partner&apos;s QR code when your order arrives.
      </p>
      <div className="bg-amber-50 text-amber-800 border border-amber-200/60 rounded-xl p-3 font-medium">
        Please keep exact cash ready to minimize contact.
      </div>
    </div>
  );
}

export default function PaymentMethodSection({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-6 h-6 rounded-full bg-[#064e3b] text-white text-xs font-bold flex items-center justify-center">
          2
        </span>
        <h2 className="text-base font-bold text-gray-900 tracking-tight">Payment method</h2>
      </div>

      {/* Grid: Left tabs + Right panel */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-stretch border border-gray-100 rounded-2xl overflow-hidden bg-white">
        {/* Method tab list */}
        <div className="p-3 bg-gray-50/50 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-gray-100">
          {METHODS.map((m) => {
            const isActive = m.id === selectedMethod;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMethod(m.id)}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'border-2 border-[#059669] bg-white text-gray-900 shadow-2xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#059669]' : 'text-gray-400'}>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </div>

                {m.badge && (
                  <span className="bg-[#f59e0b] text-[#78350f] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                    {m.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Method Panel */}
        <div className="min-h-[220px] flex">
          {selectedMethod === 'upi' && <UpiPanel />}
          {selectedMethod === 'card' && <CardPanel />}
          {selectedMethod === 'netbanking' && <NetBankingPanel />}
          {selectedMethod === 'cod' && <CODPanel />}
        </div>
      </div>
    </section>
  );
}
