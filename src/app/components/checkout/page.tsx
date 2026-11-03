'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check } from 'lucide-react';
import CheckoutStepperHeader from '@/components/checkout/CheckoutStepperHeader';
import DeliveryAddressSection from '@/components/checkout/DeliveryAddressSection';
import PaymentMethodSection, { PaymentMethod } from '@/components/checkout/PaymentMethodSection';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import CheckoutView from '@/components/checkout/CheckoutView';

export default function CheckoutComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'header' | 'address' | 'payment' | 'summary'>('all');

  const [addressId, setAddressId] = useState('home');
  const [instructions, setInstructions] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('upi');

  const usageCode = `import CheckoutStepperHeader from '@/components/checkout/CheckoutStepperHeader';
import CheckoutView from '@/components/checkout/CheckoutView';
import DeliveryAddressSection from '@/components/checkout/DeliveryAddressSection';
import PaymentMethodSection from '@/components/checkout/PaymentMethodSection';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';

export default function MyCheckoutPage() {
  return (
    <>
      <CheckoutStepperHeader currentStep="payment" />
      <CheckoutView />
    </>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Checkout Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/checkout"
            className="text-xs font-bold text-[#059669] hover:underline px-3 py-1.5"
          >
            View Live Page →
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'Complete Checkout View' },
          { id: 'header', label: '1. Stepper Header' },
          { id: 'address', label: '2. Delivery Address' },
          { id: 'payment', label: '3. Payment Method' },
          { id: 'summary', label: '4. Order Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#059669] text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'all' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Full Interactive Checkout Flow</h2>
              <p className="text-xs text-gray-500">
                Complete two-column view containing Delivery Address, Payment Methods, and sticky Order Summary.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <CheckoutStepperHeader currentStep="payment" />
              <div className="bg-gray-50">
                <CheckoutView />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'header' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Checkout Stepper Header</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <CheckoutStepperHeader currentStep="payment" />
            </div>
          </div>
        )}

        {activeTab === 'address' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-bold text-gray-900">Delivery Address Section</h2>
            <DeliveryAddressSection
              selectedAddressId={addressId}
              onSelectAddress={setAddressId}
              deliveryInstructions={instructions}
              onInstructionsChange={setInstructions}
            />
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-bold text-gray-900">Payment Method Section</h2>
            <PaymentMethodSection
              selectedMethod={method}
              onSelectMethod={setMethod}
            />
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-4 max-w-sm">
            <h2 className="text-base font-bold text-gray-900">Checkout Order Summary Card</h2>
            <CheckoutOrderSummary
              items={[
                {
                  id: '1',
                  name: 'Wireless ANC Headphones',
                  store: 'Sharma Electronics',
                  quantity: 1,
                  price: 2499,
                  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
                  bgColor: '#edf5f0',
                },
                {
                  id: '2',
                  name: 'Hand-block Cotton Kurta',
                  store: 'Libas Boutique',
                  quantity: 1,
                  price: 899,
                  image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
                  bgColor: '#f7f6f2',
                },
                {
                  id: '3',
                  name: 'Basmati Rice 5 kg',
                  store: 'Gupta Kirana',
                  quantity: 1,
                  price: 549,
                  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
                  bgColor: '#fcf8ee',
                },
              ]}
              subtotal={3947}
              delivery={90}
              coupon={150}
              platformFee={9}
              total={3896}
              onPay={() => alert('Pay clicked')}
              onEditCart={() => alert('Edit cart clicked')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

