import React from 'react';
import { useUser } from '../hooks/useUser';

// Muestra perfil del context centralizado
export const UserProfile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Perfil de Usuario</h3>
      <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {user.name}</p>
      <p style={{ margin: '5px 0' }}><strong>Email:</strong> {user.email}</p>
      <p style={{ margin: '5px 0' }}><strong>Rol:</strong> {user.role}</p>
    </div>
  );
};

