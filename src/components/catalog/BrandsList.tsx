'use client';

import { useState, useEffect } from 'react';
import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';

interface Brand {
  codigo: string;
  nome: string;
}

export default function BrandsList() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await fipeClient.getBrands();
        setBrands(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar marcas. Tente novamente.');
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-20 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {brands.map((brand) => (
        <Link
          key={brand.codigo}
          href={`/catalog/${brand.codigo}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <h3 className="font-semibold text-lg text-gray-800">{brand.nome}</h3>
          <p className="text-sm text-gray-500">Código: {brand.codigo}</p>
        </Link>
      ))}
    </div>
  );
}