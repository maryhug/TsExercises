import { createContext, useContext, useState } from 'react';

interface AuthState { user: string | null; logIn: (name: string) => void; logOut: () => void; }
const AuthCtx = createContext<AuthState | null>(null);

function LoginScreen() {
  const auth = useContext(AuthCtx);
  const [name, setName] = useState('');
  if (auth?.user) return null;
  return <div style={{ display: 'flex', gap: '0.5rem' }}>
    <input className="day-02__field" placeholder="Escribe tu nombre..." value={name} onChange={e=>setName(e.target.value)} />
    <button className="day-02__button day-02__button--primary" onClick={() => name.trim() && auth?.logIn(name)}>Iniciar sesión</button>
  </div>;
}

function ProfileScreen() {
  const auth = useContext(AuthCtx);
  if (!auth?.user) return null;
  return <div>
    <p>Bienvenido al perfil, <strong>{auth.user}</strong>.</p>
    <button className="day-02__button" style={{ marginTop: '0.5rem' }} onClick={auth.logOut}>Cerrar sesión</button>
  </div>;
}

export default function AuthContextApp() {
  const [user, setUser] = useState<string | null>(null);
  return (
    <AuthCtx.Provider value={{ user, logIn: setUser, logOut: () => setUser(null) }}>
      <div className="day-02__exercise">
        <h3 className="day-02__exercise-title">12. Contexto Auth</h3>
        <LoginScreen />
        <ProfileScreen />
      </div>
    </AuthCtx.Provider>
  );
}
