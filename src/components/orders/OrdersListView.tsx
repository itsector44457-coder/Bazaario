'use client';

import React, { useState } from 'react';
import OrdersStatsGrid from './OrdersStatsGrid';
import OrdersFilterBar, { OrderFilterTab } from './OrdersFilterBar';
import OrderCardItem, { OrderItemData } from './OrderCardItem';

const ALL_ORDERS: OrderItemData[] = [
  {
    id: 'ord-1',
    orderNumber: '#BZ-48213-A',
    dateStr: 'Today, 3:42 PM',
    status: 'out-for-delivery',
    statusLabel: 'Out for delivery',
    productTitle: 'Wireless ANC Headphones',
    storeName: 'Sharma Electronics',
    variantOrQty: 'Qty 1',
    price: 2529,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    bgColor: '#edf5f0',
  },
  {
    id: 'ord-2',
    orderNumber: '#BZ-48213-B',
    dateStr: 'Today, 3:42 PM',
    status: 'packing',
    statusLabel: 'Packing',
    productTitle: 'Hand-block Cotton Kurta',
    storeName: 'Libas Boutique',
    variantOrQty: 'Size M',
    price: 939,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#f7f6f2',
  },
  {
    id: 'ord-3',
    orderNumber: '#BZ-47102',
    dateStr: '22 Oct 2025',
    status: 'delivered',
    statusLabel: 'Delivered',
    productTitle: 'Basmati Rice 5 kg + 4 more items',
    storeName: 'Gupta Kirana Store',
    variantOrQty: '',
    price: 1284,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#fcf8ee',
  },
  {
    id: 'ord-4',
    orderNumber: '#BZ-46550',
    dateStr: '14 Oct 2025',
    status: 'picked-up',
    statusLabel: 'Picked up from store',
    productTitle: 'Breeze Running Sneakers',
    storeName: 'StepUp Footwear',
    variantOrQty: 'Size 9',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    bgColor: '#edf7f2',
    ratingGiven: 5,
  },
  {
    id: 'ord-5',
    orderNumber: '#BZ-45981',
    dateStr: '2 Oct 2025',
    status: 'cancelled',
    statusLabel: 'Cancelled · Refunded',
    productTitle: 'Ceramic Table Lamp',
    storeName: 'Casa Decor',
    variantOrQty: 'Out of stock at shop',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#fef7ee',
  },
];

interface OrdersListViewProps {
  className?: string;
}

export default function OrdersListView({ className = '' }: OrdersListViewProps) {
  const [filter, setFilter] = useState<OrderFilterTab>('all');
  const [search, setSearch] = useState('');

  // Filter & Search logic
  const filteredOrders = ALL_ORDERS.filter((order) => {
    // 1. Tab filter
    if (filter === 'active') {
      if (order.status !== 'out-for-delivery' && order.status !== 'packing') return false;
    } else if (filter === 'delivered') {
      if (order.status !== 'delivered' && order.status !== 'picked-up') return false;
    } else if (filter === 'cancelled') {
      if (order.status !== 'cancelled') return false;
    }

    // 2. Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchTitle = order.productTitle.toLowerCase().includes(q);
      const matchStore = order.storeName.toLowerCase().includes(q);
      return matchNumber || matchTitle || matchStore;
    }

    return true;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          My Orders
        </h1>
      </div>

      {/* 2. Stats Grid */}
      <OrdersStatsGrid
        totalOrders={48}
        activeOrders={2}
        shopsCount={14}
        totalSaved={6420}
      />

      {/* 3. Filter Pills + Search */}
      <OrdersFilterBar
        currentFilter={filter}
        onFilterChange={setFilter}
        searchQuery={search}
        onSearchChange={setSearch}
      />

      {/* 4. Orders Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 text-gray-400">
            <p className="text-sm font-bold text-gray-700">No orders found</p>
            <p className="text-xs text-gray-400 mt-1">Try selecting a different filter or clearing search.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCardItem key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

