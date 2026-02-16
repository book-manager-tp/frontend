import { useAuth } from '@/contexts/AuthContext';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/styles/Login.css';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/books');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      
      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label className="login-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div className="login-form-group-large">
          <label className="login-label">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-submit-btn"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        <p className="login-footer">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="login-register-link">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};
