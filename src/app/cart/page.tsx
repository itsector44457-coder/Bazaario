'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CartHeaderStepper from '@/components/cart/CartHeaderStepper';
import CartView from '@/components/cart/CartView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export default function CartPage() {
  const router = useRouter();

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex flex-col justify-between">
      {/* 1. Header with Checkout Stepper (1 Cart -> 2 Address -> 3 Payment -> 4 Done) */}
      <CartHeaderStepper currentStep="cart" />

      {/* 2. Main Cart View */}
      <main className="flex-1">
        <CartView onProceedToCheckout={handleProceedToCheckout} />
      </main>

      {/* 3. Dark Green Minimal Footer */}
      <ShopFooter />
    </div>
  );
}
