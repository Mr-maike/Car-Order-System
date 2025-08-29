export interface Order {
  id: number;
  brand: string;
  model: string;
  year: string;
  externalColor: string;
  interiorColor: string;
  clientName: string;
  contact: string;
  hasSunroof: boolean;
  hasXenon: boolean;
  hasAlloyWheels: boolean;
  isTurbo: boolean;
  basePrice: number;
  finalPrice: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: string;
  price: string;
  fipeCode?: string;
}