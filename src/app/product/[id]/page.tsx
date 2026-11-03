import { Suspense } from 'react';
import ProductDetailClientPage from './ProductDetailClientPage';

export const metadata = {
  title: 'Product Details',
  description:
    'View product details, reviews, and add to cart on Bazaario hyperlocal marketplace.',
};

export default function ProductDynamicDetailPage() {
  return (
    <Suspense>
      <ProductDetailClientPage />
    </Suspense>
  );
}
