// Prueba de equivalencia de la confirmación de asistencia (RSVP).
//
// Toma la versión original de index.html desde git (commit base 622a812) y la versión actual,
// recorre en las dos los mismos escenarios con clics y tecleo reales, y compara:
// textos visibles, qué se muestra u oculta, chips y campos de acompañantes, validaciones,
// foco y los cuerpos que se envían a la hoja. Cualquier diferencia hace fallar la prueba.
//
// El Apps Script se simula interceptando las peticiones: nunca se toca la hoja real.
// Todo lo externo (Google Fonts, etc.) se bloquea para que el resultado no dependa de internet.
//
// Uso (desde esta carpeta):
//   npm install          (solo la primera vez)
//   npm test
//   npm test -- --base <commit>     compara contra otro commit
//   npm test -- --archivo <ruta>    compara otro archivo en lugar de ../index.html
// Necesita Chrome o Edge instalados; si no los encuentra, define CHROME_PATH.

const { execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const puppeteer = require('puppeteer-core');

const RAIZ = path.resolve(__dirname, '..');
const BASE_COMMIT = argumento('--base') || '622a812';
const ARCHIVO = path.resolve(RAIZ, argumento('--archivo') || 'index.html');
const API_PRUEBA = 'https://script.google.com/macros/s/PRUEBA-EQUIVALENCIA/exec';

const BASE = { ok: true, nombre: 'Familia Ejemplo', novios: 'Giovana de Jesús Rojas Pérez y Jesús Antero Varela Almanza', fechaBoda: '2027-03-20', fechaLimite: '2027-02-20' };
const inv = extra => ({ ...BASE, asiste: '', acompanantes: [], cerrado: false, cupo: 2, ...extra });
const SI = 'input[name=asiste][value="Sí"]';
const NO = 'input[name=asiste][value="No"]';
const CANTIDAD = n => `input[name=cantidad][value="${n}"]`;

const ESCENARIOS = [
  { nombre: 'Cupo 2: Sí con acompañantes, validación, cambiar respuesta y No', get: inv({}), pasos: [
    ['ver'], ['clic', SI], ['ver'],
    ['clic', CANTIDAD(2)], ['ver'],
    ['escribir', '#acompanante-0', 'Ana Rojas'],
    ['clic', CANTIDAD(1)], ['ver'],
    ['clic', CANTIDAD(2)], ['ver'],
    ['enviar'], ['ver'],
    ['escribir', '#acompanante-1', 'Inés Pérez'], ['ver'],
    ['enviar'], ['ver'],
    ['clic', '#boton-cambiar'], ['ver'],
    ['clic', NO], ['ver'],
    ['enviar'], ['ver']
  ] },
  { nombre: 'Enviar sin elegir Sí o No', get: inv({}), pasos: [['enviar'], ['ver']] },
  { nombre: 'Sí sin elegir cuántos acompañantes', get: inv({}), pasos: [['clic', SI], ['enviar'], ['ver']] },
  { nombre: 'Cupo 0', get: inv({ cupo: 0 }), pasos: [['ver'], ['clic', SI], ['ver'], ['enviar'], ['ver']] },
  { nombre: 'Cupo 1 con acompañante', get: inv({ cupo: 1 }), pasos: [
    ['clic', SI], ['ver'], ['clic', CANTIDAD(1)], ['escribir', '#acompanante-0', 'Hilda Varela'], ['enviar'], ['ver']] },
  { nombre: 'Cupo 2: "Solo yo"', get: inv({}), pasos: [['clic', SI], ['clic', CANTIDAD(0)], ['ver'], ['enviar'], ['ver']] },
  { nombre: 'Ya había respondido Sí con 2 acompañantes', get: inv({ asiste: 'Sí', acompanantes: ['Ana Rojas', 'Iván Pérez'] }), pasos: [
    ['ver'], ['clic', '#boton-cambiar'], ['ver']] },
  { nombre: 'Ya había respondido No', get: inv({ asiste: 'No' }), pasos: [['ver'], ['clic', '#boton-cambiar'], ['ver']] },
  { nombre: 'Periodo cerrado sin responder', get: inv({ cerrado: true }), pasos: [['ver']] },
  { nombre: 'Periodo cerrado con respuesta', get: inv({ cerrado: true, asiste: 'Sí', acompanantes: ['Ana Rojas'] }), pasos: [['ver']] },
  { nombre: 'Link sin token', get: inv({}), sinToken: true, pasos: [['ver']] },
  { nombre: 'Token que la hoja no reconoce', get: { ok: false, error: 'No encontramos tu invitación.' }, pasos: [['ver']] },
  { nombre: 'Sin conexión al cargar', get: 'sin-red', pasos: [['ver']] },
  { nombre: 'La hoja rechaza la respuesta', get: inv({}), post: { ok: false, error: 'No pudimos guardar en la hoja.' }, pasos: [
    ['clic', NO], ['enviar'], ['ver']] },
  { nombre: 'Sin conexión al enviar', get: inv({}), post: 'sin-red', pasos: [['clic', NO], ['enviar'], ['ver']] }
];

// Lo que el invitado ve y lo que la página guarda, en un momento dado (corre dentro del navegador).
function observar() {
  const $ = id => document.getElementById(id);
  const oculto = id => { const el = $(id); if (!el) return 'NO EXISTE'; for (let e = el; e; e = e.parentElement) if (e.hidden) return true; return false; };
  const texto = id => ($(id) ? $(id).textContent.replace(/\s+/g, ' ').trim() : 'NO EXISTE');
  return {
    ocultos: Object.fromEntries(['carga', 'error', 'contenido', 'detalles', 'formulario', 'bloque-acompanantes', 'resumen', 'boton-cambiar', 'vestimenta', 'mensaje'].map(id => [id, oculto(id)])),
    textos: Object.fromEntries(['error', 'nombre-invitado', 'texto-cupo', 'fecha', 'cuenta', 'nota-limite', 'resumen-titulo', 'resumen-texto', 'nota-resumen', 'mensaje', 'completos', 'vestimenta', 'titulo-confirmacion'].map(id => [id, texto(id)])),
    saludo: [...document.querySelectorAll('.saludo p')].map(p => p.textContent.trim()),
    asiste: (document.querySelector('input[name=asiste]:checked') || {}).value || '',
    chips: [...document.querySelectorAll('#chips label')].map(l => ({ texto: l.textContent.trim(), valor: l.querySelector('input').value, elegido: l.querySelector('input').checked })),
    campos: [...document.querySelectorAll('#campos-nombres .campo')].map(c => ({
      etiqueta: c.querySelector('label').textContent, para: c.querySelector('label').htmlFor, id: c.querySelector('input').id,
      valor: c.querySelector('input').value, invalido: c.querySelector('input').getAttribute('aria-invalid'), max: c.querySelector('input').maxLength })),
    foco: document.activeElement && (document.activeElement.id || (document.activeElement.name ? `${document.activeElement.name}=${document.activeElement.value}` : document.activeElement.tagName)),
    boton: { texto: $('boton-enviar').textContent, deshabilitado: $('boton-enviar').disabled },
    lugares: [...document.querySelectorAll('#lugares > *')].map(l => ({
      textos: [...l.querySelectorAll('h3, p')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
      mapa: (l.querySelector('a') || {}).href, destino: (l.querySelector('a') || {}).target })),
    leyendas: [...document.querySelectorAll('#formulario legend')].map(l => l.textContent.trim()),
    opciones: [...document.querySelectorAll('label.opcion')].map(l => l.textContent.trim())
  };
}

main().catch(e => { console.error(e.message || e); process.exit(2); });

async function main() {
  const actual = fs.readFileSync(ARCHIVO, 'utf8');
  const evento = bloqueEvento(actual);
  const original = prepararPagina(execFileSync('git', ['show', `${BASE_COMMIT}:index.html`], { cwd: RAIZ, encoding: 'utf8' }), evento);
  const nueva = prepararPagina(actual, evento);

  const servidor = await servir({ '/original.html': original, '/index.html': nueva });
  const puerto = servidor.address().port;
  const navegador = await puppeteer.launch({ executablePath: buscarNavegador(), headless: true, args: ['--no-sandbox'] });

  console.log(`Comparando la confirmación de ${path.relative(RAIZ, ARCHIVO)} contra el commit ${BASE_COMMIT}…\n`);
  let fallas = 0, observaciones = 0, envios = 0;
  try {
    for (const esc of ESCENARIOS) {
      const a = await recorrer(navegador, `http://127.0.0.1:${puerto}/original.html`, esc);
      const b = await recorrer(navegador, `http://127.0.0.1:${puerto}/index.html`, esc);
      const diferencias = [];
      comparar(a, b, '', diferencias);
      if (b.errores.length) diferencias.push(`errores de JavaScript en la versión actual: ${b.errores.join(' | ')}`);
      observaciones += b.pasos.length;
      envios += b.envios.length;
      if (diferencias.length) {
        fallas++;
        console.log(`FALLA  ${esc.nombre}`);
        diferencias.forEach(d => console.log(`         ${d}`));
      } else {
        console.log(`OK     ${esc.nombre}`);
      }
    }
  } finally {
    await navegador.close();
    servidor.close();
  }

  console.log(`\n${ESCENARIOS.length} escenarios, ${observaciones} observaciones, ${envios} envíos a la hoja.`);
  if (fallas) {
    console.log(`${fallas} escenario(s) se comportan distinto a la versión original.`);
    process.exit(1);
  }
  console.log('La confirmación de asistencia se comporta idéntica a la versión original.');
}

async function recorrer(navegador, url, esc) {
  const page = await navegador.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const envios = [];
  const errores = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.setRequestInterception(true);
  page.on('request', req => {
    const u = req.url();
    if (u.startsWith('http://127.0.0.1:')) return req.continue();
    if (!u.startsWith(API_PRUEBA)) return req.abort(); // nada externo: la prueba no depende de internet
    const cors = { 'Access-Control-Allow-Origin': '*' };
    if (req.method() === 'POST') {
      const cuerpo = JSON.parse(req.postData() || '{}');
      envios.push({ cuerpo, tipo: req.headers()['content-type'] });
      if (esc.post === 'sin-red') return req.abort();
      const r = esc.post || { ok: true, asiste: cuerpo.asiste, acompanantes: cuerpo.acompanantes };
      return setTimeout(() => req.respond({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify(r) }), 150);
    }
    if (esc.get === 'sin-red') return req.abort();
    req.respond({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify(esc.get) });
  });
  await page.goto(url + (esc.sinToken ? '' : '?t=token-de-prueba'), { waitUntil: 'networkidle0' });
  const pasos = [];
  for (const [accion, selector, valor] of esc.pasos) {
    if (accion === 'ver') pasos.push(await page.evaluate(observar));
    else if (accion === 'clic') { await page.click(selector); await esperar(150); }
    else if (accion === 'escribir') { await page.click(selector); await page.type(selector, valor); }
    else if (accion === 'enviar') { await page.click('#boton-enviar'); await esperar(700); }
  }
  await page.close();
  return { pasos, envios, errores };
}

function comparar(x, y, ruta, salida) {
  if (x && y && typeof x === 'object' && typeof y === 'object' && Array.isArray(x) === Array.isArray(y) && (!Array.isArray(x) || x.length === y.length)) {
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) {
      if (k === 'errores') continue;
      comparar(x[k], y[k], ruta ? `${ruta}.${k}` : k, salida);
    }
  } else if (JSON.stringify(x) !== JSON.stringify(y)) {
    salida.push(`${ruta}: original ${JSON.stringify(x)}  →  actual ${JSON.stringify(y)}`);
  }
}

// El bloque EVENTO (lugares, vestimenta) es configuración, no funcionalidad: ambas versiones usan el actual.
function bloqueEvento(html) {
  const m = /const EVENTO = \{[\s\S]*?\n  \};/.exec(html);
  if (!m) throw new Error('No encontré el bloque "const EVENTO = { … };" en la versión actual.');
  return m[0];
}

function prepararPagina(html, evento) {
  if (!/const API_URL = '[^']*';/.test(html)) throw new Error('No encontré "const API_URL = …;" en una de las versiones.');
  return html
    .replace(/const API_URL = '[^']*';/, `const API_URL = '${API_PRUEBA}';`)
    .replace(/const EVENTO = \{[\s\S]*?\n  \};/, () => evento);
}

function servir(paginas) {
  const tipos = { '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2', '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml' };
  const servidor = http.createServer((req, res) => {
    const ruta = decodeURIComponent(req.url.split('?')[0]);
    if (paginas[ruta]) {
      res.writeHead(200, { 'Content-Type': tipos['.html'] });
      return res.end(paginas[ruta]);
    }
    const archivo = path.join(RAIZ, ruta);
    if (!archivo.startsWith(RAIZ) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(archivo)] || 'application/octet-stream' });
    fs.createReadStream(archivo).pipe(res);
  });
  return new Promise(resolver => servidor.listen(0, '127.0.0.1', () => resolver(servidor)));
}

function buscarNavegador() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidatos = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'
  ];
  const hallado = candidatos.find(p => fs.existsSync(p));
  if (!hallado) throw new Error('No encontré Chrome ni Edge. Define CHROME_PATH con la ruta de tu navegador.');
  return hallado;
}

function argumento(nombre) {
  const i = process.argv.indexOf(nombre);
  return i > -1 ? process.argv[i + 1] : null;
}

function esperar(ms) { return new Promise(r => setTimeout(r, ms)); }
