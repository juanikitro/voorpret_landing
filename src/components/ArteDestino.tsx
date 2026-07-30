import { useId } from 'react'
import type { Arte } from '../data/paquetes'
import { gradeMarca } from '../data/imagenes'

/* ============================================================================
   ARTE DESTINO
   ----------------------------------------------------------------------------
   Ilustración risográfica generada por código a partir del `arte` de cada
   paquete (src/data/paquetes.ts). Pesa unos pocos kB, escala a cualquier
   tamaño y mantiene una dirección visual idéntica entre destinos.

   Si el paquete tiene `imagen`, se usa la foto real en su lugar y hereda el
   mismo tratamiento de color (duotono + trama), así el reemplazo por
   fotografía real no rompe la coherencia del sistema.
   ========================================================================== */

const ALTO = 620
const ANCHO = 1000

/**
 * El gradiente de cielo se comprime en el 72% superior del lienzo: así el
 * color más cálido cae justo sobre la línea del horizonte y no queda tapado
 * por las capas de tierra.
 */
const CIERRE_CIELO = 72

/** Primer plano: siempre el valor más oscuro. Perspectiva aérea invertida. */
const INK_FRENTE = '#160F0B'

function silueta(pts: [number, number][], suave = false): string {
  if (pts.length === 0) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  if (suave) {
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      const cx = (x0 + x1) / 2
      d += ` C ${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`
    }
  } else {
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1]}`
  }
  return `${d} L ${ANCHO} ${ALTO} L 0 ${ALTO} Z`
}

/** Reflejo del sol: trazos que se acortan, como una trama impresa sobre el agua. */
function Reflejo({
  cx,
  y0,
  y1,
  color,
}: NonNullable<Arte['reflejo']>) {
  const n = 8
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const y = y0 + ((y1 - y0) * (i + 0.6)) / n
        const ancho = 108 * (1 - i / (n + 1.5)) * (i % 2 ? 0.58 : 1)
        return (
          <rect
            key={i}
            x={cx - ancho / 2}
            y={y}
            width={ancho}
            height={5}
            rx={2.5}
            opacity={0.55 - i * 0.055}
          />
        )
      })}
    </g>
  )
}

/* — Detalles de primer plano: le dan identidad concreta a cada destino ——— */

function Detalle({ tipo, color }: { tipo: NonNullable<Arte['detalle']>; color: string }) {
  switch (tipo) {
    case 'terrazas':
      // Andenes: terrazas de cultivo escalonadas sobre la ladera
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={70 + i * 26} y={598 - i * 26} width={332 - i * 46} height={27} fill="#33241A" />
              <rect x={70 + i * 26} y={598 - i * 26} width={332 - i * 46} height={3} fill="#F3C126" opacity={0.42} />
            </g>
          ))}
        </g>
      )
    case 'palmeras':
      // Palmera dibujada con la base en el origen local, creciendo hacia -y
      return (
        <g fill={color}>
          {[
            { x: 112, s: 1, f: 1 },
            { x: 906, s: 0.86, f: -1 },
            { x: 802, s: 0.56, f: -1 },
          ].map(({ x, s, f }) => (
            <g key={x} transform={`translate(${x} 604) scale(${s * f} ${s})`}>
              <path d="M -7 0 C -3 -62 -2 -122 -14 -196 L 2 -200 C 14 -124 10 -62 7 0 Z" />
              <path d="M -10 -194 c -44 -34 -90 -40 -126 -22 44 -6 82 6 116 34 Z" />
              <path d="M 2 -200 c 44 -40 92 -52 132 -38 -46 0 -84 16 -116 48 Z" />
              <path d="M -8 -204 c -22 -52 -20 -100 6 -134 -6 44 -2 84 12 128 Z" />
              <path d="M 4 -200 c 30 -44 74 -66 114 -62 -42 8 -76 30 -100 70 Z" />
              <path d="M -12 -198 c -34 -46 -78 -66 -118 -60 42 6 76 28 104 68 Z" />
            </g>
          ))}
        </g>
      )
    case 'cupulas':
      return (
        <g fill={color}>
          {/* cúpula central */}
          <path d="M 470 398 c 0 -46 22 -72 52 -72 s 52 26 52 72 Z" />
          <rect x="518" y="298" width="8" height="30" />
          <circle cx="522" cy="294" r="7" />
          {/* torres */}
          <path d="M 178 396 l 0 -74 12 -26 12 26 0 74 Z" />
          <path d="M 742 398 l 0 -62 14 -28 14 28 0 62 Z" />
          {/* tejados escalonados */}
          <path d="M 250 400 l 0 -34 34 -22 34 22 0 34 Z" />
          <path d="M 626 402 l 0 -28 28 -18 28 18 0 28 Z" />
          <path d="M 860 400 l 0 -40 26 -18 26 18 0 40 Z" />
        </g>
      )
    case 'torii':
      // Origen local al pie del portal, así siempre apoya en el suelo
      return (
        <g fill={color} transform="translate(748 620) scale(0.6)">
          <rect x="-124" y="-300" width="24" height="300" />
          <rect x="100" y="-300" width="24" height="300" />
          <rect x="-152" y="-316" width="304" height="20" rx={3} />
          <path d="M -168 -342 h 336 l -14 22 h -308 Z" />
          <rect x="-106" y="-252" width="212" height="14" />
        </g>
      )
    case 'piramides':
      return (
        <g fill={color}>
          <path d="M 468 470 L 610 470 L 539 344 Z" />
          <path d="M 596 476 L 726 476 L 661 362 Z" opacity={0.86} />
          <path d="M 706 480 L 800 480 L 753 398 Z" opacity={0.72} />
        </g>
      )
    case 'cactus':
      return (
        <g fill={color}>
          {[
            { x: 152, s: 1 },
            { x: 838, s: 0.78 },
            { x: 762, s: 0.5 },
          ].map(({ x, s }) => (
            <g key={x} transform={`translate(${x} 620) scale(${s})`}>
              <rect x="-13" y="-224" width="26" height="224" rx={13} />
              <path d="M -13 -150 h -34 a 16 16 0 0 0 -16 16 v 44 a 10 10 0 0 0 20 0 v -34 a 6 6 0 0 1 6 -6 h 24 Z" />
              <path d="M 13 -176 h 30 a 16 16 0 0 1 16 16 v 62 a 10 10 0 0 1 -20 0 v -52 a 6 6 0 0 0 -6 -6 h -20 Z" />
            </g>
          ))}
        </g>
      )
  }
}

/* -------------------------------------------------------------------------- */

type Props = {
  arte: Arte
  imagen?: string | null
  /** `object-position` de la foto. No afecta a la ilustración. */
  foco?: string
  alt?: string
  className?: string
  /** Intensifica el sol y la trama cuando el destino está activo */
  activo?: boolean
  prioridad?: boolean
}

export default function ArteDestino({
  arte,
  imagen,
  foco,
  alt = '',
  className = '',
  activo = false,
  prioridad = false,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const idCielo = `cielo-${uid}`
  const idTrama = `trama-${uid}`
  const idGrad = `grad-${uid}`

  // Foto real: hereda el encuadre, el grade y la trama de la ilustración, así
  // fotos e ilustraciones pueden convivir sin que se note el parche.
  if (imagen) {
    return (
      <div className={`relative overflow-hidden bg-ciruela ${className}`}>
        <img
          src={imagen}
          alt={alt}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding="async"
          width={1600}
          height={1000}
          className="size-full object-cover"
          style={{ objectPosition: foco ?? 'center' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background: `linear-gradient(172deg, ${arte.cielo.join(', ')})`,
            opacity: gradeMarca,
          }}
        />
        <div
          aria-hidden="true"
          className="trama pointer-events-none absolute inset-0 text-tinta opacity-20 mix-blend-multiply"
        />
        {/* Base oscura: los chips del recorrido se apoyan siempre sobre algo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tinta/70 to-transparent"
        />
      </div>
    )
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMidYMid slice"
      role={alt ? 'img' : 'presentation'}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <defs>
        <linearGradient id={idCielo} x1="0" y1="0" x2="0.12" y2="1">
          {arte.cielo.map((c, i) => (
            <stop
              key={i}
              offset={`${(i / (arte.cielo.length - 1)) * CIERRE_CIELO}%`}
              stopColor={c}
            />
          ))}
        </linearGradient>

        {/* Trama de puntos: la textura del logo, convertida en grano de impresión */}
        <pattern id={idTrama} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.1" fill="#F3C126" />
        </pattern>

        {/* La trama se desvanece hacia abajo, como una tinta que se agota */}
        <linearGradient id={idGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`m-${uid}`}>
          <rect width={ANCHO} height={ALTO} fill={`url(#${idGrad})`} />
        </mask>
      </defs>

      {/* Cielo */}
      <rect width={ANCHO} height={ALTO} fill={`url(#${idCielo})`} />

      {/* Astro */}
      {arte.astro && (
        <g className={activo ? 'anim-sol' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx={arte.astro.cx} cy={arte.astro.cy} r={arte.astro.r * 1.5} fill={arte.astro.color} opacity={0.14} />
          <circle cx={arte.astro.cx} cy={arte.astro.cy} r={arte.astro.r} fill={arte.astro.color} />
        </g>
      )}

      {/* Trama sobre el cielo */}
      <rect width={ANCHO} height={ALTO} fill={`url(#${idTrama})`} mask={`url(#m-${uid})`} opacity={activo ? 0.5 : 0.32} />

      {/* Capas de paisaje, del fondo al frente. El reflejo se intercala sobre
          el agua para que la costa quede por delante. */}
      {arte.capas.map((capa, i) => (
        <g key={i}>
          <path d={silueta(capa.pts, capa.suave)} fill={capa.color} />
          {arte.reflejo?.trasCapa === i && <Reflejo {...arte.reflejo} />}
        </g>
      ))}

      {/* Detalle de primer plano */}
      {arte.detalle && <Detalle tipo={arte.detalle} color={INK_FRENTE} />}
    </svg>
  )
}
