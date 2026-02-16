import { useAuth } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import '@/styles/ProtectedRoute.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="protected-route-loading">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
