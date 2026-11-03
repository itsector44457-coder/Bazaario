'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Download,
  Filter,
  Star,
  CheckCircle2,
  ChevronDown,
  Eye,
  Percent,
  PauseCircle,
  PlayCircle,
  Ban,
  RotateCcw,
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

export interface ShopDirectoryItem {
  id: string;
  name: string;
  isVerified?: boolean;
  area: string;
  owner: string;
  phone: string;
  email: string;
  category: string;
  productsCount: number;
  orders30D: number;
  gmv30D: string;
  commissionRate: number; // e.g. 5 for 5%
  rating: number;
  status: 'Live' | 'Paused' | 'Suspended';
  image: string;
  joinedDate: string;
}

const SHOPS_DIRECTORY: ShopDirectoryItem[] = [
  {
    id: 'gupta',
    name: 'Gupta Kirana Store',
    isVerified: true,
    area: 'Andheri West',
    owner: 'Sunita Gupta',
    phone: '+91 98201 55210',
    email: 'sunita@guptakirana.in',
    category: 'Grocery',
    productsCount: 640,
    orders30D: 1842,
    gmv30D: '₹9.6 L',
    commissionRate: 5,
    rating: 4.7,
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'Jan 2023',
  },
  {
    id: 'sharma',
    name: 'Sharma Electronics',
    isVerified: true,
    area: 'Andheri West',
    owner: 'Rajesh Sharma',
    phone: '+91 98330 21045',
    email: 'rajesh@sharmaelectronics.in',
    category: 'Electronics',
    productsCount: 185,
    orders30D: 412,
    gmv30D: '₹2.8 L',
    commissionRate: 8,
    rating: 4.6,
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'Mar 2023',
  },
  {
    id: 'libas',
    name: 'Libas Boutique',
    isVerified: true,
    area: 'Lokhandwala',
    owner: 'Farah Khan',
    phone: '+91 98199 44321',
    email: 'farah@libasboutique.com',
    category: 'Fashion',
    productsCount: 312,
    orders30D: 296,
    gmv30D: '₹2.4 L',
    commissionRate: 12,
    rating: 4.8,
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'Nov 2023',
  },
  {
    id: 'stepup',
    name: 'StepUp Footwear',
    isVerified: false,
    area: 'Malad West',
    owner: 'Amit Desai',
    phone: '+91 97690 12389',
    email: 'amit@stepupfootwear.com',
    category: 'Footwear',
    productsCount: 146,
    orders30D: 118,
    gmv30D: '₹1.9 L',
    commissionRate: 12,
    rating: 4.4,
    status: 'Paused',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'Feb 2024',
  },
  {
    id: 'casa',
    name: 'Casa Decor',
    isVerified: false,
    area: 'Juhu',
    owner: 'Ritu Malhotra',
    phone: '+91 98210 88921',
    email: 'ritu@casadecor.in',
    category: 'Home',
    productsCount: 88,
    orders30D: 42,
    gmv30D: '₹0.6 L',
    commissionRate: 10,
    rating: 3.2,
    status: 'Suspended',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'Aug 2023',
  },
  {
    id: 'glow',
    name: 'Glow Medicos',
    isVerified: true,
    area: 'Bandra West',
    owner: 'Sunita Rao',
    phone: '+91 98200 44102',
    email: 'sunita@glowmedicos.com',
    category: 'Pharmacy',
    productsCount: 430,
    orders30D: 512,
    gmv30D: '₹3.9 L',
    commissionRate: 6,
    rating: 4.5,
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'May 2023',
  },
];

interface AdminShopsViewProps {
  className?: string;
}

export default function AdminShopsView({ className = '' }: AdminShopsViewProps) {
  const [shops, setShops] = useState<ShopDirectoryItem[]>(SHOPS_DIRECTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedArea, setSelectedArea] = useState('All areas');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers
  const [selectedShop, setSelectedShop] = useState<ShopDirectoryItem | null>(null);
  const [commissionModalShop, setCommissionModalShop] = useState<ShopDirectoryItem | null>(null);
  const [newCommissionRate, setNewCommissionRate] = useState<number>(8);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Shops
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.phone.includes(searchQuery) ||
      shop.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All categories' || shop.category === selectedCategory;

    const matchesArea =
      selectedArea === 'All areas' || shop.area === selectedArea;

    const matchesStatus =
      selectedStatus === 'All statuses' || shop.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesArea && matchesStatus;
  });

  // Action handlers
  const handleToggleStatus = (shopId: string, newStatus: 'Live' | 'Paused' | 'Suspended') => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, status: newStatus } : s))
    );
    showToast(`Status updated to ${newStatus}`);
  };

  const handleUpdateCommission = () => {
    if (!commissionModalShop) return;
    setShops((prev) =>
      prev.map((s) =>
        s.id === commissionModalShop.id ? { ...s, commissionRate: newCommissionRate } : s
      )
    );
    showToast(`Commission updated to ${newCommissionRate}% for ${commissionModalShop.name}`);
    setCommissionModalShop(null);
  };

  const handleExportCSV = () => {
    showToast('Exporting 1,259 registered shops to CSV statement...');
  };

  return (
    <div className={`w-full space-y-6 select-none ${className}`}>
      {/* ── 1. Page Header with Metrics Badges ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Shops
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            All registered shops on Bazaario
          </p>
        </div>

        {/* Status Count Pills */}
        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto text-xs font-bold">
          <div className="bg-emerald-50 border border-emerald-200/90 px-3.5 py-1.5 rounded-xl text-emerald-800 shadow-2xs">
            Live <span className="font-black text-emerald-950 ml-1">1,214</span>
          </div>
          <div className="bg-amber-50 border border-amber-200/90 px-3.5 py-1.5 rounded-xl text-amber-800 shadow-2xs">
            Paused <span className="font-black text-amber-950 ml-1">38</span>
          </div>
          <div className="bg-rose-50 border border-rose-200/90 px-3.5 py-1.5 rounded-xl text-rose-800 shadow-2xs">
            Suspended <span className="font-black text-rose-950 ml-1">7</span>
          </div>
        </div>
      </div>

      {/* ── 2. Filter & Action Toolbar Bar (Exact screenshot match) ── */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-3 sm:p-4 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by shop, owner or phone"
              className="w-full pl-10 pr-4 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 transition"
            />
          </div>

          {/* Filter Dropdowns & Export Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-gray-800 outline-none hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                <option value="All categories">All categories</option>
                <option value="Grocery">Grocery</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Footwear">Footwear</option>
                <option value="Home">Home</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Area Dropdown */}
            <div className="relative">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="appearance-none bg-white border border-gray-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-gray-800 outline-none hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                <option value="All areas">All areas</option>
                <option value="Andheri West">Andheri West</option>
                <option value="Lokhandwala">Lokhandwala</option>
                <option value="Malad West">Malad West</option>
                <option value="Juhu">Juhu</option>
                <option value="Bandra West">Bandra West</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-gray-800 outline-none hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                <option value="All statuses">All statuses</option>
                <option value="Live">Live</option>
                <option value="Paused">Paused</option>
                <option value="Suspended">Suspended</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2] text-gray-600" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Ultra-Premium Data Table ── */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#fcfdfd] border-b border-gray-150 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3.5 px-6">SHOP</th>
                <th className="py-3.5 px-6">OWNER</th>
                <th className="py-3.5 px-6">CATEGORY</th>
                <th className="py-3.5 px-6 text-center">PRODUCTS</th>
                <th className="py-3.5 px-6 text-right">ORDERS 30D</th>
                <th className="py-3.5 px-6 text-right">GMV 30D</th>
                <th className="py-3.5 px-6 text-center">COMM.</th>
                <th className="py-3.5 px-6 text-center">RATING</th>
                <th className="py-3.5 px-6 text-center">STATUS</th>
                <th className="py-3.5 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {filteredShops.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400 text-xs">
                    No shops found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredShops.map((shop) => (
                  <tr
                    key={shop.id}
                    className="hover:bg-gray-50/70 transition group"
                  >
                    {/* 1. Shop Info with Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl overflow-hidden relative shrink-0 border border-gray-200 shadow-2xs group-hover:border-emerald-300 transition">
                          <Image
                            src={shop.image}
                            alt={shop.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-gray-950 text-xs sm:text-sm truncate">
                              {shop.name}
                            </span>
                            {shop.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] fill-emerald-50 shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium block truncate">
                            {shop.area}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Owner */}
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-bold block">{shop.owner}</span>
                      <span className="text-[11px] text-gray-400 font-medium block">{shop.phone}</span>
                    </td>

                    {/* 3. Category */}
                    <td className="py-4 px-6 text-gray-600 font-bold">
                      {shop.category}
                    </td>

                    {/* 4. Products Count */}
                    <td className="py-4 px-6 text-center font-mono font-bold text-gray-800">
                      {shop.productsCount}
                    </td>

                    {/* 5. Orders 30D */}
                    <td className="py-4 px-6 text-right font-mono font-bold text-gray-900">
                      {shop.orders30D.toLocaleString('en-IN')}
                    </td>

                    {/* 6. GMV 30D */}
                    <td className="py-4 px-6 text-right font-black text-gray-950 text-xs sm:text-sm">
                      {shop.gmv30D}
                    </td>

                    {/* 7. Commission */}
                    <td className="py-4 px-6 text-center font-black text-gray-700">
                      {shop.commissionRate}%
                    </td>

                    {/* 8. Rating */}
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 font-black text-gray-900">
                        <span>{shop.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </span>
                    </td>

                    {/* 9. Status Pill */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${
                          shop.status === 'Live'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : shop.status === 'Paused'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            shop.status === 'Live'
                              ? 'bg-[#10b981]'
                              : shop.status === 'Paused'
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        <span>{shop.status}</span>
                      </span>
                    </td>

                    {/* 10. Actions Column (@, %, Pause/Suspend/Restore) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Shop Info Drawer */}
                        <button
                          type="button"
                          onClick={() => setSelectedShop(shop)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                          title="View store details"
                        >
                          <Eye className="w-4 h-4 stroke-[2.2]" />
                        </button>

                        {/* Edit Commission Rate */}
                        <button
                          type="button"
                          onClick={() => {
                            setCommissionModalShop(shop);
                            setNewCommissionRate(shop.commissionRate);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#059669] hover:bg-emerald-50 transition cursor-pointer"
                          title="Edit commission rate"
                        >
                          <Percent className="w-4 h-4 stroke-[2.2]" />
                        </button>

                        {/* Status Toggle Button */}
                        {shop.status === 'Live' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(shop.id, 'Paused')}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                            title="Pause shop orders"
                          >
                            <PauseCircle className="w-4 h-4 stroke-[2.2]" />
                          </button>
                        ) : shop.status === 'Paused' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(shop.id, 'Live')}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                            title="Resume shop to Live"
                          >
                            <PlayCircle className="w-4 h-4 stroke-[2.2]" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(shop.id, 'Live')}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                            title="Reinstate suspended shop"
                          >
                            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── 4. Table Footer Pagination ── */}
        <div className="p-4 sm:p-5 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 font-medium">
          <div>
            Showing <span className="font-bold text-gray-900">1-{filteredShops.length}</span> of{' '}
            <span className="font-bold text-gray-900">1,259</span> shops
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === 3}
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. Shop Details Slide-over Drawer ── */}
      {selectedShop && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSelectedShop(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 overflow-y-auto">
            {/* Drawer Header */}
            <div className="relative h-44 w-full bg-gray-900 shrink-0">
              <Image
                src={selectedShop.image}
                alt={selectedShop.name}
                fill
                sizes="450px"
                className="object-cover opacity-60"
              />
              <button
                type="button"
                onClick={() => setSelectedShop(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-black">{selectedShop.name}</h3>
                  {selectedShop.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-white" />
                  )}
                </div>
                <p className="text-xs text-gray-200">{selectedShop.area}, Mumbai</p>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-5 flex-1 text-xs">
              {/* Owner Info */}
              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-150 space-y-2">
                <span className="block text-[10px] font-black uppercase text-gray-400">
                  MERCHANT OWNER
                </span>
                <div className="font-black text-sm text-gray-950">{selectedShop.owner}</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedShop.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedShop.email}</span>
                </div>
              </div>

              {/* 30-Day Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-2xs">
                  <span className="text-[11px] text-gray-400 font-bold block">30D Orders</span>
                  <span className="text-lg font-black text-gray-950 mt-1 block">
                    {selectedShop.orders30D.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-2xs">
                  <span className="text-[11px] text-gray-400 font-bold block">30D GMV</span>
                  <span className="text-lg font-black text-gray-950 mt-1 block">
                    {selectedShop.gmv30D}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-2xs">
                  <span className="text-[11px] text-gray-400 font-bold block">Take Rate</span>
                  <span className="text-lg font-black text-[#059669] mt-1 block">
                    {selectedShop.commissionRate}%
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-2xs">
                  <span className="text-[11px] text-gray-400 font-bold block">Rating</span>
                  <span className="text-lg font-black text-gray-950 mt-1 flex items-center gap-1">
                    <span>{selectedShop.rating}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </span>
                </div>
              </div>

              {/* Quick Actions in Drawer */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 font-bold text-gray-800 flex items-center justify-center gap-2 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Public Storefront</span>
                </Link>

                {selectedShop.status === 'Live' ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleStatus(selectedShop.id, 'Paused');
                      setSelectedShop({ ...selectedShop, status: 'Paused' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 font-bold text-amber-800 transition"
                  >
                    Pause Store Orders
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleStatus(selectedShop.id, 'Live');
                      setSelectedShop({ ...selectedShop, status: 'Live' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#059669] font-bold text-white transition"
                  >
                    Set Store to Live
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Commission Edit Modal ── */}
      {commissionModalShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setCommissionModalShop(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-150 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-gray-950 mb-1">
              Adjust Commission Rate
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Set custom take rate for <strong>{commissionModalShop.name}</strong> ({commissionModalShop.category}).
            </p>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-gray-700">
                Platform Commission Percentage (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={newCommissionRate}
                  onChange={(e) => setNewCommissionRate(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-black text-base text-gray-950 outline-none focus:border-[#059669]"
                />
                <span className="font-black text-gray-600">%</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Default for {commissionModalShop.category} is {commissionModalShop.category === 'Grocery' ? '5%' : commissionModalShop.category === 'Electronics' ? '8%' : '12%'}.
              </p>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCommissionModalShop(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateCommission}
                className="px-5 py-2 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Update Rate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200 border border-gray-700">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

