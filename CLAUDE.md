# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Invitación digital de boda (Giovana y Jesús) con confirmación de asistencia (RSVP). Todo el frontend vive en un solo archivo autocontenido, [index.html](index.html): HTML, CSS y JavaScript vanilla, sin build, sin dependencias, sin tests ni linter. La única carga externa son las fuentes de Google Fonts (Italiana y Alegreya Sans).

El código, los identificadores, las clases CSS y los textos están en español; mantener esa convención.

## Cómo correrlo

No hay nada que compilar: se abre `index.html` en el navegador o se sirve como archivo estático (por ejemplo `python -m http.server` y abrir `http://localhost:8000/?t=<token>`).

- **Modo real**: `MODO_DEMO` es `false` cuando `API_URL` empieza con `https://script.google.com/` (así está ahora). La página exige el parámetro `?t=<token>` del invitado; sin él muestra un error. Las pruebas en este modo leen y **escriben en la hoja real**.
- **Modo demo**: si `API_URL` no apunta a Apps Script, la página usa los datos falsos de `DEMO` / `LUGARES_DEMO`, muestra el aviso `#aviso-demo` y simula el envío. Para probar la UI sin tocar la hoja, cambiar `API_URL` temporalmente y no commitear ese cambio.

## Arquitectura

**Backend fuera del repo.** Los datos de cada invitado viven en una Google Sheet expuesta mediante un Google Apps Script desplegado como web app (`API_URL`, termina en `/exec`). Cada invitado recibe por WhatsApp un link con su token. El contrato que el frontend asume:

- `GET API_URL?t=<token>` → `{ ok, nombre, cupo, asiste: '' | 'Sí' | 'No', acompanantes: string[], novios, fechaBoda: 'YYYY-MM-DD', fechaLimite: 'YYYY-MM-DD', cerrado: boolean }`, o `{ ok: false, error }`.
- `POST API_URL` con cuerpo JSON `{ t, asiste, acompanantes }` → `{ ok, asiste, acompanantes }`, o `{ ok: false, error }`. Se envía con `Content-Type: text/plain` a propósito, para evitar el preflight CORS que Apps Script no soporta.

Cualquier cambio a este contrato requiere el cambio correspondiente en el Apps Script, que no está aquí. La fecha de la boda y la fecha límite vienen del backend, no del HTML; `cupo` es el número máximo de acompañantes (sin contar al invitado).

**Configuración editable** en el bloque `CONFIGURA AQUÍ` del `<script>`: `API_URL` y `EVENTO` (lugares con título, hora, dirección y link de Maps, y `vestimenta`). Un lugar sin `lugar` no se pinta. `LUGARES_DEMO` duplica esos datos solo como respaldo del modo demo.

**Flujo de estados de la UI.** Todo se muestra u oculta con el atributo `hidden` (respaldado por `[hidden] { display: none !important; }`):

1. `#carga` → `#error` (token ausente, `ok: false` o fallo de red) o `#contenido`.
2. Dentro de `#contenido`, `mostrar()` decide: si ya hay `asiste` → `mostrarResumen()`; si no y `cerrado` → `mostrarCerrado()`; si no → `mostrarFormulario()`.
3. En el formulario, elegir "Sí" con `cupo > 0` abre los chips de cantidad y genera dinámicamente un campo de nombre por acompañante. `nombresEscritos` conserva lo escrito al cambiar la cantidad.
4. Al enviar con "Sí" se lanza `lluviaDeFlores()`; "Cambiar mi respuesta" vuelve al formulario mientras no esté `cerrado`.

**Detalles que no son obvios:**

- El DOM con datos del invitado o del backend se construye siempre con `createElement` + `textContent` (helper `agregar()`), nunca con `innerHTML`. El único `innerHTML` es SVG estático.
- Las fechas ISO se convierten con `aFecha()` a fecha **local** (no `new Date('YYYY-MM-DD')`, que se interpreta en UTC y en México recorre un día).
- `listaNombres()` usa "e" en lugar de "y" antes de un nombre que suena a "i" (Inés, Hilda), según la regla del español.
- La ilustración usa dos `<symbol>` SVG reutilizables (`#flor`, `#fronda`). Las flores del ramo de la portada salen del arreglo `FLORES` (`[x, y, tamaño, tono 1–3, giro]`) en `pintarRamo()`; el tono se traduce a las clases `.c1`–`.c3`.
- Paleta "jacaranda": los colores son tokens CSS en `:root` con su versión oscura bajo `prefers-color-scheme: dark`. Usar los tokens en lugar de colores sueltos.
- Accesibilidad que hay que preservar: `prefers-reduced-motion` desactiva la lluvia de flores y las transiciones; los mensajes usan `role="status"`/`aria-live`; tras enviar, el foco pasa al título del resumen; los campos inválidos llevan `aria-invalid`.

## Herramientas de diseño locales

`.claude/` (skill y agentes "impeccable") y `.impeccable/` están en `.gitignore` y no se versionan. `.claude/settings.local.json` registra hooks que corren el detector de diseño de impeccable después de cada Edit/Write y una revisión completa al terminar el turno; sus avisos son retroalimentación sobre la UI.
