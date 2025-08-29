import YearsList from '@/components/catalog/YearsList';

interface PageProps {
  params: Promise<{
    brandId: string;
    modelId: string;
  }>;
}

export default async function ModelPage({ params }: PageProps) {
  const { brandId, modelId } = await params;
  
  // ✅ DECODE DOS PARÂMETROS
  const decodedBrandId = decodeURIComponent(brandId);
  const decodedModelId = decodeURIComponent(modelId);

  const brandName = `Marca ${decodedBrandId}`;
  const modelName = `Modelo ${decodedModelId}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📅 Anos/Versões
          </h1>
          <p className="text-gray-600">
            Selecione um ano/versão para ver os detalhes do veículo
          </p>
        </div>
        
        <YearsList 
          brandId={decodedBrandId}
          modelId={decodedModelId}
          brandName={brandName}
          modelName={modelName}
        />
      </div>
    </div>
  );
}