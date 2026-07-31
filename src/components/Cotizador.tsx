import { useMemo, useState } from 'react'
import { sitio } from '../data/sitio'
import { linkConsulta } from '../lib/whatsapp'
import { useRevelar } from '../lib/hooks'
import { FlechaDer, WhatsApp } from './Iconos'
import ShapeGrid from './ShapeGrid'

/* ============================================================================
   COTIZADOR
   ----------------------------------------------------------------------------
   Tres datos, los mínimos para que la respuesta del otro lado sirva. Sin
   email, sin teléfono, sin "acepto recibir novedades".
   ========================================================================== */

const DESTINOS = ['Perú', 'Caribe', 'Europa', 'Brasil', 'Norte argentino', 'Japón', 'Todavía no sé']
const FECHAS = ['los próximos meses', 'fin de año', 'el año que viene', 'las vacaciones de invierno']
const MAX_PAX = 12

function Chips({
  opciones,
  valor,
  onElegir,
  etiquetaGrupo,
}: {
  opciones: string[]
  valor: string
  onElegir: (v: string) => void
  etiquetaGrupo: string
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={etiquetaGrupo}>
      {opciones.map((o) => {
        const activo = valor.trim().toLowerCase() === o.toLowerCase()
        return (
          <button
            key={o}
            type="button"
            onClick={() => onElegir(activo ? '' : o)}
            aria-pressed={activo}
            className={`rounded-full border-2 px-3.5 py-2 text-[0.8125rem] font-semibold transition-all duration-250 ${
              activo
                ? 'border-tinta bg-tinta text-papel'
                : 'border-tinta/25 text-tinta/75 hover:border-tinta/60 hover:text-tinta'
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export default function Cotizador() {
  const [destino, setDestino] = useState('')
  const [pasajeros, setPasajeros] = useState(2)
  const [cuando, setCuando] = useState('')
  const ref = useRevelar<HTMLDivElement>()

  const consulta = { destino, pasajeros, cuando }
  const link = useMemo(() => linkConsulta(consulta), [destino, pasajeros, cuando])

  const abrir = (e: React.FormEvent) => {
    e.preventDefault()
    const w = window.open(link, '_blank', 'noopener,noreferrer')
    if (!w) window.location.href = link
  }

  return (
    <section
      id="consulta"
      className="grano relative overflow-hidden bg-sol text-tinta"
      aria-labelledby="titulo-consulta"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 opacity-35">
        <ShapeGrid speed={0.1} squareSize={27} direction="down" />
      </div>

      <div ref={ref} className="contenedor relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16">
          {/* Discurso */}
          <div className="flex flex-col">
            <h2
              id="titulo-consulta"
              className="rev display-ancho text-[clamp(2.5rem,9vw,5.2rem)]"
              style={{ '--rev-d': '80ms' } as React.CSSProperties}
            >
              Contame
              <br />
              tu viaje
            </h2>
            <p
              className="rev mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-tinta/75"
              style={{ '--rev-d': '150ms' } as React.CSSProperties}
            >
              Tres datos y listo. Con eso ya podemos empezar a buscarte alternativas reales. Si
              todavía no tenés nada definido, también sirve: lo pensamos juntos.
            </p>

            {/* Sello y teléfono agrupados al pie de la columna */}
            <div
              className="rev mt-auto hidden lg:block"
              style={{ '--rev-d': '300ms' } as React.CSSProperties}
            >
              <span className="grid size-[150px] -rotate-[7deg] place-items-center rounded-full border-[3px] border-dashed border-tinta/40 text-center">
                <span className="etiqueta text-[0.5625rem] leading-[1.9] text-tinta/65">
                  Consultar
                  <br />
                  <span className="font-display text-[1.45rem] leading-none tracking-tight text-tinta">
                    no cuesta
                  </span>
                  <br />
                  nada
                </span>
              </span>

              <div className="mt-10 flex items-center gap-3 border-t-2 border-tinta/15 pt-7">
                <WhatsApp className="size-5 shrink-0" />
                <p className="text-[0.9375rem] leading-snug">
                  <span className="font-bold">{sitio.whatsapp.visible}</span>
                  <br />
                  <span className="text-tinta/60">Respondemos personas, no bots.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form
            onSubmit={abrir}
            className="rev rounded-sm border-2 border-tinta bg-papel p-5 shadow-[8px_8px_0_0_var(--color-tinta)] sm:p-7"
            style={{ '--rev-d': '260ms' } as React.CSSProperties}
          >
            {/* 1 — Destino */}
            <div>
              <label htmlFor="c-destino" className="etiqueta flex items-baseline gap-2">
                <span className="text-violeta">01</span> A dónde te gustaría ir
              </label>
              <input
                id="c-destino"
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Un destino o una idea suelta"
                autoComplete="off"
                className="mt-3 w-full border-b-2 border-tinta/25 bg-transparent pb-2.5 text-[1.0625rem] font-semibold text-tinta transition-colors placeholder:font-normal placeholder:text-tinta/40 focus:border-violeta focus:outline-none"
              />
              <Chips
                opciones={DESTINOS}
                valor={destino}
                onElegir={setDestino}
                etiquetaGrupo="Destinos sugeridos"
              />
            </div>

            {/* 2 — Pasajeros */}
            <div className="mt-8 border-t border-tinta/12 pt-7">
              <p className="etiqueta flex items-baseline gap-2" id="lbl-pax">
                <span className="text-violeta">02</span> Cuántos viajan
              </p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1.5" role="group" aria-labelledby="lbl-pax">
                  <button
                    type="button"
                    onClick={() => setPasajeros((n) => Math.max(1, n - 1))}
                    disabled={pasajeros <= 1}
                    aria-label="Quitar un pasajero"
                    className="grid size-11 place-items-center rounded-full border-2 border-tinta/25 text-tinta transition-colors hover:border-tinta enabled:hover:bg-tinta enabled:hover:text-papel disabled:opacity-30"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <output
                    aria-live="polite"
                    className="display-ancho w-14 text-center text-[2rem] tabular-nums"
                  >
                    {pasajeros}
                  </output>
                  <button
                    type="button"
                    onClick={() => setPasajeros((n) => Math.min(MAX_PAX, n + 1))}
                    disabled={pasajeros >= MAX_PAX}
                    aria-label="Agregar un pasajero"
                    className="grid size-11 place-items-center rounded-full border-2 border-tinta/25 text-tinta transition-colors hover:border-tinta enabled:hover:bg-tinta enabled:hover:text-papel disabled:opacity-30"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <p className="text-[0.875rem] text-tinta/55">
                  {pasajeros === 1 ? 'Viajás solo' : `${pasajeros} personas`}
                  {pasajeros >= MAX_PAX && ' o más'}
                </p>
              </div>
            </div>

            {/* 3 — Cuándo */}
            <div className="mt-8 border-t border-tinta/12 pt-7">
              <label htmlFor="c-cuando" className="etiqueta flex items-baseline gap-2">
                <span className="text-violeta">03</span> Más o menos cuándo
              </label>
              <input
                id="c-cuando"
                type="text"
                value={cuando}
                onChange={(e) => setCuando(e.target.value)}
                placeholder="Un mes, una temporada o una fecha"
                autoComplete="off"
                className="mt-3 w-full border-b-2 border-tinta/25 bg-transparent pb-2.5 text-[1.0625rem] font-semibold text-tinta transition-colors placeholder:font-normal placeholder:text-tinta/40 focus:border-violeta focus:outline-none"
              />
              <Chips
                opciones={FECHAS}
                valor={cuando}
                onElegir={setCuando}
                etiquetaGrupo="Fechas sugeridas"
              />
            </div>

            <button type="submit" className="btn btn-solido mt-6 w-full justify-center !border-tinta">
              <WhatsApp className="size-[1.15rem]" />
              Abrir WhatsApp
              <FlechaDer />
            </button>
          </form>
        </div>
      </div>

      <div aria-hidden="true" className="grano-capa opacity-25" />
    </section>
  )
}
