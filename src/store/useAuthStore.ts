import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginData, RegisterData, UserRole, Order } from '../types';
import {
  fetchUsers,
  loginUser,
  createUser,
  updateUser as updateUserApi,
  updateUserStatus as updateUserStatusApi,
} from '../services/users';
import { fetchAllOrders } from '../services/orders';

export interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  orders: Order[];
  originalUser: User | null;
  isImpersonating: boolean;
  loadInitialData: () => Promise<void>;
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
      users: [],
      orders: [],
      originalUser: null,
      isImpersonating: false,

      loadInitialData: async () => {
        try {
          const [users, orders] = await Promise.all([fetchUsers(), fetchAllOrders()]);
          set({ users, orders });
        } catch (error) {
          console.warn('Failed to load initial data from API', error);
        }
      },

      login: async (data) => {
        const user = await loginUser(data);
        const { password, ...userWithoutPassword } = user;
        set({ currentUser: userWithoutPassword as User, isAuthenticated: true });
        return userWithoutPassword as User;
      },

      register: async (data) => {
        const newUser = await createUser(data);
        set((state) => ({ users: [...state.users, newUser] }));

        if (data.role === 'Customer') {
          const { password, ...userWithoutPassword } = newUser;
          set({ currentUser: userWithoutPassword as User, isAuthenticated: true });
        }

        return newUser;
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
        updateUserStatusApi(userId, status)
          .then((updatedUser) => {
            set((state) => ({
              users: state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              ),
            }));
          })
          .catch((error) => {
            console.warn('Failed to update user status', error);
          });
      },

      updateUserProfile: (userId, updates) => {
        updateUserApi(userId, updates)
          .then((updatedUser) => {
            set((state) => {
              const updatedUsers = state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              );

              const currentUser =
                state.currentUser?.id === updatedUser.id
                  ? { ...state.currentUser, ...updates }
                  : state.currentUser;

              return {
                users: updatedUsers,
                currentUser,
              };
            });
          })
          .catch((error) => {
            console.warn('Failed to update user profile', error);
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
        originalUser: state.originalUser,
        isImpersonating: state.isImpersonating,
      }),
    }
  )
);





















