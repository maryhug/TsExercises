import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostList() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts?_limit=2');
  const { data, loading, error } = useFetch<Post[]>(url);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">14. Custom Fetch Hook</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button className="day-02__button" onClick={() => setUrl('https://jsonplaceholder.typicode.com/posts?_limit=2')}>Posts 1-2</button>
        <button className="day-02__button" onClick={() => setUrl('https://jsonplaceholder.typicode.com/posts?_limit=4')}>Posts 1-4</button>
      </div>
      {loading && <p>Cargando posts...</p>}
      {error && <p>Error al cargar</p>}
      {!loading && !error && (
        <ul style={{ paddingLeft: '1.5rem' }}>
          {data?.map(p => <li key={p.id}><strong>{p.title}</strong></li>)}
        </ul>
      )}
    </div>
  );
}
