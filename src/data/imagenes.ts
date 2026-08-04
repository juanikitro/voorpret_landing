/* ============================================================================
   IMÁGENES
   ----------------------------------------------------------------------------
   Para pasar de ilustraciones a fotos hay UN solo interruptor: `usarFotos`.

   1. Guardá las fotos con el nombre exacto que dice docs/imagenes.md
   2. Corré:  npm run imagenes
   3. Poné `usarFotos = true` acá abajo

   Las fotos que falten siguen mostrando la ilustración: nunca queda una
   imagen rota. Volver atrás es poner `usarFotos = false`.
   ========================================================================== */

/** Ya está la foto del hero. */
export const usarFotoHero = true

/** Las 7 fotos de destinos están cargadas. */
export const usarFotosPaquetes = true

/** Rutas y tamaños de los recursos rasterizados de la marca. */
const RUTA_PAQUETES = '/images/paquetes'
const RUTA_MARCA = '/brand'

export type ImagenResponsive = {
  /** Fallback y fuente más grande disponible. */
  src: string
  srcSet: string
  sizes: string
  width: number
  height: number
  /** En mobile el panel no necesita descargar su original de 1600 px. */
  movilSrcSet?: string
  movilMedia?: string
}

export const logoMarca: ImagenResponsive = {
  src: `${RUTA_MARCA}/voorpret-logo-256.webp`,
  srcSet: `${RUTA_MARCA}/voorpret-logo-128.webp 128w, ${RUTA_MARCA}/voorpret-logo-256.webp 256w`,
  sizes: '(max-width: 639px) 62px, 79px',
  width: 256,
  height: 182,
}

export type Foto = {
  /** Imagen para pantallas anchas */
  ancha: string
  /** Recorte vertical para celulares. Si falta, se usa `ancha`. */
  alta?: string
  /** Describí la escena, no la marca. Lo leen los lectores de pantalla. */
  alt: string
  /**
   * Zona que nunca se debe recortar, en formato `object-position`.
   * `center 30%` sube el encuadre, `70% center` lo corre a la derecha.
   */
  foco?: string
}

/* --------------------------------------------------------------------------
   HERO
   -------------------------------------------------------------------------- */

export const heroFoto: Foto = {
  ancha: '/images/hero/hero-ancha.webp',
  /** Versión móvil ya graduada: evita aplicar otro grade sobre la foto. */
  alta: '/images/hero/hero-mobile.webp',
  alt: 'Ruta de montaña al atardecer, con la cordillera y el cielo violeta en el horizonte',
  foco: 'center 58%',
}

export type SolHeroPosicion = {
  x: number
  y: number
  tamano: number
  opacidad: number
}

export type SolHeroConfig = SolHeroPosicion & {
  imagen: string
  /** Posición alternativa para el recorte vertical. */
  movil?: SolHeroPosicion
}

/**
 * Posición en porcentajes del hero, así el sol no se desacomoda cuando cambia
 * el recorte entre la foto ancha y la alta.
 *
 * `x` NO es el centro de luz de la foto cruda (medido en 39%). El velo de
 * contraste oscurece el 45% izquierdo para que se lea el titular, así que el
 * punto que el ojo percibe como más luminoso queda bastante más a la derecha.
 * Poner el sol en 39% lo metía detrás de "imaginando".
 */
export const solHero: SolHeroConfig | null = {
  imagen: '/images/hero/sol.webp',
  x: 64,
  y: 46,
  tamano: 66,
  opacidad: 0.88,
  movil: {
    x: 72,
    y: 45,
    tamano: 92,
    opacidad: 1,
  },
}

/**
 * Sol de trama (un div con CSS, no parte de la foto).
 *
 * Con la ilustración funcionaba: mismo lenguaje gráfico. Sobre una fotografía
 * se lee como una calcomanía pegada encima, así que queda apagado. La firma de
 * marca la sigue poniendo la trama de puntos que cubre toda la foto, que es
 * textura de impresión y no un objeto flotando.
 *
 * Ponelo en true si volvés a la ilustración (usarFotoHero = false).
 */
export const heroSolDeTrama = false

/**
 * Intensidad del teñido violeta/ámbar sobre las fotos (0 a 1). Es lo que hace
 * que fotos de orígenes distintos parezcan de la misma producción.
 * Bajalo si las fotos ya vienen muy cálidas.
 */
export const gradeMarca = 0.3

/* --------------------------------------------------------------------------
   PAQUETES
   -------------------------------------------------------------------------- */

/**
 * Resuelve qué imagen le toca a un paquete.
 *
 * - `override` con una ruta → usa esa
 * - `override` en `null`    → fuerza la ilustración, aunque haya foto
 * - sin `override`          → busca /images/paquetes/<id>.webp
 */
export function fotoPaquete(
  id: string,
  override?: string | null,
  /** 'mini' = versión de 320 px para la miniatura del índice cerrado */
  variante: 'mini' | 'panel' = 'panel',
): ImagenResponsive | null {
  if (override) {
    return {
      src: override,
      srcSet: override,
      sizes: variante === 'mini' ? '104px' : '(max-width: 1023px) calc(100vw - 2rem), 50vw',
      width: 1600,
      height: 900,
    }
  }
  if (override === null) return null
  if (!usarFotosPaquetes) return null

  if (variante === 'mini') {
    const mini = `${RUTA_PAQUETES}/${id}-mini.webp`
    return { src: mini, srcSet: `${mini} 320w`, sizes: '104px', width: 320, height: 180 }
  }

  const media = `${RUTA_PAQUETES}/${id}-media.webp`
  const grande = `${RUTA_PAQUETES}/${id}.webp`
  return {
    src: grande,
    srcSet: `${media} 768w, ${grande} 1600w`,
    sizes: '(max-width: 1023px) calc(100vw - 2rem), 50vw',
    width: 1600,
    height: 900,
    movilSrcSet: `${media} 768w`,
    movilMedia: '(max-width: 1023px)',
  }
}
