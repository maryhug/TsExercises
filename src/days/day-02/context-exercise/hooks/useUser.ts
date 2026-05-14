import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import type { UserContextProps } from '../context/UserContext';

// Hook personalizado para abstraer la lógica del contexto
// Extra: Validamos el consumo correcto y evitamos invocar useContext a mano en todas partes
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }

  return context;
};
