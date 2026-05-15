import { useState } from 'react';

// export default function -> Cuando el archivo representa un solo componente o clase principal, se puede renombrar
// export function -> Cuando tienes múltiples funciones o helpers en un mismo archivo, como un utils.ts o hooks.ts

// Math.max devuelve el número mayor de los argumentos numéricos dados

export default function SmartCounter() {
    //Tipado
  const [count, setCount] = useState<number>(0);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">
          1. Contador Inteligente
      </h3>
      <p>
          Valor: {count}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="day-02__button day-02__button--primary" onClick={() => setCount(counter => counter + 1)}>
            Incrementar
        </button>
        <button className="day-02__button" onClick={() => setCount(counter => Math.max(0, counter - 1))}>
            Disminuir
        </button>
        <button className="day-02__button" onClick={() => setCount(0)}>
            Reiniciar
        </button>
      </div>
      {count >= 10 && <p className="day-02__alert day-02__alert--warning" style={{marginTop: '1rem'}}>
          Has llegado al límite recomendado
      </p>}
    </div>
  );
}
