import { useState, useMemo } from 'react';

const DB = [
  { id: 1, name: 'Laptop', category: 'Tecnología', price: 2500, stock: 5 },
  { id: 2, name: 'Mouse', category: 'Tecnología', price: 50, stock: 0 },
  { id: 3, name: 'Silla', category: 'Muebles', price: 300, stock: 2 }
];

export default function ProductFilter() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [sort, setSort] = useState<'ASC'|'DESC'>('ASC');
  const [inStock, setInStock] = useState(false);

  const filtered = useMemo(() => {
    let res = DB.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (cat) res = res.filter(p => p.category === cat);
    if (inStock) res = res.filter(p => p.stock > 0);
    return res.sort((a,b) => sort === 'ASC' ? a.price - b.price : b.price - a.price);
  }, [search, cat, sort, inStock]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">8. Filtro avanzado de productos</h3>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input className="day-02__field" placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="day-02__field" value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Muebles">Muebles</option>
        </select>
        <select className="day-02__field" value={sort} onChange={e=>setSort(e.target.value as 'ASC'|'DESC')}>
          <option value="ASC">Menor a mayor ($)</option>
          <option value="DESC">Mayor a menor ($)</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={inStock} onChange={e=>setInStock(e.target.checked)}/> Solo con stock
        </label>
      </div>
      <p>Mostrando {filtered.length} productos:</p>
      {filtered.length === 0 ? (
        <p>No hay productos disponibles con los filtros seleccionados.</p>
      ) : (
        <ul style={{ paddingLeft: '1.5rem' }}>
          {filtered.map(p => <li key={p.id}>{p.name} - {p.category} | ${p.price} | Stock: {p.stock}</li>)}
        </ul>
      )}
    </div>
  );
}
