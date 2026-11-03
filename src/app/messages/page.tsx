import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import MessagesView from '@/components/messages/MessagesView';
import ShopFooter from '@/components/shop-profile/ShopFooter';

export const metadata: Metadata = {
  title: 'Messages | Bazaario',
  description: 'Chat directly with local shops and track your order updates in real-time.',
};

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] text-gray-900">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Main Messages Container */}
      <main className="flex-1 flex items-center">
        <MessagesView />
      </main>

      {/* 3. Footer */}
      <ShopFooter />
    </div>
  );
}

