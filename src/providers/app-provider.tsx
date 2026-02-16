import { AuthProvider } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider principal de la aplicacion
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
