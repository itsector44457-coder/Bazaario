'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Bike,
  Package,
  CheckCircle2,
  XCircle,
  MessageSquare,
  RotateCcw,
  Star,
  FileText,
  Store,
} from 'lucide-react';

export type OrderStatusType =
  | 'out-for-delivery'
  | 'packing'
  | 'delivered'
  | 'picked-up'
  | 'cancelled';

export interface OrderItemData {
  id: string;
  orderNumber: string;
  dateStr: string;
  status: OrderStatusType;
  statusLabel: string;
  productTitle: string;
  storeName: string;
  variantOrQty: string;
  price: number;
  image: string;
  bgColor?: string;
  ratingGiven?: number;
}

interface OrderCardItemProps {
  order: OrderItemData;
  onTrackOrder?: (orderId: string) => void;
  onChatShop?: (storeName: string) => void;
  onReorder?: (orderId: string) => void;
  onRateOrder?: (orderId: string) => void;
  onReturn?: (orderId: string) => void;
  onViewSimilar?: (orderId: string) => void;
  className?: string;
}

export default function OrderCardItem({
  order,
  onTrackOrder,
  onChatShop,
  onReorder,
  onRateOrder,
  onReturn,
  onViewSimilar,
  className = '',
}: OrderCardItemProps) {
  const router = useRouter();

  const renderStatusBadge = () => {
    switch (order.status) {
      case 'out-for-delivery':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d97706]">
            <Bike className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{order.statusLabel}</span>
          </span>
        );
      case 'packing':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
            <Package className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{order.statusLabel}</span>
          </span>
        );
      case 'delivered':
      case 'picked-up':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669]">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{order.statusLabel}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg px-2 py-0.5">
            <XCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{order.statusLabel}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const renderActionButtons = () => {
    if (order.status === 'out-for-delivery' || order.status === 'packing') {
      return (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onTrackOrder ? onTrackOrder(order.id) : router.push('/order-tracking')
            }
            className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-2xs transition cursor-pointer"
          >
            Track order
          </button>
          <button
            type="button"
            onClick={() =>
              onChatShop
                ? onChatShop(order.storeName)
                : router.push('/messages')
            }
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
            <span>Chat shop</span>
          </button>
        </div>
      );
    }

    if (order.status === 'delivered') {
      return (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onReorder ? onReorder(order.id) : alert(`Reordering ${order.productTitle}`)
            }
            className="bg-[#064e3b] hover:bg-[#043d2e] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Reorder</span>
          </button>
          <button
            type="button"
            onClick={() =>
              onRateOrder ? onRateOrder(order.id) : alert(`Rate order modal`)
            }
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
            <span>Rate</span>
          </button>
          <button
            type="button"
            onClick={() => alert(`Downloading invoice for ${order.orderNumber}`)}
            title="Download Invoice"
            className="w-8 h-8 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      );
    }

    if (order.status === 'picked-up') {
      return (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onReturn ? onReturn(order.id) : alert(`Return requested for ${order.productTitle}`)
            }
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
            <span>Return</span>
          </button>
          <div className="bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-1">
            <span>You rated</span>
            <span className="text-amber-500">★★★★★</span>
          </div>
        </div>
      );
    }

    if (order.status === 'cancelled') {
      return (
        <button
          type="button"
          onClick={() =>
            onViewSimilar
              ? onViewSimilar(order.id)
              : router.push('/search?q=table+lamp')
          }
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-4 rounded-xl transition cursor-pointer"
        >
          View similar
        </button>
      );
    }

    return null;
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs select-none space-y-4 ${className}`}
    >
      {/* 1. Card Top Bar: Order ID, Date & Status Pill */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
            {order.orderNumber}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {order.dateStr}
          </span>
        </div>

        {renderStatusBadge()}
      </div>

      {/* 2. Main Item Content & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Thumbnail & Details */}
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 relative border border-gray-100"
            style={{ backgroundColor: order.bgColor || '#f3f4f6' }}
          >
            <Image
              src={order.image}
              alt={order.productTitle}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0 space-y-1">
            <h4 className="text-xs sm:text-sm font-extrabold text-gray-950 truncate">
              {order.productTitle}
            </h4>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <Store className="w-3 h-3 text-[#059669] shrink-0" />
              <span className="text-gray-700 font-bold">{order.storeName}</span>
              {order.variantOrQty && (
                <>
                  <span className="text-gray-300">·</span>
                  <span>{order.variantOrQty}</span>
                </>
              )}
            </div>

            <p className="text-xs font-black text-gray-950 pt-0.5">
              ₹{order.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="self-end sm:self-center shrink-0">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
}

