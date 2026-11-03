import { Suspense } from 'react';
import ShopProfileClientPage from './ShopProfileClientPage';

export const metadata = {
  title: 'Shop Profile',
  description:
    'Browse products, reviews and offers from this local store near you on Bazaario.',
};

export default function ShopDynamicProfilePage() {
  return (
    <Suspense>
      <ShopProfileClientPage />
    </Suspense>
  );
}
