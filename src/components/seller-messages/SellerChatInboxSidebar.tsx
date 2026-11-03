'use client';

import React from 'react';
import Image from 'next/image';

export interface SellerConversation {
  id: string;
  customerName: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isUnread?: boolean;
  tag?: {
    text: string;
    type: 'order' | 'enquiry';
  };
  customerSince?: string;
  location?: string;
  totalOrders?: number;
  totalSpent?: number;
  recentOrders?: { id: string; status: 'New' | 'Delivered' | 'Cancelled' }[];
  privateNote?: string;
}

interface SellerChatInboxSidebarProps {
  conversations: SellerConversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  activeFilterTab: string;
  onSelectFilterTab: (tab: string) => void;
  className?: string;
}

export default function SellerChatInboxSidebar({
  conversations,
  activeId,
  onSelectConversation,
  activeFilterTab,
  onSelectFilterTab,
  className = '',
}: SellerChatInboxSidebarProps) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread', count: 3 },
    { id: 'enquiries', label: 'Enquiries' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <div className={`w-full bg-white border-r border-gray-100 flex flex-col h-full select-none ${className}`}>
      {/* 1. Header with Title & Avg reply speed */}
      <div className="p-4 sm:p-5 border-b border-gray-100 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-950 tracking-tight">
            Inbox
          </h2>

          <span className="bg-[#e6f4ea] text-[#059669] text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
            Avg reply 4 min
          </span>
        </div>

        {/* 2. Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeFilterTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectFilterTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'bg-gray-100/80 hover:bg-gray-200/70 text-gray-600'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="opacity-90">{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Conversations Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs">
            No conversations in this filter
          </div>
        ) : (
          conversations.map((item) => {
            const isActive = item.id === activeId;

            return (
              <div
                key={item.id}
                onClick={() => onSelectConversation(item.id)}
                className={`p-3.5 sm:p-4 flex items-start gap-3 transition cursor-pointer relative ${
                  isActive
                    ? 'bg-[#f0fdf4]/70 border-l-4 border-[#059669]'
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-gray-100">
                  <Image
                    src={item.avatar}
                    alt={item.customerName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text & Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">
                      {item.customerName}
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-gray-400 font-medium">
                        {item.time}
                      </span>
                      {item.isUnread && (
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 truncate mb-1">
                    {item.lastMessage}
                  </p>

                  {/* Tag: ORDER or ENQUIRY */}
                  {item.tag && (
                    <span
                      className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                        item.tag.type === 'order'
                          ? 'bg-[#fef3c7] text-[#92400e] border border-amber-200/60'
                          : 'bg-[#e0f2fe] text-[#0369a1] border border-sky-200/60'
                      }`}
                    >
                      {item.tag.text}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
