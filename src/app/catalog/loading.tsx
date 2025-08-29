import { BrandsListSkeleton } from '@/components/catalog/BrandsList';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96 mx-auto"></div>
        </div>
        
        <BrandsListSkeleton />
      </div>
    </div>
  );
}