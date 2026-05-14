import React from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../hooks/useUser';

// Extra: Un wrapper que deniega el renderizado de un componente a menos que exista inicio de sesión
export const ProtectedView: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="day-02__alert day-02__alert--warning">
        ⛔ Debes iniciar sesión para ver este contenido protegido.
      </div>
    );
  }

  return (
    <div style={{ border: '1px dashed var(--accent)', padding: '16px', borderRadius: '8px', background: 'var(--bg)' }}>
      <div className="day-02__field-label" style={{ marginBottom: '8px', color: 'var(--accent)' }}>🔒 Zona Protegida (Secretos del Proyecto)</div>
      {children}
    </div>
  );
};
