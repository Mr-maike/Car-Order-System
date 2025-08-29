import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Brand {
  codigo: string;
  nome: string;
}

// Loading skeleton component - Export separado para usar com Suspense
export function BrandsListSkeleton() {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      aria-label="Carregando marcas..."
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="text-center">
            <Skeleton 
              variant="circular" 
              width={48} 
              height={48} 
              className="mx-auto mb-3" 
            />
            <Skeleton variant="text" height={24} className="mb-2 mx-auto w-3/4" />
            <Skeleton variant="text" height={16} className="w-1/2 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error boundary component
export function BrandsListError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorMessage
      title="Erro ao carregar marcas"
      message="Não foi possível carregar a lista de marcas. Verifique sua conexão e tente novamente."
      onRetry={reset}
      retryLabel="Tentar Novamente"
    />
  );
}

// Main component - Agora é um Server Component async
export default async function BrandsList() {
  try {
    const startTime = Date.now();
    const brands = await fipeClient.getBrands();
    const duration = Date.now() - startTime;

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Marcas Disponíveis</h2>
          <p className="text-gray-600">Selecione uma marca para ver os modelos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {brands.map((brand: Brand) => (
            <Link
              key={brand.codigo}
              href={`/catalog/${encodeURIComponent(brand.codigo)}`}
              className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              prefetch={true}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600 font-semibold text-lg">
                    {brand.nome.charAt(0)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {brand.nome}
                </h3>
                
                <p className="text-sm text-gray-500">
                  Código: {brand.codigo}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading brands:', error);
    
    // Em Server Components, não podemos usar hooks como useState, então
    // vamos lançar o erro para ser capturado por um error boundary
    throw new Error('Falha ao carregar marcas. Tente novamente.');
  }
}