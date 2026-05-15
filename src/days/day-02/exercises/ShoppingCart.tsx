import { useState, useMemo } from 'react';

// .reduce() es un método de arrays en JavaScript que sirve para convertir una lista en un solo valor.

export default function ShoppingCart() {
  const [cart, setCart] = useState([{ id: 1, name: 'Teclado', price: 120, quantity: 1 }]);

  const totalItems = useMemo(() =>
      cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);
  const totalCost = useMemo(() =>
      cart.reduce((acc, i) => acc + (i.price * i.quantity), 0), [cart]);

  const updateQ = (id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) return { ...i, quantity: Math.max(1, i.quantity + delta) };
      return i;
    }));
  };

  const remove = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">7. Carrito de compras</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {cart.map(i => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--bg)', padding: '0.5rem', borderRadius: '4px' }}>
            <span>{i.name} - ${i.price} (Subtotal: ${i.price * i.quantity})</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className="day-02__button" style={{ padding: '0 8px' }} onClick={() => updateQ(i.id, -1)}>-</button>
              <span>{i.quantity}</span>
              <button className="day-02__button" style={{ padding: '0 8px' }} onClick={() => updateQ(i.id, 1)}>+</button>
              <button className="day-02__button" style={{ padding: '0 8px', color: 'red' }} onClick={() => remove(i.id)}>x</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <p>Cantidad total: <strong>{totalItems}</strong></p>
        <p>Total general: <strong>${totalCost}</strong></p>
      </div>
    </div>
  );
}
