import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderFormSchema, OrderFormData } from '@/lib/validations/order';
import type { FieldValues, UseFormProps } from 'react-hook-form';

// Wrapper seguro para o resolver
const safeZodResolver = <T extends FieldValues>(schema: any) => 
  zodResolver(schema) as UseFormProps<T>['resolver'];

export function useOrderForm(initialData?: Partial<OrderFormData>) {
  return useForm<OrderFormData>({
    resolver: safeZodResolver<OrderFormData>(orderFormSchema),
    defaultValues: {
      vehicle: {
        brand: '',
        model: '',
        year: '',
        basePrice: 0,
        fipeCode: '',
        fuelType: '',
      },
      externalColor: '',
      interiorColor: '',
      clientName: '',
      contact: '',
      options: {
        hasSunroof: false,
        hasXenon: false,
        hasAlloyWheels: false,
        isTurbo: false,
      },
      finalPrice: 0,
      ...initialData,
    },
  });
}