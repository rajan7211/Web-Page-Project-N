import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginData, RegisterData, UserRole, Order } from '../types';
import { users as initialUsers, orders as initialOrders } from '../data/mockData';

export interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  orders: Order[];
  originalUser: User | null;
  isImpersonating: boolean;
  login: (data: LoginData) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  getDashboardRoute: (role: UserRole) => string;
  getOrdersForCustomer: (customerId: string) => Order[];
  updateUserStatus: (userId: string, status: 'active' | 'inactive' | 'blocked') => void;
  updateUserProfile: (userId: string, updates: Partial<User>) => void;
  impersonateUser: (userId: string) => void;
  stopImpersonating: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      users: initialUsers,
      orders: initialOrders,
      originalUser: null,
      isImpersonating: false,

      login: async (data) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const user = get().users.find(
              (u) => u.email === data.email && u.password === data.password
            );

            if (!user) {
              reject(new Error('Invalid email or password'));
              return;
            }

            const { password, ...userWithoutPassword } = user;
            set({ currentUser: userWithoutPassword as User, isAuthenticated: true });
            resolve(userWithoutPassword as User);
          }, 500);
        });
      },

      register: async (data) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const exists = get().users.some((u) => u.email === data.email);
            if (exists) {
              reject(new Error('Email already registered'));
              return;
            }

            const newUser: User = {
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

            set((state) => ({ users: [...state.users, newUser] }));

            if (data.role === 'Customer') {
              const { password, ...userWithoutPassword } = newUser;
              set({ currentUser: userWithoutPassword as User, isAuthenticated: true });
            }

            resolve(newUser);
          }, 500);
        });
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, originalUser: null, isImpersonating: false });
      },

      getDashboardRoute: (role) => {
        if (role === 'Super Admin') return '/super-admin';
        if (role === 'Admin') return '/admin';
        return '/customer';
      },

      getOrdersForCustomer: (customerId) => {
        return get().orders.filter((order) => order.customerId === customerId);
      },

      updateUserStatus: (userId, status) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  status,
                }
              : user
          ),
        }));
      },

      updateUserProfile: (userId, updates) => {
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === userId ? { ...user, ...updates } : user
          );

          const currentUser =
            state.currentUser?.id === userId
              ? { ...state.currentUser, ...updates }
              : state.currentUser;

          return {
            users: updatedUsers,
            currentUser,
          };
        });
      },

      impersonateUser: (userId) => {
        const state = get();
        if (state.currentUser?.role !== 'Super Admin') return;

        const userToImpersonate = state.users.find((u) => u.id === userId);
        if (!userToImpersonate) return;

        const { password, ...userWithoutPassword } = userToImpersonate;
        set({ originalUser: state.currentUser, currentUser: userWithoutPassword as User, isImpersonating: true });
      },

      stopImpersonating: () => {
        const state = get();
        if (!state.originalUser) return;

        set({ currentUser: state.originalUser, originalUser: null, isImpersonating: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
        originalUser: state.originalUser,
        isImpersonating: state.isImpersonating,
      }),
    }
  )
);





















