import React from 'react';
import { useUser } from '../hooks/useUser';

// Muestra dinámicamente si el usuario existe o no consumiendo su estado
export const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav style={{ padding: '15px', background: '#333', color: 'white', borderRadius: '8px', marginBottom: '16px' }}>
      <h2 style={{ margin: '0 0 10px 0' }}>Mi Aplicación (Context Api)</h2>
      <p style={{ margin: 0, fontWeight: 'bold' }}>
        {user ? `Bienvenido, ${user.name}` : 'No has iniciado sesión'}
      </p>
    </nav>
  );
};

