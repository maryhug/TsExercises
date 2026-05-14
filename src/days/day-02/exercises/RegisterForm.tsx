import { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = form.nombre.trim() !== '' && form.email.includes('@') && form.password.length >= 8 && form.password === form.confirm;

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">2. Formulario de registro controlado</h3>
      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input className="day-02__field" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input className="day-02__field" name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
        <input className="day-02__field" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <input className="day-02__field" name="confirm" type="password" placeholder="Confirmar contraseña" value={form.confirm} onChange={handleChange} />
        <button className="day-02__button day-02__button--primary" disabled={!isValid} type="submit">Enviar</button>
      </form>
      {submitted && <div className="day-02__alert day-02__alert--info" style={{ marginTop: '1rem' }}>Resumen: {form.nombre} - {form.email}</div>}
    </div>
  );
}
