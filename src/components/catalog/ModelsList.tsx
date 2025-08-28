'use client';

import { useState, useEffect } from 'react';
import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';

interface Model {
  codigo: string;
  nome: string;
}

interface ModelsListProps {
  brandId: string;
  brandName: string;
}

export default function ModelsList({ brandId, brandName }: ModelsListProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await fipeClient.getModels(brandId);
        setModels(data.modelos || []);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar modelos. Tente novamente.');
        console.error('Error fetching models:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [brandId]);

  if (loading) {
    return (
      <div>
        <div className="bg-gray-200 h-8 w-48 mb-4 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-16 rounded animate-pulse"></div>
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
      <h2 className="text-2xl font-bold mb-6">Modelos da {brandName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <Link
            key={model.codigo}
            href={`/catalog/${brandId}/${model.codigo}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h3 className="font-semibold text-gray-800">{model.nome}</h3>
            <p className="text-sm text-gray-500">Código: {model.codigo}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}