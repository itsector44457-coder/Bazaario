'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  TrendingUp,
  Store,
  Users,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronDown,
  Star,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Download,
  AlertCircle,
  XCircle,
} from 'lucide-react';

interface MonthlyData {
  month: string;
  gmvLakh: number; // in Lakhs
  commissionLakh: number; // in Lakhs
}

const MONTHLY_CHART_DATA: MonthlyData[] = [
  { month: 'Nov', gmvLakh: 62, commissionLakh: 5.2 },
  { month: 'Dec', gmvLakh: 78, commissionLakh: 6.5 },
  { month: 'Jan', gmvLakh: 65, commissionLakh: 5.8 },
  { month: 'Feb', gmvLakh: 69, commissionLakh: 6.1 },
  { month: 'Mar', gmvLakh: 84, commissionLakh: 7.2 },
  { month: 'Apr', gmvLakh: 92, commissionLakh: 7.9 },
  { month: 'May', gmvLakh: 104, commissionLakh: 8.7 },
  { month: 'Jun', gmvLakh: 112, commissionLakh: 9.3 },
  { month: 'Jul', gmvLakh: 122, commissionLakh: 10.1 },
  { month: 'Aug', gmvLakh: 139, commissionLakh: 11.4 },
  { month: 'Sep', gmvLakh: 154, commissionLakh: 12.6 },
  { month: 'Oct', gmvLakh: 184, commissionLakh: 14.2 },
];

const CATEGORY_SHARE = [
  { name: 'Grocery', percentage: 38, color: '#064e3b' },
  { name: 'Fashion', percentage: 22, color: '#10b981' },
  { name: 'Electronics', percentage: 19, color: '#f59e0b' },
  { name: 'Pharmacy', percentage: 12, color: '#14b8a6' },
  { name: 'Home', percentage: 9, color: '#fbbf24' },
];

const PENDING_APPROVALS = [
  {
    id: 'sharma',
    initials: 'SE',
    color: 'bg-[#064e3b]',
    name: 'Sharma Electronics',
    details: 'Electronics · Andheri W · 2h ago',
  },
  {
    id: 'glow',
    initials: 'GM',
    color: 'bg-[#e11d48]',
    name: 'Glow Medicos',
    details: 'Pharmacy · Bandra · 5h ago',
  },
  {
    id: 'kala',
    initials: 'KC',
    color: 'bg-[#6366f1]',
    name: 'Kala Crafts',
    details: 'Home Decor · Juhu · 1d ago',
  },
];

const TOP_SHOPS = [
  {
    id: 'gupta',
    name: 'Gupta Kirana Store',
    category: 'Grocery',
    orders: '1,842',
    gmv: '₹9.6 L',
    commission: '₹48,120',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sharma',
    name: 'Sharma Electronics',
    category: 'Electronics',
    orders: '412',
    gmv: '₹2.8 L',
    commission: '₹22,746',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'libas',
    name: 'Libas Boutique',
    category: 'Fashion',
    orders: '296',
    gmv: '₹2.4 L',
    commission: '₹28,860',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=150&q=80',
  },
];

interface AdminDashboardViewProps {
  className?: string;
}

export default function AdminDashboardView({ className = '' }: AdminDashboardViewProps) {
  const [timeRange, setTimeRange] = useState('Last 12 months');
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);
  const router = useRouter();

  // SVG calculations for Combo Chart
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 35;
  const paddingY = 25;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingY * 2;
  const maxGmv = 200; // 200L scale max

  const barWidth = 18;
  const points = MONTHLY_CHART_DATA.map((d, i) => {
    const x = paddingX + (i / (MONTHLY_CHART_DATA.length - 1)) * usableWidth;
    const yBar = svgHeight - paddingY - (d.gmvLakh / maxGmv) * usableHeight;
    // Commission scale is 0 to 16L max
    const yComm = svgHeight - paddingY - (d.commissionLakh / 16) * usableHeight;
    return { x, yBar, yComm, ...d };
  });

  // Spline line path for commission
  const splinePath = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.yComm}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.yComm;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.yComm;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.yComm}`;
  }, '');

  return (
    <div className={`w-full space-y-6 select-none ${className}`}>
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Platform overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            Mumbai · All categories · Updated 2 min ago
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Time range selector */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-gray-800 outline-none hover:bg-gray-50 cursor-pointer shadow-2xs"
            >
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 3 months">Last 3 months</option>
              <option value="Last 6 months">Last 6 months</option>
              <option value="Last 12 months">Last 12 months</option>
              <option value="Year to date">Year to date</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Report Button */}
          <button
            type="button"
            onClick={() => router.push('/admin/approvals')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* ── 2. Top 5 Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: GMV */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              GMV
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              ₹1.84 Cr
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#059669] mt-3">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>22.4%</span>
          </div>
        </div>

        {/* Card 2: Commission revenue (Highlighted Dark Emerald Card) */}
        <div className="bg-[#064e3b] rounded-3xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-200 tracking-wide">
              Commission revenue
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight pt-1">
              ₹14.2 L
            </div>
          </div>
          <div className="mt-3 text-xs font-bold text-amber-300">
            Avg take rate 7.7%
          </div>
        </div>

        {/* Card 3: Active shops */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Active shops
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              1,214
            </div>
          </div>
          <p className="text-xs text-[#059669] font-bold mt-3">
            +86 this month
          </p>
        </div>

        {/* Card 4: Shoppers */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Shoppers
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              85,420
            </div>
          </div>
          <p className="text-xs text-[#059669] font-bold mt-3">
            +6,210 this month
          </p>
        </div>

        {/* Card 5: Orders */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Orders
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight pt-1">
              24,310
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-3">
            2.1% cancel rate
          </p>
        </div>
      </div>

      {/* ── 3. Middle Charts Row: Combo GMV & Commission + Category Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: GMV & Commission Monthly Combo Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          {/* Chart Header & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                GMV & commission
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Monthly, in ₹ lakh
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                GMV
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                Commission
              </span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative pt-4 pb-1">
            {/* Y-Axis GMV left labels + Commission right labels */}
            <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between pointer-events-none">
              {[
                { gmv: '₹150L', comm: '₹14L' },
                { gmv: '₹100L', comm: '₹12L' },
                { gmv: '₹50L', comm: '₹8L' },
                { gmv: '₹0L', comm: '₹6L' },
              ].map((row, idx) => (
                <div key={idx} className="w-full flex items-center justify-between text-[10px] font-bold text-gray-400">
                  <span className="w-10 text-right">{row.gmv}</span>
                  <div className="flex-1 mx-3 border-b border-gray-100" />
                  <span className="w-10 text-left">{row.comm}</span>
                </div>
              ))}
            </div>

            {/* SVG Canvas for Bars + Spline Line */}
            <div className="px-10 py-1">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-56 sm:h-64 overflow-visible"
              >
                {/* 1. GMV Bars */}
                {points.map((p, idx) => {
                  const barHeight = svgHeight - paddingY - p.yBar;
                  const isHovered = hoveredMonthIdx === idx;

                  return (
                    <g
                      key={`bar-${idx}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredMonthIdx(idx)}
                      onMouseLeave={() => setHoveredMonthIdx(null)}
                    >
                      <rect
                        x={p.x - barWidth / 2}
                        y={p.yBar}
                        width={barWidth}
                        height={barHeight}
                        rx={4}
                        fill={isHovered ? '#059669' : '#10b981'}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}

                {/* 2. Commission Line Curve */}
                <path
                  d={splinePath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  strokeLinecap="round"
                />

                {/* 3. Commission Line Dots */}
                {points.map((p, idx) => (
                  <circle
                    key={`dot-${idx}`}
                    cx={p.x}
                    cy={p.yComm}
                    r={hoveredMonthIdx === idx ? 5 : 3.5}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="cursor-pointer transition-all duration-150"
                  />
                ))}
              </svg>

              {/* X-Axis Month Labels */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-gray-400 mt-2">
                {MONTHLY_CHART_DATA.map((d, idx) => (
                  <span
                    key={idx}
                    className={`transition ${
                      hoveredMonthIdx === idx ? 'text-gray-950 font-black' : ''
                    }`}
                  >
                    {d.month}
                  </span>
                ))}
              </div>
            </div>

            {/* Tooltip Overlay */}
            {hoveredMonthIdx !== null && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-xl py-1.5 px-3 text-xs font-bold shadow-xl pointer-events-none flex items-center gap-3 animate-in fade-in zoom-in-95">
                <span className="text-gray-300">
                  {MONTHLY_CHART_DATA[hoveredMonthIdx].month}:
                </span>
                <span className="text-emerald-400">
                  GMV ₹{MONTHLY_CHART_DATA[hoveredMonthIdx].gmvLakh}L
                </span>
                <span className="text-amber-400">
                  Commission ₹{MONTHLY_CHART_DATA[hoveredMonthIdx].commissionLakh}L
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: GMV by Category Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-950">
              GMV by category
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Share of platform volume
            </p>
          </div>

          {/* SVG Donut Chart with percentages */}
          <div className="relative py-4 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-52 sm:h-52 -rotate-90">
              {/* Circular arcs for 38% Grocery, 22% Fashion, 19% Electronics, 12% Pharmacy, 9% Home */}
              {/* Radius 70, Circumference = 2 * PI * 70 = 439.82 */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#064e3b"
                strokeWidth="28"
                strokeDasharray={`${0.38 * 439.82} 439.82`}
                strokeDashoffset="0"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#10b981"
                strokeWidth="28"
                strokeDasharray={`${0.22 * 439.82} 439.82`}
                strokeDashoffset={`-${0.38 * 439.82}`}
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="28"
                strokeDasharray={`${0.19 * 439.82} 439.82`}
                strokeDashoffset={`-${(0.38 + 0.22) * 439.82}`}
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="28"
                strokeDasharray={`${0.12 * 439.82} 439.82`}
                strokeDashoffset={`-${(0.38 + 0.22 + 0.19) * 439.82}`}
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="28"
                strokeDasharray={`${0.09 * 439.82} 439.82`}
                strokeDashoffset={`-${(0.38 + 0.22 + 0.19 + 0.12) * 439.82}`}
              />
            </svg>

            {/* Inner text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-gray-950">₹1.84 Cr</span>
              <span className="text-[10px] font-bold text-gray-400">Total GMV</span>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-gray-100">
            {CATEGORY_SHARE.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between pr-2">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.name}</span>
                </span>
                <span className="text-gray-950 font-black">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Lower Cards Row: Pending Approvals + Needs Attention + Today ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Pending Approvals (12) */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-gray-950">Pending approvals</h3>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2 py-0.5 rounded-full">
                  12
                </span>
              </div>
              <button
                type="button"
                onClick={() => router.push('/admin/approvals')}
                className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3 pt-3">
              {PENDING_APPROVALS.map((shop) => (
                <div
                  key={shop.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl ${shop.color} text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}
                    >
                      {shop.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-gray-900 truncate">
                        {shop.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium truncate">
                        {shop.details}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push('/admin/approvals')}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs cursor-pointer shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Needs Attention */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-950 pb-2 border-b border-gray-100">
              Needs attention
            </h3>

            <div className="space-y-2.5 pt-3">
              {/* Alert 1: Order disputes */}
              <div className="bg-[#fff1f2] border border-rose-200/80 rounded-2xl p-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-rose-950">
                    5 open order disputes
                  </h4>
                  <p className="text-[11px] text-rose-700 font-medium">
                    Oldest: 2 days · #BZ-46112
                  </p>
                </div>
              </div>

              {/* Alert 2: Flagged products */}
              <div className="bg-[#fffbeb] border border-amber-200/80 rounded-2xl p-3 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-amber-950">
                    9 products flagged
                  </h4>
                  <p className="text-[11px] text-amber-700 font-medium">
                    Counterfeit / wrong category reports
                  </p>
                </div>
              </div>

              {/* Alert 3: Failed payouts */}
              <div className="bg-[#f0f9ff] border border-sky-200/80 rounded-2xl p-3 flex items-start gap-3">
                <XCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-sky-950">
                    3 payouts failed
                  </h4>
                  <p className="text-[11px] text-sky-700 font-medium">
                    Invalid IFSC · retry needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Today */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-950 pb-2 border-b border-gray-100">
              Today
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-150">
                <span className="block text-[11px] text-gray-400 font-semibold">
                  Orders
                </span>
                <span className="block text-xl font-black text-gray-950 mt-1">
                  912
                </span>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-150">
                <span className="block text-[11px] text-gray-400 font-semibold">
                  GMV
                </span>
                <span className="block text-xl font-black text-gray-950 mt-1">
                  ₹6.8 L
                </span>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-150">
                <span className="block text-[11px] text-gray-400 font-semibold">
                  New shoppers
                </span>
                <span className="block text-xl font-black text-gray-950 mt-1">
                  248
                </span>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-150">
                <span className="block text-[11px] text-gray-400 font-semibold">
                  Avg delivery
                </span>
                <span className="block text-xl font-black text-gray-950 mt-1">
                  38 min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Bottom Section: Top shops this month ── */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-gray-150 flex items-center justify-between">
          <h2 className="text-base font-black text-gray-950">
            Top shops this month
          </h2>
          <button
            type="button"
            onClick={() => router.push('/admin/shops')}
            className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
          >
            All shops
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#fcfdfd] border-b border-gray-150 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3 px-6">SHOP</th>
                <th className="py-3 px-6">CATEGORY</th>
                <th className="py-3 px-6">ORDERS</th>
                <th className="py-3 px-6">GMV</th>
                <th className="py-3 px-6">COMMISSION</th>
                <th className="py-3 px-6">RATING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {TOP_SHOPS.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50/70 transition">
                  {/* Shop Info with Thumbnail */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 border border-gray-200">
                        <Image
                          src={shop.image}
                          alt={shop.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-black text-gray-950">{shop.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-6 text-gray-500">{shop.category}</td>

                  <td className="py-3.5 px-6 font-bold text-gray-900">
                    {shop.orders}
                  </td>

                  <td className="py-3.5 px-6 font-black text-gray-950">
                    {shop.gmv}
                  </td>

                  <td className="py-3.5 px-6 font-black text-[#059669]">
                    {shop.commission}
                  </td>

                  <td className="py-3.5 px-6">
                    <span className="flex items-center gap-1 font-bold text-gray-900">
                      <span>{shop.rating}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

