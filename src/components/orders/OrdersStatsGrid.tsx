'use client';

import React from 'react';

interface OrdersStatsGridProps {
  totalOrders?: number;
  activeOrders?: number;
  shopsCount?: number;
  totalSaved?: number;
  className?: string;
}

export default function OrdersStatsGrid({
  totalOrders = 48,
  activeOrders = 2,
  shopsCount = 14,
  totalSaved = 6420,
  className = '',
}: OrdersStatsGridProps) {
  const stats = [
    {
      label: 'Total orders',
      value: totalOrders.toString(),
      valueColor: 'text-gray-900',
    },
    {
      label: 'Active',
      value: activeOrders.toString(),
      valueColor: 'text-[#d97706]',
    },
    {
      label: 'Shops ordered from',
      value: shopsCount.toString(),
      valueColor: 'text-gray-900',
    },
    {
      label: 'Total saved',
      value: `₹${totalSaved.toLocaleString('en-IN')}`,
      valueColor: 'text-[#059669]',
    },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3.5 select-none ${className}`}>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-2xs"
        >
          <span className="block text-[11px] font-medium text-gray-400 mb-1">
            {stat.label}
          </span>
          <span
            className={`block text-xl sm:text-2xl font-black tracking-tight ${stat.valueColor}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}

