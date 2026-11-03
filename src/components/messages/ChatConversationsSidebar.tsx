'use client';

import React from 'react';
import { Search, Headphones } from 'lucide-react';

export interface ConversationItem {
  id: string;
  shopName: string;
  avatarText: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  isSupport?: boolean;
}

interface ChatConversationsSidebarProps {
  conversations: ConversationItem[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  className?: string;
}

export default function ChatConversationsSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  className = '',
}: ChatConversationsSidebarProps) {
  return (
    <div
      className={`w-full md:w-72 lg:w-80 bg-white border-r border-gray-100 flex flex-col h-full select-none ${className}`}
    >
      {/* 1. Header & Search Input */}
      <div className="p-4 sm:p-5 border-b border-gray-100 space-y-3">
        <h2 className="text-lg font-extrabold text-gray-950 tracking-tight">
          Messages
        </h2>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search shops"
            className="w-full pl-9 pr-3 py-2 bg-[#f8faf9] border border-gray-200/80 rounded-xl text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
          />
        </div>
      </div>

      {/* 2. Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50/80">
        {conversations.map((item) => {
          const isActive = item.id === activeConversationId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectConversation(item.id)}
              className={`w-full text-left p-3.5 sm:p-4 flex items-center gap-3 transition cursor-pointer relative ${
                isActive
                  ? 'bg-emerald-50/40 border-l-3 border-[#059669]'
                  : 'hover:bg-gray-50 border-l-3 border-transparent'
              }`}
            >
              {/* Avatar with optional online green dot */}
              <div className="relative shrink-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-2xs"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  {item.isSupport ? (
                    <Headphones className="w-5 h-5 stroke-[2]" />
                  ) : (
                    item.avatarText
                  )}
                </div>

                {item.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Shop Name & Last Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="text-xs font-bold text-gray-900 truncate">
                    {item.shopName}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium shrink-0">
                    {item.time}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 truncate">
                  {item.lastMessage}
                </p>
              </div>

              {/* Unread Message Count Badge */}
              {item.unreadCount && item.unreadCount > 0 ? (
                <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {item.unreadCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

