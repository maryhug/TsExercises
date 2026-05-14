import { useReducer, useState } from 'react';

interface Task { id: string; title: string; completed: boolean; }
type Action =
  | { type: 'ADD_TASK'; title: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'EDIT_TASK'; id: string; title: string }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'CLEAR_COMPLETED' };

function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), title: action.title, completed: false }];
    case 'TOGGLE_TASK':
      return state.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t);
    case 'EDIT_TASK':
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t);
    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.id);
    case 'CLEAR_COMPLETED':
      return state.filter(t => !t.completed);
    default:
      return state;
  }
}

export default function TaskReducer() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [val, setVal] = useState('');

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">10. Gestión de tareas con useReducer</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input className="day-02__field" value={val} onChange={e=>setVal(e.target.value)} placeholder="Nueva tarea..." />
        <button className="day-02__button day-02__button--primary" onClick={() => { if(val.trim()){ dispatch({ type: 'ADD_TASK', title: val }); setVal(''); } }}>Agregar</button>
        <button className="day-02__button" onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Limpiar completadas</button>
      </div>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {tasks.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="checkbox" checked={t.completed} onChange={() => dispatch({ type: 'TOGGLE_TASK', id: t.id })} />
            <input className="day-02__field" style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none' }} value={t.title} onChange={e => dispatch({ type: 'EDIT_TASK', id: t.id, title: e.target.value })} />
            <button className="day-02__button" style={{ padding: '4px 8px' }} onClick={() => dispatch({ type: 'DELETE_TASK', id: t.id })}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
