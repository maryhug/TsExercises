import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    city: string;
  };
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setUsers(data); setLoading(false); })
      .catch(e => { if (e.name !== 'AbortError') { setError(true); setLoading(false); } });
    return () => controller.abort();
  }, []);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">5. Consumo de API con carga y error</h3>
      {loading && <div className="day-02__alert day-02__alert--info">Cargando usuarios...</div>}
      {error && <div className="day-02__alert day-02__alert--warning">Error al cargar usuarios</div>}
      {!loading && !error && (
        <ul style={{ paddingLeft: '1.5rem' }}>
          {users.map(u => (
            <li key={u.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{u.name}</strong> - {u.email} - {u.address?.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
