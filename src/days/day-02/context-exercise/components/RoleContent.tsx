import React from 'react';
import { useUser } from '../hooks/useUser';

// Módulo extra que varía dinámicamente de acuerdo al Rol estipulado por el Context
export const RoleContent: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div style={{ padding: '16px', borderRadius: '8px', marginBottom: '16px', background: '#e3f2fd', color: '#01579b' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Contenido de Rol Actual</h3>
      {user.role === 'admin' && <p>🛡️ <strong>Panel de Administración:</strong> Tienes acceso total para modificar a otros usuarios.</p>}
      {user.role === 'student' && <p>📚 <strong>Panel del Estudiante:</strong> Aquí puedes revisar tus clases y calificaciones.</p>}
      {user.role === 'guest' && <p>👀 <strong>Vista de Invitado:</strong> Estás en modo de lectura, por favor valida un rol entero si requieres más funcionalidades.</p>}
    </div>
  );
};

