'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Zap,
  ShoppingCart,
  Heart,
  Star,
  SlidersHorizontal,
  ChevronRight,
  Clock,
  Tag,
  Store,
  MapPin,
  X,
  Check,
  ArrowRight,
  Flame,
  Timer,
} from 'lucide-react';
import type { CartDrawerItem } from '@/components/modals/CartDrawer';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Deal {
  id: string;
  name: string;
  storeName: string;
  storeId: string;
  storeDistance: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: 'Flash Sale' | 'Best Seller' | 'Almost Gone' | 'New';
  expiresInMinutes: number; // countdown is calculated from this
  inStock: boolean;
  stockLeft?: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    name: 'Vitamin C Brightening Skincare Kit',
    storeName: 'Glow Pharmacy',
    storeId: 'shop-glow',
    storeDistance: '1.5 km',
    price: 749,
    originalPrice: 1149,
    discountPercentage: 35,
    category: 'Health',
    rating: 4.7,
    reviewsCount: 312,
    image:
      'https://images.unsplash.com/photo-1608248597359-5489f66456f9?auto=format&fit=crop&w=600&q=80',
    tag: 'Flash Sale',
    expiresInMinutes: 342,
    inStock: true,
    stockLeft: 14,
  },
  {
    id: 'deal-2',
    name: 'Premium Leather Tote Bag',
    storeName: 'Libas Boutique',
    storeId: 'shop-libas',
    storeDistance: '0.8 km',
    price: 1999,
    originalPrice: 2499,
    discountPercentage: 20,
    category: 'Fashion',
    rating: 4.8,
    reviewsCount: 187,
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    tag: 'Best Seller',
    expiresInMinutes: 218,
    inStock: true,
    stockLeft: 6,
  },
  {
    id: 'deal-3',
    name: 'Steel Pressure Cooker 5L',
    storeName: 'Mehta Kitchenware',
    storeId: 'shop-mehta',
    storeDistance: '2.4 km',
    price: 1649,
    originalPrice: 2010,
    discountPercentage: 18,
    category: 'Home',
    rating: 4.5,
    reviewsCount: 94,
    image:
      'https://images.unsplash.com/photo-1584990347449-39908cf8baee?auto=format&fit=crop&w=600&q=80',
    expiresInMinutes: 480,
    inStock: true,
  },
  {
    id: 'deal-4',
    name: 'Wireless Noise-Cancelling Headphones',
    storeName: 'Sharma Electronics',
    storeId: 'shop-sharma',
    storeDistance: '1.1 km',
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 38,
    category: 'Electronics',
    rating: 4.6,
    reviewsCount: 541,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    tag: 'Flash Sale',
    expiresInMinutes: 95,
    inStock: true,
    stockLeft: 3,
  },
  {
    id: 'deal-5',
    name: 'Organic Basmati Rice 5kg',
    storeName: 'Gupta Kirana Store',
    storeId: 'shop-gupta',
    storeDistance: '0.4 km',
    price: 549,
    originalPrice: 699,
    discountPercentage: 21,
    category: 'Grocery',
    rating: 4.9,
    reviewsCount: 1024,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    tag: 'Best Seller',
    expiresInMinutes: 600,
    inStock: true,
  },
  {
    id: 'deal-6',
    name: 'Cold Pressed Coconut Oil 500ml',
    storeName: 'Nature Basket',
    storeId: 'shop-nature',
    storeDistance: '2.1 km',
    price: 289,
    originalPrice: 399,
    discountPercentage: 28,
    category: 'Grocery',
    rating: 4.4,
    reviewsCount: 267,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    expiresInMinutes: 180,
    inStock: true,
    stockLeft: 22,
  },
  {
    id: 'deal-7',
    name: 'Men\'s Slim Fit Casual Shirt',
    storeName: 'Trends Fashion',
    storeId: 'shop-trends',
    storeDistance: '3.2 km',
    price: 699,
    originalPrice: 1199,
    discountPercentage: 42,
    category: 'Fashion',
    rating: 4.3,
    reviewsCount: 78,
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    tag: 'Almost Gone',
    expiresInMinutes: 60,
    inStock: true,
    stockLeft: 2,
  },
  {
    id: 'deal-8',
    name: 'Smart LED Desk Lamp',
    storeName: 'Sharma Electronics',
    storeId: 'shop-sharma',
    storeDistance: '1.1 km',
    price: 899,
    originalPrice: 1299,
    discountPercentage: 31,
    category: 'Electronics',
    rating: 4.2,
    reviewsCount: 143,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    tag: 'New',
    expiresInMinutes: 720,
    inStock: true,
  },
  {
    id: 'deal-9',
    name: 'Herbal Aloe Vera Face Wash',
    storeName: 'Glow Pharmacy',
    storeId: 'shop-glow',
    storeDistance: '1.5 km',
    price: 149,
    originalPrice: 225,
    discountPercentage: 34,
    category: 'Health',
    rating: 4.6,
    reviewsCount: 389,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
    expiresInMinutes: 440,
    inStock: true,
  },
  {
    id: 'deal-10',
    name: 'Non-Stick Cookware Set (5 pcs)',
    storeName: 'Mehta Kitchenware',
    storeId: 'shop-mehta',
    storeDistance: '2.4 km',
    price: 1849,
    originalPrice: 2799,
    discountPercentage: 34,
    category: 'Home',
    rating: 4.5,
    reviewsCount: 210,
    image:
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
    tag: 'Flash Sale',
    expiresInMinutes: 120,
    inStock: true,
    stockLeft: 8,
  },
  {
    id: 'deal-11',
    name: 'Bluetooth Portable Speaker',
    storeName: 'Sharma Electronics',
    storeId: 'shop-sharma',
    storeDistance: '1.1 km',
    price: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    category: 'Electronics',
    rating: 4.4,
    reviewsCount: 298,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    expiresInMinutes: 360,
    inStock: true,
  },
  {
    id: 'deal-12',
    name: 'Fresh Alphonso Mangoes 1 Dozen',
    storeName: 'Gupta Kirana Store',
    storeId: 'shop-gupta',
    storeDistance: '0.4 km',
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    category: 'Grocery',
    rating: 4.8,
    reviewsCount: 632,
    image:
      'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=600&q=80',
    tag: 'Almost Gone',
    expiresInMinutes: 75,
    inStock: true,
    stockLeft: 5,
  },
];

const CATEGORIES = ['All', 'Grocery', 'Electronics', 'Fashion', 'Home', 'Health'];

const SORT_OPTIONS = [
  { value: 'discount', label: 'Highest Discount' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'expiry', label: 'Ending Soon' },
  { value: 'rating', label: 'Top Rated' },
];

// ─── Countdown hook ───────────────────────────────────────────────────────────

function useCountdown(totalMinutes: number) {
  const getSeconds = useCallback(
    () => totalMinutes * 60,
    [totalMinutes]
  );
  const [secondsLeft, setSecondsLeft] = useState(getSeconds);

  useEffect(() => {
    setSecondsLeft(getSeconds());
  }, [getSeconds]);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return { h: pad(h), m: pad(m), s: pad(s), isUrgent: secondsLeft < 3600 };
}

// ─── Global countdown (resets to end of day) ─────────────────────────────────

function GlobalCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    // Calculate seconds to end of day — client only
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    setSecondsLeft(Math.floor((endOfDay.getTime() - now.getTime()) / 1000));

    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secondsLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((secondsLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono">
      {[h, m, s].map((unit, i) => (
        <React.Fragment key={i}>
          <span className="bg-[#064e3b] text-white text-lg sm:text-2xl font-black px-3 py-1.5 rounded-xl min-w-[3rem] text-center tabular-nums shadow-md">
            {unit}
          </span>
          {i < 2 && (
            <span className="text-[#064e3b] font-black text-xl select-none">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Deal Card countdown ──────────────────────────────────────────────────────

function MiniCountdown({ minutes }: { minutes: number }) {
  const { h, m, s, isUrgent } = useCountdown(minutes);
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono ${
        isUrgent
          ? 'text-rose-700 bg-rose-50 border-rose-200'
          : 'text-amber-700 bg-amber-50 border-amber-200'
      }`}
    >
      <Timer className="w-3 h-3 shrink-0" />
      {h !== '00' ? `${h}h ` : ''}{m}m {s}s
    </span>
  );
}

// ─── Deal Card ────────────────────────────────────────────────────────────────

interface DealCardProps {
  deal: Deal;
  onAddToCart: (item: CartDrawerItem) => void;
  wishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

function DealCard({ deal, onAddToCart, wishlisted, onToggleWishlist }: DealCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      id: deal.id,
      name: deal.name,
      seller: deal.storeName,
      price: deal.price,
      quantity: 1,
      image: deal.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const tagColors: Record<string, string> = {
    'Flash Sale': 'bg-rose-500 text-white',
    'Best Seller': 'bg-[#059669] text-white',
    'Almost Gone': 'bg-orange-500 text-white',
    'New': 'bg-sky-500 text-white',
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300/60 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={deal.image}
          alt={deal.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-[#059669] text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-sm">
          -{deal.discountPercentage}%
        </div>

        {/* Tag Badge */}
        {deal.tag && (
          <div
            className={`absolute top-3 right-12 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm ${tagColors[deal.tag]}`}
          >
            {deal.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(deal.id)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Stock warning */}
        {deal.stockLeft !== undefined && deal.stockLeft <= 5 && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-[10px] font-black text-white">
              Only {deal.stockLeft} left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Store info */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
          <Store className="w-3 h-3 shrink-0" />
          <span className="truncate">{deal.storeName}</span>
          <span className="text-gray-300">·</span>
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{deal.storeDistance}</span>
        </div>

        {/* Name */}
        <Link
          href={`/product?id=${deal.id}`}
          className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-[#059669] transition-colors leading-snug"
        >
          {deal.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(deal.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            {deal.rating} ({deal.reviewsCount.toLocaleString()})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-black text-gray-900">
            ₹{deal.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 line-through font-medium">
            ₹{deal.originalPrice.toLocaleString()}
          </span>
          <span className="ml-auto text-xs font-black text-[#059669]">
            Save ₹{(deal.originalPrice - deal.price).toLocaleString()}
          </span>
        </div>

        {/* Countdown */}
        <MiniCountdown minutes={deal.expiresInMinutes} />

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-1 w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
            added
              ? 'bg-[#059669] text-white'
              : 'bg-[#059669] hover:bg-[#047857] text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 stroke-[2]" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────

interface DealsPageViewProps {
  onAddToCart: (item: CartDrawerItem) => void;
}

export default function DealsPageView({ onAddToCart }: DealsPageViewProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('discount');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Filter
  const filtered = ALL_DEALS.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'expiry':
        return a.expiresInMinutes - b.expiresInMinutes;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Top 3 flash deals (expiring soonest & tagged Flash Sale)
  const flashDeals = ALL_DEALS.filter((d) => d.tag === 'Flash Sale').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] rounded-3xl overflow-hidden px-6 sm:px-10 py-10 sm:py-14 text-white shadow-xl">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 text-sm font-black tracking-wide uppercase">
                Today&apos;s Best Deals
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Deals of
              <br />
              <span className="text-amber-400">the Day</span>
            </h1>
            <p className="text-emerald-200 text-sm sm:text-base font-medium max-w-sm">
              Handpicked discounts from local stores near you. Fresh deals every day — grab them before they&apos;re gone.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
              <Clock className="w-4 h-4" />
              <span>Deals reset in</span>
            </div>
            <GlobalCountdown />
            <p className="text-[11px] text-emerald-400 font-medium">
              New deals drop at midnight
            </p>
          </div>
        </div>
      </section>

      {/* ── Flash Deals Strip ─────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-lg font-black text-gray-900">Flash Deals</h2>
            <span className="text-xs text-rose-600 bg-rose-50 border border-rose-200 font-bold px-2 py-0.5 rounded-full">
              Ending soon
            </span>
          </div>
          <Link
            href="/search?q=deals"
            className="text-xs font-black text-[#059669] hover:text-[#047857] flex items-center gap-1 transition"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {flashDeals.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center gap-4 bg-white rounded-2xl border border-rose-100 p-4 hover:border-rose-300 hover:shadow-sm transition group cursor-pointer"
              onClick={() => onAddToCart({
                id: deal.id,
                name: deal.name,
                seller: deal.storeName,
                price: deal.price,
                quantity: 1,
                image: deal.image,
              })}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition"
                />
                <div className="absolute bottom-0 inset-x-0 bg-rose-500 text-white text-[10px] font-black text-center py-0.5">
                  -{deal.discountPercentage}%
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                  {deal.name}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{deal.storeName}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-sm font-black text-gray-900">₹{deal.price.toLocaleString()}</span>
                  <span className="text-[11px] text-gray-400 line-through">₹{deal.originalPrice.toLocaleString()}</span>
                </div>
                <MiniCountdown minutes={deal.expiresInMinutes} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filter + Sort Bar ─────────────────────────────────────────────────── */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-[#059669] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#059669]/50 hover:text-[#059669]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none hover:bg-gray-50 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Panel (expandable) */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex flex-wrap gap-6">
            <div>
              <p className="text-xs font-black text-gray-700 mb-2">Discount</p>
              <div className="flex gap-2">
                {['10%+', '20%+', '30%+', '40%+'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#059669] hover:text-[#059669] transition"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-700 mb-2">Distance</p>
              <div className="flex gap-2">
                {['< 1 km', '< 2 km', '< 5 km'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#059669] hover:text-[#059669] transition"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="ml-auto self-start p-1 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Result count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500 font-medium">
            <span className="font-black text-gray-900">{sorted.length}</span> deals
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ' today'}
          </p>
        </div>

        {/* ── Deals Grid ─────────────────────────────────────────────────────── */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onAddToCart={onAddToCart}
                wishlisted={wishlist.has(deal.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <Zap className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-base font-bold">No deals in this category right now.</p>
            <p className="text-sm mt-1">Check back later or browse all deals.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-5 py-2 rounded-xl bg-[#059669] text-white text-sm font-bold hover:bg-[#047857] transition"
            >
              Show All Deals
            </button>
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-gray-900">Have a local shop?</h3>
          <p className="text-sm text-gray-600 mt-1 max-w-xs">
            List your deals on Bazaario and reach thousands of nearby shoppers daily.
          </p>
        </div>
        <Link
          href="/seller-registration"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm px-6 py-3 rounded-2xl transition shadow-sm shrink-0"
        >
          Register your shop
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
