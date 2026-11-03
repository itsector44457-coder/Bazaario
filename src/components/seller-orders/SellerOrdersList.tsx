'use client';

import React from 'react';
import { Bike, ShoppingBag, Banknote, CreditCard, Smartphone } from 'lucide-react';

export interface SellerOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerOrdersCount: number;
  customerAvatar: string;
  timeAgo: string;
  fulfilmentType: 'delivery' | 'pickup';
  paymentMethod: 'UPI' | 'Card' | 'COD';
  itemCount: number;
  totalAmount: number;
  status: 'new' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled';
  deliveryAddress: string;
  distanceKm: string;
  customerNote?: string;
  items: {
    name: string;
    sku: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  earnings: {
    itemTotal: number;
    deliveryFee: number;
    commissionAmount: number;
    commissionGst: number;
    netReceived: number;
  };
  payoutDateText: string;
  acceptRemainingSeconds: number; // e.g. 192 (03:12)
}

interface SellerOrdersListProps {
  orders: SellerOrderSummary[];
  selectedOrderId: string;
  onSelectOrder: (orderId: string) => void;
  className?: string;
}

export default function SellerOrdersList({
  orders,
  selectedOrderId,
  onSelectOrder,
  className = '',
}: SellerOrdersListProps) {
  const getFulfilmentIcon = (type: 'delivery' | 'pickup') => {
    if (type === 'delivery') {
      return <Bike className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />;
    }
    return <ShoppingBag className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-gray-400">
          <p className="text-sm font-bold text-gray-700">No orders in this tab</p>
          <p className="text-xs text-gray-400 mt-1">Check back later or switch filter tabs.</p>
        </div>
      ) : (
        orders.map((order) => {
          const isSelected = order.id === selectedOrderId;

          return (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-2 border-[#10b981] shadow-md ring-4 ring-emerald-500/10'
                  : 'border-gray-200/80 hover:border-gray-300 hover:shadow-xs shadow-2xs'
              }`}
            >
              {/* Order Number & New Badge */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-extrabold text-sm sm:text-base text-gray-950 tracking-tight">
                  {order.orderNumber}
                </span>

                <span className="bg-[#fef3c7] text-[#b45309] text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-amber-200/60 shadow-2xs">
                  NEW · {order.timeAgo}
                </span>
              </div>

              {/* Customer Name */}
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">
                {order.customerName}
              </p>

              {/* Fulfilment Meta & Total Price */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500 capitalize font-medium">
                  {getFulfilmentIcon(order.fulfilmentType)}
                  <span>
                    {order.fulfilmentType} · {order.itemCount} item{order.itemCount > 1 ? 's' : ''} · {order.paymentMethod}
                  </span>
                </div>

                <span className="font-extrabold text-sm sm:text-base text-gray-950">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

