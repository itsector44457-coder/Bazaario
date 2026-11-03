import React from 'react';
import { Metadata } from 'next';
import OrderSuccessHeader from '@/components/order-success/OrderSuccessHeader';
import OrderSuccessView from '@/components/order-success/OrderSuccessView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Order Placed Successfully | Bazaario',
  description: 'Your hyperlocal marketplace order has been placed successfully.',
};

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Header with all 4 steps marked Done */}
      <OrderSuccessHeader />

      {/* 2. Main Order Success Content */}
      <main className="flex-1">
        <OrderSuccessView />
      </main>

      {/* 3. Minimal Footer */}
      <ShopFooter />
    </div>
  );
}

