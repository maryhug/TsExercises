import React from 'react';
import { useUser } from '../hooks/useUser';

// Botón que elimina globalmente la sesión si el usuario está activo
export const LogoutButton: React.FC = () => {
  const { logout, user } = useUser();

  if (!user) return null;

  return (
    <button
      onClick={logout}
      style={{
        background: '#dc3545',
        color: 'white',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '16px'
      }}
    >
      Cerrar Sesión
    </button>
  );
};

