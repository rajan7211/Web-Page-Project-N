// USER TYPES
export type UserRole = 'Super Admin' | 'Admin' | 'Customer';
export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profileImage? : string;
}


// AUTH TYPES

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}


// PRODUCT TYPES

export interface Product {
  id: string;
  title: string;
  price: string;
  rating: number;
  description: string;
  image: string;
}

// ORDER TYPES

export type OrderStatus = 'Delivered' | 'Processing' | 'Shipped' | 'Pending';

export interface Order {
  id: string;
  customerId: string;
  total: number;
  items: number;
  status: OrderStatus;
  placedAt: string;
}


// CATEGORY TYPES

export interface Category {
  id: string;
  title: string;
  count: number;
  color: string;
}


// TESTIMONIAL TYPES

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}


