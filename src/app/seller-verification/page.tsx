import React from 'react';
import { Metadata } from 'next';
import SellerVerificationView from '@/components/seller-verification/SellerVerificationView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Application Under Review | Bazaario for Business',
  description: 'Your shop onboarding application is currently under verification.',
};

export default function SellerVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-4 sm:py-6 w-full">
        <SellerVerificationView />
      </main>
      <ShopFooter />
    </div>
  );
}

