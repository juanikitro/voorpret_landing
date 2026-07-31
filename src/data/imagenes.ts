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

/** Poné true cuando tengas las 7 fotos de los destinos en public/images/paquetes/ */
export const usarFotosPaquetes = false

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
  // Recorte vertical nativo para celular. Mientras no exista, el celular usa
  // `ancha` recortada al centro (queda bien: la ruta está centrada).
  // alta: '/images/hero/hero-alta.webp',
  alt: 'Ruta de montaña al atardecer, con la cordillera y el cielo violeta en el horizonte',
  foco: 'center 58%',
}

/**
 * El sol de trama se mantiene por encima de la foto: es la firma de la marca
 * y lo que evita que el hero parezca un banner de stock.
 * Ponelo en false si la foto ya tiene un sol marcado arriba a la derecha.
 */
export const heroSolDeTrama = true

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
export function fotoPaquete(id: string, override?: string | null): string | null {
  if (override) return override
  if (override === null) return null
  return usarFotosPaquetes ? `/images/paquetes/${id}.webp` : null
}
