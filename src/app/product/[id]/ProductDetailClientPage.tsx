'use client';

import dynamic from 'next/dynamic';

const ProductDetailPage = dynamic(() => import('../page'), { ssr: false });

export default function ProductDetailClientPage() {
  return <ProductDetailPage />;
}
