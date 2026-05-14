import { useState, useEffect } from 'react';

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [act, setAct] = useState(false);

  useEffect(() => {
    if (!act) return;
    const id = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [act]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">6. Temporizador con pausa y reinicio</h3>
      <p style={{ fontSize: '2rem', fontFamily: 'monospace' }}>{sec} seg</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="day-02__button day-02__button--primary" onClick={() => setAct(true)}>Iniciar</button>
        <button className="day-02__button" onClick={() => setAct(false)}>Pausar</button>
        <button className="day-02__button" onClick={() => { setAct(false); setSec(0); }}>Reiniciar</button>
      </div>
    </div>
  );
}
