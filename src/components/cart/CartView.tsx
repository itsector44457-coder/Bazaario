'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import ShopCartGroupCard, { ShopGroupData } from './ShopCartGroupCard';
import CouponApplyCard from './CouponApplyCard';
import OrderSummaryCard from './OrderSummaryCard';

const INITIAL_GROUPS: ShopGroupData[] = [
  {
    shopId: 'shop-sharma',
    shopName: 'Sharma Electronics',
    avatarText: 'SE',
    avatarBg: '#064e3b',
    isVerified: true,
    deliveryTime: '45 min',
    deliveryFee: 30,
    fulfilmentType: 'delivery',
    item: {
      id: 'item-headphones',
      name: 'Wireless ANC Headphones',
      variant: 'Colour: Midnight Black',
      price: 2499,
      originalPrice: 3199,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      bgColor: '#edf5f0',
    },
  },
  {
    shopId: 'shop-libas',
    shopName: 'Libas Boutique',
    avatarText: 'LB',
    avatarBg: '#db2777',
    isVerified: true,
    deliveryTime: '40 min',
    deliveryFee: 40,
    fulfilmentType: 'delivery',
    item: {
      id: 'item-kurta',
      name: 'Hand-block Cotton Kurta',
      variant: 'Size: M · Indigo',
      price: 899,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      bgColor: '#f7f6f2',
    },
  },
  {
    shopId: 'shop-gupta',
    shopName: 'Gupta Kirana Store',
    avatarText: 'GK',
    avatarBg: '#f59e0b',
    isVerified: true,
    deliveryTime: '25 min',
    deliveryFee: 20,
    fulfilmentType: 'delivery',
    item: {
      id: 'item-rice',
      name: 'Premium Basmati Rice 5 kg',
      variant: 'Pack of 1',
      price: 549,
      originalPrice: 620,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      bgColor: '#fcf8ee',
    },
  },
];

interface CartViewProps {
  onProceedToCheckout?: () => void;
  className?: string;
}

export default function CartView({
  onProceedToCheckout,
  className = '',
}: CartViewProps) {
  const [groups, setGroups] = useState<ShopGroupData[]>(INITIAL_GROUPS);
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponCode, setCouponCode] = useState('LOCAL150');
  const [couponDiscount, setCouponDiscount] = useState(150);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleUpdateQuantity = (shopId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(shopId);
    } else {
      setGroups((prev) =>
        prev.map((g) =>
          g.shopId === shopId
            ? { ...g, item: { ...g.item, quantity: newQty } }
            : g
        )
      );
    }
  };

  const handleRemoveItem = (shopId: string) => {
    const shop = groups.find((g) => g.shopId === shopId);
    setGroups((prev) => prev.filter((g) => g.shopId !== shopId));
    if (shop) showToast(`Removed "${shop.item.name}" from cart`);
  };

  const handleSaveForLater = (shopId: string) => {
    const shop = groups.find((g) => g.shopId === shopId);
    if (shop) {
      setSavedForLater((prev) => [...prev, shop.item.name]);
      handleRemoveItem(shopId);
      showToast(`Saved "${shop.item.name}" for later!`);
    }
  };

  const handleToggleFulfilment = (shopId: string, type: 'delivery' | 'pickup') => {
    setGroups((prev) =>
      prev.map((g) =>
        g.shopId === shopId ? { ...g, fulfilmentType: type } : g
      )
    );
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    setCouponApplied(true);
    setCouponDiscount(150);
    showToast(`Coupon "${code}" applied! You saved ₹150`);
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    showToast('Coupon removed');
  };

  // Calculations
  const totalItemsCount = groups.reduce((acc, g) => acc + g.item.quantity, 0);
  const subtotal = groups.reduce(
    (acc, g) => acc + g.item.price * g.item.quantity,
    0
  );
  const deliveryFee = groups.reduce(
    (acc, g) => (g.fulfilmentType === 'delivery' ? acc + g.deliveryFee : acc),
    0
  );
  const platformFee = groups.length > 0 ? 9 : 0;
  const discount = couponApplied ? couponDiscount : 0;
  const total = Math.max(0, subtotal + deliveryFee + platformFee - discount);

  // Original Price Savings + Coupon Savings
  const originalTotal = groups.reduce((acc, g) => {
    const orig = g.item.originalPrice || g.item.price;
    return acc + orig * g.item.quantity;
  }, 0);
  const totalSavings = Math.max(0, originalTotal - subtotal + discount);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 space-y-6 ${className}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Your cart
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-normal">
            {totalItemsCount} items from {groups.length} local shops
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#059669] hover:underline transition shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Continue shopping</span>
        </Link>
      </div>

      {/* 2. Main Body */}
      {groups.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-100 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Your cart is empty</h3>
            <p className="text-xs text-gray-400 mt-1">Explore neighborhood stores and add items to your cart!</p>
          </div>
          <Link
            href="/"
            className="inline-block bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
            {/* Left Column: Shop Cards */}
            <div className="lg:col-span-8 space-y-4">
              {groups.map((group) => (
                <ShopCartGroupCard
                  key={group.shopId}
                  data={group}
                  onUpdateQuantity={(newQty) =>
                    handleUpdateQuantity(group.shopId, newQty)
                  }
                  onRemoveItem={() => handleRemoveItem(group.shopId)}
                  onSaveForLater={() => handleSaveForLater(group.shopId)}
                  onToggleFulfilment={(type) =>
                    handleToggleFulfilment(group.shopId, type)
                  }
                />
              ))}
            </div>

            {/* Right Column: Coupon & Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <CouponApplyCard
                initialCode={couponCode}
                isApplied={couponApplied}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />

              <OrderSummaryCard
                totalItemsCount={totalItemsCount}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                shopsCount={groups.length}
                couponCode={couponCode}
                couponDiscount={discount}
                platformFee={platformFee}
                total={total}
                totalSavings={totalSavings}
                onProceedToCheckout={onProceedToCheckout}
              />
            </div>
          </div>

          {/* Mobile sticky checkout bar */}
          <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3 lg:hidden">
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Total · {totalItemsCount} items</p>
              <p className="text-base font-extrabold text-gray-950">₹{total.toLocaleString('en-IN')}</p>
              {totalSavings > 0 && (
                <p className="text-[10px] text-[#059669] font-bold">You save ₹{totalSavings}</p>
              )}
            </div>
            <Link
              href="/checkout"
              className="flex-1 max-w-xs bg-[#059669] hover:bg-[#047857] active:scale-[0.98] text-white text-sm font-extrabold py-3 px-5 rounded-2xl shadow-lg shadow-emerald-200 transition text-center"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

