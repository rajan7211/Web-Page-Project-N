import { User, Product, Order, Category, Testimonial } from '../types';

export const users: User[] = [
  {
    id: 'super-1',
    firstName: 'Morgan',
    lastName: 'Reyes',
    name: 'Morgan Reyes',
    email: 'superadmin@demo.com',
    password: 'SuperAdmin123!',
    role: 'Super Admin',
    status: 'active',
    createdAt: '2025-01-08T09:30:00Z',
  },
  {
    id: 'admin-1',
    firstName: 'Avery',
    lastName: 'Cole',
    name: 'Avery Cole',
    email: 'admin@demo.com',
    password: 'AdminDemo123!',
    role: 'Admin',
    status: 'active',
    createdAt: '2025-02-14T11:15:00Z',
  },
  {
    id: 'customer-1',
    firstName: 'Sofia',
    lastName: 'Miles',
    name: 'Sofia Miles',
    email: 'customer@demo.com',
    password: 'Customer123!',
    role: 'Customer',
    status: 'active',
    createdAt: '2025-03-29T10:22:00Z',
  },
];

export const products: Product[] = [
  {
    id: 'product-1',
    title: 'Velocity Pro',
    price: '$39/mo',
    rating: 4.9,
    description: 'Powerful growth analytics built for modern teams.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-2',
    title: 'Flow Commerce',
    price: '$24/mo',
    rating: 4.7,
    description: 'Smart dashboards for payments, orders, and customer health.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-3',
    title: 'Pulse CRM',
    price: '$29/mo',
    rating: 4.8,
    description: 'Convert conversations into loyal customers with AI-driven insights.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
  },
];

export const orders: Order[] = [
  {
    id: 'order-1',
    customerId: 'customer-1',
    total: 159,
    items: 3,
    status: 'Delivered',
    placedAt: '2025-05-16',
  },
  {
    id: 'order-2',
    customerId: 'customer-1',
    total: 89,
    items: 1,
    status: 'Processing',
    placedAt: '2025-05-22',
  },
];

export const categories: Category[] = [
  {
    id: 'category-1',
    title: 'Analytics',
    count: 42,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'category-2',
    title: 'Payments',
    count: 18,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'category-3',
    title: 'Customer Success',
    count: 24,
    color: 'from-emerald-500 to-teal-500',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Amina Brooks',
    role: 'Head of Growth',
    quote: 'The dashboard interface is clean and intuitive. Our delivery time improved by 35%.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Luca Bennett',
    role: 'E-commerce Director',
    quote: 'LocalStorage persistence makes login feel seamless across refreshes and devices.',
    rating: 4,
  },
  {
    id: 'testimonial-3',
    name: 'Raya Thompson',
    role: 'Product Manager',
    quote: 'Role-based access saved us hours of management every week.',
    rating: 5,
  },
];




