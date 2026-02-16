import { useAuth } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/styles/Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        <nav className="layout-nav">
          <div className="layout-nav-links">
            <Link to="/" className="layout-logo">
              BookManager
            </Link>
            <Link to="/books" className="layout-nav-link">
              Todos los Libros
            </Link>
            <Link to={isAuthenticated ? "/my-books" : "/login"} className="layout-nav-link">
              Mis Libros
            </Link>
            <Link to={isAuthenticated ? "/books/new" : "/login"} className="layout-nav-link">
              Agregar Libro
            </Link>
          </div>
          
          <div className="layout-nav-actions">
            {isAuthenticated ? (
              <>
                <span className="layout-user-greeting">
                  Hola, {user?.name}
                </span>
                <button onClick={handleLogout} className="layout-logout-btn">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="layout-login-btn">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="layout-register-btn">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>&copy; 2026 BookManager - Sistema de Gestión de Libros</p>
      </footer>
    </div>
  );
};
