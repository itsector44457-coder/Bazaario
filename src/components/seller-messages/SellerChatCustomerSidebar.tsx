'use client';

import React from 'react';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  X,
  PanelRightClose,
  Calendar,
  MapPin,
  ShoppingBag,
  CreditCard,
  FileText,
} from 'lucide-react';
import { SellerConversation } from './SellerChatInboxSidebar';

interface SellerChatCustomerSidebarProps {
  conversation: SellerConversation;
  onCall?: () => void;
  onWhatsApp?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function SellerChatCustomerSidebar({
  conversation,
  onCall,
  onWhatsApp,
  onClose,
  className = '',
}: SellerChatCustomerSidebarProps) {
  const customerSince = conversation.customerSince || 'Mar 2024';
  const location = conversation.location || 'Andheri W';
  const totalOrders = conversation.totalOrders ?? 6;
  const totalSpent = conversation.totalSpent ?? 14820;
  const recentOrders = conversation.recentOrders || [
    { id: '#BZ-48219-A', status: 'New' },
    { id: '#BZ-44102', status: 'Delivered' },
    { id: '#BZ-41877', status: 'Delivered' },
  ];
  const privateNote = conversation.privateNote || 'Prefers evening delivery.';

  return (
    <div
      className={`w-full bg-white h-full flex flex-col justify-between select-none overflow-y-auto scrollbar-thin ${className}`}
    >
      <div className="p-4 sm:p-5 space-y-5">
        {/* Top Bar with Minimal Header & Collapse Button */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-[11px] font-black tracking-wider uppercase text-gray-400">
            Customer Profile
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Collapse sidebar"
            >
              <PanelRightClose className="w-4 h-4 text-gray-500" />
              <span className="hidden sm:inline text-[11px]">Collapse</span>
            </button>
          )}
        </div>

        {/* 1. Minimal Customer Avatar & Identity */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-16 h-16 rounded-full overflow-hidden relative mx-auto border-2 border-emerald-500/30 shadow-xs ring-4 ring-emerald-50">
            <Image
              src={conversation.avatar}
              alt={conversation.customerName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-base font-black text-gray-950 tracking-tight">
              {conversation.customerName}
            </h3>
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 mt-0.5 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                Since {customerSince}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Action Buttons (Call / WhatsApp) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCall || (() => alert(`Calling ${conversation.customerName}...`))}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-gray-600 stroke-[2.2]" />
            <span>Call</span>
          </button>

          <button
            type="button"
            onClick={
              onWhatsApp ||
              (() => alert(`Opening WhatsApp with ${conversation.customerName}...`))
            }
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#e8f7f0] hover:bg-[#d6f2e2] border border-emerald-200 text-xs font-bold text-[#059669] transition shadow-2xs active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* 3. Minimal Metrics Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-semibold text-gray-500">Orders</span>
            </div>
            <span className="block text-lg font-black text-gray-950">
              {totalOrders}
            </span>
          </div>

          <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-semibold text-gray-500">Total spent</span>
            </div>
            <span className="block text-base font-black text-gray-950 truncate">
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* 4. Recent Orders List */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              RECENT ORDERS
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Last 3 orders</span>
          </div>

          <div className="space-y-1.5 bg-gray-50/60 rounded-2xl p-2.5 border border-gray-100">
            {recentOrders.map((ord) => (
              <div
                key={ord.id}
                className="flex items-center justify-between text-xs py-1 px-1.5 rounded-lg hover:bg-white transition"
              >
                <span className="font-bold text-gray-800">{ord.id}</span>
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                    ord.status === 'New'
                      ? 'bg-amber-100 text-amber-800'
                      : ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Minimal Private Note */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
            <FileText className="w-3 h-3" />
            <span>PRIVATE NOTE</span>
          </div>

          <div className="bg-[#fffdf5] rounded-2xl p-3 border border-amber-200/60 text-xs text-gray-700 leading-relaxed font-medium shadow-2xs">
            {privateNote}
          </div>
        </div>
      </div>
    </div>
  );
}
