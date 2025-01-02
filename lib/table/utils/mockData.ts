import { Product } from '../types/product';

export const generateMockProducts = (count: number = 50): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.round(Math.random() * 1000 * 100) / 100,
    rate_avg: Math.round(Math.random() * 5 * 10) / 10,
    inStock: Math.random() > 0.3 // This will make ~70% of products in stock
  }));
};