/* ============================================================================
   CONFIGURACIÓN DEL SITIO — Voorpret 25 de Mayo
   ----------------------------------------------------------------------------
   Único lugar donde se editan datos de contacto, textos institucionales
   y enlaces. Cambiá acá y se actualiza en toda la landing.
   ========================================================================== */

export const sitio = {
  marca: 'Voorpret',
  marcaCompleta: 'Voorpret 25 de Mayo',
  sucursal: '25 de Mayo',
  provincia: 'Buenos Aires',
  ubicacion: '25 de Mayo, Buenos Aires',
  desde: 2013,

  /** Legajo — PENDIENTE de validación final con el dueño antes de publicar. */
  legajo: '16130',

  /** WhatsApp: `visible` es lo que lee el usuario, `wa` es el formato de wa.me */
  whatsapp: {
    visible: '+54 9 2345 68-4340',
    wa: '5492345684340',
  },

  redes: {
    instagram: 'https://www.instagram.com/voorpret25/',
    instagramHandle: '@voorpret25',
    facebook: 'https://www.facebook.com/Voorpret25/',
  },

  /** Crédito discreto de estudio en el footer */
  estudio: {
    nombre: 'Mayofy',
    url: 'https://mayofy.com',
  },

  seo: {
    titulo: 'Voorpret 25 de Mayo — Viajes a medida y salidas grupales',
    descripcion:
      'Agencia de viajes en 25 de Mayo, Buenos Aires. Te ayudamos a comparar opciones y organizar salidas grupales, escapadas y viajes a medida.',
    url: 'https://voorpret.com.ar',
  },
} as const

/* --------------------------------------------------------------------------
   Definición de la palabra que da nombre a la agencia.
   Se usa una sola vez en la página, como banda editorial.
   -------------------------------------------------------------------------- */
export const definicion = {
  palabra: 'voorpret',
  fonetica: '/ˈvoːrprɛt/',
  idioma: 'neerlandés · sustantivo',
  texto: 'La alegría que se siente antes de que algo bueno pase.',
} as const

/* --------------------------------------------------------------------------
   Cómo trabajamos — cuatro momentos, de la consulta al regreso.
   -------------------------------------------------------------------------- */
export const proceso = [
  {
    n: '01',
    titulo: 'Nos contás qué tenés en mente',
    texto:
      'Puede ser un destino, una fecha aproximada o simplemente ganas de irte. Con eso alcanza para empezar la conversación.',
    label: 'Primera charla',
  },
  {
    n: '02',
    titulo: 'Te mostramos opciones',
    texto:
      'Buscamos alternativas de aéreos, alojamiento y servicios, y te explicamos con claridad qué cambia entre una y otra.',
    label: 'Alternativas',
  },
  {
    n: '03',
    titulo: 'Armamos todo',
    texto:
      'Cuando elegís, coordinamos reservas, traslados, asistencia al viajero y la documentación necesaria. Te enviamos cada confirmación por escrito.',
    label: 'Organización',
  },
  {
    n: '04',
    titulo: 'Viajás acompañado',
    texto:
      'Si necesitás consultarnos durante el viaje, seguís teniendo un contacto directo. La conversación no termina cuando se emite la reserva.',
    label: 'Antes, durante y después',
  },
] as const

/* --------------------------------------------------------------------------
   Razones de confianza. Solo datos verificables — sin métricas inventadas.
   -------------------------------------------------------------------------- */
export const confianza = [
  {
    dato: 'Desde 2013',
    texto: 'Más de una década trabajando desde 25 de Mayo con viajes nacionales e internacionales.',
  },
  {
    dato: 'Legajo 16130',
    texto: 'Agencia de viajes registrada. Trabajamos con documentación y respaldo formal.',
  },
  {
    dato: 'Atención directa',
    texto: 'Hablás por WhatsApp con el equipo de la agencia, sin call center de por medio.',
  },
  {
    dato: 'Argentina entera',
    texto: 'Estamos en 25 de Mayo y podemos coordinar la consulta por WhatsApp, estés donde estés.',
  },
] as const
