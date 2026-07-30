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
    titulo: 'Voorpret 25 de Mayo — Agencia de viajes | Salidas grupales y viajes a medida',
    descripcion:
      'Agencia de viajes en 25 de Mayo, Buenos Aires, desde 2013. Salidas grupales acompañadas, viajes internacionales, escapadas y paquetes a medida con asesoramiento personalizado de principio a fin.',
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
    titulo: 'Nos contás la idea',
    texto:
      'Aunque venga suelta: un destino, una fecha aproximada, con quién viajás. Sin formularios eternos ni cotizadores automáticos.',
    label: 'Primera charla',
  },
  {
    n: '02',
    titulo: 'Comparamos por vos',
    texto:
      'Buscamos alternativas reales de aéreos, alojamiento y servicios, y te las explicamos en criollo: qué cambia entre una y otra, y qué conviene según tu viaje.',
    label: 'Alternativas',
  },
  {
    n: '03',
    titulo: 'Armamos todo',
    texto:
      'Reservas, traslados, asistencia al viajero, documentación y esos detalles que nadie te avisa hasta que estás en el aeropuerto. Todo confirmado y por escrito.',
    label: 'Organización',
  },
  {
    n: '04',
    titulo: 'Viajás acompañado',
    texto:
      'Seguís teniendo con quién hablar durante el viaje. Y cuando volvés, también. Somos las mismas personas de la primera charla.',
    label: 'Antes, durante y después',
  },
] as const

/* --------------------------------------------------------------------------
   Razones de confianza. Solo datos verificables — sin métricas inventadas.
   -------------------------------------------------------------------------- */
export const confianza = [
  {
    dato: 'Desde 2013',
    texto: 'Más de una década armando viajes desde 25 de Mayo para clientes de todo el país.',
  },
  {
    dato: 'Legajo 16130',
    texto: 'Agencia de viajes registrada. Trabajamos con documentación y respaldo formal.',
  },
  {
    dato: 'Una persona real',
    texto: 'No un chatbot ni un call center. La misma persona te atiende de la consulta al regreso.',
  },
  {
    dato: 'Argentina entera',
    texto: 'Estamos en 25 de Mayo y coordinamos por WhatsApp con viajeros de todo el país.',
  },
] as const
