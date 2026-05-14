import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

import './App.css'

type FieldSetter = Dispatch<SetStateAction<string>>

interface FieldConfig {
  key: string
  label: string
  value: string
  setValue: FieldSetter
}

function Day01App() {
  const [counter, setCounter] = useState(0)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [edad, setEdad] = useState('')
  const [escuela, setEscuela] = useState('')
  const [carrera, setCarrera] = useState('')

  const fields: FieldConfig[] = [
    { key: 'nombre', label: 'Nombre', value: nombre, setValue: setNombre },
    { key: 'apellido', label: 'Apellido', value: apellido, setValue: setApellido },
    { key: 'ciudad', label: 'Ciudad', value: ciudad, setValue: setCiudad },
    { key: 'edad', label: 'Edad', value: edad, setValue: setEdad },
    { key: 'escuela', label: 'Escuela', value: escuela, setValue: setEscuela },
    { key: 'carrera', label: 'Carrera', value: carrera, setValue: setCarrera },
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement>, setValue: FieldSetter) => {
    setValue(event.target.value)
  }

  return (
    <section className="day-01">
      <h2 className="day-01__title">Día 01 — Contador y formulario</h2>

      <button
        type="button"
        className="day-01__counter"
        onClick={() => setCounter((v) => v + 1)}
      >
        Contador: <strong>{counter}</strong>
      </button>

      <hr className="day-01__divider" />

      <div className="day-01__grid">
        {fields.map((field) => (
          <label key={field.key} className="day-01__field">
            <span className="day-01__field-label">{field.label}</span>
            <input
              type="text"
              value={field.value}
              onChange={(event) => handleChange(event, field.setValue)}
            />
            <small className="day-01__value">{field.value || '—'}</small>
          </label>
        ))}
      </div>
    </section>
  )
}

export default Day01App
