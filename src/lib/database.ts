import { Order } from '@/types';

let orders: Order[] = [];

export const Database = {
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      id: orders.length + 1,
      ...orderData,
      createdAt: new Date(),
    };
    orders.push(newOrder);
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    return orders;
  },

  async getOrder(id: number): Promise<Order | undefined> {
    return orders.find(order => order.id === id);
  },

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) return undefined;
    
    orders[index] = { ...orders[index], ...updates };
    return orders[index];
  }
};