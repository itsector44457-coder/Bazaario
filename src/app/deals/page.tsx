'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CartDrawer, { CartDrawerItem } from '@/components/modals/CartDrawer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import DealsPageView from '@/components/deals/DealsPageView';
import { useRouter } from 'next/navigation';

export default function DealsPage() {
  const router = useRouter();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartDrawerItem[]>([]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (item: CartDrawerItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-slate-900 antialiased">
      <Navbar
        cartCount={totalCartCount}
        unreadMessagesCount={0}
        userName="Rahul"
        currentLocation="Andheri West, Mumbai"
        onSearch={(q) => router.push(`/search?q=${encodeURIComponent(q)}`)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenMessages={() => router.push('/messages')}
        onOpenSellerModal={() => setIsSellerOpen(true)}
      />

      <main className="flex-1">
        <DealsPageView onAddToCart={handleAddToCart} />
      </main>

      <Footer
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenMessages={() => router.push('/messages')}
        onRegisterShop={() => setIsSellerOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push('/cart');
        }}
      />

      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <SellerModal
        isOpen={isSellerOpen}
        onClose={() => setIsSellerOpen(false)}
        onProductCreated={() => {}}
      />
    </div>
  );
}
