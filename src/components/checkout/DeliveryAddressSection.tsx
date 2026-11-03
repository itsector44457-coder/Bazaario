'use client';

import React from 'react';
import { Phone, Plus } from 'lucide-react';

interface Address {
  id: string;
  label: 'HOME' | 'WORK' | 'OTHER';
  name: string;
  addressLines: string[];
  phone: string;
}

interface DeliveryAddressSectionProps {
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  deliveryInstructions: string;
  onInstructionsChange: (val: string) => void;
  onAddNewAddress?: () => void;
}

const ADDRESSES: Address[] = [
  {
    id: 'home',
    label: 'HOME',
    name: 'Rahul Verma',
    addressLines: [
      'B-702, Silver Oak Apartments, Lokhandwala Complex,',
      'Andheri West, Mumbai 400053',
    ],
    phone: '+91 98201 44518',
  },
  {
    id: 'work',
    label: 'WORK',
    name: 'Rahul Verma',
    addressLines: [
      '5th Floor, Kamala Mills Compound, Lower Parel,',
      'Mumbai 400013',
    ],
    phone: '+91 98201 44518',
  },
];

export default function DeliveryAddressSection({
  selectedAddressId,
  onSelectAddress,
  deliveryInstructions,
  onInstructionsChange,
  onAddNewAddress,
}: DeliveryAddressSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Delivery address</h2>
        </div>
        <button
          type="button"
          onClick={onAddNewAddress || (() => alert('Add new address modal'))}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#059669] hover:text-[#047857] transition"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add new</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {ADDRESSES.map((addr) => {
          const isSelected = addr.id === selectedAddressId;
          return (
            <div
              key={addr.id}
              onClick={() => onSelectAddress(addr.id)}
              className={`relative cursor-pointer rounded-xl p-4 transition border ${
                isSelected
                  ? 'border-2 border-[#059669] bg-white shadow-2xs'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Badge + Radio row */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-[#064e3b] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {addr.label}
                </span>

                {/* Radio button indicator */}
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                    isSelected
                      ? 'border-[#059669]'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#059669]" />
                  )}
                </div>
              </div>

              {/* Recipient Name */}
              <h3 className="text-sm font-bold text-gray-900 mb-1">{addr.name}</h3>

              {/* Address details */}
              <div className="text-xs text-gray-500 space-y-0.5 leading-relaxed">
                {addr.addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Phone number */}
              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-600">
                <Phone className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
                <span className="font-medium">{addr.phone}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Delivery Instructions */}
      <div>
        <input
          type="text"
          value={deliveryInstructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          placeholder="Delivery instructions (optional) e.g. Ring the bell, leave with guard"
          className="w-full text-xs sm:text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition bg-white"
        />
      </div>
    </section>
  );
}
