import React from 'react';
import { Metadata } from 'next';
import SellerHeader from '@/components/seller-registration/SellerHeader';
import SellerBenefitsSidebar from '@/components/seller-registration/SellerBenefitsSidebar';
import SellerRegistrationView from '@/components/seller-registration/SellerRegistrationView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Register Your Shop | Bazaario for Business',
  description: 'Take your local shop online in 10 minutes on Bazaario marketplace.',
};

export default function SellerRegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Header */}
      <SellerHeader />

      {/* 2. Mobile compact banner (shown only on small screens) */}
      <div className="lg:hidden bg-[#064e3b] text-white px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black text-white">Take your shop online in 10 min</p>
          <p className="text-[10px] text-emerald-200 mt-0.5">Join 1,200+ local shops · ₹0 listing fee</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-emerald-300 font-bold">Commission only when you sell</p>
          <p className="text-[10px] text-emerald-200">Grocery 5% · Electronics 8%</p>
        </div>
      </div>

      {/* 3. Main Layout: Sidebar (lg+) + Form */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Benefits sidebar — desktop only */}
          <SellerBenefitsSidebar className="hidden lg:flex" />

          {/* Registration form */}
          <div className="flex-1 min-w-0">
            <SellerRegistrationView />
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <ShopFooter />
    </div>
  );
}
