'use client';

import React, { useState } from 'react';
import OrderTrackingHeader from './OrderTrackingHeader';
import OrderTrackingMap from './OrderTrackingMap';
import OrderStatusTimeline from './OrderStatusTimeline';
import ShopContactCard from './ShopContactCard';
import TrackingItemCard from './TrackingItemCard';

interface OrderTrackingViewProps {
  className?: string;
}

interface ShopTrackingData {
  shopId: string;
  shopName: string;
  driverName: string;
  driverRating: number;
  driverVehicle: string;
  etaMinutes: number;
  etaTime: string;
  distanceAway: string;
  itemName: string;
  itemVariant: string;
  itemPrice: number;
  paidTotal: number;
  itemImage: string;
  bgColor: string;
  phoneNumber: string;
}

const SHOPS_DATA: Record<string, ShopTrackingData> = {
  sharma: {
    shopId: 'sharma',
    shopName: 'Sharma Electronics',
    driverName: 'Imran Shaikh',
    driverRating: 4.9,
    driverVehicle: 'MH 02 EK 4471 · Honda Activa',
    etaMinutes: 12,
    etaTime: '4:28 PM',
    distanceAway: '1.4 km away',
    itemName: 'Wireless ANC Headphones',
    itemVariant: 'Qty 1 · Midnight Black',
    itemPrice: 2499,
    paidTotal: 2529,
    itemImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    bgColor: '#edf5f0',
    phoneNumber: '+91 98XXX 21045',
  },
  libas: {
    shopId: 'libas',
    shopName: 'Libas Boutique',
    driverName: 'Sameer Khan',
    driverRating: 4.8,
    driverVehicle: 'MH 02 BG 8820 · TVS Jupiter',
    etaMinutes: 20,
    etaTime: '4:35 PM',
    distanceAway: '2.1 km away',
    itemName: 'Hand-block Cotton Kurta',
    itemVariant: 'Qty 1 · Indigo · Size M',
    itemPrice: 899,
    paidTotal: 939,
    itemImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#f7f6f2',
    phoneNumber: '+91 98XXX 77654',
  },
  gupta: {
    shopId: 'gupta',
    shopName: 'Gupta Kirana Store',
    driverName: 'Ramesh Yadav',
    driverRating: 4.9,
    driverVehicle: 'MH 02 CL 1209 · Bajaj Pulsar',
    etaMinutes: 8,
    etaTime: '4:15 PM',
    distanceAway: '0.9 km away',
    itemName: 'Premium Basmati Rice 5 kg',
    itemVariant: 'Pack of 1',
    itemPrice: 549,
    paidTotal: 569,
    itemImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    bgColor: '#fcf8ee',
    phoneNumber: '+91 98XXX 33210',
  },
};

export default function OrderTrackingView({ className = '' }: OrderTrackingViewProps) {
  const [activeShopTab, setActiveShopTab] = useState<string>('sharma');

  const currentShop = SHOPS_DATA[activeShopTab] || SHOPS_DATA.sharma;

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 space-y-5 ${className}`}>
      {/* 1. Header */}
      <OrderTrackingHeader
        orderId="#BZ-48213"
        orderTime="3:42 PM"
        shopsCount={3}
        activeShopTab={activeShopTab}
        onSelectShopTab={setActiveShopTab}
      />

      {/* 2. Two-column on lg+, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
        {/* Map (full width mobile, 7 cols desktop) */}
        <div className="lg:col-span-7">
          <OrderTrackingMap
            storeName={currentShop.shopName}
            driverName={currentShop.driverName}
            driverRating={currentShop.driverRating}
            driverVehicle={currentShop.driverVehicle}
            etaMinutes={currentShop.etaMinutes}
            etaTime={currentShop.etaTime}
            distanceAway={currentShop.distanceAway}
          />
        </div>

        {/* Status + Contact + Item (full width mobile, 5 cols desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <OrderStatusTimeline otpCode="4 8 2 1" />

          <ShopContactCard
            shopName={currentShop.shopName}
            phoneNumber={currentShop.phoneNumber}
          />

          <TrackingItemCard
            itemName={currentShop.itemName}
            itemVariant={currentShop.itemVariant}
            itemPrice={currentShop.itemPrice}
            paidTotal={currentShop.paidTotal}
            itemImage={currentShop.itemImage}
            bgColor={currentShop.bgColor}
          />
        </div>
      </div>
    </div>
  );
}

