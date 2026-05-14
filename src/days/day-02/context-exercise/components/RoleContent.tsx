import React from 'react';
import { useUser } from '../hooks/useUser';

// Módulo extra que varía dinámicamente de acuerdo al Rol estipulado por el Context
export const RoleContent: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="day-02__alert day-02__alert--info" style={{ marginBottom: '1rem' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Dashboard por Funciones:</h4>
      {user.role === 'admin' && <span>🛡️ <strong>Panel de Administración:</strong> Tienes acceso total para modificar a otros usuarios.</span>}
      {user.role === 'student' && <span>📚 <strong>Panel del Estudiante:</strong> Aquí puedes revisar tus clases y calificaciones.</span>}
      {user.role === 'guest' && <span>👀 <strong>Vista de Invitado:</strong> Estás en modo de lectura, por favor valida un rol entero si requieres más funcionalidades.</span>}
    </div>
  );
};
