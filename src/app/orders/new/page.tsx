import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import OrderForm from '@/components/forms/OrderForm';
import { OrderFormData } from '@/lib/validations/order';
import { Database } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Novo Pedido - Sistema de Pedidos',
  description: 'Crie um novo pedido de veículo',
};

interface SearchParams {
  brand?: string;
  model?: string;
  year?: string;
  price?: string;
}

export default async function NewOrderPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  
  // Validar se temos dados mínimos do veículo
  if (!params.brand || !params.model || !params.year || !params.price) {
    redirect('/catalog');
  }

  // Converter preço de string para número
  const parsePrice = (priceString: string): number => {
    try {
      return parseFloat(
        priceString
          .replace('R$ ', '')
          .replace('.', '')
          .replace(',', '.')
      );
    } catch {
      return 0;
    }
  };

  // Preparar dados iniciais do formulário
  const initialData: Partial<OrderFormData> = {
    vehicle: {
      brand: decodeURIComponent(params.brand || ''),
      model: decodeURIComponent(params.model || ''),
      year: decodeURIComponent(params.year || ''),
      basePrice: parsePrice(params.price || '0'),
    },
    finalPrice: parsePrice(params.price || '0'),
  };

  // Função para submeter o formulário
  const handleSubmitOrder = async (data: OrderFormData) => {
    'use server';
    
    try {
      await Database.createOrder({
        brand: data.vehicle.brand,
        model: data.vehicle.model,
        year: data.vehicle.year,
        externalColor: data.externalColor,
        interiorColor: data.interiorColor,
        clientName: data.clientName,
        contact: data.contact,
        hasSunroof: data.options.hasSunroof,
        hasXenon: data.options.hasXenon,
        hasAlloyWheels: data.options.hasAlloyWheels,
        isTurbo: data.options.isTurbo,
        basePrice: data.vehicle.basePrice,
        finalPrice: data.finalPrice,
      });
      
      redirect('/orders?created=true');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Falha ao criar pedido');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 Novo Pedido
          </h1>
          <p className="text-gray-600">
            Complete as informações para criar um novo pedido
          </p>
        </div>

        <OrderForm 
          initialData={initialData}
          onSubmit={handleSubmitOrder}
        />
      </div>
    </div>
  );
}