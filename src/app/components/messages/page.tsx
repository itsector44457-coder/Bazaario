'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import ChatConversationsSidebar from '@/components/messages/ChatConversationsSidebar';
import ChatHeader from '@/components/messages/ChatHeader';
import ChatMessageItem from '@/components/messages/ChatMessageItem';
import ChatQuickReplies from '@/components/messages/ChatQuickReplies';
import ChatMessageInput from '@/components/messages/ChatMessageInput';
import ChatShopDetailsSidebar from '@/components/messages/ChatShopDetailsSidebar';
import MessagesView from '@/components/messages/MessagesView';

export default function MessagesComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sidebar' | 'header' | 'item' | 'input' | 'shop'>('all');

  const usageCode = `import MessagesView from '@/components/messages/MessagesView';

export default function MyChatPage() {
  return <MessagesView />;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Messages & Chat Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/messages"
            className="text-xs font-bold text-[#059669] hover:underline px-3 py-1.5"
          >
            View Live Page →
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'Full 3-Column Chat' },
          { id: 'sidebar', label: '1. Conversations Sidebar' },
          { id: 'header', label: '2. Chat Header' },
          { id: 'item', label: '3. Message Bubbles' },
          { id: 'input', label: '4. Quick Replies & Input' },
          { id: 'shop', label: '5. Shop Profile & Linked Order' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#059669] text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'all' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Complete Messages Interface</h2>
              <p className="text-xs text-gray-500">
                Exact replica of Bazaario 3-column in-app chat: conversations list, interactive messages stream with order embeds, and right shop sidebar.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
              <MessagesView />
            </div>
          </div>
        )}

        {activeTab === 'sidebar' && (
          <div className="space-y-4 max-w-sm">
            <h2 className="text-base font-bold text-gray-900">Conversations List Sidebar</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-[450px]">
              <ChatConversationsSidebar
                conversations={[
                  {
                    id: 'sharma',
                    shopName: 'Sharma Electronics',
                    avatarText: 'SE',
                    avatarBg: '#064e3b',
                    lastMessage: 'Your order is out for delivery 🛵',
                    time: '4:05 PM',
                    isOnline: true,
                  },
                  {
                    id: 'libas',
                    shopName: 'Libas Boutique',
                    avatarText: 'LB',
                    avatarBg: '#db2777',
                    lastMessage: 'Size M is available in green also',
                    time: '3:50 PM',
                    unreadCount: 2,
                    isOnline: true,
                  },
                ]}
                activeConversationId="sharma"
                onSelectConversation={() => {}}
                searchQuery=""
                onSearchChange={() => {}}
              />
            </div>
          </div>
        )}

        {activeTab === 'header' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Chat Header with Call & WhatsApp</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <ChatHeader />
            </div>
          </div>
        )}

        {activeTab === 'item' && (
          <div className="space-y-4 max-w-xl">
            <h2 className="text-base font-bold text-gray-900">Message Bubble Types</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
              <ChatMessageItem
                message={{
                  id: '1',
                  type: 'product-enquiry',
                  productTitle: 'Wireless ANC Headphones',
                  productPrice: 2499,
                  productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
                }}
              />
              <ChatMessageItem
                message={{
                  id: '2',
                  type: 'user',
                  text: 'Hi! Is the black colour in stock? And does it come with a warranty card?',
                  time: '3:31 PM',
                }}
              />
              <ChatMessageItem
                message={{
                  id: '3',
                  type: 'shop',
                  text: 'Namaste Rahul ji! Yes, 8 pieces in Midnight Black. 1 year brand warranty + bill from our shop. 👍',
                  time: '3:33 PM',
                }}
              />
              <ChatMessageItem
                message={{
                  id: '4',
                  type: 'system-event',
                  orderNumber: '#BZ-48213-A',
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'input' && (
          <div className="space-y-4 max-w-xl">
            <h2 className="text-base font-bold text-gray-900">Quick Replies & Message Input</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <ChatQuickReplies onSelectReply={(r) => alert(`Selected quick reply: ${r}`)} />
              <ChatMessageInput onSendMessage={(m) => alert(`Sent message: ${m}`)} />
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-4 max-w-sm">
            <h2 className="text-base font-bold text-gray-900">Shop Profile & Linked Order Sidebar</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <ChatShopDetailsSidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

