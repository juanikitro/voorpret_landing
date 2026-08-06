/* ============================================================================
   IDEAS DE VIAJE — fuente única de contenido
   ----------------------------------------------------------------------------
   ► Cada idea es un punto de partida para armar un viaje a medida.
   ► No publicar fechas, duración, salidas, rutas ni servicios cerrados.
   ► FOTOS → se buscan en /images/paquetes/<id>.webp; `imagen` permite
     reutilizar una foto existente o forzar la ilustración.
   ========================================================================== */

/** Ilustración risográfica generada por código. Ver components/ArteDestino.tsx */
export type Arte = {
  cielo: string[]
  astro?: { cx: number; cy: number; r: number; color: string }
  capas: { pts: [number, number][]; color: string; suave?: boolean }[]
  reflejo?: { cx: number; y0: number; y1: number; color: string; trasCapa: number }
  detalle?: 'palmeras' | 'cupulas' | 'torii' | 'piramides' | 'cactus' | 'terrazas'
}

export type Paquete = {
  id: string
  nombre: string
  /** Bajada corta y concreta. Sin signos de exclamación. */
  subtitulo: string
  /** Destinos o competencias que ayudan a imaginar la idea. */
  posibilidades: string[]
  etiquetaPosibilidades?: 'Posibles competencias'
  destacado?: boolean
  imagen?: string | null
  foco?: string
  arte: Arte
}

const arteAndes: Arte = {
  cielo: ['#5A1280', '#E8613C', '#F7D96B'],
  capas: [
    { color: '#7A1CB4', pts: [[0, 356], [200, 306], [400, 352], [600, 300], [800, 348], [1000, 314]] },
    { color: '#E8613C', pts: [[0, 404], [180, 366], [380, 410], [580, 360], [790, 404], [1000, 372]] },
    { color: '#C4841A', pts: [[0, 450], [200, 420], [420, 458], [640, 414], [840, 454], [1000, 428]] },
    { color: '#241A13', pts: [[0, 548], [250, 532], [520, 556], [780, 534], [1000, 550]] },
  ],
  detalle: 'cactus',
}

const arteCaribe: Arte = {
  cielo: ['#4A1270', '#E8613C', '#F9CE5A'],
  astro: { cx: 520, cy: 372, r: 96, color: '#FFE07A' },
  capas: [
    { color: '#3A1550', pts: [[0, 418], [1000, 418]] },
    { color: '#2A1039', pts: [[0, 470], [1000, 468]] },
    { color: '#2C2118', suave: true, pts: [[0, 532], [250, 520], [520, 538], [780, 522], [1000, 534]] },
  ],
  reflejo: { cx: 520, y0: 418, y1: 524, color: '#FFE07A', trasCapa: 1 },
  detalle: 'palmeras',
}

const arteEuropa: Arte = {
  cielo: ['#5A1280', '#C287E4', '#F4E3CB'],
  astro: { cx: 250, cy: 292, r: 62, color: '#F3C126' },
  capas: [
    { color: '#6D2E96', pts: [[0, 416], [92, 410], [186, 374], [276, 414], [406, 408], [476, 358], [546, 412], [666, 404], [746, 368], [826, 412], [1000, 406]] },
    { color: '#2A0C3E', pts: [[0, 474], [134, 466], [264, 478], [394, 460], [524, 476], [654, 458], [804, 476], [1000, 464]] },
    { color: '#1B0827', suave: true, pts: [[0, 548], [280, 536], [560, 554], [820, 538], [1000, 550]] },
  ],
  detalle: 'cupulas',
}

const arteJapon: Arte = {
  cielo: ['#2E0E44', '#B24A80', '#F0A15E'],
  astro: { cx: 296, cy: 250, r: 84, color: '#F9E3B0' },
  capas: [
    { color: '#6B2093', pts: [[0, 414], [190, 406], [330, 368], [420, 300], [468, 262], [492, 254], [534, 254], [558, 262], [604, 300], [694, 368], [830, 406], [1000, 412]] },
    { color: '#2A1038', suave: true, pts: [[0, 476], [260, 456], [520, 484], [780, 458], [1000, 480]] },
  ],
  detalle: 'torii',
}

const arteSafari: Arte = {
  cielo: ['#7B1BA8', '#E8613C', '#F7CE5E'],
  astro: { cx: 712, cy: 300, r: 76, color: '#FFE07A' },
  capas: [
    { color: '#D89A2E', suave: true, pts: [[0, 418], [220, 396], [460, 424], [700, 394], [1000, 418]] },
    { color: '#8A5A16', suave: true, pts: [[0, 494], [260, 470], [540, 502], [800, 472], [1000, 496]] },
    { color: '#241A13', suave: true, pts: [[0, 560], [300, 544], [600, 568], [860, 546], [1000, 562]] },
  ],
}

export const paquetes: Paquete[] = [
  {
    id: 'argentina',
    nombre: 'Viajar por Argentina',
    subtitulo: 'Paisajes, ciudades y experiencias para descubrir el país a tu ritmo.',
    posibilidades: ['Patagonia', 'Cataratas', 'Mendoza', 'Salta y Jujuy', 'Córdoba'],
    destacado: true,
    imagen: '/images/paquetes/norte.webp',
    arte: arteAndes,
  },
  {
    id: 'europa',
    nombre: 'Mi primer viaje a Europa',
    subtitulo: 'Una primera experiencia europea pensada alrededor de tus ciudades soñadas.',
    posibilidades: ['Madrid', 'Barcelona', 'París', 'Roma', 'Florencia', 'Londres'],
    arte: arteEuropa,
  },
  {
    id: 'caribe',
    nombre: 'Mi primer viaje al Caribe',
    subtitulo: 'Playa, descanso y el tipo de escapada que imaginás.',
    posibilidades: ['Punta Cana', 'Riviera Maya', 'Aruba', 'Curazao', 'Jamaica'],
    arte: arteCaribe,
  },
  {
    id: 'brasil',
    nombre: 'Un viaje por Brasil',
    subtitulo: 'Playas, cultura, naturaleza o ciudades para vivir Brasil como más te guste.',
    posibilidades: ['Río de Janeiro', 'Búzios', 'Florianópolis', 'Salvador', 'Porto de Galinhas'],
    arte: arteCaribe,
  },
  {
    id: 'disney',
    nombre: 'Disney en familia',
    subtitulo: 'Un viaje para disfrutar en familia, pensado según las edades y preferencias de cada uno.',
    posibilidades: ['Orlando', 'Walt Disney World', 'Disney Cruise Line', 'Disneyland California', 'Disneyland Paris'],
    arte: arteEuropa,
  },
  {
    id: 'destinos-exoticos',
    nombre: 'Destinos exóticos',
    subtitulo: 'India, Tailandia, China, Japón, Dubái y otros destinos para salir de lo conocido.',
    posibilidades: ['India', 'Tailandia', 'China', 'Japón', 'Dubái', 'Vietnam'],
    imagen: '/images/paquetes/japon.webp',
    arte: arteJapon,
  },
  {
    id: 'safari',
    nombre: 'Un safari por África',
    subtitulo: 'Naturaleza, fauna y aventura en una experiencia diseñada a tu medida.',
    posibilidades: ['Kenia', 'Tanzania', 'Sudáfrica', 'Botsuana', 'Namibia'],
    arte: arteSafari,
  },
  {
    id: 'formula-1-y-automovilismo',
    nombre: 'Fórmula 1 y automovilismo',
    subtitulo: 'Carreras, circuitos y una escapada alrededor de la pasión por el motor.',
    posibilidades: ['Gran Premio de Mónaco', 'Gran Premio de Gran Bretaña', 'Gran Premio de Italia', 'Gran Premio de São Paulo', 'Gran Premio de Abu Dhabi'],
    etiquetaPosibilidades: 'Posibles competencias',
    arte: arteAndes,
  },
]
