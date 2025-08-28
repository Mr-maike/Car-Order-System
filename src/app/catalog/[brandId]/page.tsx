import ModelsList from '@/components/catalog/ModelsList';

interface PageProps {
  params: {
    brandId: string;
  };
}

export default function BrandPage({ params }: PageProps) {
  // Em uma implementação real, buscaríamos o nome da marca pela API
  const brandName = `Marca ${params.brandId}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📦 Modelos Disponíveis
          </h1>
          <p className="text-gray-600">
            Selecione um modelo para ver os anos/versões
          </p>
        </div>
        
        <ModelsList brandId={params.brandId} brandName={brandName} />
      </div>
    </div>
  );
}