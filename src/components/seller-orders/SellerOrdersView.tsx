'use client';

import React, { useState } from 'react';
import {
  Download,
  Search,
  ChevronDown,
  Filter,
} from 'lucide-react';
import SellerOrdersList, { SellerOrderSummary } from './SellerOrdersList';
import SellerOrderDetail from './SellerOrderDetail';

const INITIAL_ORDERS: SellerOrderSummary[] = [
  {
    id: 'ord-48219-a',
    orderNumber: '#BZ-48219-A',
    customerName: 'Ananya Iyer',
    customerPhone: '+91 98201 44518',
    customerOrdersCount: 6,
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '2 min',
    fulfilmentType: 'delivery',
    paymentMethod: 'UPI',
    itemCount: 1,
    totalAmount: 2499,
    status: 'new',
    deliveryAddress: 'Flat 304, Sea Breeze CHS, Four Bungalows, Andheri West, Mumbai 400053',
    distanceKm: '2.3 KM',
    customerNote: "Please gift wrap, it's a birthday present 🎁",
    items: [
      {
        name: 'Wireless ANC Headphones',
        sku: 'SKU SE-HP-0142',
        variant: 'Midnight Black · Qty 1',
        quantity: 1,
        price: 2499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
      },
    ],
    earnings: {
      itemTotal: 2499.0,
      deliveryFee: 30.0,
      commissionAmount: 199.92,
      commissionGst: 35.99,
      netReceived: 2293.09,
    },
    payoutDateText: "Settles in Monday's payout (3 Nov)",
    acceptRemainingSeconds: 192,
  },
  {
    id: 'ord-48217-b',
    orderNumber: '#BZ-48217-B',
    customerName: 'Vikram Singh',
    customerPhone: '+91 98204 77123',
    customerOrdersCount: 2,
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '9 min',
    fulfilmentType: 'pickup',
    paymentMethod: 'Card',
    itemCount: 1,
    totalAmount: 3499,
    status: 'new',
    deliveryAddress: 'Store pickup · Customer collects from Sharma Electronics counter',
    distanceKm: '0.0 KM',
    items: [
      {
        name: 'Fit Pro Smartwatch',
        sku: 'SKU SE-SW-0088',
        variant: 'Space Gray · Qty 1',
        quantity: 1,
        price: 3499,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
      },
    ],
    earnings: {
      itemTotal: 3499.0,
      deliveryFee: 0.0,
      commissionAmount: 279.92,
      commissionGst: 50.39,
      netReceived: 3168.69,
    },
    payoutDateText: "Settles in Monday's payout (3 Nov)",
    acceptRemainingSeconds: 540,
  },
  {
    id: 'ord-48214',
    orderNumber: '#BZ-48214',
    customerName: 'Meera Joshi',
    customerPhone: '+91 98205 99341',
    customerOrdersCount: 4,
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timeAgo: '14 min',
    fulfilmentType: 'delivery',
    paymentMethod: 'COD',
    itemCount: 2,
    totalAmount: 3198,
    status: 'new',
    deliveryAddress: 'Shop 8, Lokhandwala Complex, Andheri West, Mumbai 400053',
    distanceKm: '1.5 KM',
    items: [
      {
        name: 'Studio Bass Over-ear Headphones',
        sku: 'SKU SE-HP-0097',
        variant: 'Black · Qty 1',
        quantity: 1,
        price: 1899,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Pulse Smart Band',
        sku: 'SKU SE-SW-0094',
        variant: 'Navy Blue · Qty 1',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=300&q=80',
      },
    ],
    earnings: {
      itemTotal: 3198.0,
      deliveryFee: 30.0,
      commissionAmount: 255.84,
      commissionGst: 46.05,
      netReceived: 2926.11,
    },
    payoutDateText: "Settles in Monday's payout (3 Nov)",
    acceptRemainingSeconds: 840,
  },
  {
    id: 'ord-48211',
    orderNumber: '#BZ-48211',
    customerName: 'Farhan Qureshi',
    customerPhone: '+91 98209 11024',
    customerOrdersCount: 1,
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '18 min',
    fulfilmentType: 'delivery',
    paymentMethod: 'UPI',
    itemCount: 3,
    totalAmount: 1847,
    status: 'new',
    deliveryAddress: 'Bldg 12, Shastri Nagar, Andheri West, Mumbai 400053',
    distanceKm: '3.1 KM',
    items: [
      {
        name: 'USB-C 65W Fast Charger',
        sku: 'SKU SE-CH-0210',
        variant: 'White · Qty 1',
        quantity: 1,
        price: 1199,
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Braided Type-C Cable 2m',
        sku: 'SKU SE-CB-0044',
        variant: 'Red · Qty 2',
        quantity: 2,
        price: 648,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80',
      },
    ],
    earnings: {
      itemTotal: 1847.0,
      deliveryFee: 30.0,
      commissionAmount: 147.76,
      commissionGst: 26.6,
      netReceived: 1702.64,
    },
    payoutDateText: "Settles in Monday's payout (3 Nov)",
    acceptRemainingSeconds: 1080,
  },
];

type OrderStatusTab = 'new' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled';

interface SellerOrdersViewProps {
  className?: string;
}

export default function SellerOrdersView({ className = '' }: SellerOrdersViewProps) {
  const [orders, setOrders] = useState<SellerOrderSummary[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ord-48219-a');
  const [activeTab, setActiveTab] = useState<OrderStatusTab>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const filterTabs: { key: OrderStatusTab; label: string; count?: number }[] = [
    { key: 'new', label: 'New', count: 4 },
    { key: 'preparing', label: 'Preparing', count: 3 },
    { key: 'ready', label: 'Ready', count: 2 },
    { key: 'out_for_delivery', label: 'Out for delivery', count: 1 },
    { key: 'completed', label: 'Completed', count: 16 },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id);
    setMobileView('detail');
  };

  const handleAcceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'preparing' } : o))
    );
    alert(`Order accepted! Sent to preparing queue.`);
  };

  const handleRejectOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o))
    );
    alert(`Order rejected.`);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (activeTab !== 'new' && o.status !== activeTab) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = o.orderNumber.toLowerCase().includes(q);
      const matchCustomer = o.customerName.toLowerCase().includes(q);
      return matchNumber || matchCustomer;
    }

    return true;
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            26 orders today · ₹48,920 sales
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Selector */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-xs font-bold text-gray-700 outline-none focus:border-[#059669] cursor-pointer shadow-2xs"
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This week">This week</option>
              <option value="This month">This month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={() => alert('Exporting orders CSV for ' + timeFilter)}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setMobileView('list');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isActive ? 'bg-[#f59e0b] text-[#78350f]' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by order ID or customer"
          className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition shadow-2xs"
        />
      </div>

      {/* 4. Master-Detail 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Orders List (5 cols on desktop, toggled on mobile) */}
        <div
          className={`lg:col-span-5 ${
            mobileView === 'detail' ? 'hidden lg:block' : 'block'
          }`}
        >
          <SellerOrdersList
            orders={filteredOrders}
            selectedOrderId={selectedOrderId}
            onSelectOrder={handleSelectOrder}
          />
        </div>

        {/* Right Column: Order Detail View (7 cols on desktop, toggled on mobile) */}
        <div
          className={`lg:col-span-7 sticky top-6 ${
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          {selectedOrder ? (
            <SellerOrderDetail
              order={selectedOrder}
              onAcceptOrder={handleAcceptOrder}
              onRejectOrder={handleRejectOrder}
              onBackMobile={() => setMobileView('list')}
            />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400">
              <p className="text-sm font-bold text-gray-700">Select an order</p>
              <p className="text-xs text-gray-400 mt-1">Click an order on the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

