'use client';

import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import ChatConversationsSidebar, { ConversationItem } from './ChatConversationsSidebar';
import ChatHeader from './ChatHeader';
import ChatMessageItem, { ChatMessageData } from './ChatMessageItem';
import ChatQuickReplies from './ChatQuickReplies';
import ChatMessageInput from './ChatMessageInput';
import ChatShopDetailsSidebar from './ChatShopDetailsSidebar';

const CONVERSATIONS: ConversationItem[] = [
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
  {
    id: 'gupta',
    shopName: 'Gupta Kirana Store',
    avatarText: 'GK',
    avatarBg: '#f59e0b',
    lastMessage: 'Thank you ji 🙏 Visit again',
    time: 'Yesterday',
  },
  {
    id: 'stepup',
    shopName: 'StepUp Footwear',
    avatarText: 'SU',
    avatarBg: '#7c3aed',
    lastMessage: 'Exchange done, size 9 ready',
    time: 'Mon',
  },
  {
    id: 'support',
    shopName: 'Bazaario Support',
    avatarText: 'BS',
    avatarBg: '#1e293b',
    lastMessage: 'Your refund of ₹1,299 is processed',
    time: '12 Oct',
    isSupport: true,
  },
];

const INITIAL_MESSAGES: ChatMessageData[] = [
  {
    id: 'msg-1',
    type: 'product-enquiry',
    productTitle: 'Wireless ANC Headphones',
    productPrice: 2499,
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'msg-2',
    type: 'user',
    text: 'Hi! Is the black colour in stock? And does it come with a warranty card?',
    time: '3:31 PM',
  },
  {
    id: 'msg-3',
    type: 'shop',
    avatarText: 'SE',
    avatarBg: '#064e3b',
    text: 'Namaste Rahul ji! Yes, 8 pieces in Midnight Black. 1 year brand warranty + bill from our shop. 👍',
    time: '3:33 PM',
  },
  {
    id: 'msg-4',
    type: 'user',
    text: 'Great, placing the order now 🙌',
    time: '3:40 PM',
  },
  {
    id: 'msg-5',
    type: 'system-event',
    orderNumber: '#BZ-48213-A',
    orderTrackUrl: '/order-tracking',
  },
  {
    id: 'msg-6',
    type: 'shop',
    avatarText: 'SE',
    avatarBg: '#064e3b',
    text: 'Order packed and handed to Imran. Your order is out for delivery 🛵',
    time: '4:05 PM',
  },
];

type MobileView = 'list' | 'chat' | 'info';

interface MessagesViewProps {
  className?: string;
}

export default function MessagesView({ className = '' }: MessagesViewProps) {
  const [activeId, setActiveId] = useState('sharma');
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>(INITIAL_MESSAGES);
  const [mobileView, setMobileView] = useState<MobileView>('list');

  const activeConv = CONVERSATIONS.find((c) => c.id === activeId) || CONVERSATIONS[0];

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessageData = {
      id: `msg-${Date.now()}`,
      type: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setMobileView('chat');
  };

  const filteredConversations = CONVERSATIONS.filter((c) =>
    c.shopName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`w-full ${className}`}>
      {/* ── Desktop & Tablet: 3-column layout ── */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden flex flex-row w-full h-[750px] 2xl:h-[860px]">
          {/* 1. Conversations List */}
          <ChatConversationsSidebar
            conversations={filteredConversations}
            activeConversationId={activeId}
            onSelectConversation={setActiveId}
            searchQuery={search}
            onSearchChange={setSearch}
          />

          {/* 2. Chat Stream */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#fcfdfd]">
            <ChatHeader
              shopName={activeConv.shopName}
              avatarText={activeConv.avatarText}
              avatarBg={activeConv.avatarBg}
              isOnline={activeConv.isOnline}
            />

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1">
              <div className="text-center my-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white/80 border border-gray-100 px-3 py-1 rounded-full shadow-2xs">
                  Today
                </span>
              </div>
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))}
            </div>

            <ChatQuickReplies onSelectReply={handleQuickReply} />
            <ChatMessageInput onSendMessage={handleSendMessage} />
          </div>

          {/* 3. Shop Details Sidebar */}
          <ChatShopDetailsSidebar
            shopName={activeConv.shopName}
            linkedOrderId={activeConv.id === 'sharma' ? '#BZ-48213-A' : undefined}
            className="hidden xl:flex"
          />
        </div>
      </div>

      {/* ── Mobile: single-panel with tab-switching ── */}
      <div className="sm:hidden flex flex-col bg-white" style={{ height: 'calc(100dvh - 56px - 64px)' }}>

        {/* PANEL A: Conversations list */}
        {mobileView === 'list' && (
          <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-2 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-extrabold text-gray-900">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ChatConversationsSidebar
                conversations={filteredConversations}
                activeConversationId={activeId}
                onSelectConversation={handleSelectConversation}
                searchQuery={search}
                onSearchChange={setSearch}
              />
            </div>
          </div>
        )}

        {/* PANEL B: Chat */}
        {mobileView === 'chat' && (
          <div className="flex flex-col h-full">
            {/* Custom mobile chat header with back + info buttons */}
            <div className="flex items-center gap-1 px-2 py-2 border-b border-gray-100 bg-white shrink-0">
              <button
                onClick={() => setMobileView('list')}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0"
                style={{ backgroundColor: activeConv.avatarBg }}
              >
                {activeConv.avatarText}
              </div>
              <div className="flex-1 min-w-0 ml-1">
                <p className="text-sm font-bold text-gray-900 truncate">{activeConv.shopName}</p>
                {activeConv.isOnline && (
                  <p className="text-[11px] text-[#059669] font-medium leading-none">● Online</p>
                )}
              </div>
              <button
                onClick={() => setMobileView('info')}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
                aria-label="Shop info"
              >
                <Info className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 bg-[#fcfdfd]">
              <div className="text-center my-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white/80 border border-gray-100 px-3 py-1 rounded-full">
                  Today
                </span>
              </div>
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))}
            </div>

            <ChatQuickReplies onSelectReply={handleQuickReply} />
            <ChatMessageInput onSendMessage={handleSendMessage} />
          </div>
        )}

        {/* PANEL C: Shop info */}
        {mobileView === 'info' && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 shrink-0">
              <button
                onClick={() => setMobileView('chat')}
                className="p-1.5 rounded-xl hover:bg-gray-100 transition"
                aria-label="Back to chat"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-sm font-bold text-gray-900">Shop Info</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ChatShopDetailsSidebar
                shopName={activeConv.shopName}
                linkedOrderId={activeConv.id === 'sharma' ? '#BZ-48213-A' : undefined}
                className="flex flex-col border-none rounded-none shadow-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
