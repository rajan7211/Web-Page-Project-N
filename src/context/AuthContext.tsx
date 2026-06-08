import { createContext, ReactNode } from 'react';
import { useAuthStore, type AuthStore } from '../store/useAuthStore';

export const AuthContext = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthStore();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}









