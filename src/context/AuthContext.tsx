import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, UserRole, Order } from '../types';
import { users as initialUsers, orders as initialOrders } from '../data/mockData';

interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [originalUser, setOriginalUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('originalUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const [orders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('currentUser');
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, [currentUser]);

  useEffect(() => {
    if (originalUser) {
      localStorage.setItem('originalUser', JSON.stringify(originalUser));
    } else {
      localStorage.removeItem('originalUser');
    }
  }, [originalUser]);

  const login = async (data: LoginData): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === data.email && u.password === data.password
        );

        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword as User);
        setIsAuthenticated(true);
        resolve(userWithoutPassword as User);
      }, 500);
    });
  };

  const register = async (data: RegisterData): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = users.some((u) => u.email === data.email);
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

        setUsers([...users, newUser]);

        if (data.role === 'Customer') {
          const { password, ...userWithoutPassword } = newUser;
          setCurrentUser(userWithoutPassword as User);
          setIsAuthenticated(true);
        }

        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getDashboardRoute = (role: UserRole): string => {
    if (role === 'Super Admin') return '/super-admin';
    if (role === 'Admin') return '/admin';
    return '/customer';
  };

  const getOrdersForCustomer = (customerId: string): Order[] => {
    return orders.filter((order) => order.customerId === customerId);
  };

  const updateUserStatus = (
    userId: string,
    status: 'active' | 'inactive' | 'blocked'
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status,
            }
          : user
      )
    );
  };


  const updateUserProfile = (userId: string, updates: Partial<User>) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      );

      // Update current user if it's the same user
      if (currentUser?.id === userId) {
        const updatedCurrentUser = { ...currentUser, ...updates };
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
      }

      return updatedUsers;
    });
  };

  const impersonateUser = (userId: string) => {
    if (currentUser?.role !== 'Super Admin') return;

    const userToImpersonate = users.find((u) => u.id === userId);
    if (!userToImpersonate) return;

    const { password, ...userWithoutPassword } = userToImpersonate;
    setOriginalUser(currentUser);
    setCurrentUser(userWithoutPassword as User);
  };

  const stopImpersonating = () => {
    if (originalUser) {
      setCurrentUser(originalUser);
      setOriginalUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        users,
        orders,
        originalUser,
        isImpersonating: !!originalUser,
        login,
        register,
        logout,
        getDashboardRoute,
        getOrdersForCustomer,
        updateUserStatus,
        updateUserProfile, 
        impersonateUser,
        stopImpersonating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}









