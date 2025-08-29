import VehicleDetails from '@/components/catalog/VehicleDetails';

interface PageProps {
  params: Promise<{
    brandId: string;
    modelId: string;
    yearId: string;
  }>;
}

export default async function YearPage({ params }: PageProps) {
  const { brandId, modelId, yearId } = await params;
  
  // ✅ DECODE DOS PARÂMETROS
  const decodedBrandId = decodeURIComponent(brandId);
  const decodedModelId = decodeURIComponent(modelId);
  const decodedYearId = decodeURIComponent(yearId);

  console.log('Params recebidos:', { decodedBrandId, decodedModelId, decodedYearId });

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
          brandId={decodedBrandId}
          modelId={decodedModelId}
          yearId={decodedYearId}
        />
      </div>
    </div>
  );
}