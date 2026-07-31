import { definicion } from '../data/sitio'
import { useRevelar } from '../lib/hooks'
import DotGrid from './DotGrid'

const CINTA = [
  'Salidas grupales acompañadas',
  'Viajes internacionales',
  'Escapadas',
  'Viajes a medida',
  'Nacionales',
  'Luna de miel',
]

/* ============================================================================
   BANDA DE DEFINICIÓN
   El corte de ritmo: pasamos de la tinta al papel. Acá la marca explica su
   propio nombre una única vez, y lo convierte en una promesa de servicio.
   ========================================================================== */

export default function BandaDefinicion() {
  const ref = useRevelar<HTMLDivElement>()

  return (
    <>
      {/* Cinta corrida — pie de cartel impreso */}
      <div className="pausa-hover relative overflow-hidden border-y-2 border-tinta bg-sol py-3 text-tinta">
        <div className="anim-marquesina flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
          {[0, 1].map((copia) => (
            <div key={copia} className="flex items-center gap-8" aria-hidden={copia === 1}>
              {CINTA.map((t) => (
                <span key={t} className="flex items-center gap-8">
                  <span className="etiqueta text-[0.8125rem] tracking-[0.2em]">{t}</span>
                  <span className="size-2 shrink-0 rotate-45 bg-tinta" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Definición */}
      <section className="grano relative overflow-hidden bg-papel text-tinta">
        <DotGrid className="pointer-events-none absolute inset-0 text-tinta/70 opacity-[0.13]" />

        <div ref={ref} className="contenedor relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-36">
          <div>
            <p className="etiqueta rev text-violeta" style={{ '--rev-d': '0ms' } as React.CSSProperties}>
              Por qué nos llamamos así
            </p>
            <p
              className="rev mt-5 font-serif text-[clamp(3.2rem,11vw,6.5rem)] leading-[0.9] italic"
              style={{ '--rev-d': '80ms' } as React.CSSProperties}
            >
              {definicion.palabra}
            </p>
            <p
              className="rev mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-tinta/60"
              style={{ '--rev-d': '160ms' } as React.CSSProperties}
            >
              <span className="font-mono tabular-nums">{definicion.fonetica}</span>
              <span className="size-1.5 rounded-full bg-violeta" />
              <span className="etiqueta">{definicion.idioma}</span>
            </p>

            <div
              className="rev mt-10 border-l-4 border-sol pl-5 lg:mt-16"
              style={{ '--rev-d': '380ms' } as React.CSSProperties}
            >
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-tinta/70">
                Comparar aéreos, entender qué incluye cada tarifa, coordinar traslados, revisar
                requisitos de ingreso. Todo eso lo hacemos nosotros y te lo contamos en criollo, por
                WhatsApp, con nombre y apellido.
              </p>
            </div>
          </div>

          <div className="lg:pt-12">
            <p
              className="rev display-ancho max-w-[24ch] text-[clamp(1.85rem,5.2vw,3.05rem)] leading-[0.98]"
              style={{ '--rev-d': '200ms' } as React.CSSProperties}
            >
              {definicion.texto}
            </p>
            <div
              className="rev mt-8 max-w-[54ch] space-y-4 text-[1.0625rem] leading-relaxed text-tinta/75"
              style={{ '--rev-d': '300ms' } as React.CSSProperties}
            >
              <p>
                Le pusimos ese nombre porque es exactamente lo que queremos que te pase mientras
                armamos tu viaje. Elegir el destino, imaginarte allá, contarle a quién lo vas a
                sorprender: eso ya es parte del viaje.
              </p>
              <p className="font-semibold text-tinta">
                Nuestro trabajo es que esa parte no se te llene de trámites.
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="grano-capa opacity-20" />
      </section>
    </>
  )
}
