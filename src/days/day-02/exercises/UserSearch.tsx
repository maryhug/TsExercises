import { useState, useEffect } from 'react';

const DB = [
  { id: 1, name: 'Ana', role: 'Frontend' },
  { id: 2, name: 'Juan', role: 'Backend' },
  { id: 3, name: 'Pedro', role: 'Frontend' },
  { id: 4, name: 'Maria', role: 'DevOps' }
];

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');

  const filtered = DB.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) &&
    (role ? u.role === role : true)
  );

  useEffect(() => {
    document.title = `${filtered.length} usuarios encontrados`;
  }, [filtered.length]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">3. Buscador de usuarios</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input className="day-02__field" placeholder="Buscar por nombre..." value={query} onChange={e => setQuery(e.target.value)} />
        <select className="day-02__field" value={role} onChange={e => setRole(e.target.value)}>
          <option value="">Todos los roles</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <p>No hay resultados</p>
      ) : (
        <ul style={{ paddingLeft: '1.5rem' }}>{filtered.map(u => <li key={u.id}>{u.name} - {u.role}</li>)}</ul>
      )}
    </div>
  );
}
