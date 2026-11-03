'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Ban,
  RotateCcw,
  Eye,
  Shield,
  ShoppingBag,
  Store,
  Phone,
  Mail,
  MapPin,
  X,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeaderNav from './AdminHeaderNav';

interface UserRecord {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  phone: string;
  email: string;
  role: 'Shopper' | 'Seller';
  area: string;
  ordersCount: number;
  joinedDate: string;
  status: 'Active' | 'Blocked';
}

const mockUsers: UserRecord[] = [
  {
    id: 'usr-1',
    name: 'Ananya Iyer',
    initials: 'AI',
    avatarBg: 'bg-emerald-600',
    phone: '+91 98765 43210',
    email: 'ananya.iyer@gmail.com',
    role: 'Shopper',
    area: 'Andheri W',
    ordersCount: 6,
    joinedDate: 'Mar 2024',
    status: 'Active',
  },
  {
    id: 'usr-2',
    name: 'Rajesh Sharma',
    initials: 'RS',
    avatarBg: 'bg-blue-600',
    phone: '+91 98330 21045',
    email: 'sharma.elec@gmail.com',
    role: 'Seller',
    area: 'Andheri W',
    ordersCount: 412,
    joinedDate: 'Jan 2023',
    status: 'Active',
  },
  {
    id: 'usr-3',
    name: 'Rohan Mehta',
    initials: 'RM',
    avatarBg: 'bg-purple-600',
    phone: '+91 91234 56789',
    email: 'rohan.mehta@yahoo.com',
    role: 'Shopper',
    area: 'Bandra',
    ordersCount: 14,
    joinedDate: 'Aug 2023',
    status: 'Active',
  },
  {
    id: 'usr-4',
    name: 'Sunita Gupta',
    initials: 'SG',
    avatarBg: 'bg-amber-600',
    phone: '+91 99887 76655',
    email: 'gupta.kirana@gmail.com',
    role: 'Seller',
    area: 'Andheri W',
    ordersCount: 1842,
    joinedDate: 'Feb 2022',
    status: 'Active',
  },
  {
    id: 'usr-5',
    name: 'Fake Review Bot',
    initials: 'FB',
    avatarBg: 'bg-rose-600',
    phone: '+91 00000 00001',
    email: 'bot492@spammail.com',
    role: 'Shopper',
    area: 'Unknown',
    ordersCount: 0,
    joinedDate: 'Oct 2024',
    status: 'Blocked',
  },
  {
    id: 'usr-6',
    name: 'Priya Shah',
    initials: 'PS',
    avatarBg: 'bg-teal-600',
    phone: '+91 87654 32109',
    email: 'priya.shah@outlook.com',
    role: 'Shopper',
    area: 'Juhu',
    ordersCount: 3,
    joinedDate: 'Jun 2024',
    status: 'Active',
  },
];

export default function AdminUsersView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [activeTab, setActiveTab] = useState<'all' | 'sellers' | 'blocked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleBlock = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'Active' ? 'Blocked' : 'Active';
          showToast(`User ${u.name} is now ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    if (activeTab === 'sellers' && u.role !== 'Seller') return false;
    if (activeTab === 'blocked' && u.status !== 'Blocked') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.area.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="users"
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
                Users
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Shoppers & sellers registered on Bazaario
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                85,420 shoppers
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                1,214 sellers
              </span>
              <button
                onClick={() => showToast('Exporting user directory...')}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xs transition"
              >
                Export
              </button>
            </div>
          </div>

          {/* Metric Cards Top Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Total Users
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">86,634</span>
                <span className="text-[11px] font-bold text-emerald-600">+8,458</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Active today
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">12,847</span>
                <span className="text-[11px] font-semibold text-slate-400">14.8%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Sellers
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">1,214</span>
                <span className="text-[11px] font-bold text-amber-600">38 pending</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                Blocked
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-rose-500">23</span>
                <span className="text-[11px] font-semibold text-rose-400">2 this week</span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'all'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-gray-200/80 hover:bg-slate-50'
                }`}
              >
                All users (86,634)
              </button>
              <button
                onClick={() => setActiveTab('sellers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'sellers'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-gray-200/80 hover:bg-slate-50'
                }`}
              >
                Sellers (1,214)
              </button>
              <button
                onClick={() => setActiveTab('blocked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'blocked'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                Blocked (23)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone..."
                className="w-full bg-white border border-gray-200/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-black uppercase text-slate-400 bg-slate-50/50">
                    <th className="py-3 px-4">USER</th>
                    <th className="py-3 px-4">PHONE</th>
                    <th className="py-3 px-4">ROLE</th>
                    <th className="py-3 px-4">AREA</th>
                    <th className="py-3 px-4">ORDERS</th>
                    <th className="py-3 px-4">JOINED</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition">
                      {/* User */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            {user.initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {user.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4 font-medium text-slate-600">
                        {user.phone}
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                            user.role === 'Seller'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Area */}
                      <td className="py-3 px-4 font-medium text-slate-600">
                        {user.area}
                      </td>

                      {/* Orders */}
                      <td className="py-3 px-4 font-black text-slate-900">
                        {user.ordersCount > 0 ? user.ordersCount : '—'}
                      </td>

                      {/* Joined */}
                      <td className="py-3 px-4 text-slate-500 font-medium">
                        {user.joinedDate}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            user.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                              : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                            title="View user details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleBlock(user.id)}
                            className={`p-1.5 rounded-lg transition ${
                              user.status === 'Active'
                                ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                                : 'text-rose-500 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={user.status === 'Active' ? 'Block user' : 'Unblock user'}
                          >
                            {user.status === 'Active' ? (
                              <Ban className="w-3.5 h-3.5" />
                            ) : (
                              <RotateCcw className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* User Details Drawer Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-2xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-base font-black text-slate-900">User Profile</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl ${selectedUser.avatarBg} text-white font-black text-xl flex items-center justify-center`}
              >
                {selectedUser.initials}
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">
                  {selectedUser.name}
                </h4>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-slate-900">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Area:</span>
                <span className="font-bold text-slate-900">{selectedUser.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Joined:</span>
                <span className="font-bold text-slate-900">{selectedUser.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total orders:</span>
                <span className="font-black text-emerald-600">{selectedUser.ordersCount}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => {
                  handleToggleBlock(selectedUser.id);
                  setSelectedUser(null);
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-black transition ${
                  selectedUser.status === 'Active'
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {selectedUser.status === 'Active' ? 'Block this user' : 'Restore active access'}
              </button>
            </div>
          </div>
        </div>
      )}

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

