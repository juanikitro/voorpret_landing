/* ============================================================================
   IMÁGENES — el único archivo que hay que tocar para pasar a fotos
   ----------------------------------------------------------------------------
   Mientras `heroFoto` sea `null`, el hero sigue usando la ilustración
   vectorial generada por código. En cuanto le pongas una ruta, el hero pasa a
   fotografía sin tocar ni un componente.

   Las fotos de cada paquete se declaran en `paquetes.ts` (campo `imagen`).

   ► Especificaciones, nombres de archivo y prompts listos para copiar:
     public/images/README.md
   ========================================================================== */

export type Foto = {
  /** Imagen para pantallas anchas. Relación 16:9 aprox. */
  ancha: string
  /** Recorte vertical para celulares (3:4). Si falta, se usa `ancha`. */
  alta?: string
  /** Describí la escena, no la marca. Se lee en lectores de pantalla. */
  alt: string
  /**
   * Zona de la foto que nunca se debe recortar, en formato `object-position`.
   * Ej: 'center 65%' baja el encuadre; '30% center' lo corre a la izquierda.
   */
  foco?: string
}

/* --------------------------------------------------------------------------
   HERO
   -------------------------------------------------------------------------- */

/**
 * `null` → ilustración vectorial (estado actual, ver Hero.tsx).
 *
 * Para pasar a foto, descomentá el bloque de abajo y borrá el `null`:
 *
 * export const heroFoto: Foto | null = {
 *   ancha: '/images/hero/atardecer-ancha.webp',
 *   alta: '/images/hero/atardecer-alta.webp',
 *   alt: 'Cordillera al atardecer con un camino que se pierde en el horizonte',
 *   foco: 'center 62%',
 * }
 */
export const heroFoto: Foto | null = null

/**
 * El sol de trama se mantiene por encima de la foto: es la firma de la marca
 * y lo que evita que el hero parezca un banner de stock cualquiera.
 * Ponelo en false sólo si la foto elegida ya tiene un sol muy marcado.
 */
export const heroSolDeTrama = true

/**
 * Intensidad del "grade" de marca sobre las fotos (0 a 1).
 * Es el teñido violeta/ámbar que hace que fotos de orígenes distintos
 * parezcan de la misma producción. Bajalo si las fotos ya vienen cálidas.
 */
export const gradeMarca = 0.42
