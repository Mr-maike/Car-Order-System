'use client';

import { useState, useEffect } from 'react';
import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Year {
  codigo: string;
  nome: string;
}

interface YearsListProps {
  brandId: string;
  modelId: string;
  brandName: string;
  modelName: string;
}

export default function YearsList({ brandId, modelId, brandName, modelName }: YearsListProps) {
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const data = await fipeClient.getYears(brandId, modelId);
        setYears(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar anos. Tente novamente.');
        console.error('Error fetching years:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, [brandId, modelId]);

  if (loading) {
    return (
      <div>
        <div className="bg-gray-200 h-8 w-64 mb-4 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-12 rounded animate-pulse"></div>
          ))}
        </div>
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
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Anos/Versões: {brandName} - {modelName}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {years.map((year) => (
          <Link
            key={year.codigo}
            href={`/catalog/${encodeURIComponent(brandId)}/${encodeURIComponent(modelId)}/${encodeURIComponent(year.codigo)}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
            <h3 className="font-semibold text-gray-800">{year.nome}</h3>
            <p className="text-sm text-gray-500">Código: {year.codigo}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}