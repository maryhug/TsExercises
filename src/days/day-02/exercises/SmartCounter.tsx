import { useState } from 'react';

export default function SmartCounter() {
  const [count, setCount] = useState(0);
  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">1. Contador Inteligente</h3>
      <p>Valor: {count}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="day-02__button day-02__button--primary" onClick={() => setCount(c => c + 1)}>Incrementar</button>
        <button className="day-02__button" onClick={() => setCount(c => Math.max(0, c - 1))}>Disminuir</button>
        <button className="day-02__button" onClick={() => setCount(0)}>Reiniciar</button>
      </div>
      {count >= 10 && <p className="day-02__alert day-02__alert--warning" style={{marginTop: '1rem'}}>Has llegado al límite recomendado</p>}
    </div>
  );
}
