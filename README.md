# Prácticas de React y Vite - Clases 

Este proyecto es un entorno de aprendizaje continuo estructurado por días, diseñado para practicar y dominar los conceptos fundamentales y avanzados de React (especialmente los React Hooks y el Context API).

## 🚀 Cómo correr el proyecto

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu computadora.

1. Abre tu terminal.
2. Navega a la carpeta del proyecto (si no estás en ella).
3. Instala las dependencias:
   `ash
   npm install
   `
4. Inicia el servidor de desarrollo:
   `ash
   npm run dev
   `
5. Abre tu navegador en la URL que indique la terminal (típicamente http://localhost:5173/).

## 📁 Estructura del Proyecto

El proyecto está diseñado para escalar de forma modular separando las prácticas diarias.

```	txt
clases-ramiro/
├── src/
│   ├── App.tsx             # Hub principal (Navegación entre los días)
│   ├── dayRegistry.ts      # Registro dinámico de los días activos
│   ├── days/               # Módulos separados por día
│   │   ├── day-01/         # Prácticas iniciales del Día 1
│   │   └── day-02/         # Resolución de ejercicios de Nivel Intermedio
│   │       ├── exercises/         # Los 15 ejercicios del documento
│   │       └── context-exercise/  # Módulo extra: Ejercicio Integrador de Auth y Roles con Context
│   └── hooks/              # Custom Hooks genéricos
│       ├── useFetch.ts     # Hook para peticiones HTTP
│       └── useForm.ts      # Hook para formularios
└── vite.config.ts          # Configuración de Vite
```

---

## 🛠️ Ejercicio Integrador: Context API y Roles (Novedad)

Dentro de la ruta src/days/day-02/context-exercise, se elaboró un ejercicio avanzado implementando estado global. Lo que incluye:
- **UserProvider**: Contexto general de la aplicación.
- **useUser**: Un *Custom Hook* robusto que valida si las pantallas hijas están consumiendo correctamente el Contexto.
- **Persistencia en localStorage**: Permite al usuario simular cerrar la pestaña del navegador y encontrar su sesión guardada al regresar.
- **Manejo de estados Asíncronos**: Genera un simulador de Logeo que advierte el modo *"Cargando..."* y captura Errores (Ej: campos faltantes).
- **Vistas Basadas en Roles (RoleContent.tsx)**: Reacciona de forma dinámica mostrando diferentes UI para roles: dmin, student y guest.
- **Rutas "Protegidas" (ProtectedView.tsx)**: Un componente wrapper que oculta el contenido confidencial a aquellos visitantes sin autenticación válida.
---
## 🪝 React Hooks Utilizados: Qué son y para qué sirven

A continuación, una explicación de cada Hook que encontrarás en el desarrollo de estos ejercicios:

### 1. useState

**¿Qué significa?** Es el estado local de un componente funcional. Variables que, al cambiar, avisan a React que debe "repintar" (re-renderizar) la pantalla para mostrar el nuevo valor.
**¿Para qué se usa aquí?** Contadores, valores de inputs en formularios, almacenar listas de tareas o manejar el estado de carga (isLoading).

### 2. useEffect

**¿Qué significa?** Permite ejecutar "efectos secundarios" (acciones asíncronas o ajenas al árbol central de React) después del 
ender.

**¿Para qué se usa aquí?** 
- Peticiones HTTP a APIs (etch).
- Leer/escribir persistencia en localStorage.
- Modificar el título de la pestaña del navegador (document.title).
- Crear temporizadores (setInterval) limpiándolos adecuadamente en su bloque de retorno 
eturn () => clearInterval(...) para evitar fugas de memoria.
### 3. useRef
**¿Qué significa?** Referencia mutable que sobrevive entre renderizados y que **no** causa un re-render al ser actualizada.
**¿Para qué se usa aquí?**
- Para capturar un elemento del DOM directamente, como forzar el foco inicial en una barra de búsqueda rápida.
- Para guardar IDs de intervalos (Ref de temporizadores) y no reiniciarlos o perderlos entre los renders continuos.
### 4. useMemo
**¿Qué significa?** Memoriza un valor derivado de un cálculo para evitar ejecutar matemáticas costosas en cada render. Solo vuelve a correr la lógica pesada si una de sus dependencias base cambia.
**¿Para qué se usa aquí?**
- Aislar el subtotal y el precio total abstracto del "Carrito de compras" deducido solamente por los artículos en Stock y no por un Estado repetido.
- Filtrar listas inmensas de productos mediante categorías y ordenamiento de precios.
### 5. useReducer
**¿Qué significa?** Una alternativa a useState para lidiar con un estado complejo unificando su lógica de mutación. Funciona con una función matemática pura 
educer y dictamina los cambios despachando "acciones".
**¿Para qué se usa aquí?**
- Manejar nuestro panel de lista de tareas completo. Acciones centralizadas de ADD_TASK, TOGGLE_TASK, EDIT_TASK, DELETE_TASK y CLEAR_COMPLETED.
### 6. useContext (Context API)
**¿Qué significa?** Evita el terrible "prop drilling" (pasar parámetros capa tras capa de componentes). Permite envolver la App y proporcionar un valor global a componentes que se encuentren abajo.
**¿Para qué se usa aquí?**
- **Sistema de Autenticación de Usuarios**: Simula un estado global del usuario (nombre, correo y rol). Múltiples componentes independientes (como la Barra de Navegación, el Dashboard de Roles y el Botón Final) pueden leer y modificar la sesión actual sin recibir parámetros directos.
- Establecer temas (Modo Oscuro / Modo Claro).
### 7. Custom Hooks (useFetch, useForm, useUser)
**¿Qué significa?** Envolver hooks predeterminados en una función tuya para crear lógica que puedes reciclar cuantas veces quieras.
**¿Para qué se usa aquí?**
- Evitar repetir la validación e inyección manual de onChange por cada input de cada formulario en el proyecto.
- Envolver estatus asíncronos (loading, data, error) al buscar a un usuario en una Base de Datos Ficticia.
- Asegurar que la invocación global del Usuario con (useUser()) siempre pase por una capa de validación de seguridad.
