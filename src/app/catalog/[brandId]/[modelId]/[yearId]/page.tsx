import VehicleDetails from '@/components/catalog/VehicleDetails';

interface PageProps {
  params: {
    brandId: string;
    modelId: string;
    yearId: string;
  };
}

export default function YearPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Detalhes do Veículo
          </h1>
          <p className="text-gray-600">
            Confira os detalhes e preço do veículo selecionado
          </p>
        </div>
        
        <VehicleDetails 
          brandId={params.brandId}
          modelId={params.modelId}
          yearId={params.yearId}
        />
      </div>
    </div>
  );
}