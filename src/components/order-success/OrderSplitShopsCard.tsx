'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageSquare, MapPin } from 'lucide-react';

export interface SplitShopOrder {
  id: string;
  subOrderId: string;
  shopName: string;
  itemTitle: string;
  eta: string;
  status: 'Accepted' | 'Awaiting shop' | 'Packing' | 'Out for delivery';
  image: string;
  bgColor?: string;
}

interface OrderSplitShopsCardProps {
  orders?: SplitShopOrder[];
  deliveryAddressTitle?: string;
  deliveryAddressText?: string;
  onChatWithShop?: (shopName: string) => void;
  className?: string;
}

const DEFAULT_SPLIT_ORDERS: SplitShopOrder[] = [
  {
    id: 'shop-1',
    subOrderId: '#BZ-48213-A',
    shopName: 'Sharma Electronics',
    itemTitle: 'Wireless ANC Headphones',
    eta: 'Arriving by 4:30 PM',
    status: 'Accepted',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    bgColor: '#edf5f0',
  },
  {
    id: 'shop-2',
    subOrderId: '#BZ-48213-B',
    shopName: 'Libas Boutique',
    itemTitle: 'Hand-block Cotton Kurta',
    eta: 'Arriving by 4:25 PM',
    status: 'Awaiting shop',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#f7f6f2',
  },
  {
    id: 'shop-3',
    subOrderId: '#BZ-48213-C',
    shopName: 'Gupta Kirana Store',
    itemTitle: 'Basmati Rice 5 kg',
    eta: 'Arriving by 4:10 PM',
    status: 'Packing',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#fcf8ee',
  },
];

export default function OrderSplitShopsCard({
  orders = DEFAULT_SPLIT_ORDERS,
  deliveryAddressTitle = 'Delivering to Home',
  deliveryAddressText = 'B-702, Silver Oak Apartments, Lokhandwala, Andheri West, Mumbai 400053',
  onChatWithShop,
  className = '',
}: OrderSplitShopsCardProps) {
  const router = useRouter();
  const getStatusBadge = (status: SplitShopOrder['status']) => {
    switch (status) {
      case 'Accepted':
      case 'Packing':
        return (
          <span className="bg-[#e6f4ea] text-[#059669] border border-emerald-200/60 rounded-lg px-2.5 py-1 text-xs font-bold">
            {status}
          </span>
        );
      case 'Awaiting shop':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200/80 rounded-lg px-2.5 py-1 text-xs font-bold">
            {status}
          </span>
        );
      case 'Out for delivery':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200/80 rounded-lg px-2.5 py-1 text-xs font-bold">
            {status}
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 rounded-lg px-2.5 py-1 text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-xs space-y-6 ${className}`}
    >
      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
        Your order is split across {orders.length} shops
      </h2>

      {/* Shop items list */}
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <div
            key={order.id}
            className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 sm:gap-4"
          >
            {/* Left: Thumbnail & Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 relative border border-gray-100"
                style={{ backgroundColor: order.bgColor || '#f3f4f6' }}
              >
                <Image
                  src={order.image}
                  alt={order.itemTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {order.shopName}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">
                    · {order.subOrderId}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                  {order.itemTitle} · <span className="font-medium text-gray-600">{order.eta}</span>
                </p>
              </div>
            </div>

            {/* Right: Status Pill & Chat Button */}
            <div className="flex items-center gap-2 shrink-0">
              {getStatusBadge(order.status)}

              <button
                type="button"
                onClick={() =>
                  onChatWithShop
                    ? onChatWithShop(order.shopName)
                    : router.push('/messages')
                }
                title={`Chat with ${order.shopName}`}
                className="w-8 h-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-500 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Delivery Address Container */}
      <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
        <MapPin className="w-4 h-4 text-[#059669] shrink-0 mt-0.5 stroke-[2.5]" />
        <div>
          <h4 className="text-xs font-bold text-gray-900 mb-0.5">
            {deliveryAddressTitle}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            {deliveryAddressText}
          </p>
        </div>
      </div>
    </div>
  );
}

