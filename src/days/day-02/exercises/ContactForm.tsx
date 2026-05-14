import { useForm } from '../../../hooks/useForm';

export default function ContactForm() {
  const { values, handleChange, reset, validateRequired, errors } = useForm({ nombre: '', email: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRequired()) { setSent(true); setTimeout(() => { setSent(false); reset(); }, 3000); }
  };

  return (
    <div className="day-02__exercise">
      <h3 className="day-02__exercise-title">13. Hook personalizado para formularios</h3>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <input className="day-02__field" name="nombre" value={values.nombre} onChange={handleChange} placeholder="Nombre" />
          {errors.nombre && <small style={{ color: 'red' }}>{errors.nombre}</small>}
        </div>
        <div>
          <input className="day-02__field" name="email" value={values.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>
        <div>
          <textarea className="day-02__field" name="mensaje" value={values.mensaje} onChange={handleChange} placeholder="Mensaje" />
          {errors.mensaje && <small style={{ color: 'red' }}>{errors.mensaje}</small>}
        </div>
        <div>
          <button className="day-02__button day-02__button--primary" type="button" onClick={reset}>Limpiar</button>
          <button className="day-02__button day-02__button--primary" style={{ marginLeft: '1rem' }} type="submit">Enviar</button>
        </div>
      </form>
      {sent && <div className="day-02__alert day-02__alert--info" style={{ marginTop: '1rem' }}>Enviado: {values.nombre} - {values.email}</div>}
    </div>
  );
}

import { useState } from 'react';
