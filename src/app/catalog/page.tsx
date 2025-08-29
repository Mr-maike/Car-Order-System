import { Metadata } from 'next';
import { Suspense } from 'react';
import BrandsList, { BrandsListSkeleton } from '@/components/catalog/BrandsList';

export const metadata: Metadata = {
  title: 'Catálogo FIPE - Marcas de Veículos',
  description: 'Explore todas as marcas de veículos disponíveis na tabela FIPE',
  keywords: 'fipe, carros, marcas, veículos, preços',
  openGraph: {
    title: 'Catálogo FIPE - Marcas de Veículos',
    description: 'Explore todas as marcas de veículos disponíveis na tabela FIPE',
  },
};

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚗 Catálogo FIPE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra todas as marcas de veículos disponíveis e consulte os preços na tabela FIPE
          </p>
        </div>
        
        <Suspense fallback={<BrandsListSkeleton />}>
          <BrandsList />
        </Suspense>
      </div>
    </div>
  );
}