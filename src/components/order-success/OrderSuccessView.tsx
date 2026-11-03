'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import OrderSuccessConfirmationCard from './OrderSuccessConfirmationCard';
import OrderSplitShopsCard from './OrderSplitShopsCard';
import OrderSuccessActions from './OrderSuccessActions';

interface OrderSuccessViewProps {
  className?: string;
}

export default function OrderSuccessView({ className = '' }: OrderSuccessViewProps) {
  const router = useRouter();

  const handleTrackOrder = () => {
    router.push('/order-tracking');
  };

  const handleViewOrders = () => {
    router.push('/orders');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className={`max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-5 pb-24 md:pb-10 ${className}`}>
    
      <OrderSuccessConfirmationCard />

      <OrderSplitShopsCard />

      <OrderSuccessActions
        onTrackOrder={handleTrackOrder}
        onViewOrders={handleViewOrders}
        onContinueShopping={handleContinueShopping}
      />
    </div>
  );
}

