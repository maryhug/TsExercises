# Ejercicio práctico: Estado global con Context API en React

Este es la resolución interina-avanzada al ejercicio del **Estado Global con Context API** aplicando TypeScript.

Abarca TODOS los extras pedidos, incluyendo:
1. Persistencia simulada con **localStorage**.
2. Un Custom Hook centralizado y seguro `useUser()`.
3. Manejo y mutación de la UI según un sistema de **Roles** dinámico (`admin`, `student`, `guest`).
4. Simulación de logeos con tiempos de asincronía (`Promise`, `setTimeout`).
5. Manejos de errore con *Error states* integrados y protección de Vistas Exclusivas.

## Instrucciones para ejecutar el proyecto (Desde el HUB raíz del Día 2)
Dentro de la carpeta raíz (`clases-ramiro`), puedes compilar asegurando el éxito de Typescript de la siguiente manera:

```bash
npm install
npm run dev
```

---

## Preguntas Técnicas y sus Respuestas

### 1. ¿Qué problema resuelve Context API en React?
Evita el **prop drilling**, que es aquel problema que ocurre al pasar propiedades o funciones manualmente desde un componente "padre", bajando innecesariamente capa por capa, por componentes "hijos" que no ocupan esos datos solo para lograr entregárselos al componente "nieto" que sí los necesita.

### 2. ¿Cuándo usarías Context API y cuándo no?
- **SÍ LO USARÍA** para estados o configuraciones que son transversales o de bajo mutamento: la información del sesión de usuario (quien rige los permisos de casi toda la APP), modo oscuro/claro, y lenguajes/traducciones.
- **NO LO USARÍA** para estados locales que cambian varias veces de golpe de forma iterativa y que no importan a nadie más. Ej: La caja de búsqueda de texto de un listado pequeño, las dimensiones interactivas de una gráfica, etc. 

### 3. ¿Qué hace el componente `Provider` dentro de Context API?
Es el transmisor global. Este envuelve todo (o parte) un árbol de componentes y toma los datos que almacenes en su estructura (`value`). Otorga luz verde a cualquier componente inferior debajo de este árbol para suscribirse y consumir o mutar esos valores globales sin necesidad de *Props*.

### 4. ¿Para qué sirve `useContext`?
Es el Hook propio de React que actúa de "receptor" y lee inmediatamente cualquier valor otorgado por el `Provider` ascendente más cercano de la rama actual para el contexto que tú requieras.

### 5. ¿Qué riesgos tiene usar Context API para manejar estados que cambian constantemente?
El riesgo recae en el **Rendimiento**. Context NO está optimizado granularmente; cada vez que el valor base que emite el `Provider` cambie (como un contadior infinito de milisangundos), todos, y digo **TODOS** los componentes que lean dicho Contexto ser verán forzados en masa a re-renderizar, ahogando al árbol de componentes. 

### 6. ¿Por qué puede ser útil crear un custom hook como `useUser`?
- Centraliza lógica, por lo cual ahorras la reduntante tarea de traer tanto el `useContext` general y el Contexto mismo de User individualmente en docenas de archivos.
- Permite lanzar chequeos explícitos (ej. arrojar Errores potentes al desarrollador si este olvida encerrar la jerarquía dentro de un `UserProvider`).

### 7. ¿Qué diferencia hay entre estado local y estado global?
- **Local:** Lo que construyes dentro de tu cuarto (Componente). Como ejemplo, el botón de "abrir menú desplegable" es un booleano (true/false) `useState`. A nadie fuera de este componente le interesa ese dato o lo va a tratar de leer, por el cual el renderizado local es su ecosistema.
- **Global:** Lo que gritas para toda la cuadra (Aplicación entera). Ej. "Compraste un producto", entonces el contexto suma tu producto a 1 para que el carrito flotante lo sume, tu historial de caja registre un elemento extra.. Todo desde un componente de un botón hasta arriba.

