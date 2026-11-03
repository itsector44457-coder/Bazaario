'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeaderNav from './AdminHeaderNav';

interface OrderItem {
  id: string;
  timeAgo: string;
  shopperName: string;
  shopperAvatar: string;
  shopName: string;
  amount: number;
  commission: string;
  paymentMethod: string;
  status: 'Awaiting shop' | 'Out for delivery' | 'Delivered' | 'Dispute' | 'Cancelled';
}

const mockOrders: OrderItem[] = [
  {
    id: '#BZ-48219-A',
    timeAgo: '2 min ago',
    shopperName: 'Ananya Iyer',
    shopperAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    shopName: 'Sharma Electronics',
    amount: 2499,
    commission: '₹199.92',
    paymentMethod: 'UPI',
    status: 'Awaiting shop',
  },
  {
    id: '#BZ-48213',
    timeAgo: '3 shops · 32 min ago',
    shopperName: 'Rahul Verma',
    shopperAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    shopName: 'Sharma, Libas, Gupta',
    amount: 3896,
    commission: '₹335.27',
    paymentMethod: 'UPI',
    status: 'Out for delivery',
  },
  {
    id: '#BZ-48190',
    timeAgo: '1h ago',
    shopperName: 'Pooja Nair',
    shopperAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    shopName: 'Sharma Electronics',
    amount: 4290,
    commission: '₹343.20',
    paymentMethod: 'Card',
    status: 'Delivered',
  },
  {
    id: '#BZ-48172',
    timeAgo: '1h ago',
    shopperName: 'Sameer Khan',
    shopperAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    shopName: 'Gupta Kirana Store',
    amount: 1284,
    commission: '₹64.20',
    paymentMethod: 'COD',
    status: 'Delivered',
  },
  {
    id: '#BZ-46112',
    timeAgo: '2 days ago',
    shopperName: 'Kavya Rao',
    shopperAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    shopName: 'Casa Decor',
    amount: 1299,
    commission: 'On hold',
    paymentMethod: 'UPI',
    status: 'Dispute',
  },
  {
    id: '#BZ-48101',
    timeAgo: '3h ago',
    shopperName: 'Dev Patel',
    shopperAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    shopName: 'StepUp Footwear',
    amount: 1799,
    commission: '₹0',
    paymentMethod: 'Card',
    status: 'Cancelled',
  },
];

export default function AdminOrdersView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'delivered' | 'cancelled' | 'disputes'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'Awaiting shop':
        return (
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80">
            Awaiting shop
          </span>
        );
      case 'Out for delivery':
        return (
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80">
            Out for delivery
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            Delivered
          </span>
        );
      case 'Dispute':
        return (
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
            Dispute
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Cancelled
          </span>
        );
    }
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'live' && order.status !== 'Awaiting shop' && order.status !== 'Out for delivery') return false;
    if (activeTab === 'delivered' && order.status !== 'Delivered') return false;
    if (activeTab === 'cancelled' && order.status !== 'Cancelled') return false;
    if (activeTab === 'disputes' && order.status !== 'Dispute') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.shopperName.toLowerCase().includes(q) ||
        order.shopName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="orders"
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
                Orders
              </h1>
            </div>
          </div>

          {/* Metric Cards Top Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Orders today
              </span>
              <span className="text-2xl font-black text-slate-900">912</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                GMV today
              </span>
              <span className="text-2xl font-black text-slate-900">₹6.8 L</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Commission today
              </span>
              <span className="text-2xl font-black text-slate-900">₹52,140</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Cancel rate
              </span>
              <span className="text-2xl font-black text-slate-900">2.1%</span>
            </div>

            <div className="bg-rose-50/60 rounded-2xl border border-rose-200/70 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-rose-500 block mb-1">
                Open disputes
              </span>
              <span className="text-2xl font-black text-rose-600">5</span>
            </div>
          </div>

          {/* Filter Tabs & Selectors */}
          <div className="space-y-4">
            <div className="flex items-center gap-6 border-b border-gray-200/80 pb-2 text-xs font-bold text-slate-500">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-2 -mb-2.5 transition border-b-2 ${
                  activeTab === 'all'
                    ? 'border-[#10b981] text-[#064e3b] font-black'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`pb-2 -mb-2.5 transition border-b-2 ${
                  activeTab === 'live'
                    ? 'border-[#10b981] text-[#064e3b] font-black'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Live <span className="text-slate-400 font-semibold ml-0.5">184</span>
              </button>
              <button
                onClick={() => setActiveTab('delivered')}
                className={`pb-2 -mb-2.5 transition border-b-2 ${
                  activeTab === 'delivered'
                    ? 'border-[#10b981] text-[#064e3b] font-black'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`pb-2 -mb-2.5 transition border-b-2 ${
                  activeTab === 'cancelled'
                    ? 'border-[#10b981] text-[#064e3b] font-black'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Cancelled
              </button>
              <button
                onClick={() => setActiveTab('disputes')}
                className={`pb-2 -mb-2.5 transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'disputes'
                    ? 'border-rose-500 text-rose-600 font-black'
                    : 'border-transparent text-rose-500 hover:text-rose-600'
                }`}
              >
                Disputes
                <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  5
                </span>
              </button>
            </div>

            {/* Sub-Filters and CSV */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <select className="bg-white border border-gray-200/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20">
                  <option>All shops</option>
                  <option>Sharma Electronics</option>
                  <option>Gupta Kirana Store</option>
                  <option>Casa Decor</option>
                </select>

                <select className="bg-white border border-gray-200/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20">
                  <option>All payments</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>COD</option>
                </select>

                <select className="bg-white border border-gray-200/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>

              <button
                onClick={() => showToast('Exporting orders CSV...')}
                className="bg-white border border-gray-200/80 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-black uppercase text-slate-400 bg-slate-50/50">
                    <th className="py-3 px-4">ORDER</th>
                    <th className="py-3 px-4">SHOPPER</th>
                    <th className="py-3 px-4">SHOP</th>
                    <th className="py-3 px-4">AMOUNT</th>
                    <th className="py-3 px-4">COMMISSION</th>
                    <th className="py-3 px-4">PAYMENT</th>
                    <th className="py-3 px-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-800">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition">
                      {/* Order info */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">
                          {order.id}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {order.timeAgo}
                        </span>
                      </td>

                      {/* Shopper */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.shopperAvatar}
                            alt={order.shopperName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-900">
                            {order.shopperName}
                          </span>
                        </div>
                      </td>

                      {/* Shop */}
                      <td className="py-3 px-4 font-medium text-slate-600">
                        {order.shopName}
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 font-black text-slate-900">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </td>

                      {/* Commission */}
                      <td className="py-3 px-4 font-semibold text-slate-500">
                        {order.commission}
                      </td>

                      {/* Payment */}
                      <td className="py-3 px-4 font-medium text-slate-600">
                        {order.paymentMethod}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispute Review Bottom Box (#BZ-46112) */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200/70">
                    DISPUTE · 2 days open
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  #BZ-46112 · Damaged Item
                </h3>
                <p className="text-xs text-slate-500">
                  Kavya Rao vs Casa Decor · ₹1,299 on hold
                </p>
              </div>
            </div>

            {/* Shopper Claim Card */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-black">
                  K
                </div>
                <span>Shopper claim</span>
              </div>
              <p className="text-xs text-slate-700 italic">
                &ldquo;The lamp base arrived cracked. Packaging was very thin.&rdquo;
              </p>
              <div className="pt-1">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&auto=format&fit=crop&q=80"
                  alt="Damaged lamp"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                />
              </div>
            </div>

            {/* Shop Response Card */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-black">
                  CD
                </div>
                <span>Shop response</span>
              </div>
              <p className="text-xs text-slate-700 italic">
                &ldquo;It was checked before dispatch. Damage may be from delivery.&rdquo;
              </p>
            </div>

            {/* Timeline */}
            <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
              <div>27 Oct · Delivered 6:10 PM</div>
              <div>27 Oct · Dispute raised 6:42 PM</div>
              <div>28 Oct · Shop responded</div>
            </div>

            {/* Dispute Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => showToast('Full refund issued to Kavya Rao')}
                className="w-full py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs shadow-xs transition"
              >
                Refund shopper in full
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => showToast('Partial refund requested')}
                  className="w-full py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-gray-200/80 font-bold text-xs transition"
                >
                  Partial refund
                </button>
                <button
                  onClick={() => showToast('Dispute resolved in shop favor')}
                  className="w-full py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-gray-200/80 font-bold text-xs transition"
                >
                  Side with shop
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => showToast('Chat opened with both parties')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Message both parties</span>
                </button>
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

