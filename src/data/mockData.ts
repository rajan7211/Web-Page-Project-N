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
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-2',
    title: 'Flow Commerce',
    price: '$24/mo',
    rating: 4.7,
    description: 'Smart dashboards for payments, orders, and customer health.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-3',
    title: 'Pulse CRM',
    price: '$29/mo',
    rating: 4.8,
    description: 'Convert conversations into loyal customers with AI-driven insights.',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-4',
    title: 'Cloud Metrics',
    price: '$19/mo',
    rating: 4.6,
    description: 'Monitor infrastructure and application performance.',
    image: 'https://picsum.photos/600/400?random=4',
  },
  {
    id: 'product-5',
    title: 'Sales Boost',
    price: '$49/mo',
    rating: 4.9,
    description: 'Increase conversions with intelligent automation.',
    image: 'https://picsum.photos/600/400?random=5',
  },
  {
    id: 'product-6',
    title: 'Insight AI',
    price: '$59/mo',
    rating: 4.8,
    description: 'AI-powered business intelligence platform.',
    image: 'https://picsum.photos/600/400?random=6',
  },
  {
    id: 'product-7',
    title: 'Team Sync',
    price: '$15/mo',
    rating: 4.5,
    description: 'Collaboration tools for distributed teams.',
    image: 'https://picsum.photos/600/400?random=7',
  },
  {
    id: 'product-8',
    title: 'Customer Hub',
    price: '$25/mo',
    rating: 4.7,
    description: 'Manage customer interactions from one place.',
    image: 'https://picsum.photos/600/400?random=8',
  },
  {
    id: 'product-9',
    title: 'Smart Billing',
    price: '$35/mo',
    rating: 4.6,
    description: 'Automated subscription and invoice management.',
    image: 'https://picsum.photos/600/400?random=9',
  },
  {
    id: 'product-10',
    title: 'Lead Engine',
    price: '$45/mo',
    rating: 4.8,
    description: 'Generate and qualify leads automatically.',
    image: 'https://picsum.photos/600/400?random=10',
  },
  {
    id: 'product-11',
    title: 'Task Master',
    price: '$18/mo',
    rating: 4.4,
    description: 'Project and task management solution.',
    image: 'https://picsum.photos/600/400?random=11',
  },
  {
    id: 'product-12',
    title: 'Market Vision',
    price: '$55/mo',
    rating: 4.9,
    description: 'Advanced market research and reporting tools.',
    image: 'https://picsum.photos/600/400?random=12',
  },
  {
    id: 'product-13',
    title: 'Revenue Plus',
    price: '$42/mo',
    rating: 4.7,
    description: 'Track and optimize revenue streams.',
    image: 'https://picsum.photos/600/400?random=13',
  },
  {
    id: 'product-14',
    title: 'Secure Vault',
    price: '$28/mo',
    rating: 4.8,
    description: 'Enterprise-grade secure document storage.',
    image: 'https://picsum.photos/600/400?random=14',
  },
  {
    id: 'product-15',
    title: 'Growth Tracker',
    price: '$31/mo',
    rating: 4.6,
    description: 'Analyze and visualize business growth.',
    image: 'https://picsum.photos/600/400?random=15',
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
    quote:
      'The dashboard interface is clean and intuitive. Our delivery time improved by 35%.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Luca Bennett',
    role: 'E-commerce Director',
    quote:
      'LocalStorage persistence makes login feel seamless across refreshes and devices.',
    rating: 4,
  },
  {
    id: 'testimonial-3',
    name: 'Raya Thompson',
    role: 'Product Manager',
    quote:
      'Role-based access saved us hours of management every week.',
    rating: 5,
  },
];




