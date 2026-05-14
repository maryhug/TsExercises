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
    <div className="day-02__grid" style={{ marginBottom: '1rem' }}>
      <div className="day-02__field">
        <span className="day-02__field-label">Selecciona un Rol Simulable</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-h)', fontSize: '0.9rem', outline: 'none' }}
        >
          <option value="student">Estudiante</option>
          <option value="admin">Administrador</option>
          <option value="guest">Invitado</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button
          className="day-02__button day-02__button--primary"
          onClick={handleLogin}
          disabled={isLoading}
          style={{ width: '100%', height: '42px' }}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </div>

      {error && <div className="day-02__alert day-02__alert--warning" style={{ gridColumn: '1 / -1' }}>{error}</div>}
    </div>
  );
};
