'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeliveryAddressSection from './DeliveryAddressSection';
import PaymentMethodSection, { PaymentMethod } from './PaymentMethodSection';
import CheckoutOrderSummary, { CheckoutItem } from './CheckoutOrderSummary';

const CHECKOUT_ITEMS: CheckoutItem[] = [
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
];

const SUBTOTAL = 3947;
const DELIVERY = 90;
const COUPON = 150;
const PLATFORM_FEE = 9;
const TOTAL = 3896;

export default function CheckoutView() {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState('home');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  const handlePay = () => {
    router.push('/order-success');
  };

  const handleEditCart = () => {
    router.push('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left column: Address + Payment */}
        <div className="lg:col-span-8 space-y-5">
          <DeliveryAddressSection
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            deliveryInstructions={deliveryInstructions}
            onInstructionsChange={setDeliveryInstructions}
          />

          <PaymentMethodSection
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
          />
        </div>

        {/* Right column: Order summary (stacks below on mobile) */}
        <div className="lg:col-span-4">
          <CheckoutOrderSummary
            items={CHECKOUT_ITEMS}
            subtotal={SUBTOTAL}
            delivery={DELIVERY}
            coupon={COUPON}
            platformFee={PLATFORM_FEE}
            total={TOTAL}
            onPay={handlePay}
            onEditCart={handleEditCart}
          />
        </div>
      </div>

      {/* Mobile sticky Pay bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3 lg:hidden">
        <div>
          <p className="text-[11px] text-gray-500 font-medium">To pay</p>
          <p className="text-base font-extrabold text-gray-950">₹{TOTAL.toLocaleString('en-IN')}</p>
        </div>
        <button
          type="button"
          onClick={handlePay}
          className="flex-1 max-w-xs bg-[#059669] hover:bg-[#047857] active:scale-[0.98] text-white text-sm font-extrabold py-3 px-6 rounded-2xl shadow-lg shadow-emerald-200 transition"
        >
          🔒 Pay ₹{TOTAL.toLocaleString('en-IN')}
        </button>
      </div>
    </div>
  );
}
