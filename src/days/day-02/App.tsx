import './App.css';
import SmartCounter from './exercises/SmartCounter';
import RegisterForm from './exercises/RegisterForm';
import UserSearch from './exercises/UserSearch';
import TodoApp from './exercises/TodoApp';
import UserList from './exercises/UserList';
import Timer from './exercises/Timer';
import ShoppingCart from './exercises/ShoppingCart';
import ProductFilter from './exercises/ProductFilter';
import FocusInput from './exercises/FocusInput';
import TaskReducer from './exercises/TaskReducer';
import ThemeContextApp from './exercises/ThemeContextApp';
import AuthContextApp from './exercises/AuthContextApp';
import ContactForm from './exercises/ContactForm';
import PostList from './exercises/PostList';
import UserDashboard from './exercises/UserDashboard';
import { ContextApp } from './context-exercise/ContextApp';

export default function Day02App() {
  return (
    <section className="day-02">
      <header className="day-02__header">
        <p className="day-02__subtitle">Día 02 — Práctica</p>
        <h2 className="day-02__title">React Hooks (Nivel Intermedio)</h2>
        <p>15 ejercicios progresivos para dominar los Hooks de React, con código comentado, modular y estructurado visualmente.</p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SmartCounter />
        <RegisterForm />
        <UserSearch />
        <TodoApp />
        <UserList />
        <Timer />
        <ShoppingCart />
        <ProductFilter />
        <FocusInput />
        <TaskReducer />
        <ThemeContextApp />
        <AuthContextApp />
        <ContactForm />
        <PostList />
        <UserDashboard />
        
        <div style={{ marginTop: '3rem', borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Ejercicio Adicional: Context API y Roles</h3>
            <ContextApp />
        </div>
      </div>
    </section>
  );
}
