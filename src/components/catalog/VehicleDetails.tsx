'use client';

import { useState, useEffect } from 'react';
import { fipeClient } from '@/lib/fipe/client';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

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
    // ✅ VALIDAÇÃO DOS PARÂMETROS
    if (!brandId || !modelId || !yearId || yearId === 'undefined') {
      setError('Parâmetros inválidos para carregar o veículo');
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        console.log('Buscando detalhes com:', { brandId, modelId, yearId });
        
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

  // ✅ Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" height={32} width={256} />
        <Skeleton variant="text" height={24} width={192} />
        <Skeleton variant="text" height={24} width={160} />
        <Skeleton variant="text" height={24} width={180} />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar veículo"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // ✅ No vehicle found
  if (!vehicle) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum detalhe encontrado para este veículo.</p>
      </div>
    );
  }

  // ✅ Success state
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
        href={`/orders/new?brand=${encodeURIComponent(vehicle.Marca)}&model=${encodeURIComponent(vehicle.Modelo)}&year=${vehicle.AnoModelo}&price=${encodeURIComponent(vehicle.Valor)}`}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        📝 Criar Pedido com este Veículo
      </Link>
    </div>
  );
}