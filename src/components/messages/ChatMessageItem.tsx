'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCheck } from 'lucide-react';

export type MessageType =
  | 'user'
  | 'shop'
  | 'product-enquiry'
  | 'system-event';

export interface ChatMessageData {
  id: string;
  type: MessageType;
  text?: string;
  time?: string;
  avatarText?: string;
  avatarBg?: string;
  // For product enquiry
  productImage?: string;
  productTitle?: string;
  productPrice?: number;
  // For system event
  orderNumber?: string;
  orderTrackUrl?: string;
}

interface ChatMessageItemProps {
  message: ChatMessageData;
  className?: string;
}

export default function ChatMessageItem({
  message,
  className = '',
}: ChatMessageItemProps) {
  // 1. System Order Placed Capsule Pill
  if (message.type === 'system-event') {
    return (
      <div className={`flex justify-center my-3 ${className}`}>
        <div className="bg-[#e6f4ea] border border-emerald-200/60 text-[#064e3b] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
          <span>🛍️</span>
          <span>Order {message.orderNumber} placed · </span>
          <Link
            href={message.orderTrackUrl || '/order-tracking'}
            className="underline font-bold hover:text-emerald-950 transition"
          >
            Track
          </Link>
        </div>
      </div>
    );
  }

  // 2. Product Enquiry Card
  if (message.type === 'product-enquiry') {
    return (
      <div className={`flex justify-center my-3 ${className}`}>
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 shadow-2xs max-w-sm w-full">
          {message.productImage && (
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative bg-[#edf5f0]">
              <Image
                src={message.productImage}
                alt={message.productTitle || 'Product'}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="min-w-0">
            <span className="block text-[11px] text-gray-400 font-medium">
              Enquiry about
            </span>
            <h4 className="text-xs font-bold text-gray-900 truncate">
              {message.productTitle} · ₹{message.productPrice?.toLocaleString('en-IN')}
            </h4>
          </div>
        </div>
      </div>
    );
  }

  // 3. User Message Bubble (Right-aligned, Emerald Green)
  if (message.type === 'user') {
    return (
      <div className={`flex justify-end my-2.5 ${className}`}>
        <div className="max-w-[75%] sm:max-w-[65%] bg-[#059669] text-white rounded-2xl rounded-tr-xs p-3.5 shadow-2xs text-xs sm:text-[13px] leading-relaxed">
          <p className="whitespace-pre-line">{message.text}</p>
          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-emerald-100 font-medium">
            <span>{message.time}</span>
            <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Shop Message Bubble (Left-aligned, White with avatar)
  return (
    <div className={`flex items-start gap-2.5 my-2.5 max-w-[80%] sm:max-w-[70%] ${className}`}>
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-[10px] shrink-0 mt-0.5 shadow-2xs"
        style={{ backgroundColor: message.avatarBg || '#064e3b' }}
      >
        {message.avatarText || 'SE'}
      </div>

      <div className="bg-white border border-gray-100 text-gray-900 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs text-xs sm:text-[13px] leading-relaxed">
        <p className="whitespace-pre-line">{message.text}</p>
        <span className="block text-[10px] text-gray-400 font-medium mt-1">
          {message.time}
        </span>
      </div>
    </div>
  );
}

