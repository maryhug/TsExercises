import React from 'react';
import { useUser } from '../hooks/useUser';

// Botón que elimina globalmente la sesión si el usuario está activo
export const LogoutButton: React.FC = () => {
  const { logout, user } = useUser();

  if (!user) return null;

  return (
    <button
      className="day-02__button"
      onClick={logout}
      style={{
        marginTop: '1rem',
        width: '100%',
        color: '#dc3545',
        borderColor: '#f5c6cb',
        background: '#f8d7da'
      }}
    >
      Cerrar Sesión
    </button>
  );
};
