'use client';

import dynamic from 'next/dynamic';

const ShopProfilePage = dynamic(() => import('../page'), { ssr: false });

export default function ShopProfileClientPage() {
  return <ShopProfilePage />;
}
