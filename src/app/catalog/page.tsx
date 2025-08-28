import BrandsList from '@/components/catalog/BrandsList';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚗 Catálogo FIPE
          </h1>
          <p className="text-gray-600">
            Selecione uma marca para ver os modelos disponíveis
          </p>
        </div>
        
        <BrandsList />
      </div>
    </div>
  );
}