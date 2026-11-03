'use client';

import dynamic from 'next/dynamic';

const RentalProductDetailView = dynamic(
  () => import('@/components/rental/RentalProductDetailView'),
  { ssr: false }
);

export default function RentalDetailClientPage() {
  return <RentalProductDetailView />;
}
