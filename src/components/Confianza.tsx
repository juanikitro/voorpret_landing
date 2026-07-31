import { confianza, sitio } from '../data/sitio'
import { useRevelar } from '../lib/hooks'
import { FlechaDer, Instagram, Pin } from './Iconos'
import SpecularCard from './SpecularCard'

/* ============================================================================
   NOSOTROS / CONFIANZA
   Solo datos verificables. Nada de métricas, premios ni testimonios
   inventados: el lugar para prueba social real está previsto abajo,
   desactivado hasta tener contenido verificado.
   ========================================================================== */

/**
 * ⚠️ Prueba social: dejar en `false` hasta tener reseñas REALES y con permiso
 * de los viajeros. El bloque existe para no rediseñar la sección cuando
 * lleguen los contenidos verificados.
 */
const MOSTRAR_PRUEBA_SOCIAL = false

export default function Confianza() {
  const ref = useRevelar<HTMLDivElement>()

  return (
    <section
      id="nosotros"
      className="grano relative overflow-hidden bg-ciruela"
      aria-labelledby="titulo-nosotros"
    >
      {/* Año fundacional como marca de agua tipográfica */}
      <span
        aria-hidden="true"
        /* El recorte cae sobre el cuerpo de los dígitos, no sobre su base:
           así lee como sangrado de cartel y no como un corte accidental. */
        className="display-contorno pointer-events-none absolute -bottom-[11vw] left-1/2 -translate-x-1/2 font-display text-[34vw] leading-none text-papel/[0.07] select-none"
        style={{ fontVariationSettings: "'wdth' 118" }}
      >
        {sitio.desde}
      </span>

      <div ref={ref} className="contenedor relative py-20 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <h2
              id="titulo-nosotros"
              className="rev display-ancho text-[clamp(2.3rem,8vw,4.8rem)]"
              style={{ '--rev-d': '80ms' } as React.CSSProperties}
            >
              Una agencia
              <br />
              con nombre,
              <br />
              <span className="text-sol">no un formulario</span>
            </h2>

            <div
              className="rev mt-7 max-w-[50ch] space-y-4 text-[1.0625rem] leading-relaxed text-papel/75"
              style={{ '--rev-d': '160ms' } as React.CSSProperties}
            >
              <p>
                Voorpret nació en {sitio.desde} en {sitio.ubicacion}, y desde entonces armamos viajes
                para gente de todo el país. Somos una agencia chica y eso es a propósito: nos permite
                conocer cada viaje que vendemos.
              </p>
              <p>
                Trabajamos viajes nacionales e internacionales, salidas grupales acompañadas y
                paquetes armados desde cero. La forma de empezar es siempre la misma: un mensaje.
              </p>
            </div>

            <div
              className="rev mt-8 flex flex-wrap items-center gap-3"
              style={{ '--rev-d': '240ms' } as React.CSSProperties}
            >
              <a
                href={sitio.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-linea !py-3"
              >
                <Instagram className="size-[1.05rem]" />
                {sitio.redes.instagramHandle}
                <FlechaDer />
              </a>
              <p className="etiqueta flex items-center gap-2 text-papel/55">
                <Pin className="size-3.5" />
                {sitio.ubicacion}
              </p>
            </div>
          </div>

          {/* Datos verificables */}
          <div>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-papel/16 bg-papel/16 sm:grid-cols-2">
              {confianza.map((c, i) => (
                <SpecularCard
                  key={c.dato}
                  className="rev bg-ciruela p-6 sm:p-7"
                  style={{ '--rev-d': `${200 + i * 80}ms` } as React.CSSProperties}
                >
                  <p className="display-ancho text-[1.6rem] text-sol sm:text-[1.85rem]">{c.dato}</p>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-papel/70">{c.texto}</p>
                </SpecularCard>
              ))}
            </ul>

            {/* Sello */}
            <div
              className="rev mt-8 flex items-center gap-5"
              style={{ '--rev-d': '520ms' } as React.CSSProperties}
            >
              <span className="grid size-[86px] shrink-0 -rotate-[9deg] place-items-center rounded-full border-2 border-dashed border-sol/60 text-center">
                <span className="etiqueta text-[0.5rem] leading-[1.35] text-sol">
                  Legajo
                  <br />
                  <span className="font-display text-[1.05rem] tracking-normal">{sitio.legajo}</span>
                  <br />
                  Registrada
                </span>
              </span>
              <p className="max-w-[38ch] text-[0.875rem] leading-relaxed text-papel/55">
                Agencia de viajes registrada. Cada reserva se confirma por escrito, con voucher y
                condiciones a la vista antes de que pagues nada.
              </p>
            </div>

            {/* Espacio previsto para reseñas reales — ver constante arriba */}
            {MOSTRAR_PRUEBA_SOCIAL && (
              <div className="mt-10 rounded-sm border border-papel/16 p-6">
                <p className="etiqueta text-sol">Lo que dicen los viajeros</p>
                {/* TODO: cargar reseñas verificadas (texto, nombre, viaje, fecha) */}
              </div>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="grano-capa" />
    </section>
  )
}
