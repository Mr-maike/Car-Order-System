'use client';

import { useEffect, useMemo } from 'react';
import { useOrderForm } from '@/hooks/UseOrderForm';
import { OrderFormData } from '@/lib/validations/order';

// Cores disponíveis para seleção
const EXTERIOR_COLORS = [
  'Branco', 'Preto', 'Prata', 'Cinza', 'Vermelho', 
  'Azul', 'Verde', 'Amarelo', 'Laranja', 'Marrom'
];

const INTERIOR_COLORS = [
  'Preto', 'Bege', 'Marrom', 'Cinza', 'Branco', 'Vermelho'
];

interface OrderFormProps {
  initialData?: Partial<OrderFormData>;
  onSubmit: (data: OrderFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export default function OrderForm({ 
  initialData, 
  onSubmit, 
  isSubmitting = false 
}: OrderFormProps) {
  const form = useOrderForm(initialData);
  const { register, handleSubmit, watch, setValue, formState } = form;
  const { errors, isDirty } = formState;

  // Observar mudanças INDIVIDUALMENTE
  const vehicleData = watch('vehicle');
  const basePrice = vehicleData?.basePrice;
  
  // Watch individual para cada opcional
  const hasSunroof = watch('options.hasSunroof');
  const hasXenon = watch('options.hasXenon');
  const hasAlloyWheels = watch('options.hasAlloyWheels');
  const isTurbo = watch('options.isTurbo');

  console.log('🔍 DEBUG - Opcionais:', { hasSunroof, hasXenon, hasAlloyWheels, isTurbo });
  console.log('🔍 DEBUG - basePrice:', basePrice);

  // ✅ useMemo para cálculo reativo
  const calculatedPrice = useMemo(() => {
    console.log('🔢 useMemo calculando...', { 
      basePrice, 
      hasSunroof, 
      hasXenon, 
      hasAlloyWheels, 
      isTurbo 
    });
    
    if (!basePrice || basePrice === 0) return 0;

    let finalPrice = basePrice;
    
    // Turbo aumenta 18% do valor base
    if (isTurbo) {
      const turboAmount = basePrice * 0.18;
      finalPrice += turboAmount;
      console.log('⚡ Turbo adicionado:', turboAmount);
    }

    // Outros opcionais têm valores fixos
    if (hasSunroof) {
      finalPrice += 5000;
      console.log('🌞 Teto solar adicionado: +5000');
    }
    if (hasXenon) {
      finalPrice += 3000;
      console.log('💡 Farol de milha adicionado: +3000');
    }
    if (hasAlloyWheels) {
      finalPrice += 8000;
      console.log('🔩 Rodas de liga adicionadas: +8000');
    }

    console.log('💰 Preço final calculado:', finalPrice);
    return finalPrice;
  }, [basePrice, hasSunroof, hasXenon, hasAlloyWheels, isTurbo]);

  // ✅ Atualizar form value quando calculatedPrice mudar
  useEffect(() => {
    console.log('📝 Atualizando form value:', calculatedPrice);
    setValue('finalPrice', calculatedPrice, { shouldValidate: true });
  }, [calculatedPrice, setValue]);

  const onFormSubmit = async (data: OrderFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* Seção: Dados do Veículo */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🚗 Dados do Veículo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <input
                {...register('vehicle.brand')}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo
              </label>
              <input
                {...register('vehicle.model')}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ano/Versão
              </label>
              <input
                {...register('vehicle.year')}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço Base FIPE
              </label>
              <input
                {...register('vehicle.basePrice', { valueAsNumber: true })}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Seção: Personalização */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🎨 Personalização</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Externa *
              </label>
              <select
                {...register('externalColor')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma cor</option>
                {EXTERIOR_COLORS.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              {errors.externalColor && (
                <p className="text-red-500 text-sm mt-1">{errors.externalColor.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor dos Bancos *
              </label>
              <select
                {...register('interiorColor')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma cor</option>
                {INTERIOR_COLORS.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              {errors.interiorColor && (
                <p className="text-red-500 text-sm mt-1">{errors.interiorColor.message}</p>
              )}
            </div>
          </div>

          {/* Opcionais */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Opcionais
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.hasSunroof')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Teto Solar (+ R$ 5.000)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.hasXenon')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Farol de Milha (+ R$ 3.000)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.hasAlloyWheels')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Rodas de Liga Leve (+ R$ 8.000)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.isTurbo')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Motor Turbo (+18%)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Seção: Dados do Cliente */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">👤 Dados do Cliente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                {...register('clientName')}
                placeholder="Digite o nome do cliente"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail ou Telefone *
              </label>
              <input
                {...register('contact')}
                placeholder="email@exemplo.com ou (11) 99999-9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">💰 Resumo do Pedido</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-700 mb-2">Valores</h3>
              <div className="space-y-1">
                <p className="flex justify-between">
                  <span>Preço Base:</span>
                  <span>R$ {(basePrice || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </p>
                
                {isTurbo && (
                  <p className="flex justify-between text-green-600">
                    <span>Acréscimo Turbo (+18%):</span>
                    <span>+ R$ {((basePrice || 0) * 0.18).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </p>
                )}
                
                {hasSunroof && (
                  <p className="flex justify-between text-green-600">
                    <span>Teto Solar:</span>
                    <span>+ R$ 5.000,00</span>
                  </p>
                )}
                
                {hasXenon && (
                  <p className="flex justify-between text-green-600">
                    <span>Farol de Milha:</span>
                    <span>+ R$ 3.000,00</span>
                  </p>
                )}
                
                {hasAlloyWheels && (
                  <p className="flex justify-between text-green-600">
                    <span>Rodas de Liga:</span>
                    <span>+ R$ 8.000,00</span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Total</h3>
              <p className="text-2xl font-bold text-green-600">
                R$ {calculatedPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500 mt-1">Preço final com opcionais</p>
              
              {/* Debug info */}
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="text-xs text-gray-500">
                  Base: {basePrice} | Calc: {calculatedPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Criar Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
}