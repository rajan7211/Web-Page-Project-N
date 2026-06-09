import { apiGet, apiPost, apiPatch } from './api';
import { LoginData, RegisterData, User, UserStatus, UserRole } from '../types';

export async function fetchUsers(): Promise<User[]> {
  return apiGet<User[]>('/users');
}

export async function fetchUsersByRole(role: UserRole): Promise<User[]> {
  return apiGet<User[]>(`/users?role=${encodeURIComponent(role)}`);
}

export async function loginUser(data: LoginData): Promise<User> {
  const users = await apiGet<User[]>(`/users?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`);
  if (!users || users.length === 0) {
    throw new Error('Invalid email or password');
  }
  return users[0];
}

export async function createUser(data: RegisterData): Promise<User> {
  const user: User = {
    id: `user-${Date.now()}`,
    firstName: data.firstName,
    lastName: data.lastName,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
    role: data.role,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  return apiPost<User>('/users', user);
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<User> {
  return apiPatch<User>(`/users/${userId}`, updates);
}

export async function updateUserStatus(userId: string, status: UserStatus): Promise<User> {
  return apiPatch<User>(`/users/${userId}`, { status });
}













