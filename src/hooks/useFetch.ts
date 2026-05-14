import { useState, useEffect } from 'react';

/**
 * Custom hook para realizar peticiones HTTP (GET) de forma genérica.
 * Maneja automáticamente los estados de "cargando" y "error", así como
 * la limpieza si el componente se desmonta antes de terminar la petición.
 */
export function useFetch<T>(url: string) {
  // Almacenará la respuesta en formato JSON (tipada como T)
  const [data, setData] = useState<T | null>(null);
  // Estado para mostrar algún "spinner" en la UI
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para mostrar mensajes de error al usuario
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Variable de control para evitar actualizar el estado si el componente ya no existe en pantalla
    let isMounted = true;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al consumir la API');
        }
        return response.json();
      })
      .then(jsonData => {
        // Solo actualizamos el estado si el componente sigue activo
        if (isMounted) {
          setData(jsonData);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          setLoading(false);
        }
      });

    // Cleanup function: Se ejecuta si el componente se desmonta o la URL cambia.
    return () => {
      isMounted = false;
    };
  }, [url]); // Dependencia: si pasamos otra URL, se vuelve a ejecutar.

  return { data, loading, error };
}
