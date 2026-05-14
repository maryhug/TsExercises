# Clases Ramiro

Proyecto organizado por días para ir agregando ejercicios sin mezclar cada clase.

## Estructura

```txt
src/
├─ App.tsx              # hub de navegación entre días
├─ App.css              # estilos del hub
├─ dayRegistry.ts       # listado central de días
├─ days/
│  └─ day-01/
│     ├─ App.tsx        # ejercicio del día 01
│     ├─ App.css
│     └─ index.ts
├─ index.css            # estilos globales
└─ main.tsx
```

> La estructura activa del proyecto es la que vive dentro de `src/`. La carpeta `day1/` anterior queda como referencia histórica y no forma parte del flujo nuevo.

## Cómo correr el proyecto

Instalá dependencias si todavía no lo hiciste:

```bash
npm install
```

Luego levantá la app en modo desarrollo:

```bash
npm run dev
```

Abrí la URL que te muestra Vite, normalmente:

```txt
http://localhost:5173/
```

## Cómo abrir un día específico

La app muestra un panel con los días disponibles. También podés abrir uno directo con el hash de la URL:

```txt
http://localhost:5173/#day-01
```

## Cómo agregar un día nuevo

1. Creá una carpeta nueva dentro de `src/days/`.
2. Agregá al menos estos archivos:

```txt
src/days/day-02/
├─ App.tsx
├─ App.css
└─ index.ts
```

3. Exportá ese día desde `src/dayRegistry.ts`.
4. Listo: aparecerá en el panel principal.

## Convención recomendada

- Usá nombres con ceros a la izquierda: `day-01`, `day-02`, `day-03`.
- Mantené el código reutilizable en `src/shared/` cuando empieces a repetir componentes.
- Evitá mezclar ejercicios de días distintos en una misma carpeta.

## Comandos útiles

```bash
npm run build
npm run lint
```

Con eso verificás que el proyecto siga compilando y que los nuevos días no rompan la base.

