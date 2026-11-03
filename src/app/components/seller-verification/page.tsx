'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import SellerVerificationView from '@/components/seller-verification/SellerVerificationView';

export default function SellerVerificationComponentPage() {
  const [copied, setCopied] = useState(false);

  const usageCode = `import SellerVerificationView from '@/components/seller-verification/SellerVerificationView';

export default function MyVerificationPage() {
  return <SellerVerificationView />;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Seller Verification Component</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/seller-verification"
            className="text-xs font-bold text-[#059669] hover:underline px-3 py-1.5"
          >
            View Live Screen →
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Application Under Review Status View</h2>
          <p className="text-xs text-gray-500">
            Post-registration seller dashboard showing 4-stage verification progress, action needed missing photo banner, verified KYC tags, and catalogue draft builder.
          </p>
        </div>

        <div className="bg-[#fcfdfd] rounded-3xl border border-gray-200 p-6 shadow-xs">
          <SellerVerificationView />
        </div>
      </div>
    </div>
  );
}

