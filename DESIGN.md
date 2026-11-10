---
name: Invitación de boda de Giovana y Jesús
description: Fiesta de jardín de noche bajo papel picado; cada sección cuelga de un mecate y las fotos se asoman por los calados.
colors:
  noche: "#221E4F"
  noche-honda: "#1A1740"
  tinta: "#F4EEF8"
  tinta-2: "#CFC6E6"
  blanco: "#F4EEF8"
  lila: "#C7B2EC"
  violeta: "#7B4FC4"
  rosa: "#EF6A95"
  tinta-papel: "#231F52"
  tinta-papel-2: "#4A4577"
  violeta-papel: "#5B34A8"
  cuerda: "#CDB78C"
  cuerda-sombra: "#8E7752"
  foco: "#FFD58A"
  aviso: "#FFB3C4"
typography:
  display:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(3.75rem, 20vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0.01em"
  numeral:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 9vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(1.875rem, 8vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  title-sm:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body-lg:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.35
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0px"
  foco: "2px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  base: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  seccion: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.rosa}"
    textColor: "{colors.noche}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem 1.4rem"
    width: "100%"
  button-primary-hover:
    backgroundColor: "#F488AB"
  button-secondary:
    backgroundColor: "{colors.lila}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem 1.15rem"
  button-secondary-hover:
    backgroundColor: "#D5C5F1"
  option:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0.75rem 1.15rem"
    height: "3.75rem"
  option-selected:
    backgroundColor: "{colors.violeta}"
    textColor: "#FFFFFF"
  chip:
    backgroundColor: "{colors.lila}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.8rem 1.1rem"
  chip-selected:
    backgroundColor: "{colors.violeta}"
    textColor: "#FFFFFF"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0"
  hoja:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.none}"
    padding: "0.5rem 2.25rem 1.25rem"
---

# Design System: Invitación de boda de Giovana y Jesús

## Overview

**Creative North Star: "La fiesta en el jardín bajo papel picado"**

La página entera es una noche de jardín índigo atravesada por mecates de los que cuelga papel de china. Nada se apoya: todo cuelga. Las banderitas, los pliegos con foto, las hojas de "Cuándo y dónde" y hasta las opciones del formulario son papel con orilla dentada, calados de encaje y un doblez más oscuro arriba. Los foquitos tibios cuelgan de las mismas cuerdas y dan la única luz cálida del mundo.

La densidad es de invitación, no de aplicación: una sola columna centrada en el celular, mucho aire entre secciones y texto grande para invitados de todas las edades. En pantallas anchas la portada se abre en dos columnas (pliegos a la izquierda, texto a la derecha) sin cambiar de materiales. El gesto distintivo es levantar un pliego desde su cuerda para ver la foto a color que estaba detrás del papel.

El mundo rechaza la invitación estándar de crema, acuarela, caligrafía y carrusel, y nunca junta verde, blanco y rojo, ni usa cempasúchil o calaveras.

**Key Characteristics:**
- Fondo nocturno único; la página es solo oscura (`color-scheme: dark`).
- Papel de china translúcido en cuatro colores, cortado con máscaras SVG: rombos, círculos, flores, corazón, sol, medallón y letras.
- Mecate torcido (trazo base más trazo punteado) con comba calculada como `4t(1 − t)`; cada colgante baja según la curva.
- Tres voces tipográficas: corte en stencil, voz cálida en serif, texto en sans legible.
- Profundidad por sombra que sigue la silueta del papel, nunca por cajas elevadas.
- Movimiento de viento: vaivén leve y lluvia de papel al confirmar, ambos apagados con `prefers-reduced-motion`.

## Colors

Una noche índigo profunda con cuatro papeles de china (blanco lila, lila jacaranda, violeta y rosa mexicano), un mecate de fibra y una sola luz ámbar.

### Primary
- **Rosa mexicano** (rosa): el color de la acción. Fondo del botón "Enviar respuesta", el ampersand de los nombres, el cursor de texto, la selección y uno de los cuatro papeles.

### Secondary
- **Violeta de papel** (violeta): el estado elegido. Opción y chip seleccionados (con texto blanco) y uno de los cuatro papeles de las banderitas.
- **Lila jacaranda** (lila): papel secundario. Chips sin elegir, botón secundario, hojas alternas de "Cuándo y dónde", línea base de los campos de texto y el pulgar de la barra de desplazamiento.

### Tertiary
- **Ámbar de foquito** (foco): la luz. Foquitos de las cuerdas, su halo y el anillo de foco del teclado. Solo aparece como luz o como foco; no es un color de superficie.
- **Mecate** (cuerda) y **Sombra de mecate** (cuerda-sombra): la fibra de todas las cuerdas y de los hilos largos de los pliegos que cuelgan más abajo.

### Neutral
- **Noche de jardín** (noche): el fondo de toda la página y el texto sobre el botón rosa.
- **Noche honda** (noche-honda): el carril de la barra de desplazamiento.
- **Tinta de luna** (tinta): texto principal sobre la noche.
- **Tinta de luna tenue** (tinta-2): texto secundario sobre la noche (cuenta regresiva, notas, etiquetas, "Con cariño").
- **Papel blanco lila** (blanco): el papel claro de pliegos, banderitas, hojas y opciones. Comparte valor con la tinta pero es un rol distinto: es superficie.
- **Tinta sobre papel** (tinta-papel), **Tinta sobre papel tenue** (tinta-papel-2) y **Violeta sobre papel** (violeta-papel): el texto que va encima del papel claro o lila; la violeta de papel lleva la hora en stencil y el enlace "Cómo llegar".
- **Aviso** (aviso): rosa claro para mensajes de error y campos inválidos sobre la noche.

### Named Rules
**The Cuatro Papeles Rule.** Todo papel es blanco, lila, violeta o rosa, y se alternan en secuencia (las banderitas rotan los cuatro, las hojas alternan blanco y lila). Ningún otro color se vuelve papel.

**The Tinta Según Superficie Rule.** Sobre la noche se escribe con tinta y tinta-2; sobre papel claro o lila, con tinta-papel, tinta-papel-2 y violeta-papel. Sobre violeta, blanco; sobre rosa, noche.

**The Una Sola Luz Rule.** El ámbar es luz, no decoración: foquitos, su halo y el anillo de foco. Nunca rellena un papel ni un botón.

## Typography

**Display Font:** Big Shoulders Stencil (con Arial Narrow)
**Headline Font:** Young Serif (con Georgia)
**Body Font:** Figtree (con Segoe UI, system-ui)

Las tres fuentes son autoalojadas en `fuentes/` y se precargan.

**Character:** El stencil condensado es letra de corte, la misma que se recorta en el papel; Young Serif es la parte humana y cálida que el corte no da; Figtree carga todo lo que hay que leer y tocar.

### Hierarchy
- **Display** (stencil 900, `clamp(3.75rem, 20vw, 6rem)`, interlínea 0.86, mayúsculas): solo los nombres de los novios, en dos líneas, con el ampersand en rosa.
- **Numeral** (stencil 800, 3.25rem, interlínea 1): las horas de cada lugar en violeta de papel; los chips de cantidad usan el mismo corte a 1.375rem en mayúsculas.
- **Headline** (Young Serif 400, `clamp(2.25rem, 9vw, 3.25rem)`, interlínea 1.05): títulos de sección ("Cuándo y dónde", "Un poco de nosotros").
- **Title** (Young Serif 400, `clamp(1.875rem, 8vw, 2.5rem)`, interlínea 1.1): el nombre del invitado. La firma (2.25rem), el título del resumen (1.875rem), la pregunta "¿Nos acompañas?" y los títulos de las hojas (1.625rem) son la misma voz a menor escala.
- **Body** (Figtree 400, 1.125rem, interlínea 1.55): todo el texto corrido; las introducciones se limitan a 34rem.
- **Body grande** (Figtree 600, 1.1875rem): fecha de la portada, nombre del lugar y botón principal (este en 700).
- **Label** (Figtree 400, 0.9375rem): etiquetas de campo, nombres completos de la firma y aviso de demo. Nunca más chico que esto.

### Named Rules
**The Tres Voces Rule.** El stencil es para nombres, números y cantidades; Young Serif para encabezados, el nombre del invitado y la firma; Figtree para todo lo demás. El stencil nunca lleva una oración.

**The Letra Grande Rule.** El cuerpo es 1.125rem y nada que se lea baja de 0.9375rem: los invitados incluyen adultos mayores en celular.

## Layout

Una sola columna centrada dentro de un marco de `min(100% − 2rem, 70rem)`. Las cuerdas rompen el marco y van de orilla a orilla de la pantalla (`margin-inline: calc(50% − 50vw)`); los colgantes quedan centrados debajo y bajan según su posición en la curva (`margin-top = comba · 4t(1 − t)`). Los pliegos de hilo largo cuelgan más abajo con un hilo de mecate visible.

Ritmo vertical: 6rem entre secciones, 3rem entre hojas y antes de la vestimenta, 1.5–2rem entre bloques del formulario, 0.25–0.75rem entre líneas relacionadas. Cuerdas de banderitas separan portada, contenido y cierre.

Responsivo con un solo corte en 56rem: debajo, todo centrado; la galería usa dos cuerdas (dos pliegos y luego uno). Arriba, la portada pasa a dos columnas (1.15fr pliegos, 1fr texto alineado a la izquierda), las hojas a dos columnas y la galería a una sola cuerda con tres pliegos. La página respeta las áreas seguras (`env(safe-area-inset-*)`) y recorta el desborde horizontal.

**The Todo Cuelga Rule.** Banderitas, pliegos, hojas y la fila de chips cuelgan de un mecate; ningún papel decorativo flota sin cuerda. Las opciones Sí / No y los botones son la excepción: papel cortado dentro del bloque de texto.

## Elevation & Depth

Profundidad por sombra que sigue la silueta (`filter: drop-shadow`) y por translucidez del papel; no hay tarjetas elevadas con `box-shadow`. El papel deja ver lo que hay detrás (opacidad 0.82–0.9) excepto bajo el doblez de los pliegos, donde es opaco para que la foto solo se asome por los calados.

### Shadow Vocabulary
- **Banderita** (`drop-shadow(0 6px 6px rgb(10 8 32 / .35))`): papel ligero sobre la noche.
- **Pliego** (`drop-shadow(0 10px 10px rgb(10 8 32 / .4))`): pliegos con foto, más pesados.
- **Hoja** (`drop-shadow(0 12px 14px rgb(10 8 32 / .35))`): hojas de "Cuándo y dónde".
- **Doblez** (`inset 0 .4rem 0 rgb(0 0 0 / .1)` en controles; franja de 8–12px al 12–14 % de negro en el SVG): la banda más oscura arriba de cada papel, donde se dobla sobre la cuerda.
- **Halo de foquito** (`radial-gradient(closest-side, rgb(255 213 138 / .3), transparent)`): la única luz.

**The Sombra De Silueta Rule.** Las sombras siguen el contorno dentado y calado del papel, siempre en índigo profundo; nunca una sombra rectangular desplazada.

## Shapes

Esquinas a cero: el papel no se redondea. La forma la dan las orillas: dientes en la parte baja (contorno SVG `dientes()` o máscara `conic-gradient` de 10–16px en controles), orlas de rombos y perforaciones redondas en los lados de las hojas. Los calados se recortan con máscaras SVG: rombos, círculos, flor de ocho pétalos, corazón, sol, medallón ovalado con encaje de círculos y letras G y J en stencil. La foto de cada pliego lleva la misma orilla dentada que su papel. El único radio es 2px en el área de los controles para el anillo de foco; los foquitos son la única forma redonda suave.

**The Orilla Dentada Rule.** Todo papel termina en dientes; un borde liso y recto abajo delata que no es papel picado.

## Components

### Buttons
Papel cortado que se toca: rectángulo con dientes abajo y doblez arriba.
- **Shape:** sin radio, orilla inferior dentada de 16px (12px en el secundario).
- **Primary:** rosa con texto noche, Figtree 700 a 1.1875rem, ancho completo.
- **Hover / Focus:** el rosa se aclara; el foco es un doble anillo interior (noche y ámbar, 3px cada uno) porque la máscara recorta cualquier contorno exterior. Deshabilitado baja a 0.65 de opacidad con cursor de progreso.
- **Secondary:** lila con tinta de papel, Figtree 600 a 1rem, ancho automático ("Cambiar mi respuesta").

### Chips
- **Style:** papel lila con dientes de 10px, número en stencil 800 a 1.375rem y mayúsculas ("SOLO YO", 1, 2…), colgados de un mecate recto.
- **State:** elegido en violeta con texto blanco; foco con anillo ámbar exterior.

### Opciones Sí / No
- **Style:** dos papeles blanco lila lado a lado, 3.75rem de alto mínimo, dientes de 14px, Figtree 600.
- **State:** la elegida pasa a violeta con texto blanco y muestra una palomita SVG; foco con anillo ámbar.

### Inputs / Fields
- **Style:** sin caja; texto sobre la noche con línea base lila de 2px, etiqueta encima en Label tinta-2.
- **Focus:** la línea pasa a ámbar y se engrosa a 4px.
- **Error:** línea en aviso y `aria-invalid`; el mensaje aparece en aviso, Figtree 600.

### Hoja de lugar
- **Corner Style:** sin radio; orla de rombos arriba, rombos y dientes abajo, perforaciones redondas en los lados.
- **Background:** alterna blanco y lila; un mecate recto la cruza por arriba.
- **Content:** título en Young Serif, hora en stencil violeta de papel con "p.m." a 0.45em, lugar en Body grande, dirección en tinta-papel-2, enlace "Cómo llegar" con pin SVG en violeta de papel.
- **Internal Padding:** 0.5rem 2.25rem 1.25rem.

### Pliego con foto (componente insignia)
Un papel calado (medallón de 300×400 o redondo de 100×130) colgado de la cuerda, con la foto detrás. Al tocarlo gira desde su borde superior (`rotateX(-82deg)`, 0.9s con `cubic-bezier(.16, 1, .3, 1)`) y la foto pasa de su encuadre ampliado a escala 1. En hover se levanta apenas (`-16deg`). Es un botón con `aria-pressed` y una etiqueta que describe la foto.

### Banderitas y foquitos
Banderitas de 100×120 con cinco motivos (flor, rombos, corazón, sol, letra) en los cuatro colores, meciéndose 1.8° con duraciones y retrasos escalonados (3.2–4.8s). Los foquitos cuelgan de la cuerda, detrás de las banderas, repartidos según la longitud del mecate.

### Lluvia de papel
Al confirmar "Sí" caen 40 papelitos de los cuatro colores, girando en 3D, durante unos 8 segundos. Se omite con movimiento reducido.

## Do's and Don'ts

### Do:
- **Do** colgar cada grupo nuevo de un mecate con la comba `4t(1 − t)` y bajar cada colgante según su posición en la curva.
- **Do** cortar todo papel nuevo con orilla dentada abajo y doblez oscuro arriba, en blanco, lila, violeta o rosa.
- **Do** escribir sobre papel con tinta-papel o violeta-papel, y sobre la noche con tinta o tinta-2.
- **Do** usar el stencil solo para nombres, números y cantidades, y Young Serif para encabezados, el nombre del invitado y la firma.
- **Do** mantener el cuerpo en 1.125rem, controles de al menos 3rem de alto y el anillo de foco ámbar de 3px.
- **Do** apagar vaivén, levantamiento y lluvia con `prefers-reduced-motion`.

### Don't:
- **Don't** juntar verde, blanco y rojo, ni usar cempasúchil o calaveras.
- **Don't** volver a la invitación estándar de crema, acuarela, caligrafía y carrusel.
- **Don't** agregar un modo claro: la página es noche de jardín y solo oscura.
- **Don't** redondear esquinas de papel ni usar sombras rectangulares desplazadas.
- **Don't** usar el ámbar como relleno de superficie; es luz y foco.
- **Don't** poner oraciones en stencil ni texto que se lea por debajo de 0.9375rem.
