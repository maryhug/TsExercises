import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';

// Simula el ingreso y el estado de error o de carga
export const LoginButton: React.FC = () => {
  const { user, login, isLoading, error } = useUser();
  const [role, setRole] = useState<'admin' | 'student' | 'guest'>('student');

  // Si ya estamos autenticados, se oculta el logeo
  if (user) return null;

  const handleLogin = async () => {
    try {
      await login({
        name: 'Ana Pérez',
        email: 'ana@example.com',
        role: role
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ margin: '16px 0', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Simular Acceso</h3>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="student">Estudiante</option>
          <option value="admin">Administrador</option>
          <option value="guest">Invitado</option>
        </select>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
    </div>
  );
};

