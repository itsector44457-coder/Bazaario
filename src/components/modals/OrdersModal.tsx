'use client';

import React from 'react';
import { X, Package, CheckCircle2, Clock, Truck, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_ORDERS = [
  {
    id: 'ORD-98214',
    date: 'Yesterday, 4:30 PM',
    status: 'Out for Delivery',
    expected: 'Arriving by 7:00 PM today',
    total: 262.79,
    items: [
      {
        name: 'AcousticPro Studio Noise-Cancelling Headphones',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Botanical Soy Candle Trio',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'ORD-98102',
    date: '28 Oct 2026',
    status: 'Delivered',
    expected: 'Delivered to Rahul (Andheri West)',
    total: 137.00,
    items: [
      {
        name: 'Handcrafted Japanese Ceramic Matcha Tea Set',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

export default function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#084c37]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Your Orders & Tracking</h3>
              <p className="text-xs text-gray-400">Live updates from local neighborhood shops</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {SAMPLE_ORDERS.map((order) => {
            const isDelivered = order.status === 'Delivered';

            return (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{order.id}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isDelivered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isDelivered ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500">{order.expected}</span>
                  <span className="font-bold text-gray-900 text-sm">
                    Total: ₹{order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
