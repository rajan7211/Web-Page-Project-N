import { apiGet } from './api';
import { Order } from '../types';

export async function fetchOrders(customerId: string): Promise<Order[]> {
  return apiGet<Order[]>(`/orders?customerId=${encodeURIComponent(customerId)}`);
}

export async function fetchAllOrders(): Promise<Order[]> {
  return apiGet<Order[]>('/orders');
}



















