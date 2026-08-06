/* ============================================================================
   PAQUETES / PROPUESTAS — fuente única de contenido
   ----------------------------------------------------------------------------
   ► Para agregar, editar o quitar una propuesta, tocá SOLO este archivo.
   ► `demo: true`  → contenido inventado para la demo. Reemplazar o borrar
     antes de publicar. La única propuesta con datos reales es `peru`.
   ► FOTOS         → no se declaran acá. Cada paquete busca automáticamente
     /images/paquetes/<id>.webp cuando `usarFotos` está activo en
     src/data/imagenes.ts. Ver docs/imagenes.md
   ========================================================================== */

export type Categoria = 'Salida grupal acompañada' | 'Escapada' | 'Viaje a medida'

/** Ilustración risográfica generada por código. Ver components/ArteDestino.tsx */
export type Arte = {
  /** Gradiente del cielo, de arriba hacia abajo (2 o 3 colores) */
  cielo: string[]
  /** Sol / luna */
  astro?: { cx: number; cy: number; r: number; color: string }
  /** Capas de silueta, del fondo al frente. Puntos en un lienzo de 1000 x 620 */
  capas: { pts: [number, number][]; color: string; suave?: boolean }[]
  /** Reflejo del sol en el agua. `trasCapa` = índice de la capa que es el mar. */
  reflejo?: { cx: number; y0: number; y1: number; color: string; trasCapa: number }
  /** Elemento decorativo en primer plano */
  detalle?: 'palmeras' | 'cupulas' | 'torii' | 'piramides' | 'cactus' | 'terrazas'
}

export type Paquete = {
  id: string
  nombre: string
  /** Bajada corta y concreta. Sin signos de exclamación. */
  subtitulo: string
  categoria: Categoria
  /** Cuándo. Puede ser un mes concreto o una temporada. */
  temporada: string
  duracion: string
  salida: string
  recorrido: string[]
  incluye: string[]
  /** Aclaración honesta al pie del panel */
  nota?: string
  destacado?: boolean
  demo?: boolean
  /**
   * Normalmente no hace falta: la foto se busca sola en
   * /images/paquetes/<id>.webp
   *
   * Sólo usalo para excepciones:
   *   imagen: '/images/paquetes/otra-foto.webp'  → esa foto en particular
   *   imagen: null                              → forzar la ilustración
   */
  imagen?: string | null
  /**
   * Qué parte de la foto no se puede perder al recortar (`object-position`).
   * Ej: 'center 35%' para que no se corte una cumbre; '65% center' para
   * mantener algo que está a la derecha. Sólo aplica si hay foto.
   */
  foco?: string
  arte: Arte
}

/* -------------------------------------------------------------------------- */

export const paquetes: Paquete[] = [
  /* ===== DATOS REALES — verificados con la agencia ======================== */
  {
    id: 'peru',
    nombre: 'Encantos del Perú',
    subtitulo:
      'Nuestra salida grupal de octubre 2026, con coordinador argentino desde Ezeiza hasta la vuelta.',
    categoria: 'Salida grupal acompañada',
    temporada: 'Octubre 2026',
    duracion: '7 noches',
    salida: 'Buenos Aires · LATAM',
    recorrido: ['Lima', 'Cusco', 'Valle Sagrado', 'Machu Picchu', 'Aguas Calientes'],
    incluye: [
      'Aéreos con LATAM desde Buenos Aires',
      '7 noches de alojamiento con desayuno',
      'Traslados de llegada y salida',
      'Coordinador acompañante desde Argentina',
      'Asistencia al viajero',
      'Grupo reducido con salida garantizada',
    ],
    nota: 'Cupos limitados. Escribinos y te pasamos el detalle completo del itinerario y las condiciones.',
    destacado: true,
    arte: {
      // Andes al atardecer: una cumbre dominante (silueta tipo Huayna Picchu)
      cielo: ['#28093A', '#8A28B0', '#EE7A46'],
      astro: { cx: 742, cy: 232, r: 88, color: '#F3C126' },
      capas: [
        {
          color: '#5D1B88',
          pts: [
            [0, 396], [92, 344], [176, 376], [268, 300], [356, 352], [440, 318],
            [512, 236], [560, 196], [608, 258], [700, 318], [772, 286], [860, 352],
            [938, 306], [1000, 338],
          ],
        },
        {
          color: '#3C1057',
          pts: [
            [0, 448], [122, 412], [224, 452], [336, 402], [448, 444], [566, 408],
            [684, 450], [802, 414], [900, 452], [1000, 426],
          ],
        },
        {
          color: '#241A13',
          pts: [
            [0, 516], [164, 490], [326, 524], [486, 496], [646, 528], [806, 500],
            [922, 524], [1000, 508],
          ],
        },
      ],
      detalle: 'terrazas',
    },
  },

  /* ===== DEMO — contenido de muestra, reemplazar antes de publicar ======== */
  {
    id: 'caribe',
    nombre: 'Caribe a tu manera',
    subtitulo: 'Una escapada de playa que podemos cotizar según las fechas, el hotel y el ritmo de viaje que buscás.',
    categoria: 'Escapada',
    temporada: 'Todo el año, según disponibilidad',
    duracion: 'A definir',
    salida: 'A coordinar según tu ciudad',
    recorrido: ['Punta Cana', 'Puerto Plata', 'Riviera Maya'],
    incluye: [
      'Opciones de vuelos según fechas y ciudad de salida',
      'Hoteles con el régimen que prefieras',
      'Traslados para sumar si los necesitás',
      'Asistencia al viajero para comparar',
    ],
    nota: 'Ejemplo de viaje a cotizar. Con fechas y cantidad de pasajeros, te mostramos alternativas reales.',
    demo: true,
    arte: {
      // Sol bajando sobre el mar, palmeras en contraluz
      cielo: ['#4A1270', '#E8613C', '#F9CE5A'],
      astro: { cx: 520, cy: 372, r: 96, color: '#FFE07A' },
      capas: [
        { color: '#3A1550', pts: [[0, 418], [1000, 418]] },
        { color: '#2A1039', pts: [[0, 470], [1000, 468]] },
        { color: '#2C2118', suave: true, pts: [[0, 532], [250, 520], [520, 538], [780, 522], [1000, 534]] },
      ],
      reflejo: { cx: 520, y0: 418, y1: 524, color: '#FFE07A', trasCapa: 1 },
      detalle: 'palmeras',
    },
  },
  {
    id: 'europa',
    nombre: 'Europa, ciudad por ciudad',
    subtitulo: 'Un recorrido por ciudades clásicas que podemos ajustar a tus tiempos, intereses y presupuesto.',
    categoria: 'Salida grupal acompañada',
    temporada: 'A coordinar',
    duracion: 'A definir',
    salida: 'Desde la ciudad que elijas',
    recorrido: ['Madrid', 'París', 'Roma', 'Florencia', 'Venecia'],
    incluye: [
      'Vuelos y conexiones según la fecha elegida',
      'Alojamiento por zona y categoría',
      'Trenes, vuelos internos o traslados entre ciudades',
      'Excursiones para sumar según tus intereses',
      'Asistencia al viajero',
    ],
    demo: true,
    arte: {
      // Cielo que se aclara hacia el horizonte: la ciudad recorta en contraluz
      cielo: ['#5A1280', '#C287E4', '#F4E3CB'],
      astro: { cx: 250, cy: 292, r: 62, color: '#F3C126' },
      capas: [
        {
          color: '#6D2E96',
          pts: [
            [0, 416], [92, 410], [186, 374], [276, 414], [406, 408], [476, 358],
            [546, 412], [666, 404], [746, 368], [826, 412], [1000, 406],
          ],
        },
        {
          color: '#2A0C3E',
          pts: [
            [0, 474], [134, 466], [264, 478], [394, 460], [524, 476], [654, 458],
            [804, 476], [1000, 464],
          ],
        },
        {
          color: '#1B0827',
          suave: true,
          pts: [[0, 548], [280, 536], [560, 554], [820, 538], [1000, 550]],
        },
      ],
      detalle: 'cupulas',
    },
  },
  {
    id: 'norte',
    nombre: 'Norte argentino a medida',
    subtitulo: 'Salta, Jujuy y otros paisajes del norte en un recorrido pensado para los días que tengas.',
    categoria: 'Escapada',
    temporada: 'A coordinar según la época',
    duracion: 'A definir',
    salida: 'Desde tu ciudad',
    recorrido: ['Salta', 'Purmamarca', 'Humahuaca', 'Salinas Grandes', 'Cafayate'],
    incluye: [
      'Traslados o alquiler de auto, según prefieras',
      'Alojamiento en las paradas del recorrido',
      'Excursiones para elegir en cada destino',
      'Asistencia al viajero',
    ],
    nota: 'Ejemplo de recorrido. Podemos adaptarlo para viajar en auto, en avión o combinarlo con otros destinos.',
    demo: true,
    arte: {
      // Estratos de color apilados: el guiño al Cerro de los Siete Colores
      cielo: ['#5A1280', '#E8613C', '#F7D96B'],
      capas: [
        { color: '#7A1CB4', pts: [[0, 356], [200, 306], [400, 352], [600, 300], [800, 348], [1000, 314]] },
        { color: '#E8613C', pts: [[0, 404], [180, 366], [380, 410], [580, 360], [790, 404], [1000, 372]] },
        { color: '#C4841A', pts: [[0, 450], [200, 420], [420, 458], [640, 414], [840, 454], [1000, 428]] },
        { color: '#7A4A12', pts: [[0, 496], [220, 472], [460, 504], [700, 470], [1000, 498]] },
        { color: '#241A13', pts: [[0, 548], [250, 532], [520, 556], [780, 534], [1000, 550]] },
      ],
      detalle: 'cactus',
    },
  },
  {
    id: 'japon',
    nombre: 'Japón a medida',
    subtitulo: 'Un itinerario construido con vos, definiendo ciudades, traslados internos y el tiempo que querés quedarte en cada lugar.',
    categoria: 'Viaje a medida',
    temporada: 'A coordinar según tu viaje',
    duracion: 'A definir',
    salida: 'Desde la ciudad que elijas',
    recorrido: ['Tokio', 'Kioto', 'Nara', 'Osaka', 'Hakone'],
    incluye: [
      'Opciones de vuelos para comparar',
      'Alojamiento según zona y presupuesto',
      'Pases y traslados internos que necesites',
      'Un itinerario ordenado, día por día',
      'Asistencia al viajero',
    ],
    nota: 'Ejemplo de viaje a medida. Definimos con vos qué ciudades visitar, cuánto tiempo quedarte y cómo conectarlas.',
    demo: true,
    arte: {
      // Cono simétrico y torii: silueta reconocible sin caer en el cliché
      cielo: ['#2E0E44', '#B24A80', '#F0A15E'],
      astro: { cx: 296, cy: 250, r: 84, color: '#F9E3B0' },
      capas: [
        {
          color: '#6B2093',
          pts: [
            [0, 414], [190, 406], [330, 368], [420, 300], [468, 262], [492, 254],
            [534, 254], [558, 262], [604, 300], [694, 368], [830, 406], [1000, 412],
          ],
        },
        { color: '#2A1038', suave: true, pts: [[0, 476], [260, 456], [520, 484], [780, 458], [1000, 480]] },
      ],
      detalle: 'torii',
    },
  },
  {
    id: 'egipto',
    nombre: 'Egipto y Dubái',
    subtitulo: 'Dos destinos con mucha historia para armar en un mismo viaje, definiendo el recorrido y los servicios con vos.',
    categoria: 'Salida grupal acompañada',
    temporada: 'A coordinar',
    duracion: 'A definir',
    salida: 'Desde la ciudad que elijas',
    recorrido: ['El Cairo', 'Luxor', 'Asuán', 'Abu Simbel', 'Dubái'],
    incluye: [
      'Vuelos internacionales e internos para cotizar',
      'Opciones de crucero por el Nilo',
      'Hoteles según categoría y ubicación',
      'Excursiones y guías para sumar al recorrido',
      'Asistencia al viajero',
    ],
    demo: true,
    arte: {
      // Dunas cálidas: las pirámides recortan oscuras sobre la arena
      cielo: ['#7B1BA8', '#E8613C', '#F7CE5E'],
      astro: { cx: 712, cy: 300, r: 76, color: '#FFE07A' },
      capas: [
        { color: '#D89A2E', suave: true, pts: [[0, 418], [220, 396], [460, 424], [700, 394], [1000, 418]] },
        { color: '#8A5A16', suave: true, pts: [[0, 494], [260, 470], [540, 502], [800, 472], [1000, 496]] },
        { color: '#241A13', suave: true, pts: [[0, 560], [300, 544], [600, 568], [860, 546], [1000, 562]] },
      ],
      detalle: 'piramides',
    },
  },
  {
    id: 'brasil',
    nombre: 'Brasil para cortar la rutina',
    subtitulo: 'Una escapada de pocos días para aprovechar un feriado o unas vacaciones cortas, según el destino que elijas.',
    categoria: 'Escapada',
    temporada: 'Feriados y verano, según disponibilidad',
    duracion: 'A definir',
    salida: 'A coordinar según tu ciudad',
    recorrido: ['Río de Janeiro', 'Búzios', 'Florianópolis'],
    incluye: [
      'Vuelos según la fecha y ciudad de salida',
      'Alojamiento cerca de la zona que te interese',
      'Traslados para sumar si los necesitás',
      'Asistencia al viajero',
    ],
    demo: true,
    arte: {
      // Morros redondeados sobre la bahía
      cielo: ['#3E0F5C', '#B2447A', '#F7C95E'],
      astro: { cx: 176, cy: 306, r: 70, color: '#FFE07A' },
      capas: [
        { color: '#64208E', suave: true, pts: [[0, 410], [170, 400], [336, 300], [470, 392], [620, 318], [760, 398], [900, 348], [1000, 404]] },
        { color: '#33154A', pts: [[0, 452], [1000, 448]] },
        { color: '#2C2118', suave: true, pts: [[0, 540], [300, 526], [600, 544], [860, 528], [1000, 540]] },
      ],
      reflejo: { cx: 176, y0: 452, y1: 534, color: '#FFE07A', trasCapa: 1 },
      detalle: 'palmeras',
    },
  },
]

/** Filtros del índice. `null` = mostrar todo. */
export const categorias: Categoria[] = [
  'Salida grupal acompañada',
  'Escapada',
  'Viaje a medida',
]
