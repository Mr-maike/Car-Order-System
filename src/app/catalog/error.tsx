'use client';

import { BrandsListError } from '@/components/catalog/BrandsList';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandsListError error={error} reset={reset} />
      </div>
    </div>
  );
}