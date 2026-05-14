import { useState } from 'react';
import type { ChangeEvent } from 'react';

/**
 * Custom hook para manejar el estado de formularios genéricos.
 * Evita tener que crear una función `handleChange` o un estado para cada input, 
 * centralizando toda la lógica.
 */
export function useForm<T>(initialValues: T) {
  // Estado que guarda todos los valores del formulario
  const [values, setValues] = useState<T>(initialValues);
  // Estado que guarda posibles errores de validación por cada campo
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  // Manejador genérico para asociar al 'onChange' de los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    
    // Si el campo modificado tenía un error previo, lo borramos (ya que el usuario está escribiendo)
    if (errors[e.target.name as keyof T]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined
      });
    }
  };

  // Función para resetear el formulario a su estado original
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Función básica para verificar que todos los datos no estén vacíos.
  // Es ideal ejecutarla antes del envío final (submit).
  const validateRequired = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    for (const key in values) {
      if (!values[key] || String(values[key]).trim() === '') {
        newErrors[key] = 'Este campo es obligatorio';
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  return { values, errors, handleChange, reset, validateRequired, setValues };
}
