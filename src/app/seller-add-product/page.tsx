'use client';

import React, { useState } from 'react';
import SellerSidebar from '@/components/seller-products/SellerSidebar';
import SellerHeaderNav from '@/components/seller-products/SellerHeaderNav';
import SellerAddProductView from '@/components/seller-add-product/SellerAddProductView';

export default function SellerAddProductPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex">
      {/* 1. Left Sidebar with activeTab='add-product' */}
      <SellerSidebar
        activeTab="add-product"
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Right Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <SellerHeaderNav onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl 2xl:max-w-screen-2xl w-full mx-auto">
          <SellerAddProductView />
        </main>
      </div>
    </div>
  );
}

