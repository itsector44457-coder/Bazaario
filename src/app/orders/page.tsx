'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import UserProfileCard from '@/components/orders/UserProfileCard';
import OrdersSidebarNav, { OrdersNavSection } from '@/components/orders/OrdersSidebarNav';
import OrdersListView from '@/components/orders/OrdersListView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export default function MyOrdersPage() {
  const [activeSection, setActiveSection] = useState<OrdersNavSection>('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8 w-full">

        {/* ── Mobile: top account strip + drawer toggle ── */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <div>
            <p className="text-xs text-gray-500 font-medium">Signed in as</p>
            <p className="text-sm font-bold text-gray-900">Rahul Verma</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#059669] border border-[#059669]/30 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition"
          >
            <Menu className="w-4 h-4" />
            Account menu
          </button>
        </div>

        {/* ── Mobile Drawer Overlay ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900">My Account</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <UserProfileCard />
                <OrdersSidebarNav
                  activeSection={activeSection}
                  onSelectSection={(s) => {
                    setActiveSection(s);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Desktop: Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] 2xl:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left Sidebar (desktop only) */}
          <aside className="hidden lg:flex flex-col space-y-4 sticky top-6">
            <UserProfileCard />
            <OrdersSidebarNav
              activeSection={activeSection}
              onSelectSection={setActiveSection}
            />
          </aside>

          {/* Right Main Content */}
          <section className="min-w-0">
            {activeSection === 'orders' ? (
              <OrdersListView />
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-10 text-center border border-gray-100 text-gray-400">
                <h2 className="text-base font-bold text-gray-900 capitalize">
                  {activeSection.replace('-', ' ')}
                </h2>
                <p className="text-xs text-gray-400 mt-1">Section view under development.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 3. Footer */}
      <ShopFooter />
    </div>
  );
}
