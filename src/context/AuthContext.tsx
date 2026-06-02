import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, UserRole, Order } from '../types';
import { users as initialUsers, orders as initialOrders } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  orders: Order[];
  login: (data: LoginData) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  getDashboardRoute: (role: UserRole) => string;
  getOrdersForCustomer: (customerId: string) => Order[];
  updateUserStatus :(
    userId : string,
    status : 'active' | 'inactive' | 'blocked'
  ) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });
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

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
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

  return (
 <AuthContext.Provider
  value={{
    currentUser,
    isAuthenticated,
    users,
    orders,
    login,
    register,
    logout,
    getDashboardRoute,
    getOrdersForCustomer,
    updateUserStatus,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}






