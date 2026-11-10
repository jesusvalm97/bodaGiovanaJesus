# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Invitación digital de boda (Giovana y Jesús) con confirmación de asistencia (RSVP). Todo el frontend vive en [index.html](index.html): HTML, CSS y JavaScript vanilla, sin build, sin dependencias ni linter. La única prueba es la de equivalencia de [pruebas/](pruebas/). A su lado se sirven las fuentes autoalojadas de [fuentes/](fuentes/) (Big Shoulders Stencil, Young Serif, Figtree) y las fotos optimizadas de [img/](img/); no hay cargas externas.

El código, los identificadores, las clases CSS y los textos están en español; mantener esa convención.

## Regla para cualquier cambio de diseño

La confirmación de asistencia y el registro de acompañantes se conservan **exactamente** como en la versión original (commit `622a812`). Un rediseño solo cambia la presentación (CSS, decoración, clases de estilo). No cambies:

- **Lógica:** las funciones `iniciar`, `mostrar`, `mostrarFormulario`, `mostrarCerrado`, `actualizarBloque`, `pintarChips`, `pintarCampos`, `guardarEscritos`, `enviarRespuesta`, `enviar`, `mostrarResumen` y sus utilidades.
- **Marcado:** el marcado y los ids de `#contenido`.
- **Textos:** los del saludo, el formulario, las validaciones y el resumen.
- **Orden:** saludo, luego "Cuándo y dónde", luego "¿Nos acompañas?".

Antes de entregar cualquier cambio a `index.html`, corre la prueba de equivalencia y no entregues si falla:

```
cd pruebas
npm install   # solo la primera vez
npm test
```

[pruebas/equivalencia.js](pruebas/equivalencia.js) saca la versión original con `git show 622a812:index.html` y recorre 15 escenarios con clics reales en las dos versiones. El Apps Script se simula y todo lo externo se bloquea, así que nunca toca la hoja real. Compara textos visibles, estados, chips, campos, validaciones, foco y los cuerpos de POST. Sale con código 1 si hay cualquier diferencia.

- `npm test -- --base <commit>` compara contra otro commit.
- `npm test -- --archivo <ruta>` compara otro archivo.

Necesita Chrome o Edge instalados (o la variable `CHROME_PATH`). El bloque `EVENTO` se toma de la versión actual para las dos, porque es configuración y no funcionalidad. Si agregas un escenario nuevo del RSVP, agrégalo en `ESCENARIOS`.

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
4. Al enviar con "Sí" se lanza `lluviaDePapel()` (confeti de papel de china); "Cambiar mi respuesta" vuelve al formulario mientras no esté `cerrado`.

**Detalles que no son obvios:**

- El DOM con datos del invitado o del backend se construye siempre con `createElement` + `textContent` (helper `agregar()`), nunca con `innerHTML`. El único `innerHTML` es SVG estático.
- Las fechas ISO se convierten con `aFecha()` a fecha **local** (no `new Date('YYYY-MM-DD')`, que se interpreta en UTC y en México recorre un día).
- `listaNombres()` usa "e" en lugar de "y" antes de un nombre que suena a "i" (Inés, Hilda), según la regla del español.
- **Papel picado generado.** `cortarPapeles()` escribe en `#papeles` las máscaras SVG de cada calado (blanco = papel, negro = hueco; `mascara(id, …, huecos, islas, huecos2)`). Las banderitas se arman con `colgarBanderas(contenedor, [[motivo, color], …])` (motivos: `flor`, `corazon`, `rombos`, `sol`, `letra-G`, `letra-J`). Los pliegos con foto son `<button class="pliego" data-forma="medallon|redondo">` estáticos en el HTML; `vestirPliegos()` les pone el papel, la silueta dentada de la foto y el toggle `aria-pressed` que levanta el papel. El encuadre de cada foto se controla con `--fx`/`--fy`/`--zoom` (y `--ox`/`--oy` para el origen del zoom) en su `style`.
- **Cuerdas.** Todo lo que cuelga vive en un `.tendedero` con `--comba`; `colocarColgantes()` (al cargar, al terminar de cargar fuentes y al redimensionar) calcula `--k = 4t(1−t)` para que cada pieza baje según la curva de su cuerda, y `prenderFocos()` reparte los foquitos según `data-focos` (separación en px). Una pieza con `.colgado-largo` cuelga de un hilo de largo `--hilo`.
- Paleta de papel de china sobre noche índigo: los colores son tokens CSS en `:root` (`--noche`, `--blanco`, `--lila`, `--violeta`, `--rosa`, `--cuerda`, `--foco`…). La página es solo oscura (`color-scheme: dark`). Usar los tokens en lugar de colores sueltos. El sistema de diseño está documentado en [DESIGN.md](DESIGN.md) y el contrato de dirección en `.impeccable/surfaces/index-html.md`.
- Fotos: los originales están en `fotos/` (solo locales, en `.gitignore`); la página usa versiones WebP de 480/960 px en `img/` (cada una con un sidecar `.webp.json` de procedencia).
- Accesibilidad que hay que preservar: `prefers-reduced-motion` desactiva el vaivén, la lluvia de papel y las transiciones; los mensajes usan `role="status"`/`aria-live`; tras enviar, el foco pasa al título del resumen; los campos inválidos llevan `aria-invalid`.

## Herramientas de diseño locales

`.claude/` (skill y agentes "impeccable") está en `.gitignore`.

`.impeccable/` sí se versiona: el contrato de dirección en `surfaces/` y `design.json`. Quedan fuera sus archivos locales:

- `config.local.json` y `hook.cache.json`, ignorados en `.gitignore`.
- `mocks/`, `questions/` y `review/`, que traen su propio `.gitignore`.

`.claude/settings.local.json` registra hooks que corren el detector de diseño de impeccable después de cada Edit/Write y una revisión completa al terminar el turno; sus avisos son retroalimentación sobre la UI.
