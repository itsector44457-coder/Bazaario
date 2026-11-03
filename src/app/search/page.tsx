'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import SearchResultsView from '@/components/search/SearchResultsView';
import SearchFooter from '@/components/search/SearchFooter';
import CartDrawer, { CartDrawerItem } from '@/components/modals/CartDrawer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import { SearchProductItem } from '@/components/search/SearchProductCard';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || 'headphones';

  // Navigation & Modals State
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartDrawerItem[]>([
    {
      id: 'cart-1',
      name: 'Wireless ANC Headphones',
      seller: 'Sharma Electronics',
      price: 2499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cart-2',
      name: 'Pulse Smart Band',
      seller: 'Mobile Hub Andheri',
      price: 1299,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cart-3',
      name: 'Organic Basmati Rice 5kg',
      seller: 'Gupta Kirana Store',
      price: 549,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: SearchProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          seller: product.storeName,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex flex-col justify-between">
      {/* 1. Navbar with "headphones" filled into search bar */}
      <Navbar
        initialSearchQuery={queryParam}
        cartCount={totalCartCount}
        unreadMessagesCount={1}
        userName="Rahul"
        currentLocation="Andheri West, Mumbai"
        onOpenCart={() => setCartOpen(true)}
        onOpenOrders={() => setOrdersOpen(true)}
        onOpenMessages={() => setOrdersOpen(true)}
        onOpenSellerModal={() => setSellerModalOpen(true)}
      />

      {/* 2. Main Search Results View */}
      <main className="flex-1">
        <SearchResultsView
          searchQuery={queryParam}
          onAddToCart={handleAddToCart}
          onVisitShop={(shop) => alert(`Visiting ${shop}`)}
        />
      </main>

      {/* 3. Dark Green Search Footer */}
      <SearchFooter onOpenSellerModal={() => setSellerModalOpen(true)} />

      {/* 4. Modals and Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          router.push('/cart');
        }}
      />

      <OrdersModal
        isOpen={ordersOpen}
        onClose={() => setOrdersOpen(false)}
      />

      <SellerModal
        isOpen={sellerModalOpen}
        onClose={() => setSellerModalOpen(false)}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium text-sm">
          Loading Bazaario Search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
