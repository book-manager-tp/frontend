import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authApi } from '@/lib/api';

export const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token de verificación no encontrado');
        return;
      }

      try {
        const response = await authApi.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email verificado exitosamente');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Error al verificar el email');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '100px auto', 
      padding: '20px', 
      textAlign: 'center' 
    }}>
      {status === 'loading' && (
        <div>
          <h2>Verificando email...</h2>
          <p>Por favor espera mientras verificamos tu correo electrónico.</p>
        </div>
      )}
      
      {status === 'success' && (
        <div>
          <h2 style={{ color: 'green' }}>✓ Verificación exitosa</h2>
          <p>{message}</p>
          <p>Serás redirigido al inicio de sesión en unos segundos...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div>
          <h2 style={{ color: 'red' }}>✗ Error de verificación</h2>
          <p>{message}</p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Ir al inicio de sesión
          </button>
        </div>
      )}
    </div>
  );
};