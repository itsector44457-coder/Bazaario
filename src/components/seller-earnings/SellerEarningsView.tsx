'use client';

import React, { useState } from 'react';
import {
  Download,
  Percent,
  Landmark,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Search,
  Filter,
  X,
  CreditCard,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';

interface TransactionItem {
  id: string;
  orderId: string;
  date: string;
  gross: number;
  commission: number;
  gst: number;
  net: number;
  status: 'Pending' | 'In next payout' | 'Paid' | 'Refunded';
}

interface PayoutHistoryItem {
  id: string;
  payoutDate: string;
  amount: number;
  ordersCount: number;
  bankAccount: string;
  utrNumber: string;
  status: 'Paid' | 'Processing';
}

const TRANSACTIONS_DATA: TransactionItem[] = [
  {
    id: 'tx-1',
    orderId: '#BZ-48213-A',
    date: '29 Oct',
    gross: 2499,
    commission: -199.92,
    gst: -35.99,
    net: 2263.09,
    status: 'Pending',
  },
  {
    id: 'tx-2',
    orderId: '#BZ-48190',
    date: '29 Oct',
    gross: 4290,
    commission: -343.20,
    gst: -61.78,
    net: 3885.02,
    status: 'In next payout',
  },
  {
    id: 'tx-3',
    orderId: '#BZ-48102',
    date: '28 Oct',
    gross: 3499,
    commission: -279.92,
    gst: -50.39,
    net: 3168.69,
    status: 'In next payout',
  },
  {
    id: 'tx-4',
    orderId: '#BZ-47988',
    date: '27 Oct',
    gross: 1599,
    commission: -127.92,
    gst: -23.03,
    net: 1448.05,
    status: 'Paid',
  },
  {
    id: 'tx-5',
    orderId: '#BZ-47820',
    date: '26 Oct',
    gross: 2199,
    commission: 0,
    gst: 0,
    net: 0,
    status: 'Refunded',
  },
  {
    id: 'tx-6',
    orderId: '#BZ-47741',
    date: '25 Oct',
    gross: 3890,
    commission: -311.20,
    gst: -56.02,
    net: 3522.78,
    status: 'Paid',
  },
  {
    id: 'tx-7',
    orderId: '#BZ-47602',
    date: '24 Oct',
    gross: 1299,
    commission: -103.92,
    gst: -18.71,
    net: 1176.37,
    status: 'Paid',
  },
];

const PAYOUT_HISTORY_DATA: PayoutHistoryItem[] = [
  {
    id: '#PAY-2024-43',
    payoutDate: '27 Oct 2024',
    amount: 64210,
    ordersCount: 48,
    bankAccount: 'HDFC Bank ••••8823',
    utrNumber: 'HDFC948201742',
    status: 'Paid',
  },
  {
    id: '#PAY-2024-42',
    payoutDate: '20 Oct 2024',
    amount: 68500,
    ordersCount: 52,
    bankAccount: 'HDFC Bank ••••8823',
    utrNumber: 'HDFC931084221',
    status: 'Paid',
  },
  {
    id: '#PAY-2024-41',
    payoutDate: '13 Oct 2024',
    amount: 55200,
    ordersCount: 41,
    bankAccount: 'HDFC Bank ••••8823',
    utrNumber: 'HDFC919402518',
    status: 'Paid',
  },
  {
    id: '#PAY-2024-40',
    payoutDate: '06 Oct 2024',
    amount: 49800,
    ordersCount: 37,
    bankAccount: 'HDFC Bank ••••8823',
    utrNumber: 'HDFC908123991',
    status: 'Paid',
  },
];

const WEEKLY_DATA = [
  { label: '8 Sep', earned: 42100, commission: 3660, total: 45760 },
  { label: '15 Sep', earned: 46800, commission: 4070, total: 50870 },
  { label: '22 Sep', earned: 44200, commission: 3840, total: 48040 },
  { label: '29 Sep', earned: 52400, commission: 4550, total: 56950 },
  { label: '6 Oct', earned: 49800, commission: 4330, total: 54130 },
  { label: '13 Oct', earned: 55200, commission: 4800, total: 60000 },
  { label: '20 Oct', earned: 68500, commission: 5960, total: 74460 },
  { label: '27 Oct', earned: 64210, commission: 5580, total: 69790 },
];

const MAX_CHART_VALUE = 80000;

interface SellerEarningsViewProps {
  className?: string;
}

export default function SellerEarningsView({ className = '' }: SellerEarningsViewProps) {
  const [activeTab, setActiveTab] = useState<'transactions' | 'payouts'>('transactions');
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isDownloadToast, setIsDownloadToast] = useState(false);

  // Bank Account State
  const [bankDetails, setBankDetails] = useState({
    bankName: 'HDFC Bank',
    accountNumber: '•••• •••• •••• 8823',
    accountHolder: 'Sharma Electronics / Rajesh Sharma',
    ifsc: 'HDFC0000128',
    branch: 'Lokhandwala, Mumbai',
  });

  const filteredTransactions = TRANSACTIONS_DATA.filter((tx) =>
    tx.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadStatement = () => {
    setIsDownloadToast(true);
    setTimeout(() => setIsDownloadToast(false), 3000);
  };

  return (
    <div className={`w-full space-y-6 select-none ${className}`}>
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Earnings & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
            Commission is deducted per order. Payouts every Monday.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadStatement}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-xs sm:text-sm font-bold text-gray-800 transition shadow-2xs hover:border-gray-300 active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#059669] stroke-[2.2]" />
          <span>Download statement</span>
        </button>
      </div>

      {/* ── 2. Top 4 Metric Cards (Grid layout exactly matching screenshot) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Next payout (Highlighted Emerald Card) */}
        <div className="bg-[#053d2e] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-200 tracking-wide uppercase">
              Next payout
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight pt-1">
              ₹58,420
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber-300">
            <Calendar className="w-4 h-4 text-amber-300 stroke-[2.2]" />
            <span>Monday, 3 Nov</span>
          </div>
        </div>

        {/* Card 2: Pending settlement */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Pending settlement
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              ₹12,860
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 font-medium">
            Orders in return window
          </p>
        </div>

        {/* Card 3: Net earnings (Oct) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Net earnings (Oct)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              ₹2,61,574
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#059669] mt-4">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>18% vs Sep</span>
          </div>
        </div>

        {/* Card 4: Commission paid (Oct) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Commission paid (Oct)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight pt-1">
              ₹22,746
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 font-medium">
            8% + GST on 412 orders
          </p>
        </div>
      </div>

      {/* ── 3. Middle Section: Weekly Chart + Commission Breakdown & Bank ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: Stacked Bar Chart (8 Columns on desktop) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          {/* Chart Header with Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Weekly earnings
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Your net share vs Bazaario commission
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                You earned
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                Commission
              </span>
            </div>
          </div>

          {/* Interactive Stacked Bar Chart with Grid Lines */}
          <div className="relative pt-6 pb-2">
            {/* Horizontal Grid lines with Y-Axis Values */}
            <div className="absolute inset-x-0 inset-y-6 flex flex-col justify-between pointer-events-none">
              {[60000, 40000, 20000, 0].map((val) => (
                <div key={val} className="w-full flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 w-12 text-right">
                    ₹{val.toLocaleString('en-IN')}
                  </span>
                  <div className="flex-1 border-b border-gray-100" />
                </div>
              ))}
            </div>

            {/* Bars Container */}
            <div className="pl-14 pr-2 pt-2 h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 relative z-10">
              {WEEKLY_DATA.map((item, idx) => {
                const totalPct = (item.total / MAX_CHART_VALUE) * 100;
                const earnedPct = (item.earned / item.total) * 100;
                const commissionPct = 100 - earnedPct;
                const isHovered = hoveredWeek === idx;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                    onMouseEnter={() => setHoveredWeek(idx)}
                    onMouseLeave={() => setHoveredWeek(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-14 bg-gray-900 text-white rounded-xl py-1.5 px-3 text-[11px] font-bold shadow-lg z-20 whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                        <div className="text-emerald-400">Net: ₹{item.earned.toLocaleString('en-IN')}</div>
                        <div className="text-amber-400">Comm: ₹{item.commission.toLocaleString('en-IN')}</div>
                      </div>
                    )}

                    {/* Stacked Bar Column */}
                    <div
                      style={{ height: `${totalPct}%` }}
                      className={`w-full max-w-[42px] rounded-t-lg overflow-hidden flex flex-col-reverse transition-all duration-300 ${isHovered ? 'scale-105 filter drop-shadow-md' : 'opacity-95'
                        }`}
                    >
                      {/* Bottom green: You earned */}
                      <div
                        style={{ height: `${earnedPct}%` }}
                        className="w-full bg-[#10b981] transition-all"
                      />
                      {/* Top amber: Commission */}
                      <div
                        style={{ height: `${commissionPct}%` }}
                        className="w-full bg-[#f59e0b] transition-all"
                      />
                    </div>

                    {/* X-axis date label */}
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-2.5 transition truncate ${isHovered ? 'text-gray-950 font-black' : 'text-gray-400'
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Commission Rate Card & Bank Account Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5">
          {/* Card 1: Your Commission Rate */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                  <Percent className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-950">
                    Your commission rate
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Electronics & Mobiles
                  </p>
                </div>
              </div>

              <div className="text-2xl font-black text-gray-950 tracking-tight">
                8%
              </div>
            </div>

            {/* Example Calculation Box */}
            <div className="bg-[#fcfdfd] border border-gray-150 rounded-2xl p-4 space-y-2 text-xs">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                EXAMPLE · ₹2,499 SALE
              </span>

              <div className="flex justify-between text-gray-700 font-semibold pt-1">
                <span>Sale price</span>
                <span className="text-gray-950">₹2,499.00</span>
              </div>

              <div className="flex justify-between text-gray-700 font-semibold">
                <span>Commission 8%</span>
                <span className="text-rose-600 font-bold">-₹199.92</span>
              </div>

              <div className="flex justify-between text-gray-700 font-semibold">
                <span>GST 18% on commission</span>
                <span className="text-rose-600 font-bold">-₹35.99</span>
              </div>

              <div className="border-t border-gray-200/80 pt-2.5 flex justify-between items-center font-black">
                <span className="text-gray-900">You receive</span>
                <span className="text-[#059669] text-sm sm:text-base font-black">
                  ₹2,263.09
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Verified Payout Bank Account */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-[#0284c7] shrink-0">
                <Landmark className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-gray-900 truncate">
                  {bankDetails.bankName} {bankDetails.accountNumber.slice(-8)}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#059669] font-bold mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Verified payout account</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsBankModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs shrink-0 cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Table: Order Transactions & Payout History ── */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Table Header Tabs & Search */}
        <div className="p-4 sm:p-5 border-b border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('transactions')}
              className={`pb-1 text-sm font-black transition relative cursor-pointer ${activeTab === 'transactions'
                  ? 'text-gray-950'
                  : 'text-gray-400 hover:text-gray-700'
                }`}
            >
              Order transactions
              {activeTab === 'transactions' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#059669] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('payouts')}
              className={`pb-1 text-sm font-black transition relative cursor-pointer ${activeTab === 'payouts'
                  ? 'text-gray-950'
                  : 'text-gray-400 hover:text-gray-700'
                }`}
            >
              Payout history
              {activeTab === 'payouts' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#059669] rounded-full" />
              )}
            </button>
          </div>

          {/* Quick Search inside Table */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by order ID or date..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        {/* Content Tab 1: Order Transactions Table */}
        {activeTab === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#fcfdfd] border-b border-gray-150 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="py-3 px-5">ORDER</th>
                  <th className="py-3 px-5">DATE</th>
                  <th className="py-3 px-5">GROSS</th>
                  <th className="py-3 px-5">COMMISSION</th>
                  <th className="py-3 px-5">GST</th>
                  <th className="py-3 px-5">NET</th>
                  <th className="py-3 px-5">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 text-xs">
                      No transactions found matching &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-5 font-black text-gray-950">
                        {tx.orderId}
                      </td>
                      <td className="py-3.5 px-5 text-gray-500">{tx.date}</td>
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        ₹{tx.gross.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-5 text-rose-600 font-bold">
                        {tx.commission === 0 ? '₹0' : `-₹${Math.abs(tx.commission).toFixed(2)}`}
                      </td>
                      <td className="py-3.5 px-5 text-rose-600 font-bold">
                        {tx.gst === 0 ? '₹0' : `-₹${Math.abs(tx.gst).toFixed(2)}`}
                      </td>
                      <td className="py-3.5 px-5 font-black text-gray-950">
                        {tx.net === 0 ? '₹0' : `₹${tx.net.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-black ${tx.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : tx.status === 'In next payout'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : tx.status === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Content Tab 2: Payout History Table */}
        {activeTab === 'payouts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#fcfdfd] border-b border-gray-150 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="py-3 px-5">PAYOUT ID</th>
                  <th className="py-3 px-5">DATE</th>
                  <th className="py-3 px-5">AMOUNT</th>
                  <th className="py-3 px-5">ORDERS</th>
                  <th className="py-3 px-5">BANK ACCOUNT</th>
                  <th className="py-3 px-5">UTR / REF</th>
                  <th className="py-3 px-5">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                {PAYOUT_HISTORY_DATA.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-5 font-black text-gray-950">{p.id}</td>
                    <td className="py-3.5 px-5 text-gray-500">{p.payoutDate}</td>
                    <td className="py-3.5 px-5 font-black text-[#059669] text-sm">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-5 text-gray-600">{p.ordersCount} orders</td>
                    <td className="py-3.5 px-5 text-gray-700">{p.bankAccount}</td>
                    <td className="py-3.5 px-5 font-mono text-[11px] text-gray-500">
                      {p.utrNumber}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Change Bank Account Modal ── */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsBankModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-150 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#059669]" />
                <h3 className="text-base font-black text-gray-950">Payout Bank Account</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankDetails.ifsc}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifsc: e.target.value.toUpperCase() })
                  }
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountHolder}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accountHolder: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-800">
                ⚠️ Bank account changes require penny verification and take up to 24 hours to take effect.
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Bank details updated successfully!');
                  setIsBankModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white font-bold text-xs shadow-xs"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download statement toast notification */}
      {isDownloadToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200 border border-gray-700">
          <FileSpreadsheet className="w-5 h-5 text-[#10b981]" />
          <div className="text-xs">
            <p className="font-bold">Statement downloaded</p>
            <p className="text-gray-400">Sharma_Electronics_Oct_2024.csv</p>
          </div>
        </div>
      )}
    </div>
  );
}
