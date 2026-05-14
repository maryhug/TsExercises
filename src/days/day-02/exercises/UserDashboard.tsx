import { useState, useEffect, useMemo } from 'react';

interface User { id: string; name: string; email: string; role: string; active: boolean; }

const INITIAL = [
  { id: '1', name: 'Ana Pérez', email: 'ana@email.com', role: 'admin', active: true },
  { id: '2', name: 'Carlos Díaz', email: 'carlos@email.com', role: 'user', active: true },
  { id: '3', name: 'Luis Gómez', email: 'luis@email.com', role: 'editor', active: false }
];

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [roleF, setRoleF] = useState('');
  const [activeF, setActiveF] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dash-users');
    if (saved) setUsers(JSON.parse(saved));
    else setUsers(INITIAL);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if(loaded) localStorage.setItem('dash-users', JSON.stringify(users));
  }, [users, loaded]);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matN = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matR = roleF ? u.role === roleF : true;
      const matA = activeF === 'active' ? u.active : activeF === 'inactive' ? !u.active : true;
      return matN && matR && matA;
    });
  }, [users, search, roleF, activeF]);

  const stats = useMemo(() => ({
    total: users.length,
    act: users.filter(u=>u.active).length,
    ina: users.filter(u=>!u.active).length,
    adm: users.filter(u=>u.role==='admin').length
  }), [users]);

  const toggleA = (id: string) => setUsers(prev => prev.map(u => u.id === id ? {...u, active: !u.active} : u));
  const del = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">15. Dashboard integrador de usuarios</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: 'var(--bg)', borderRadius: '8px' }}>
        <div>Total: {stats.total}</div><div>Activos: {stats.act}</div><div>Inactivos: {stats.ina}</div><div>Admins: {stats.adm}</div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input className="day-02__field" placeholder="Buscar nombre/correo..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="day-02__field" value={roleF} onChange={e=>setRoleF(e.target.value)}><option value="">Roles</option><option value="admin">Admin</option><option value="user">User</option><option value="editor">Editor</option></select>
        <select className="day-02__field" value={activeF} onChange={e=>setActiveF(e.target.value)}><option value="">Estado</option><option value="active">Activo</option><option value="inactive">Inactivo</option></select>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(u => (
          <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>
            <div><strong>{u.name}</strong> ({u.email}) - {u.role} - {u.active?'Activo':'Inactivo'}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="day-02__button" style={{ padding: '2px 8px' }} onClick={()=>toggleA(u.id)}>{u.active?'Desactivar':'Activar'}</button>
              <button className="day-02__button" style={{ padding: '2px 8px', color: 'red' }} onClick={()=>del(u.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
