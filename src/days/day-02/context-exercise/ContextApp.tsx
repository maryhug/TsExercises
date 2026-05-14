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
      <div style={{ fontFamily: 'sans-serif', border: '1px solid #ccc', margin: '20px auto', padding: '20px', borderRadius: '8px' }}>
        <h2>Context API & Custom Hooks</h2>
        <p style={{ color: '#666' }}>Ejercicio integrador de estado global intermedio</p>

        <Navbar />
        <LoginButton />
        <UserProfile />
        <RoleContent />

        <ProtectedView>
          <p>Esta es información que solo pueden ver las personas que ya rellenaron o traen un inicio de sesión persistido.</p>
        </ProtectedView>

        <LogoutButton />
      </div>
    </UserProvider>
  );
};
