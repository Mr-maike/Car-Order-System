import YearsList from '@/components/catalog/YearsList';

interface PageProps {
  params: {
    brandId: string;
    modelId: string;
  };
}

export default function ModelPage({ params }: PageProps) {
  // Em uma implementação real, buscaríamos os nomes pela API
  const brandName = `Marca ${params.brandId}`;
  const modelName = `Modelo ${params.modelId}`;

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
          brandId={params.brandId} 
          modelId={params.modelId}
          brandName={brandName}
          modelName={modelName}
        />
      </div>
    </div>
  );
}