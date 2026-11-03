'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbProps {
  category?: string;
  subCategory?: string;
  productName?: string;
  className?: string;
}

export default function ProductBreadcrumb({
  category = 'Electronics',
  subCategory = 'Headphones',
  productName = 'Wireless ANC Headphones',
  className = '',
}: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium flex-wrap ${className}`}
    >
      <Link href="/" className="hover:text-emerald-700 transition">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2.2]" />
      <Link
        href={`/search?q=${encodeURIComponent(category.toLowerCase())}`}
        className="hover:text-emerald-700 transition"
      >
        {category}
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2.2]" />
      <Link
        href={`/search?q=${encodeURIComponent(subCategory.toLowerCase())}`}
        className="hover:text-emerald-700 transition"
      >
        {subCategory}
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2.2]" />
      <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
        {productName}
      </span>
    </nav>
  );
}

