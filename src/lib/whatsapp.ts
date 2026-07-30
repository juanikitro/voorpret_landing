import { sitio } from '../data/sitio'
import type { Paquete } from '../data/paquetes'

/**
 * Construye un enlace wa.me. Funciona igual en móvil (abre la app) y en
 * escritorio (abre WhatsApp Web o la app de escritorio si está instalada).
 */
export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${sitio.whatsapp.wa}?text=${encodeURIComponent(mensaje)}`
}

/** Consulta contextual: identifica el paquete que el usuario estaba viendo. */
export function mensajePaquete(p: Paquete): string {
  return `Hola Voorpret, vi "${p.nombre}" (${p.temporada}) en la web y quiero consultar disponibilidad y recibir una cotización.`
}

export function linkPaquete(p: Paquete): string {
  return linkWhatsApp(mensajePaquete(p))
}

export type Consulta = {
  destino: string
  pasajeros: number
  cuando: string
}

/**
 * Cotización general. Solo tres datos: los mínimos para que la respuesta
 * del otro lado sea útil. Nada de email ni datos que no aporten.
 * La frase se arma según lo que el usuario completó, para que siempre se lea
 * como algo escrito por una persona y no como un formulario volcado.
 */
export function mensajeConsulta({ destino, pasajeros, cuando }: Consulta): string {
  const d = destino.trim()
  const c = cuando.trim()
  const pax = `es para ${pasajeros} pasajero${pasajeros === 1 ? '' : 's'}`
  const base = 'Hola Voorpret, vi la web y quiero cotizar un viaje.'

  if (d && c) return `${base} Estoy pensando en ${d}, ${pax}, alrededor de ${c}.`
  if (d) return `${base} Estoy pensando en ${d} y ${pax}. Todavía no tengo fecha definida.`
  if (c) return `${base} Todavía no tengo el destino definido, ${pax}, y me gustaría viajar alrededor de ${c}.`
  return `${base} Todavía no tengo destino ni fecha, ${pax}. ¿Me das una mano para pensarlo?`
}

export function linkConsulta(c: Consulta): string {
  return linkWhatsApp(mensajeConsulta(c))
}

/** Consulta genérica, sin contexto (header y footer). */
export const linkGeneral = linkWhatsApp(
  'Hola Voorpret, vi la web y quiero hacer una consulta sobre un viaje.',
)
