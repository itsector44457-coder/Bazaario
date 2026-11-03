import React from 'react';
import { Metadata } from 'next';
import CheckoutStepperHeader from '@/components/checkout/CheckoutStepperHeader';
import CheckoutView from '@/components/checkout/CheckoutView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Checkout | Bazaario',
  description: 'Complete your hyperlocal purchase on Bazaario',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Header with Step 3 Active (Payment) */}
      <CheckoutStepperHeader currentStep="payment" />

      {/* 2. Main Checkout Two-Column Layout */}
      <main className="flex-1">
        <CheckoutView />
      </main>

      {/* 3. Minimal Footer */}
      <ShopFooter />
    </div>
  );
}
