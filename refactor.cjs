const fs = require("fs");
const path = require("path");

const exDir = path.join(process.cwd(), "src/days/day-02/exercises");

const exercises = {
  SmartCounter: `import { useState } from "react";

export default function SmartCounter() {
  // useState nos permite declarar una variable de estado y una función para actualizarla.
  // Aquí inicializamos el contador en 0.
  const [count, setCount] = useState(0);

  // Funciones intermedias para manejar la lógica de estado.
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">1. Contador Inteligente</h3>
      <p className="day-02__exercise-description">
        Uso de <code>useState</code> para incrementar, decrementar y resetear valores.
      </p>
      
      <p>Valor actual: <strong>{count}</strong></p>
      
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button className="day-02__button" onClick={increment}>+ Incrementar</button>
        <button className="day-02__button" onClick={decrement}>- Decrementar</button>
        <button className="day-02__button" onClick={reset}>Reiniciar</button>
      </div>

      {/* Renderizado condicional basado en el estado actual */}
      {count >= 10 && (
        <div className="day-02__alert day-02__alert--warning" style={{ marginTop: "1rem" }}>
          ¡Has llegado al límite recomendado! (10+)
        </div>
      )}
    </div>
  );
}
`,
  RegisterForm: `import { useState } from "react";

export default function RegisterForm() {
  // Aquí agrupamos en un objeto, patrón intermedio para formularios de múltiples campos.
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Actualizamos el estado copiando el objeto anterior (...prev) y sobrescribiendo la llave editada.
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos recarga
    alert(\`Registrado: \${formData.name} (\${formData.email})\`);
  };

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">2. Formulario de Registro</h3>
      <p className="day-02__exercise-description">Manejo de estado agrupado para múltiples campos.</p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="day-02__grid">
          <label className="day-02__field">
            <span className="day-02__field-label">Nombre</span>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label className="day-02__field">
            <span className="day-02__field-label">Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" className="day-02__button day-02__button--primary" style={{ alignSelf: "flex-start" }}>
          Registrar
        </button>
      </form>
    </div>
  );
}
`,
  UserSearch: `import { useState, useEffect } from "react";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  
  // Debouncing iterativo usando useEffect.
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timeoutId = setTimeout(() => {
      const mockDB = ["Ana", "Juan", "Pedro", "Maria", "Mario"];
      setResults(mockDB.filter((u) => u.toLowerCase().includes(query.toLowerCase())));
    }, 500);

    return () => clearTimeout(timeoutId); // Limpia si el query cambia rápido (debounce real).
  }, [query]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">3. Búsqueda de Usuarios</h3>
      <p className="day-02__exercise-description">Debouncing usando <code>useEffect</code> y limpieza de intervals/timeouts.</p>
      
      <label className="day-02__field" style={{ maxWidth: 300 }}>
        <span className="day-02__field-label">Buscar</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>

      {query && (
        <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
          {results.length > 0 ? results.map((r, i) => <li key={i}>{r}</li>) : <li>Sin resultados</li>}
        </ul>
      )}
    </div>
  );
}
`,
  TodoApp: `import { useState, useRef } from "react";

interface Todo { id: number; text: string; done: boolean; }

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  // useRef no dispara re-renders, genial para acceder al DOM real.
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue, done: false }]);
    setInputValue("");
    inputRef.current?.focus(); // Foco automático para UX fluida
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">4. Lista de Tareas</h3>
      <p className="day-02__exercise-description">Manipulación de DOM vía <code>useRef</code> más listas de estado.</p>
      <form onSubmit={addTodo} style={{ display: "flex", gap: "1rem", alignItems: "flex-end", marginBottom: "1rem" }}>
        <label className="day-02__field" style={{ flex: 1 }}>
          <span className="day-02__field-label">Tarea</span>
          <input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </label>
        <button type="submit" className="day-02__button day-02__button--primary">Añadir</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(t => (
          <li key={t.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  UserList: `import { useState, useEffect } from "react";

interface User { id: number; name: string; email: string; }

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  useEffect(() => {
    // Al pasar dependencias vacías [], esto corre exactamente 1 vez al montar.
    const controller = new AbortController();
    
    setStatus("loading");
    fetch("https://jsonplaceholder.typicode.com/users?_limit=3", { signal: controller.signal })
      .then(r => r.json())
      .then(d => { setUsers(d); setStatus("success"); })
      .catch(e => { if (e.name !== "AbortError") setStatus("error"); });

    return () => controller.abort(); // Cleanup para evitar estado en unmount
  }, []);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">5. Fetch de Usuarios</h3>
      <p className="day-02__exercise-description">Efecto on-mount con manejo de promise y señal de aborto.</p>
      {status === "loading" && <div className="day-02__alert day-02__alert--info">Cargando...</div>}
      {status === "error" && <div className="day-02__alert day-02__alert--warning">Error al cargar</div>}
      {status === "success" && (
        <div className="day-02__grid">
          {users.map(u => (
            <div key={u.id} className="day-02__field">
              <strong>{u.name}</strong><small>{u.email}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,
  Timer: `import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Manejo de intervalos atado al montaje y cambios de flag.
  useEffect(() => {
    let intId: ReturnType<typeof setInterval>;
    if (isActive) intId = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(intId); // Nunca olvides limpiar intervalos
  }, [isActive]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">6. Temporizador</h3>
      <p className="day-02__exercise-description">Intervalos sincronizados mediante <code>useEffect</code>.</p>
      <p style={{ fontSize: "2rem", fontFamily: "monospace", margin: "1rem 0" }}>{seconds}s</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button className={\`day-02__button \${isActive ? "day-02__button--warning" : "day-02__button--primary"}\`} onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button className="day-02__button" onClick={() => { setIsActive(false); setSeconds(0); }}>Reset</button>
      </div>
    </div>
  );
}
`,
  ShoppingCart: `import { useState, useMemo } from "react";

export default function ShoppingCart() {
  const [cart, setCart] = useState<{name: string, price: number}[]>([]);
  const products = [{ name: "Teclado", price: 100 }, { name: "Ratón", price: 50 }];

  // useMemo calcula datos derivados automáticamente sin ser otro estado
  const total = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">7. Carrito (useMemo)</h3>
      <p className="day-02__exercise-description">Cálculos automáticos derivados del estado base con <code>useMemo</code>.</p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h4>Catálogo</h4>
          {products.map(p => (
            <div key={p.name}>
              {p.name} - \${p.price} <button className="day-02__button" onClick={() => setCart(prev => [...prev, p])}>+</button>
            </div>
          ))}
        </div>
        <div style={{ border: "1px solid var(--border)", padding: "1rem", borderRadius: "8px" }}>
          <h4>Tu Carrito</h4>
          <ul>{cart.map((c, i) => <li key={i}>{c.name} - \${c.price}</li>)}</ul>
          <strong>Total: \${total}</strong>
        </div>
      </div>
    </div>
  );
}
`,
  ProductFilter: `import { useState, useMemo } from "react";

export default function ProductFilter() {
  const [filter, setFilter] = useState("");
  const all = ["Laptop Acer", "MacBook Pro", "Teclado Keychron", "Mouse Logitech"];

  // useMemo evita refiltrar la lista entera en cada simple renderizado por cambios que no sean al filtro.
  const filtered = useMemo(() => {
    if (!filter) return all;
    return all.filter(p => p.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]); // la dependencia principal

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">8. Filtro</h3>
      <p className="day-02__exercise-description">Filtrado optimizado con <code>useMemo</code>.</p>
      <input className="day-02__field" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filtrar..." />
      <ul style={{ paddingLeft: "1.5rem" }}>
        {filtered.map(f => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
}
`,
  FocusInput: `import { useRef } from "react";

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">9. Foco Secundario</h3>
      <p className="day-02__exercise-description">Referencia manual al DOM.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input ref={inputRef} className="day-02__field" placeholder="Haz clic en forzar..." />
        <button className="day-02__button day-02__button--primary" onClick={() => inputRef.current?.focus()}>Forzar Foco</button>
      </div>
    </div>
  );
}
`,
  TaskReducer: `import { useReducer, useState } from "react";

type Action = { type: "add", text: string } | { type: "del", id: number };
function reducer(state: {id: number, text: string}[], action: Action) {
  switch (action.type) {
    case "add": return [...state, { id: Date.now(), text: action.text }];
    case "del": return state.filter(t => t.id !== action.id);
    default: return state;
  }
}

export default function TaskReducer() {
  // useReducer ayuda si hay una lógica condicional extensa en vez de muchos useState.
  const [tasks, dispatch] = useReducer(reducer, []);
  const [val, setVal] = useState("");

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">10. Tareas (Reductor)</h3>
      <p className="day-02__exercise-description">Lógica de estado robusta externa con <code>useReducer</code>.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input className="day-02__field" value={val} onChange={e => setVal(e.target.value)} />
        <button className="day-02__button day-02__button--primary" onClick={() => { dispatch({ type: "add", text: val }); setVal(""); }}>Add</button>
      </div>
      <ul style={{ paddingLeft: "1.5rem" }}>
        {tasks.map(t => <li key={t.id}>{t.text} <button className="day-02__button" style={{padding: "2px", fontSize: "10px", marginLeft:"1rem"}} onClick={() => dispatch({ type: "del", id: t.id })}>x</button></li>)}
      </ul>
    </div>
  );
}
`,
  ThemeContextApp: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<{ theme: string; toggle: () => void } | null>(null);

function Widget() {
  const ctx = useContext(ThemeContext);
  return <button className="day-02__button" onClick={ctx?.toggle}>Tema: {ctx?.theme}</button>;
}

export default function ThemeContextApp() {
  const [theme, setTheme] = useState("light");
  
  // Proveemos los datos al árbol inferior, solucionando el "prop drilling".
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }}>
      <div className="day-02__exercise" style={{ background: theme === "dark" ? "#222" : "inherit", color: theme === "dark" ? "#fff" : "inherit" }}>
        <h3 className="day-02__exercise-title" style={{ color: theme === "dark" ? "#fff" : "inherit" }}>11. Contexto Global</h3>
        <p className="day-02__exercise-description" style={{ color: theme === "dark" ? "#ccc" : "inherit" }}>Patrón Provider usando Context API.</p>
        <Widget />
      </div>
    </ThemeContext.Provider>
  );
}
`,
  AuthContextApp: `import { createContext, useContext, useState } from "react";

const AuthCtx = createContext<{ user: string | null; logIn: () => void; logOut: () => void } | null>(null);

function Btn() {
  const auth = useContext(AuthCtx);
  return auth?.user ? 
    <button className="day-02__button" onClick={auth.logOut}>Logout {auth.user}</button> : 
    <button className="day-02__button day-02__button--primary" onClick={auth?.logIn}>Login</button>;
}

export default function AuthContextApp() {
  const [user, setUser] = useState<string | null>(null);
  return (
    <AuthCtx.Provider value={{ user, logIn: () => setUser("Estudiante"), logOut: () => setUser(null) }}>
      <div className="day-02__exercise">
        <h3 className="day-02__exercise-title">12. Contexto Auth</h3>
        <p className="day-02__exercise-description">Señal de sesión global simple.</p>
        <Btn />
      </div>
    </AuthCtx.Provider>
  );
}
`,
  ContactForm: `import { useForm } from "../../hooks/useForm";

export default function ContactForm() {
  // Reutilización perfecta con hooks personalizados.
  const { values, handleChange, reset } = useForm({ msj: "" });

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">13. Custom Form Hook</h3>
      <p className="day-02__exercise-description">Extracción de lógica de formulario en hook.</p>
      <form onSubmit={(e) => { e.preventDefault(); alert(values.msj); reset(); }} style={{ display: "flex", gap: "1rem" }}>
        <input className="day-02__field" name="msj" value={values.msj} onChange={handleChange} />
        <button className="day-02__button day-02__button--primary" type="submit">Send</button>
      </form>
    </div>
  );
}
`,
  PostList: `import { useFetch } from "../../hooks/useFetch";

export default function PostList() {
  // Encapsulación de fetch para no repetir código de isLoading o manejo de errores.
  const { data, loading, error } = useFetch<any[]>("https://jsonplaceholder.typicode.com/posts?_limit=2");
  
  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">14. Custom Fetch Hook</h3>
      <p className="day-02__exercise-description">Estado de red globalizado.</p>
      {loading ? <p>Cargando posts...</p> : error ? <p>Error</p> : (
        <ul style={{ paddingLeft: "1.5rem" }}>
          {data?.map(p => <li key={p.id}>{p.title}</li>)}
        </ul>
      )}
    </div>
  );
}
`,
  UserDashboard: `import { useState, useMemo } from "react";

export default function UserDashboard() {
  const [filter, setFilter] = useState("");
  const users = [{id: 1, name: "Admin Alpha", role: "A"}, {id: 2, name: "User Beta", role: "U"}];

  // Integración básica general.
  const filtered = useMemo(() => users.filter(u => u.name.toLowerCase().includes(filter.toLowerCase())), [users, filter]);

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">15. Proyecto Integrador</h3>
      <p className="day-02__exercise-description">Integración de hooks combinados en mini pane.</p>
      <input className="day-02__field" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Busca..." />
      <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
        {filtered.map(u => <li key={u.id}><b>{u.name}</b> [{u.role}]</li>)}
      </ul>
    </div>
  );
}
`};

for (const [name, content] of Object.entries(exercises)) {
  fs.writeFileSync(path.join(exDir, name + ".tsx"), content);
}
console.log("Refactored via node!");

