'use client';

import React from 'react';
import Link from 'next/link';

interface ProductDetailFooterProps {
  className?: string;
}

export default function ProductDetailFooter({ className = '' }: ProductDetailFooterProps) {
  return (
    <footer
      className={`w-full bg-[#084c37] text-white py-4 text-xs font-medium text-center select-none ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-emerald-100 flex-wrap">
        <span>© 2025 Bazaario Marketplace</span>
        <span>·</span>
        <Link href="/" className="hover:text-white transition font-bold underline-offset-2 hover:underline">
          Home
        </Link>
      </div>
    </footer>
  );
}

