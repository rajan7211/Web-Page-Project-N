import { apiGet } from './api';
import { Product } from '../types';

export async function fetchProducts(): Promise<Product[]> {
  return apiGet<Product[]>('/products');
}








