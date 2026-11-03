'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import ShopProfileView from '@/components/shop-profile/ShopProfileView';
import ShopFooter from '@/components/shop-profile/ShopFooter';
import CartDrawer, { CartDrawerItem } from '@/components/modals/CartDrawer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import { ShopCatalogProduct } from '@/components/shop-profile/ShopProductCard';
import { useRouter } from 'next/navigation';

export default function ShopProfilePage() {
  const router = useRouter();

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);

  // Cart state with 3 items matching navbar badge
  const [cartItems, setCartItems] = useState<CartDrawerItem[]>([
    {
      id: 'cart-1',
      name: 'Wireless ANC Headphones',
      seller: 'Sharma Electronics',
      price: 2499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cart-2',
      name: 'Fit Pro Smartwatch',
      seller: 'Sharma Electronics',
      price: 3499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cart-3',
      name: 'Organic Basmati Rice 5kg',
      seller: 'Gupta Kirana Store',
      price: 549,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: ShopCatalogProduct) => {
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
          seller: 'Sharma Electronics',
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
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

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 flex flex-col justify-between">
      {/* 1. Exact Navbar */}
      <Navbar
        cartCount={totalCartCount}
        unreadMessagesCount={1}
        userName="Rahul"
        currentLocation="Andheri West, Mumbai"
        onSearch={(q) => router.push(`/search?q=${encodeURIComponent(q)}`)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenMessages={() => alert('Live Chat with Sharma Electronics active.')}
        onOpenSellerModal={() => setIsSellerOpen(true)}
      />

      {/* 2. Shop Profile View */}
      <main className="flex-1">
        <ShopProfileView onAddToCart={handleAddToCart} />
      </main>

      {/* 3. Dark Green Minimal Shop Footer */}
      <ShopFooter />

      {/* 4. Functional Drawers & Modals */}
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

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <SellerModal
        isOpen={isSellerOpen}
        onClose={() => setIsSellerOpen(false)}
      />
    </div>
  );
}

