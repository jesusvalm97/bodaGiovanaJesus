# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Invitados a la boda de Giovana y Jesús. Reciben por WhatsApp un link personal (`?t=<token>`) y lo abren casi siempre en el celular, desde la conversación. Su trabajo: enterarse de cuándo y dónde es la boda, sentirse invitados en persona y confirmar si asisten y con cuántos acompañantes (con sus nombres). Entre los invitados hay familia de todas las edades.

Audiencia secundaria: los novios, que reciben las respuestas en una Google Sheet.

## Product Purpose

Invitación digital con confirmación de asistencia (RSVP). Reemplaza la invitación impresa más el "¿vienes?" por mensaje: cada invitado ve su nombre, su cupo de acompañantes y puede responder o cambiar su respuesta hasta la fecha límite. Éxito: que cada invitado responda a tiempo y sin dudas, y que la invitación se sienta propia de los novios, no una plantilla.

## Positioning

Es la invitación de una pareja concreta: personalizada por invitado (nombre y cupo vienen de la hoja), con las fotos reales de Giovana y Jesús y los lugares reales de la boda en Guadalajara.

## Operating Context

- Distribución: link individual por WhatsApp; se abre en el navegador del celular.
- Backend: Google Apps Script sobre una Google Sheet (fuera del repo). La fecha de la boda (20 de marzo de 2027), la fecha límite para responder (20 de febrero de 2027) y si el periodo está cerrado vienen del backend.
- Eventos: Ceremonia religiosa a las 6:00 p.m. en el Templo de Nuestra Señora del Carmen (Del Carmen 116, Zona Centro, Guadalajara); ceremonia civil y recepción a las 8:30 p.m. en Jardín Getsemaní (C. Clio 2350, Fovissste Estadio, Guadalajara). Cada uno con link de Google Maps.
- Código de vestimenta: Formal.
- La boda es en marzo en Guadalajara, temporada de jacarandas.

## Capabilities and Constraints

- Un solo archivo estático (`index.html`) con HTML, CSS y JS vanilla; sin build ni dependencias. Las fotos se sirven como archivos estáticos junto a la página.
- Estados que la invitación debe cubrir: cargando, error (link sin token, token inválido, sin conexión), formulario, resumen de respuesta ya enviada, cambiar respuesta, periodo cerrado.
- El cupo es el máximo de acompañantes sin contar al invitado (0 significa solo el invitado).
- Modo demo con datos de ejemplo cuando `API_URL` no apunta a Apps Script.
- Sin definir: hosting/dominio donde se publicará.

## Brand Commitments

- Nombres: Giovana y Jesús. Nombres completos (vienen del backend): Giovana de Jesús Rojas Pérez y Jesús Antero Varela Almanza.
- Todo el texto en español de México, tuteando al invitado, en tono cálido y cercano.
- El lila/morado de jacaranda les gusta pero no es un compromiso: puede usarse como inspiración, no es obligatorio.

## Evidence on Hand

- `fotos/1.jpeg` a `fotos/9.jpeg`: fotos verticales (3:4) de la pareja en un viaje a Nueva York, en el mirador SUMMIT One Vanderbilt (salas de espejos y vidrio, sala de globos plateados, vista al Empire State y al Chrysler Building). Hay casi-duplicados (1/2, 6/7, 3/4/5/9).
- Las fotos son de un viaje, **no** de la pedida: no decir ni insinuar que ahí se comprometieron.
- No hay fotos profesionales de compromiso, logotipo, monograma ni historia escrita de la pareja; no inventarlos.

## Product Principles

1. Confirmar es lo más importante: el invitado debe poder responder sin dudas y sin fricción en un celular.
2. Personal antes que genérico: el nombre del invitado, las fotos y los lugares reales hacen la invitación; nada que se sienta de plantilla.
3. La información práctica (fecha, horas, lugares, cómo llegar, vestimenta, fecha límite) se encuentra de inmediato.
4. Legible para todas las edades: texto grande, contraste suficiente y controles fáciles de tocar.

## Accessibility & Inclusion

Invitados de todas las edades, incluidos adultos mayores, en celular: tamaños de texto generosos, contraste AA, objetivos táctiles amplios, respeto a `prefers-reduced-motion` y funcionamiento con lector de pantalla en el formulario.
