import Marca from './Marca'
import { Facebook, FlechaDer, Instagram, Pin, WhatsApp } from './Iconos'
import { sitio } from '../data/sitio'
import { linkGeneral } from '../lib/whatsapp'

export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="grano relative overflow-hidden bg-tinta text-papel">
      <div
        aria-hidden="true"
        className="trama pointer-events-none absolute inset-0 text-violeta-cl opacity-[0.11]"
      />

      {/* Cierre: la frase histórica de la marca, en su lugar justo */}
      <div className="contenedor relative border-b border-papel/12 py-16 sm:py-24">
        <p className="display-ancho text-[clamp(2.5rem,11vw,7.5rem)] leading-[0.85]">
          Tu viaje
          <br />
          <span className="display-contorno-grueso text-sol">comienza acá</span>
        </p>
        <a href={linkGeneral} target="_blank" rel="noopener noreferrer" className="btn btn-solido mt-9">
          <WhatsApp className="size-[1.05rem]" />
          Escribinos por WhatsApp
          <FlechaDer />
        </a>
      </div>

      <div className="contenedor relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Marca alto="h-12" />
          <p className="mt-5 max-w-[30ch] text-[0.875rem] leading-relaxed text-papel/60">
            Agencia de viajes en {sitio.ubicacion}. Salidas grupales, viajes internacionales,
            escapadas y paquetes a medida desde {sitio.desde}.
          </p>
        </div>

        <div>
          <p className="etiqueta text-sol">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            <li>
              <a
                href={linkGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-papel/75 transition-colors hover:text-sol"
              >
                <WhatsApp className="size-4 shrink-0" />
                {sitio.whatsapp.visible}
              </a>
            </li>
            <li className="flex items-center gap-2 text-papel/60">
              <Pin className="size-4 shrink-0" />
              {sitio.ubicacion}
            </li>
          </ul>
        </div>

        <div>
          <p className="etiqueta text-sol">Seguinos</p>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            <li>
              <a
                href={sitio.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-papel/75 transition-colors hover:text-sol"
              >
                <Instagram className="size-4 shrink-0" />
                {sitio.redes.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={sitio.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-papel/75 transition-colors hover:text-sol"
              >
                <Facebook className="size-4 shrink-0" />
                Voorpret 25
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="etiqueta text-sol">Secciones</p>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {[
              { href: '#propuestas', t: 'Propuestas' },
              { href: '#como-trabajamos', t: 'Cómo trabajamos' },
              { href: '#nosotros', t: 'Nosotros' },
              { href: '#consulta', t: 'Cotizá tu viaje' },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-papel/75 transition-colors hover:text-sol">
                  {l.t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contenedor relative border-t border-papel/12 py-8">
        <p className="max-w-[86ch] text-[0.75rem] leading-relaxed text-papel/45">
          Legajo {sitio.legajo}. Los itinerarios, servicios y fechas publicados están sujetos a
          disponibilidad y confirmación al momento de la consulta, y no constituyen una oferta en
          firme. Las tarifas se informan por WhatsApp según fechas, cantidad de pasajeros y categoría
          elegida.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="etiqueta text-papel/40">
            © {anio} {sitio.marcaCompleta}
          </p>
          <p className="etiqueta text-papel/35">
            Diseño y desarrollo{' '}
            <a
              href={sitio.estudio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-papel/60 underline decoration-papel/25 underline-offset-4 transition-colors hover:text-sol hover:decoration-sol"
            >
              {sitio.estudio.nombre}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
