/* ============================================================================
   npm run imagenes
   ----------------------------------------------------------------------------
   Toma cualquier PNG / JPG que dejes en public/images/ y lo convierte al WebP
   optimizado que espera el sitio, con la medida correcta según la carpeta.

   Los originales se mueven a assets-fuente/imagenes-originales/ (no se borran
   ni se publican), así podés volver a exportar en otra calidad si hace falta.
   ========================================================================== */

import sharp from 'sharp'
import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const RAIZ = process.cwd()
const RESGUARDO = join(RAIZ, 'assets-fuente', 'imagenes-originales')

/** Ancho máximo por carpeta, y por nombre de archivo cuando hace falta */
const REGLAS = [
  { carpeta: 'public/images/hero', patron: /-alta$/, ancho: 1200, etiqueta: 'hero vertical' },
  // El sol va SIN pérdida: con compresión el negro deja de ser #000 y el
  // mix-blend-screen levanta todo el rectángulo del archivo, dibujando un
  // borde visible sobre la foto.
  { carpeta: 'public/images/hero', patron: /^sol$/, ancho: 1200, etiqueta: 'sol (sin pérdida)', sinPerdida: true },
  { carpeta: 'public/images/hero', patron: null, ancho: 2400, etiqueta: 'hero horizontal' },
  { carpeta: 'public/images/paquetes', patron: null, ancho: 1600, etiqueta: 'destino' },
]

const CALIDAD = 80
/** Ancho de la miniatura que usa el índice cerrado */
const ANCHO_MINI = 320
/** Ancho para paneles de paquete en mobile. Las fuentes son 16:9. */
const ANCHO_MEDIO = 768
const ANCHOS_LOGO = [128, 256]
const ENTRADAS = new Set(['.png', '.jpg', '.jpeg', '.avif', '.tif', '.tiff'])

/** Nombres que el sitio busca. Cualquier otro se convierte pero no se usa. */
const NOMBRES = {
  'public/images/hero': ['hero-ancha', 'hero-alta', 'sol'],
  'public/images/paquetes': ['peru', 'caribe', 'europa', 'norte', 'japon', 'egipto', 'brasil'],
}

const kB = (b) => `${(b / 1024).toFixed(0)} kB`

async function fuenteExistente(carpeta, nombre) {
  for (const ext of ENTRADAS) {
    const publica = join(RAIZ, carpeta, `${nombre}${ext}`)
    if (existsSync(publica)) return publica

    const resguardada = join(RESGUARDO, `${nombre}${ext}`)
    if (existsSync(resguardada)) return resguardada
  }

  const webp = join(RAIZ, carpeta, `${nombre}.webp`)
  return existsSync(webp) ? webp : null
}

async function crearVariante(origen, destino, ancho, calidad) {
  await sharp(origen)
    .resize({ width: ancho, withoutEnlargement: true })
    .webp({ quality: calidad, effort: 6 })
    .toFile(destino)
}

function regla(carpeta, nombre) {
  const candidatas = REGLAS.filter((r) => r.carpeta === carpeta)
  return candidatas.find((r) => r.patron?.test(nombre)) ?? candidatas.find((r) => !r.patron)
}

let convertidas = 0
let variantes = 0
const sinReconocer = []

for (const carpeta of ['public/images/hero', 'public/images/paquetes']) {
  const dir = join(RAIZ, carpeta)
  if (!existsSync(dir)) continue

  for (const archivo of await readdir(dir)) {
    const ext = extname(archivo).toLowerCase()
    if (!ENTRADAS.has(ext)) continue

    const nombre = basename(archivo, ext)
    const r = regla(carpeta, nombre)
    if (!r) continue

    const origen = join(dir, archivo)
    const destino = join(dir, `${nombre}.webp`)
    const antes = (await stat(origen)).size

    const img = sharp(origen)
    const { width } = await img.metadata()
    await img
      .resize({ width: Math.min(width ?? r.ancho, r.ancho), withoutEnlargement: true })
      .webp(r.sinPerdida ? { lossless: true, effort: 6 } : { quality: CALIDAD, effort: 6 })
      .toFile(destino)

    // Variante chica para la miniatura del índice cerrado
    if (carpeta.endsWith('paquetes')) {
      await sharp(origen)
        .resize({ width: ANCHO_MINI, withoutEnlargement: true })
        .webp({ quality: 78, effort: 6 })
        .toFile(join(dir, `${nombre}-mini.webp`))
    }

    const despues = (await stat(destino)).size

    await mkdir(RESGUARDO, { recursive: true })
    await rename(origen, join(RESGUARDO, archivo))

    const ahorro = Math.round((1 - despues / antes) * 100)
    const ok = NOMBRES[carpeta].includes(nombre)
    console.log(
      `${ok ? '✓' : '?'} ${nombre}.webp`.padEnd(30) +
        `${r.etiqueta.padEnd(16)} ${kB(antes)} → ${kB(despues)}  (-${ahorro}%)`,
    )
    if (!ok) sinReconocer.push({ carpeta, nombre })
    convertidas++
  }
}

// Las variantes se regeneran también cuando no entraron archivos nuevos: así
// `npm run imagenes` deja completo un checkout recién clonado y no obliga a
// editar código para corregir una imagen responsive faltante.
for (const nombre of NOMBRES['public/images/paquetes']) {
  const origen = await fuenteExistente('public/images/paquetes', nombre)
  if (!origen) continue

  await crearVariante(origen, join(RAIZ, 'public/images/paquetes', `${nombre}-mini.webp`), ANCHO_MINI, 78)
  await crearVariante(origen, join(RAIZ, 'public/images/paquetes', `${nombre}-media.webp`), ANCHO_MEDIO, CALIDAD)
  variantes += 2
}

const logo = join(RAIZ, 'public/brand/voorpret-logo.webp')
if (existsSync(logo)) {
  for (const ancho of ANCHOS_LOGO) {
    await crearVariante(logo, join(RAIZ, 'public/brand', `voorpret-logo-${ancho}.webp`), ancho, 88)
    variantes++
  }
}

if (sinReconocer.length) {
  console.log('\n⚠ Estos nombres no los usa el sitio. Renombralos y volvé a correr:')
  for (const { carpeta, nombre } of sinReconocer) {
    console.log(`  · ${nombre}.webp  →  uno de: ${NOMBRES[carpeta].join(', ')}`)
  }
}

// Aviso de lo que falta, para no tener que acordarse de los nombres
const ESPERADOS = [
  ['public/images/hero', 'hero-ancha.webp'],
  ['public/images/hero', 'hero-alta.webp'],
  ['public/images/paquetes', 'peru.webp'],
  ['public/images/paquetes', 'caribe.webp'],
  ['public/images/paquetes', 'europa.webp'],
  ['public/images/paquetes', 'norte.webp'],
  ['public/images/paquetes', 'japon.webp'],
  ['public/images/paquetes', 'egipto.webp'],
  ['public/images/paquetes', 'brasil.webp'],
]

const faltan = ESPERADOS.filter(([c, f]) => !existsSync(join(RAIZ, c, f)))

console.log('')
console.log(convertidas === 0 ? 'No había imágenes nuevas.' : `${convertidas} imagen(es) convertida(s).`)
console.log(`${variantes} variante(s) responsive generada(s).`)

const faltanPaquetes = faltan.filter(([c]) => c.endsWith('paquetes'))
if (faltanPaquetes.length === 0) {
  console.log('\n✔ Están las 7 fotos de destinos.')
  console.log('  Poné usarFotosPaquetes = true en src/data/imagenes.ts')
} else {
  console.log(`\nFaltan ${faltanPaquetes.length} de 7 destinos:`)
  for (const [, f] of faltanPaquetes) console.log(`  · ${f}`)
  console.log('\nLos que falten siguen con su ilustración: no se rompe nada.')
}
