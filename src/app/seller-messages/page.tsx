'use client';

import React, { useState } from 'react';
import SellerSidebar from '@/components/seller-products/SellerSidebar';
import SellerHeaderNav from '@/components/seller-products/SellerHeaderNav';
import SellerMessagesView from '@/components/seller-messages/SellerMessagesView';

export default function SellerMessagesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-[#fcfdfd] text-gray-900 flex overflow-hidden">
      {/* 1. Left Sidebar with activeTab='messages' */}
      <SellerSidebar
        activeTab="messages"
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Right Section */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <SellerHeaderNav onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-0 sm:p-4 lg:p-5 max-w-7xl 2xl:max-w-screen-2xl w-full mx-auto min-h-0 flex flex-col overflow-hidden">
          <SellerMessagesView />
        </main>
      </div>
    </div>
  );
}
