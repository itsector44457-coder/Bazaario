import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import OrderTrackingView from '@/components/order-tracking/OrderTrackingView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Track Order #BZ-48213 | Bazaario',
  description: 'Live hyperlocal order tracking with real-time ETA and status updates.',
};

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Full Bazaario Navbar */}
      <Navbar />

      {/* 2. Main Order Tracking Content */}
      <main className="flex-1">
        <OrderTrackingView />
      </main>

      {/* 3. Minimal Footer */}
      <ShopFooter />
    </div>
  );
}

