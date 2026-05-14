import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<{ theme: string; toggle: () => void } | null>(null);

function SectionA() {
  const ctx = useContext(ThemeContext);
  return <div style={{ padding: '1rem', border: '1px solid gray' }}>
    <h4>Componente A</h4>
    <button className="day-02__button" onClick={ctx?.toggle}>Cambiar tema</button>
  </div>;
}

function SectionB() {
  const ctx = useContext(ThemeContext);
  return <div style={{ padding: '1rem', border: '1px solid gray' }}>
    <h4>Componente B</h4>
    <p>El tema activo es: <strong>{ctx?.theme}</strong></p>
  </div>;
}

export default function ThemeContextApp() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      <div className="day-02__exercise" style={{ background: theme === 'dark' ? '#222' : 'inherit', color: theme === 'dark' ? '#fff' : 'inherit' }}>
        <h3 className="day-02__exercise-title" style={{ color: theme === 'dark' ? '#fff' : 'inherit' }}>11. Tema con Context</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <SectionA />
          <SectionB />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
