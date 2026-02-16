import { useAuth } from '@/contexts/AuthContext';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/styles/Register.css';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      setSuccess('Registro exitoso! Revisa tu email para verificar tu cuenta.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Registrarse</h1>
      
      {error && (
        <div className="register-error">
          {error}
        </div>
      )}

      {success && (
        <div className="register-success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label className="register-label">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
        </div>

        <div className="register-form-group-large">
          <label className="register-label">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="register-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="register-submit-btn"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="register-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="register-login-link">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
};
