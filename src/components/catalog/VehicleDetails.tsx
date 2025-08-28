'use client';

import { useState, useEffect } from 'react';
import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';

interface VehicleDetails {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

interface VehicleDetailsProps {
  brandId: string;
  modelId: string;
  yearId: string;
}

export default function VehicleDetails({ brandId, modelId, yearId }: VehicleDetailsProps) {
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const data = await fipeClient.getVehicleDetails(brandId, modelId, yearId);
        setVehicle(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar detalhes do veículo. Tente novamente.');
        console.error('Error fetching vehicle details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [brandId, modelId, yearId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-200 h-8 w-64 rounded animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-48 rounded animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-32 rounded animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-40 rounded animate-pulse"></div>
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

  if (!vehicle) {
    return <div>Nenhum detalhe encontrado para este veículo.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Veículo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">Marca:</p>
          <p>{vehicle.Marca}</p>
        </div>
        <div>
          <p className="font-semibold">Modelo:</p>
          <p>{vehicle.Modelo}</p>
        </div>
        <div>
          <p className="font-semibold">Ano/Modelo:</p>
          <p>{vehicle.AnoModelo}</p>
        </div>
        <div>
          <p className="font-semibold">Combustível:</p>
          <p>{vehicle.Combustivel}</p>
        </div>
        <div>
          <p className="font-semibold">Preço FIPE:</p>
          <p className="text-green-600 font-bold text-lg">{vehicle.Valor}</p>
        </div>
        <div>
          <p className="font-semibold">Código FIPE:</p>
          <p>{vehicle.CodigoFipe}</p>
        </div>
      </div>

      <Link
        href={`/orders/new?brand=${vehicle.Marca}&model=${vehicle.Modelo}&year=${vehicle.AnoModelo}&price=${vehicle.Valor}`}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        📝 Criar Pedido com este Veículo
      </Link>
    </div>
  );
}