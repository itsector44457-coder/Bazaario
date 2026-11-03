'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Printer,
  MessageSquare,
  Phone,
  CheckCircle2,
  Check,
  MapPin,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { SellerOrderSummary } from './SellerOrdersList';

interface SellerOrderDetailProps {
  order: SellerOrderSummary;
  onAcceptOrder?: (orderId: string) => void;
  onRejectOrder?: (orderId: string) => void;
  onPrintInvoice?: (orderId: string) => void;
  onBackMobile?: () => void;
  className?: string;
}

export default function SellerOrderDetail({
  order,
  onAcceptOrder,
  onRejectOrder,
  onPrintInvoice,
  onBackMobile,
  className = '',
}: SellerOrderDetailProps) {
  // Live ticking countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(order.acceptRemainingSeconds || 192);

  useEffect(() => {
    setSecondsRemaining(order.acceptRemainingSeconds || 192);
  }, [order.id, order.acceptRemainingSeconds]);

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 sm:p-7 space-y-6 select-none ${className}`}>
      {/* 1. Detail Header: Mobile Back + Title + Status Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          {onBackMobile && (
            <button
              type="button"
              onClick={onBackMobile}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
              aria-label="Back to orders list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div>
            <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Order
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
              {order.orderNumber}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onPrintInvoice?.(order.id) || window.print()}
            className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-gray-600" />
            <span>Invoice</span>
          </button>

          <span className="bg-[#fef3c7] text-[#b45309] text-xs font-extrabold px-3 py-2 rounded-xl border border-amber-200/80 shadow-2xs">
            Awaiting acceptance
          </span>
        </div>
      </div>

      {/* 2. Customer & Delivery Address (2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customer Card */}
        <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-100 space-y-2">
          <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
            CUSTOMER
          </span>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-gray-200">
                <Image
                  src={order.customerAvatar}
                  alt={order.customerName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-gray-900 truncate">
                  {order.customerName}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {order.customerOrdersCount} orders from your shop
                </p>
              </div>
            </div>

            {/* Quick Action Contact Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => alert(`Starting live chat with ${order.customerName}...`)}
                className="w-8 h-8 rounded-xl bg-[#064e3b] text-white flex items-center justify-center hover:bg-[#043d2e] transition shadow-xs cursor-pointer"
                title="Message Customer"
              >
                <MessageSquare className="w-4 h-4 fill-white stroke-none" />
              </button>

              <button
                type="button"
                onClick={() => alert(`Calling customer ${order.customerPhone || '+91 98201 44518'}...`)}
                className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition shadow-xs cursor-pointer"
                title="Call Customer"
              >
                <Phone className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-100 space-y-1">
          <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
            DELIVER TO · {order.distanceKm}
          </span>
          <p className="text-xs text-gray-700 font-medium leading-relaxed pt-1">
            {order.deliveryAddress}
          </p>
        </div>
      </div>

      {/* 3. Items Section */}
      <div className="space-y-3">
        <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
          ITEMS
        </span>

        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 transition bg-white"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#edf5f0] overflow-hidden relative shrink-0 border border-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {item.sku} · {item.variant}
                </p>
              </div>
            </div>

            <span className="font-extrabold text-sm sm:text-base text-gray-950 shrink-0">
              ₹{item.price.toLocaleString('en-IN')}
            </span>
          </div>
        ))}

        {/* Customer Note */}
        {order.customerNote && (
          <div className="bg-[#fef9c3]/70 border border-[#fde047]/60 rounded-2xl p-3 text-xs text-[#854d0e] font-medium flex items-center gap-2">
            <span>📝</span>
            <span>
              Customer note: &ldquo;{order.customerNote}&rdquo;
            </span>
          </div>
        )}
      </div>

      {/* 4. Financials & Payment (2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Your Earnings */}
        <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-100 space-y-2.5 text-xs">
          <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
            YOUR EARNINGS
          </span>

          <div className="flex items-center justify-between text-gray-600">
            <span>Item total</span>
            <span className="font-bold text-gray-900">
              ₹{order.earnings.itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span>Delivery fee collected</span>
            <span className="font-bold text-gray-900">
              ₹{order.earnings.deliveryFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between text-rose-600">
            <span>Commission (8%)</span>
            <span className="font-bold">
              -₹{order.earnings.commissionAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between text-rose-600">
            <span>GST on commission</span>
            <span className="font-bold">
              -₹{order.earnings.commissionGst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            <span className="font-extrabold text-gray-900">You receive</span>
            <span className="font-black text-sm sm:text-base text-[#059669]">
              ₹{order.earnings.netReceived.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Payment & Auto-Cancel Timer */}
        <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-100 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              PAYMENT
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Paid online via {order.paymentMethod}</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              {order.payoutDateText}
            </p>
          </div>

          {/* Accept Within Countdown Box */}
          <div className="space-y-0.5">
            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              ACCEPT WITHIN
            </span>
            <div className="text-2xl font-black text-[#d97706] tracking-tight">
              {formatCountdown(secondsRemaining)}
            </div>
            <p className="text-[10px] text-gray-400">
              Auto-cancels if not accepted
            </p>
          </div>
        </div>
      </div>

      {/* 5. Bottom Decision Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onRejectOrder?.(order.id) || alert(`Order ${order.orderNumber} rejected`)}
          className="px-5 py-3 rounded-2xl border border-rose-200 bg-white hover:bg-rose-50 text-xs font-extrabold text-rose-600 transition shadow-2xs cursor-pointer"
        >
          Reject order
        </button>

        <button
          type="button"
          onClick={() => onAcceptOrder?.(order.id) || alert(`Order ${order.orderNumber} accepted! Delivery partner notified.`)}
          className="flex-1 max-w-sm px-6 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] active:scale-98 text-white text-xs sm:text-sm font-extrabold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Accept order</span>
        </button>
      </div>
    </div>
  );
}

