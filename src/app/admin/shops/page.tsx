'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeaderNav from '@/components/admin/AdminHeaderNav';
import AdminShopsView from '@/components/admin/AdminShopsView';

export default function AdminShopsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex">
      {/* 1. Left Admin Sidebar with activeTab='shops' */}
      <AdminSidebar
        activeTab="shops"
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Right Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeaderNav onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl 2xl:max-w-screen-2xl w-full mx-auto">
          <AdminShopsView />
        </main>
      </div>
    </div>
  );
}
