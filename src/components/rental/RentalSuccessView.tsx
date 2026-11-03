'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Download,
  ThumbsUp,
  Coins,
  ArrowRight,
  Package,
  Calendar,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function RentalSuccessView() {
  const router = useRouter();

  const handleDownloadInvoice = () => {
    alert('Downloading Tax Invoice #IC-125-ABCD (PDF)...');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased">
      <Navbar cartCount={0} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full flex-1 flex flex-col items-center justify-center text-center space-y-8">
        {/* Top Graphic Illustration matching Screenshot 5 */}
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm mb-2">
            <ThumbsUp className="w-10 h-10 stroke-[2.2] fill-rose-100" />
          </div>

          <div className="flex items-center justify-center -space-x-1">
            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-xs shadow-xs">
              $
            </div>
            <div className="w-9 h-9 rounded-full bg-rose-100 border border-rose-300 text-rose-600 flex items-center justify-center font-black text-sm shadow-xs z-10 -translate-y-1">
              $
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-xs shadow-xs">
              $
            </div>
          </div>
        </div>

        {/* Text Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Payment Successfully!!!
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Thank you! your payment of <strong className="text-slate-900">$1800</strong> has been received.
          </p>

          <button
            type="button"
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 underline pt-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
        </div>

        {/* Order Details Card */}
        <div className="w-full bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-6 sm:p-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Order id:</span>
            <span className="font-black text-slate-900 text-sm">IC-125-ABCD</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Total pay:</span>
            <span className="font-black text-slate-900 text-sm">$1800</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Transaction id:</span>
            <span className="font-black text-slate-900 text-sm">12356</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Payment mode:</span>
            <span className="font-black text-slate-900 text-sm">Credit Card(Visa)</span>
          </div>
        </div>

        {/* Actions Buttons matching Screenshot 5 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md pt-2">
          <Link
            href="/order-tracking"
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-black text-xs transition text-center shadow-xs"
          >
            Track Order
          </Link>

          <Link
            href="/rental"
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-black text-xs transition text-center shadow-xs"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

