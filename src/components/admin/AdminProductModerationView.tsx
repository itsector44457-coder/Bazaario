'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Menu,
  Check,
  Package,
  Sparkles,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeaderNav from './AdminHeaderNav';

interface FlaggedProduct {
  id: string;
  title: string;
  shop: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  reportCount?: number;
  reportType?: 'reports' | 'auto' | 'new';
  badgeText: string;
  badgeType: 'rose' | 'amber' | 'blue';
  tags: { text: string; type: 'rose' | 'amber' | 'blue' | 'emerald' | 'slate' }[];
  primaryBtnText: string;
  secondaryBtnText: string;
  priceAnomaly?: boolean;
}

const mockProducts: FlaggedProduct[] = [
  {
    id: 'prod-1',
    title: '"Designer" Leather Tote',
    shop: 'Urban Threads',
    category: 'Fashion',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    reportCount: 5,
    reportType: 'reports',
    badgeText: '5 reports',
    badgeType: 'rose',
    tags: [
      { text: 'Possible counterfeit ×1', type: 'rose' },
      { text: 'Misleading title ×1', type: 'amber' },
    ],
    primaryBtnText: 'Keep live',
    secondaryBtnText: 'Remove',
  },
  {
    id: 'prod-2',
    title: 'Vitamin C Skincare Kit',
    shop: 'Glow Pharmacy',
    category: 'Beauty',
    price: 749,
    image: 'https://images.unsplash.com/photo-1608248597359-0095817c17d7?w=600&auto=format&fit=crop&q=80',
    reportCount: 2,
    reportType: 'reports',
    badgeText: '2 reports',
    badgeType: 'rose',
    tags: [{ text: 'Expiry date not shown ×2', type: 'amber' }],
    primaryBtnText: 'Keep live',
    secondaryBtnText: 'Ask shop to fix',
  },
  {
    id: 'prod-3',
    title: 'Fit Pro Smartwatch LTE',
    shop: 'Sharma Electronics',
    category: 'Electronics',
    price: 4799,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    reportType: 'new',
    badgeText: '⚡ New listing',
    badgeType: 'amber',
    tags: [
      { text: '✓ Images OK', type: 'emerald' },
      { text: '✓ Price in range', type: 'emerald' },
    ],
    primaryBtnText: 'Approve',
    secondaryBtnText: 'Reject',
  },
  {
    id: 'prod-4',
    title: 'Breeze Running Sneakers',
    shop: 'StepUp Footwear',
    category: 'Footwear',
    price: 179,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    reportType: 'auto',
    badgeText: '⚙ Auto-detected',
    badgeType: 'blue',
    priceAnomaly: true,
    tags: [{ text: '90% below category avg', type: 'rose' }],
    primaryBtnText: 'Approve',
    secondaryBtnText: 'Hide & notify',
  },
  {
    id: 'prod-5',
    title: 'Steel Pressure Cooker 5L',
    shop: 'Mehta Kitchenware',
    category: 'Kitchen',
    price: 1649,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    reportType: 'new',
    badgeText: 'New listing',
    badgeType: 'amber',
    tags: [{ text: 'ISI mark not visible', type: 'amber' }],
    primaryBtnText: 'Approve',
    secondaryBtnText: 'Reject',
  },
  {
    id: 'prod-6',
    title: 'Hand-block Cotton Kurta',
    shop: 'Libas Boutique',
    category: 'Fashion',
    price: 899,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
    reportCount: 1,
    reportType: 'reports',
    badgeText: '1 report',
    badgeType: 'rose',
    tags: [{ text: 'Wrong category ×1', type: 'slate' }],
    primaryBtnText: 'Keep live',
    secondaryBtnText: 'Dismiss report',
  },
];

export default function AdminProductModerationView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'flagged' | 'new' | 'auto' | 'rejected'>('flagged');
  const [products, setProducts] = useState(mockProducts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (id: string, action: string) => {
    showToast(`Action "${action}" taken for item`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'flagged') return p.badgeType === 'rose' || p.reportCount;
    if (activeTab === 'new') return p.reportType === 'new';
    if (activeTab === 'auto') return p.reportType === 'auto';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="moderation"
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <AdminHeaderNav onOpenSidebar={() => setMobileSidebarOpen(true)} />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Page Title & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                Product moderation
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Keep the marketplace genuine and safe
              </p>
            </div>
          </div>

          {/* Filter Pills Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('flagged')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'flagged'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>Flagged by users</span>
              <span className="bg-[#f43f5e] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                9
              </span>
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'new'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>New listings</span>
              <span className="text-slate-400 font-semibold">4</span>
            </button>

            <button
              onClick={() => setActiveTab('auto')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'auto'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>Auto-detected</span>
              <span className="text-slate-400 font-semibold">6</span>
            </button>

            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'rejected'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>Rejected</span>
            </button>
          </div>

          {/* 3-Column Grid of Moderation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((p) => {
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col hover:border-gray-300 transition duration-150"
                >
                  {/* Top Image Box with Badge */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden group">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                    />
                    {/* Top Tag badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-md text-white shadow-xs ${
                          p.badgeType === 'rose'
                            ? 'bg-[#f43f5e]'
                            : p.badgeType === 'amber'
                            ? 'bg-[#f59e0b]'
                            : 'bg-[#3b82f6]'
                        }`}
                      >
                        {p.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {p.shop} · {p.category}
                      </p>
                      <div className="pt-1 flex items-baseline gap-2">
                        <span className="text-base font-black text-slate-900">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        {p.priceAnomaly && (
                          <span className="text-[11px] font-bold text-rose-500">
                            price anomaly
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((tag, idx) => {
                        let colorClass = 'bg-slate-100 text-slate-700';
                        if (tag.type === 'rose') colorClass = 'bg-rose-50 text-rose-600 border border-rose-100';
                        if (tag.type === 'amber') colorClass = 'bg-amber-50 text-amber-700 border border-amber-100';
                        if (tag.type === 'emerald') colorClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
                        return (
                          <span
                            key={idx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${colorClass}`}
                          >
                            {tag.text}
                          </span>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleAction(p.id, p.secondaryBtnText)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold transition text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200"
                      >
                        {p.secondaryBtnText}
                      </button>
                      <button
                        onClick={() => handleAction(p.id, p.primaryBtnText)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-black text-white bg-[#10b981] hover:bg-[#059669] shadow-xs hover:shadow transition"
                      >
                        {p.primaryBtnText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Today Overview Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Today
            </h4>
            <div className="flex items-center gap-12">
              <div>
                <span className="block text-xs font-semibold text-slate-400">
                  Reviewed
                </span>
                <span className="text-2xl font-black text-slate-900">48</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400">
                  Removed
                </span>
                <span className="text-2xl font-black text-rose-500">3</span>
              </div>
            </div>
          </div>

          {/* Moderation Guidelines Banner (Deep Green) */}
          <div className="bg-[#064e3b] rounded-2xl p-6 text-white space-y-3 shadow-sm">
            <h3 className="font-black text-sm tracking-wide flex items-center gap-2">
              Moderation guidelines
            </h3>
            <ul className="space-y-1.5 text-xs text-emerald-100/90 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>Real product photos only</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>No replicas / counterfeits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>Medicines need valid drug license</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>Food items must show FSSAI no.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>MRP must match packaging</span>
              </li>
            </ul>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

