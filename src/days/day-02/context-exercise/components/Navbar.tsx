import React from 'react';
import { useUser } from '../hooks/useUser';

// Muestra dinámicamente si el usuario existe o no consumiendo su estado
export const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
      <strong style={{ color: 'var(--text-h)' }}>
          Mi Aplicación (Ext)
      </strong>
      <span style={{ fontSize: '0.9rem', color: user ? 'var(--accent)' : 'var(--text)', fontWeight: 500 }}>
        {user ? `Bienvenido, ${user.name}` : 'No has iniciado sesión'}
      </span>
    </div>
  );
};
