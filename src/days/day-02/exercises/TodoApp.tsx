import { useState, useEffect } from 'react';

interface Task { id: string; title: string; completed: boolean; }

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'ALL'|'PENDING'|'COMPLETED'>('ALL');

  useEffect(() => {
    const saved = localStorage.getItem('react-todos');
    if (saved) setTasks(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('react-todos', JSON.stringify(tasks));
  }, [tasks, loaded]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), title, completed: false }]);
    setTitle('');
  };

  const filtered = tasks.filter(t => filter === 'ALL' ? true : filter === 'PENDING' ? !t.completed : t.completed);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">4. Lista de tareas con persistencia</h3>
      <form onSubmit={add} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input className="day-02__field" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nueva tarea..." />
        <button className="day-02__button day-02__button--primary" type="submit">Agregar</button>
      </form>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className="day-02__button" onClick={() => setFilter('ALL')}>Todas</button>
        <button className="day-02__button" onClick={() => setFilter('PENDING')}>Pendientes</button>
        <button className="day-02__button" onClick={() => setFilter('COMPLETED')}>Completadas</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(t => (
          <li key={t.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '.5rem' }}>
            <input type="checkbox" checked={t.completed} onChange={() => setTasks(prev => prev.map(pt => pt.id === t.id ? { ...pt, completed: !pt.completed } : pt))} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none', flex: 1 }}>{t.title}</span>
            <button className="day-02__button" style={{ padding: '2px 8px' }} onClick={() => setTasks(prev => prev.filter(pt => pt.id !== t.id))}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
