import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Estructura del usuario de acuerdo a los requerimientos y roles extra
export interface User {
  name: string;
  email: string;
  role: 'admin' | 'student' | 'guest';
}

export interface UserContextProps {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Creamos el contexto con valor por defecto null
export const UserContext = createContext<UserContextProps | null>(null);

// Componente Provider: envuelve a sus hijos ofreciendo el Contexto global
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializamos leyendo de localStorage para persistencia
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('authUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sincronizar el estado actual con localStorage (efecto secundario)
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = async (userData: User) => {
    setIsLoading(true);
    setError(null);

    // Simulación del logeo de API, demorando para dar el sentido de isLoading
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        // Validaciones del ejercicio
        if (!userData.email || !userData.name) {
          setError('El nombre y el email son obligatorios');
          return reject(new Error('Validación fallida'));
        }

        setUser(userData);
        resolve();
      }, 1500); // Demora 1.5s
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
