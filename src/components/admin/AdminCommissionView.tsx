'use client';

import React, { useState } from 'react';
import {
  Percent,
  CheckCircle2,
  Calendar,
  Send,
  Building2,
  Sparkles,
  HelpCircle,
  X,
  Plus,
  RefreshCw,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeaderNav from './AdminHeaderNav';

interface CategoryRate {
  id: string;
  name: string;
  icon: string;
  shops: number;
  gmv30d: string;
  commission: number;
}

export default function AdminCommissionView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Commission Rates table state
  const [rates, setRates] = useState<CategoryRate[]>([
    { id: '1', name: 'Grocery & Staples', icon: '🥦', shops: 412, gmv30d: '₹69.9 L', commission: 5 },
    { id: '2', name: 'Pharmacy & Beauty', icon: '💊', shops: 148, gmv30d: '₹22.1 L', commission: 6 },
    { id: '3', name: 'Electronics', icon: '📱', shops: 196, gmv30d: '₹35.0 L', commission: 8 },
    { id: '4', name: 'Home & Kitchen', icon: '🛋️', shops: 184, gmv30d: '₹18.6 L', commission: 10 },
    { id: '5', name: 'Fashion & Ethnic', icon: '👗', shops: 231, gmv30d: '₹40.5 L', commission: 12 },
    { id: '6', name: 'Footwear', icon: '👟', shops: 88, gmv30d: '₹9.2 L', commission: 12 },
  ]);

  // Simulator state
  const [simOrderValue, setSimOrderValue] = useState<number>(2499);
  const [simCategoryRate, setSimCategoryRate] = useState<number>(8);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations for Simulator
  const simCommission = Math.round((simOrderValue * (simCategoryRate / 100)) * 100) / 100;
  const simGst = Math.round((simCommission * 0.18) * 100) / 100;
  const simPlatformFee = 9.0;
  const sellerReceives = Math.round((simOrderValue - simCommission - simGst) * 100) / 100;
  const bazaarioEarns = Math.round((simCommission + simPlatformFee) * 100) / 100;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="finance"
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeaderNav onOpenSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Commission & Payouts
              </h1>
            </div>
            <button
              onClick={() => showToast('Changes saved successfully!')}
              className="self-start sm:self-auto px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black rounded-xl shadow-xs transition"
            >
              Save changes
            </button>
          </div>

          {/* Top Banner (Dark Green Batch Card) */}
          <div className="bg-[#064e3b] rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-emerald-300 uppercase block">
                NEXT PAYOUT BATCH · MONDAY, 3 NOV
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black tracking-tight">₹48.6 L</span>
                <span className="text-xs text-emerald-200 font-semibold">
                  to 1,180 shops
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 font-medium pt-1">
                Commission retained: <strong className="text-white">₹3.92 L</strong> · GST on commission: <strong className="text-white">₹70,560</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => showToast('Previewing payout batch details...')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-600/80 hover:bg-emerald-800/50 text-white transition flex items-center gap-1.5"
              >
                <span>Preview</span>
              </button>
              <button
                onClick={() => showToast('Payout processing triggered!')}
                className="px-4 py-2 rounded-xl text-xs font-black bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Process payouts</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Category Commission Rates */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm tracking-tight">
                    Category commission rates
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Charged on item value per order. Applies to new orders.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Redirecting to categories...')}
                  className="text-xs font-bold text-[#10b981] hover:underline"
                >
                  Manage categories
                </button>
              </div>

              {/* Rates Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-black uppercase text-slate-400">
                      <th className="py-2.5 px-3">CATEGORY</th>
                      <th className="py-2.5 px-3">SHOPS</th>
                      <th className="py-2.5 px-3">GMV 30D</th>
                      <th className="py-2.5 px-3">COMMISSION %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-800">
                    {rates.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-medium">
                          {item.shops}
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-bold">
                          {item.gmv30d}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={item.commission}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setRates((prev) =>
                                  prev.map((r) => (r.id === item.id ? { ...r, commission: val } : r))
                                );
                              }}
                              className={`w-14 px-2 py-1 text-center font-black rounded-lg border text-xs focus:outline-hidden ${
                                item.name === 'Electronics'
                                  ? 'border-[#10b981] ring-2 ring-[#10b981]/20 text-[#064e3b]'
                                  : 'border-gray-200 text-slate-800 focus:border-[#10b981]'
                              }`}
                            />
                            <span className="text-slate-400 font-bold">%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Shop-specific overrides */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-500">
                  Shop-specific overrides
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                    <span>Gupta Kirana Store · 4% till 31 Dec</span>
                    <button
                      onClick={() => showToast('Removed override for Gupta Kirana')}
                      className="text-amber-500 hover:text-amber-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                    <span>Kala Crafts · 6% launch offer</span>
                    <button
                      onClick={() => showToast('Removed override for Kala Crafts')}
                      className="text-amber-500 hover:text-amber-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>

                  <button
                    onClick={() => showToast('Add override modal opened')}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border border-dashed border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add override</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Commission Simulator & Payout Rules */}
            <div className="lg:col-span-5 space-y-6">
              {/* Simulator Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
                <h3 className="font-black text-slate-900 text-sm tracking-tight">
                  Commission simulator
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Order value
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={simOrderValue}
                        onChange={(e) => setSimOrderValue(Number(e.target.value))}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Category
                    </label>
                    <select
                      value={simCategoryRate}
                      onChange={(e) => setSimCategoryRate(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200/80 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
                    >
                      <option value={8}>Electronics 8%</option>
                      <option value={5}>Grocery 5%</option>
                      <option value={6}>Pharmacy 6%</option>
                      <option value={10}>Home 10%</option>
                      <option value={12}>Fashion 12%</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-slate-600 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Commission</span>
                    <span className="font-semibold text-slate-900">₹{simCommission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST 18% on commission</span>
                    <span className="font-semibold text-slate-900">₹{simGst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform fee (shopper)</span>
                    <span className="font-semibold text-slate-900">₹{simPlatformFee.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Seller receives</span>
                    <span className="font-black text-emerald-600">₹{sellerReceives.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Bazaario earns</span>
                    <span className="font-black text-[#f59e0b]">₹{bazaarioEarns.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Fees & Payout Rules Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-3.5">
                <h3 className="font-black text-slate-900 text-sm tracking-tight">
                  Fees & payout rules
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Shopper platform fee</span>
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>₹</span>
                      <input
                        type="number"
                        defaultValue={9}
                        className="w-14 text-center border border-gray-200/80 rounded-lg py-1 px-1 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">COD handling fee</span>
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>₹</span>
                      <input
                        type="number"
                        defaultValue={20}
                        className="w-14 text-center border border-gray-200/80 rounded-lg py-1 px-1 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Payout frequency</span>
                    <select className="border border-gray-200/80 rounded-lg py-1 px-2 text-xs font-bold text-slate-800">
                      <option>Weekly - Mon</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Hold (return window)</span>
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <input
                        type="text"
                        defaultValue="7 days"
                        className="w-20 text-center border border-gray-200/80 rounded-lg py-1 px-1 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Minimum payout</span>
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>₹</span>
                      <input
                        type="number"
                        defaultValue={500}
                        className="w-16 text-center border border-gray-200/80 rounded-lg py-1 px-1 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Failed payouts */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-sm tracking-tight">
                Failed payouts
              </h3>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                3
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    CD
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Casa Decor</h5>
                    <p className="text-[11px] text-rose-600 font-medium">
                      Invalid IFSC · SBIN0D0XXX
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-900 text-xs">₹8,420</span>
                  <button
                    onClick={() => showToast('Retrying payout to Casa Decor...')}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 rounded-lg text-xs font-bold shadow-2xs"
                  >
                    Retry
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    UT
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Urban Threads</h5>
                    <p className="text-[11px] text-rose-600 font-medium">
                      Account closed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-900 text-xs">₹14,980</span>
                  <button
                    onClick={() => showToast('Retrying payout to Urban Threads...')}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 rounded-lg text-xs font-bold shadow-2xs"
                  >
                    Retry
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                    FF
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Fresh Farm Dairy</h5>
                    <p className="text-[11px] text-rose-600 font-medium">
                      Name mismatch
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-900 text-xs">₹3,210</span>
                  <button
                    onClick={() => showToast('Retrying payout to Fresh Farm Dairy...')}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 rounded-lg text-xs font-bold shadow-2xs"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
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

