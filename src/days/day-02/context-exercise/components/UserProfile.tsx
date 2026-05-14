import React from 'react';
import { useUser } from '../hooks/useUser';

// Muestra perfil del context centralizado
export const UserProfile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="day-02__field" style={{ marginBottom: '1rem', background: 'var(--bg-card)' }}>
      <span className="day-02__field-label">Información Activa</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: 'var(--text)' }}>
        <p style={{ margin: 0 }}><strong>Nombre:</strong> {user.name}</p>
        <p style={{ margin: 0 }}><strong>Email:</strong> {user.email}</p>
        <p style={{ margin: 0 }}><strong>Rol activo:</strong> {user.role}</p>
      </div>
    </div>
  );
};

