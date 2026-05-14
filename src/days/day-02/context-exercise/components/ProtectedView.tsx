import React from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../hooks/useUser';

// Extra: Un wrapper que deniega el renderizado de un componente a menos que exista inicio de sesión
export const ProtectedView: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <div style={{ background: '#ffebee', color: '#c62828', padding: '16px', borderRadius: '8px' }}>
        ⛔ Debes iniciar sesión para ver este contenido.
      </div>
    );
  }

  return (
    <div style={{ border: '2px dashed #4caf50', padding: '16px', borderRadius: '8px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>🔒 Zona Protegida (Secretos del Proyecto)</h4>
      {children}
    </div>
  );
};
