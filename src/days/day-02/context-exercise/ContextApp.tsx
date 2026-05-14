import React from 'react';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { LoginButton } from './components/LoginButton';
import { UserProfile } from './components/UserProfile';
import { RoleContent } from './components/RoleContent';
import { ProtectedView } from './components/ProtectedView';
import { LogoutButton } from './components/LogoutButton';

export const ContextApp: React.FC = () => {
  return (
    // Es imperativo encerrar a todos los componentes que usarán "useUser" en el provider
    <UserProvider>
      <article className="day-02__exercise">
        <h3 className="day-02__exercise-title">Context API & Custom Hooks</h3>
        <p className="day-02__exercise-description">Ejercicio integrador independiente de estado global y Manejo de Roles.</p>

        <Navbar />
        <LoginButton />
        <UserProfile />
        <RoleContent />

        <ProtectedView>
          <div className="day-02__alert day-02__alert--info">
             Esta es información que solo pueden ver las personas que ya rellenaron o traen un inicio de sesión persistido.
          </div>
        </ProtectedView>

        <LogoutButton />
      </article>
    </UserProvider>
  );
};
