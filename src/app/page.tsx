'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import CategoryIconBar from '@/components/categories/CategoryIconBar';
import PopularShops from '@/components/shops/PopularShops';
import FilterSidebar from '@/components/filters/FilterSidebar';
import TrendingProductsGrid from '@/components/products/TrendingProductsGrid';
import DealsOfDay from '@/components/deals/DealsOfDay';
import BusinessCtaBanner from '@/components/banners/BusinessCtaBanner';
import MarketplaceShowcase from '@/components/banners/MarketplaceShowcase';
import Footer from '@/components/footer/Footer';
import CartDrawer, { CartDrawerItem } from '@/components/modals/CartDrawer';
import OrdersModal from '@/components/modals/OrdersModal';
import SellerModal from '@/components/modals/SellerModal';
import { Product } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<string>('Andheri West, Mumbai');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart state initialized with 2 items
  const [cartItems, setCartItems] = useState<CartDrawerItem[]>([
    {
      id: 'prod-1',
      name: 'AcousticPro Studio Noise-Cancelling Headphones',
      price: 249.99,
      originalPrice: 329.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      seller: 'SoundForge Audio Labs',
    },
    {
      id: 'prod-9',
      name: 'Artisanal Hand-Poured Botanical Soy Candle Trio',
      price: 42.0,
      originalPrice: 54.0,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      seller: 'Botanica Atelier',
    },
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
            image: product.image,
            seller: product.seller,
          },
        ];
      }
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

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900 antialiased">
      {/* 1. Navbar & Category Bar */}
      <Navbar
        cartCount={totalCartCount}
        unreadMessagesCount={1}
        userName="Rahul"
        currentLocation={currentLocation}
        onLocationChange={(loc) => setCurrentLocation(loc)}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onSearch={(query) => {
          setSearchQuery(query);
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenMessages={() => router.push('/messages')}
        onOpenSellerModal={() => setIsSellerOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 w-full space-y-6 sm:space-y-8">
        {/* Hero & Promo Grid */}
        <HeroSection
          onExploreDeals={() => router.push('/search')}
          onNearbyShops={() => router.push('/search?q=nearby')}
          onShopGroceries={() => router.push('/search?q=grocery')}
          onRegisterShop={() => setIsSellerOpen(true)}
        />

        {/* 8 Category Icon Strip */}
        <CategoryIconBar
          activeCategoryId={selectedCategory}
          onSelectCategory={(catId) => {
            if (catId === 'more') {
              router.push('/search');
            } else {
              setSelectedCategory(catId);
              router.push(`/search?category=${catId}`);
            }
          }}
        />

        {/* 2-Column Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
          {/* Left: Filter Sidebar — hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              onApplyFilters={(filters) => {
                setSelectedCategory(filters.category);
              }}
            />
          </div>

          {/* Right: Main Content */}
          <div className="col-span-full lg:col-span-9 space-y-8">
            {/* Popular Shops Near You */}
            <PopularShops
              onSelectShop={(shop) => router.push(`/shop?id=${shop.id}`)}
              onViewAllShops={() => router.push('/search?q=shops')}
            />

            {/* Trending Products Grid */}
            <TrendingProductsGrid
              activeCategoryId={selectedCategory}
              searchQuery={searchQuery}
              onAddToCart={(product) => {
                handleAddToCart({
                  id: product.id,
                  name: product.name,
                  description: '',
                  price: product.price,
                  originalPrice: product.originalPrice,
                  category: 'trending',
                  rating: product.rating,
                  reviewsCount: product.reviewsCount,
                  inStock: true,
                  stockCount: 15,
                  image: product.image,
                  seller: product.storeName,
                });
              }}
              onToggleWishlist={(id) => {
                console.log('Toggled wishlist for', id);
              }}
            />

            {/* Deals of the Day */}
            <DealsOfDay
              onSelectDeal={(deal) => {
                handleAddToCart({
                  id: deal.id,
                  name: deal.name,
                  description: '',
                  price: deal.price,
                  category: 'deals',
                  rating: 4.8,
                  reviewsCount: 88,
                  inStock: true,
                  stockCount: 10,
                  image: deal.image,
                  seller: deal.storeName,
                });
              }}
              onSeeAll={() => alert('Viewing all daily deals')}
            />

            {/* Marketplace Showcase — Premium Interactive Section */}
            <MarketplaceShowcase
              onExplore={() => router.push('/search')}
            />

            {/* Bazaario For Business Banner */}
            <BusinessCtaBanner onRegisterShop={() => setIsSellerOpen(true)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenMessages={() => router.push('/messages')}
        onRegisterShop={() => setIsSellerOpen(true)}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 overflow-hidden z-10">
            <div className="flex gap-4">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {quickViewProduct.category.toUpperCase()}
                </span>
                <h3 className="font-bold text-base text-gray-900">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3">
                  {quickViewProduct.description}
                </p>
                <div className="text-lg font-bold text-gray-900 pt-1">
                  ₹{quickViewProduct.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="bg-[#059669] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#047857]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
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
