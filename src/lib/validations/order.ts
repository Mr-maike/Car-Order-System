import { z } from 'zod';

// Opcionais do veículo
export const vehicleOptionsSchema = z.object({
  hasSunroof: z.boolean().default(false),
  hasXenon: z.boolean().default(false),
  hasAlloyWheels: z.boolean().default(false),
  isTurbo: z.boolean().default(false),
});

// Schema principal do pedido
export const orderFormSchema = z.object({
  // Dados do veículo (vindos da FIPE)
  vehicle: z.object({
    brand: z.string().min(1, "Marca é obrigatória"),
    model: z.string().min(1, "Modelo é obrigatório"),
    year: z.string().min(1, "Ano é obrigatório"),
    basePrice: z.number().min(0, "Preço deve ser positivo"),
    fipeCode: z.string().optional(),
    fuelType: z.string().optional(),
  }),

  // Dados de personalização
  externalColor: z.string().min(1, "Cor externa é obrigatória"),
  interiorColor: z.string().min(1, "Cor dos bancos é obrigatória"),

  // Dados do cliente
  clientName: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  contact: z.string()
    .min(5, "Contato deve ter pelo menos 5 caracteres")
    .max(100, "Contato muito longo")
    .refine((value) => {
      // Valida se é email ou telefone
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, "Digite um email ou telefone válido"),

  // Opcionais
  options: vehicleOptionsSchema,

  // Preço final (calculado)
  finalPrice: z.number().min(0, "Preço final inválido"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
export type VehicleOptions = z.infer<typeof vehicleOptionsSchema>;