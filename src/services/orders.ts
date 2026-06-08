import { Order } from '../types';
import { orders as initialOrders } from '../data/mockData';

export async function fetchOrders(customerId: string): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialOrders.filter((order) => order.customerId === customerId));
    }, 500);
  });
}



















