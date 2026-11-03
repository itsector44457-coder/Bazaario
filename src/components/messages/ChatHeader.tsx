'use client';

import React from 'react';
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ChatHeaderProps {
  shopName?: string;
  avatarText?: string;
  avatarBg?: string;
  isOnline?: boolean;
  replyTimeText?: string;
  onCall?: () => void;
  onWhatsApp?: () => void;
  className?: string;
}

export default function ChatHeader({
  shopName = 'Sharma Electronics',
  avatarText = 'SE',
  avatarBg = '#064e3b',
  isOnline = true,
  replyTimeText = 'Usually replies in 5 min',
  onCall,
  onWhatsApp,
  className = '',
}: ChatHeaderProps) {
  return (
    <div
      className={`px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between select-none ${className}`}
    >
      {/* 1. Shop Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-2xs"
          style={{ backgroundColor: avatarBg }}
        >
          {avatarText}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-extrabold text-gray-950 truncate">
              {shopName}
            </h2>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] fill-emerald-50 shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            {isOnline && (
              <span className="flex items-center gap-1 text-[#059669] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                Online
              </span>
            )}
            {isOnline && replyTimeText && <span>·</span>}
            {replyTimeText && <span>{replyTimeText}</span>}
          </div>
        </div>
      </div>

      {/* 2. Quick Contact Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onCall || (() => alert(`Calling ${shopName}`))}
          title="Call Shop"
          className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-700 flex items-center justify-center transition cursor-pointer"
        >
          <Phone className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={onWhatsApp || (() => alert(`Opening WhatsApp with ${shopName}`))}
          title="WhatsApp Shop"
          className="w-9 h-9 rounded-xl bg-[#e8f7f0] hover:bg-[#d8f0e4] border border-emerald-200/60 text-[#059669] flex items-center justify-center transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}

