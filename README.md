# Prácticas de React y Vite - Clases

Este proyecto es un entorno de aprendizaje continuo estructurado por días, diseñado para practicar y dominar los conceptos fundamentales y avanzados de React (especialmente los React Hooks).

## 🚀 Cómo correr el proyecto

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu computadora.

1. Abre tu terminal.
2. Navega a la carpeta del proyecto (si no estás en ella).
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre tu navegador en la URL que indique la terminal (típicamente `http://localhost:5173/`).

## 📁 Estructura del Proyecto

El proyecto está diseñado para escalar de forma modular separando las prácticas diarias.

```txt
clases-ramiro/
├── src/
│   ├── App.tsx             # Hub principal (Navegación entre los días)
│   ├── dayRegistry.ts      # Registro dinámico de los días activos
│   ├── days/               # Módulos separados por día
│   │   ├── day-01/         # Prácticas iniciales del Día 1
│   │   └── day-02/         # Resolución guiada de los 15 ejercicios (Día 2)
│   ├── exercises/          # (Se alojaron en day-02/exercises los módulos del Día 2)
│   └── hooks/              # Custom Hooks reutilizables
│       ├── useFetch.ts     # Hook para peticiones HTTP
│       └── useForm.ts      # Hook para formularios genéricos
└── vite.config.ts          # Configuración de Vite
```

Para agregar un nuevo día de clase en el futuro:
1. Crea la carpeta `src/days/day-03` con su propio `App.tsx`.
2. Regístralo en `src/dayRegistry.ts`.

## 🪝 React Hooks Utilizados: Qué son y para qué sirven

A continuación, una explicación de cada Hook que encontrarás en el desarrollo de estos ejercicios:

### 1. `useState`
**¿Qué significa?** Es el estado local de un componente funcional (variables que al cambiar, le dicen a React que vuelva a renderizar la pantalla).
**¿Para qué se usa aquí?** Contadores, valores de inputs, almacenar listas de tareas o manejar si una ventana está abierta o cerrada.

### 2. `useEffect`
**¿Qué significa?** Permite ejecutar efectos secundarios (acciones asíncronas o ajenas al árbol de React) después del `render`.
**¿Para qué se usa aquí?** 
- Peticiones HTTP a APIs (`fetch`).
- Leer/escribir persistencia en `localStorage`.
- Modificar el título de la pestaña del navegador (`document.title`).
- Crear temporizadores (`setInterval`) limpiándolos adecuadamente en su función `return` para evitar fugas de memoria.

### 3. `useRef`
**¿Qué significa?** Referencia mutable que sobrevive entre renderizados y que **no** causa un re-render al ser actualizada.
**¿Para qué se usa aquí?**
- Para capturar un elemento del DOM directamente, como forzar el `focus()` en un input.
- Para guardar IDs de intervalos (`Ref` de temporizadores) y no reiniciarlos o perderlos entre renders.

### 4. `useMemo`
**¿Qué significa?** Memoriza un valor calculado derivado. Solo vuelve a correr la lógica pesada si una de sus dependencias cambia.
**¿Para qué se usa aquí?**
- Calcular el precio total de un carrito de compras.
- Filtrar listas grandes de productos, asegurando que calcular los filtros solo se haga si realmente cambian los datos de búsqueda.

### 5. `useReducer`
**¿Qué significa?** Una alternativa a `useState` para lidiar con un estado complejo unificando su lógica de mutación de forma predecible a través de una función `reducer` pura y llamadas por "acciones".
**¿Para qué se usa aquí?**
- Manejar una lista de tareas completa, controlando de manera centralizada acciones como `AGREGAR`, `TOGGLE_COMPLETO`, `EDITAR`, `ELIMINAR`, y `LIMPIAR`.

### 6. `useContext` (Context API)
**¿Qué significa?** Proporciona una forma de enviar datos por todo el árbol de componentes sin necesidad de pasar `props` a mano por cada componente intermedio (evita el "prop drilling").
**¿Para qué se usa aquí?**
- Proveer internacionalización (Modo Claro/Oscuro).
- Simular autenticación centralizada, permitiendo que un formulario de Login y una barra de usuario lean el estatus del mismo Global.

### 7. Custom Hooks (`useFetch`, `useForm`)
**¿Qué significa?** Consiste encapsular uno o varios de los hooks mencionados en una función separada en lógica reutilizable.
**¿Para qué se usa aquí?**
- Aislar el control repetitivo del manejo de un input para solo inyectarlo en componentes sin emborronarlos.
- Manejar los estados repetitivos de una llamada Backend (`loading`, `data`, `error`), simplificando los componentes que leen Listas o Datos remotos.
