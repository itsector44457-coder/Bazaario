import { Suspense } from 'react';
import RentalDetailClientPage from './RentalDetailClientPage';

export const metadata = {
  title: 'Rent Products Near You',
  description:
    'Rent electronics, equipment, furniture and more from local stores near you on Bazaario.',
};

export default function RentalDetailPage() {
  return (
    <Suspense>
      <RentalDetailClientPage />
    </Suspense>
  );
}
