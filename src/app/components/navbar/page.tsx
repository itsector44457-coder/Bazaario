'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import CartDrawer from '@/components/modals/CartDrawer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import { Sparkles, Code2, ArrowLeft, Check, Copy } from 'lucide-react';
import Link from 'next/link';

export default function NavbarComponentPage() {
  const [cartCount, setCartCount] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(1);
  const [location, setLocation] = useState('Andheri West, Mumbai');
  const [selectedCat, setSelectedCat] = useState('grocery');
  const [searchOutput, setSearchOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 'prod-1',
      name: 'AcousticPro Studio Headphones',
      price: 249.99,
      originalPrice: 329.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      seller: 'SoundForge Audio',
    },
    {
      id: 'prod-9',
      name: 'Botanical Soy Candle Trio',
      price: 42.0,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80',
      seller: 'Botanica Atelier',
    },
  ]);

  const usageCode = `import Navbar from '@/components/navbar/Navbar';

export default function MyPage() {
  return (
    <Navbar
      cartCount={${cartCount}}
      unreadMessagesCount={${unreadMessages}}
      userName="Rahul"
      currentLocation="${location}"
      selectedCategory="${selectedCat}"
      onSearch={(q) => console.log('Searching:', q)}
      onOpenCart={() => setIsCartOpen(true)}
      onOpenOrders={() => setIsOrdersOpen(true)}
      onOpenSellerModal={() => setIsSellerOpen(true)}
    />
  );
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront Home</span>
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/components"
            className="text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            Components Hub
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Navbar (Exact Match)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Production Ready
          </span>
        </div>
      </div>

      {/* Live Component Preview */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Complete Navbar & Category Bar
          </h1>
          <p className="text-sm text-gray-500">
            Exact replica of the provided design with responsive header, location selector, instant search, action badges, and category mega menu.
          </p>
        </div>

        {/* The Live Interactive Navbar */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
          <Navbar
            cartCount={cartCount}
            unreadMessagesCount={unreadMessages}
            userName="Rahul"
            currentLocation={location}
            onLocationChange={(newLoc) => setLocation(newLoc)}
            selectedCategory={selectedCat}
            onSelectCategory={(catId) => setSelectedCat(catId)}
            onSearch={(q) => setSearchOutput(q)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenOrders={() => setIsOrdersOpen(true)}
            onOpenSellerModal={() => setIsSellerOpen(true)}
          />
        </div>

        {/* Live Feedback Notification Banner when interacting with search */}
        {searchOutput && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <span>
              Search query submitted:{' '}
              <strong className="underline">&quot;{searchOutput}&quot;</strong>
            </span>
            <button
              onClick={() => setSearchOutput('')}
              className="font-bold hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Controls & Interactive Playground */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <span>Interactive Controls</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Cart Count Badge ({cartCount})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCartCount(Math.max(0, cartCount - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={cartCount}
                  onChange={(e) => setCartCount(parseInt(e.target.value) || 0)}
                  className="w-20 text-center border border-gray-200 rounded-lg p-1 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setCartCount(cartCount + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Unread Messages Badge ({unreadMessages})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUnreadMessages(Math.max(0, unreadMessages - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={unreadMessages}
                  onChange={(e) => setUnreadMessages(parseInt(e.target.value) || 0)}
                  className="w-20 text-center border border-gray-200 rounded-lg p-1 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setUnreadMessages(unreadMessages + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Active Category
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white"
              >
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="home-kitchen">Home & Kitchen</option>
                <option value="pharmacy-beauty">Pharmacy & Beauty</option>
                <option value="footwear">Footwear</option>
                <option value="stationery">Stationery</option>
              </select>
            </div>
          </div>

          {/* Copyable Code Snippet */}
          <div className="md:col-span-2 bg-zinc-900 rounded-2xl p-5 text-zinc-100 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-zinc-300">
                  Reusable Code Example
                </span>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono bg-black/50 p-4 rounded-xl overflow-x-auto text-emerald-300/90 leading-relaxed">
              {usageCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Interactive Modals connected to Navbar triggers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, newQty) => {
          if (newQty <= 0) {
            setCartItems(cartItems.filter((i) => i.id !== id));
            setCartCount(Math.max(0, cartCount - 1));
          } else {
            setCartItems(
              cartItems.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
            );
          }
        }}
        onRemoveItem={(id) => {
          setCartItems(cartItems.filter((i) => i.id !== id));
          setCartCount(Math.max(0, cartCount - 1));
        }}
        onCheckout={() => {
          alert('Order placed successfully! Same-day express dispatch initiated.');
          setIsCartOpen(false);
        }}
      />

      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <SellerModal isOpen={isSellerOpen} onClose={() => setIsSellerOpen(false)} />
    </div>
  );
}
