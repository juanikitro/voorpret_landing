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
  { carpeta: 'public/images/hero', patron: null, ancho: 2400, etiqueta: 'hero horizontal' },
  { carpeta: 'public/images/paquetes', patron: null, ancho: 1600, etiqueta: 'destino' },
]

const CALIDAD = 80
const ENTRADAS = new Set(['.png', '.jpg', '.jpeg', '.avif', '.tif', '.tiff'])

/** Nombres que el sitio busca. Cualquier otro se convierte pero no se usa. */
const NOMBRES = {
  'public/images/hero': ['hero-ancha', 'hero-alta'],
  'public/images/paquetes': ['peru', 'caribe', 'europa', 'norte', 'japon', 'egipto', 'brasil'],
}

const kB = (b) => `${(b / 1024).toFixed(0)} kB`

function regla(carpeta, nombre) {
  const candidatas = REGLAS.filter((r) => r.carpeta === carpeta)
  return candidatas.find((r) => r.patron?.test(nombre)) ?? candidatas.find((r) => !r.patron)
}

let convertidas = 0
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
      .webp({ quality: CALIDAD, effort: 6 })
      .toFile(destino)

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

const faltanPaquetes = faltan.filter(([c]) => c.endsWith('paquetes'))
if (faltanPaquetes.length === 0) {
  console.log('\n✔ Están las 7 fotos de destinos.')
  console.log('  Poné usarFotosPaquetes = true en src/data/imagenes.ts')
} else {
  console.log(`\nFaltan ${faltanPaquetes.length} de 7 destinos:`)
  for (const [, f] of faltanPaquetes) console.log(`  · ${f}`)
  console.log('\nLos que falten siguen con su ilustración: no se rompe nada.')
}
