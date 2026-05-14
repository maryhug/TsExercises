import { useState, useEffect, useRef } from 'react';

export default function FocusInput() {
  const ref = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState('');

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">9. Input con foco automático</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input className="day-02__field" ref={ref} value={val} onChange={e=>setVal(e.target.value)} placeholder="Escribe algo..." />
        <button className="day-02__button day-02__button--primary" onClick={() => ref.current?.focus()}>Enfocar buscador</button>
      </div>
      <p>Texto actual: {val}</p>
    </div>
  );
}
