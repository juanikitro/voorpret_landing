import { useEffect, useState } from 'react'
import { categorias, paquetes } from '../data/paquetes'
import type { Categoria, Paquete } from '../data/paquetes'
import ArteDestino from './ArteDestino'
import { FlechaDer, Mas, Tilde, WhatsApp } from './Iconos'
import { linkPaquete } from '../lib/whatsapp'
import { fotoPaquete } from '../data/imagenes'
import { useRevelar } from '../lib/hooks'

/* ============================================================================
   ÍNDICE DE DESEOS
   ----------------------------------------------------------------------------
   El sistema de propuestas. No es una grilla de cards: es un índice
   tipográfico de bandas que se abren. Una sola abierta a la vez, la
   ilustración del destino aparece como recompensa al abrir.

   Funciona igual con mouse, teclado y touch: cada banda es un <button> de
   acordeón con aria-expanded / aria-controls.
   ========================================================================== */

function Banda({
  p,
  n,
  abierta,
  onToggle,
}: {
  p: Paquete
  n: number
  abierta: boolean
  onToggle: () => void
}) {
  const idPanel = `panel-${p.id}`
  const idBoton = `boton-${p.id}`
  const lavado = `linear-gradient(100deg, ${p.arte.cielo[0]} 0%, ${p.arte.cielo.at(-1)} 100%)`

  return (
    <div
      className={`group relative border-b border-papel/14 transition-colors duration-500 ${
        abierta ? 'bg-papel/[0.04]' : ''
      }`}
    >
      {/* Lavado de color del destino: aparece al pasar el mouse o al abrir */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[var(--ease-anticipa)] ${
          abierta ? 'opacity-[0.14]' : 'opacity-0 group-hover:opacity-[0.11]'
        }`}
        style={{ background: lavado }}
      />

      <h3>
        <button
          type="button"
          id={idBoton}
          onClick={onToggle}
          aria-expanded={abierta}
          aria-controls={idPanel}
          className="relative flex w-full items-center gap-4 px-1 py-6 text-left sm:gap-6 sm:py-8"
        >
          <span
            className={`display-contorno etiqueta shrink-0 font-display text-[1.5rem] tabular-nums transition-colors duration-500 sm:text-[2rem] ${
              abierta ? 'text-sol' : 'text-papel/45 group-hover:text-papel/80'
            }`}
            aria-hidden="true"
          >
            {String(n).padStart(2, '0')}
          </span>

          <span className="min-w-0 flex-1">
            <span
              className={`display-ancho block text-[clamp(1.4rem,5.7vw,3.6rem)] transition-colors duration-400 ${
                abierta ? 'text-sol' : 'group-hover:text-papel'
              }`}
            >
              {p.nombre}
            </span>
            <span className="etiqueta mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-papel/55">
              <span className={abierta ? 'text-sol/80' : ''}>{p.categoria}</span>
              <span className="hidden text-papel/25 xs:inline">/</span>
              <span className="hidden xs:inline">{p.temporada}</span>
              <span className="hidden text-papel/25 sm:inline">/</span>
              <span className="hidden sm:inline">{p.duracion}</span>
            </span>
          </span>

          {/* Miniatura: identidad del destino ya en estado cerrado */}
          <span
            className={`aspect-video shrink-0 overflow-hidden rounded-sm border border-papel/15 transition-all duration-600 ease-[var(--ease-anticipa)] ${
              abierta
                ? 'w-0 border-transparent opacity-0'
                : 'w-[58px] opacity-80 group-hover:opacity-100 sm:w-[74px] sm:group-hover:w-[104px]'
            }`}
          >
            {/* Miniatura: usa la variante de 320 px. Bajar la foto de 1600 px
                para 74 px eran ~750 kB tirados en los destinos cerrados. */}
            <ArteDestino
              arte={p.arte}
              imagen={fotoPaquete(p.id, p.imagen, 'mini')}
              foco={p.foco}
              className="size-full"
            />
          </span>

          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full border-2 transition-all duration-500 ease-[var(--ease-anticipa)] sm:size-12 ${
              abierta
                ? 'rotate-45 border-sol bg-sol text-tinta'
                : 'border-papel/30 text-papel/70 group-hover:border-sol group-hover:text-sol'
            }`}
            aria-hidden="true"
          >
            <Mas className="size-4 sm:size-[1.15rem]" />
          </span>
        </button>
      </h3>

      {/* Panel */}
      <div
        id={idPanel}
        role="region"
        aria-labelledby={idBoton}
        className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-anticipa)]"
        style={{ gridTemplateRows: abierta ? '1fr' : '0fr' }}
      >
        {/* inert: lo cerrado no recibe foco ni lectura de teclado */}
        <div className="overflow-hidden" inert={!abierta}>
          <div className="grid gap-8 pb-12 pt-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:pb-16">
            {/* Ilustración */}
            <div className="relative aspect-video overflow-hidden rounded-sm border border-papel/15">
              <ArteDestino
                arte={p.arte}
                imagen={fotoPaquete(p.id, p.imagen, 'panel')}
                foco={p.foco}
                alt={`${p.nombre} — ${p.recorrido.join(', ')}`}
                activo={abierta}
                /* Las fotos publicadas son 16:9: comparten un único encuadre visible. */
                className="size-full"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-tinta/85 to-transparent p-3 pt-10">
                {p.recorrido.map((r) => (
                  <span
                    key={r}
                    className="etiqueta rounded-full border border-papel/25 bg-tinta/40 px-2.5 py-1 text-[0.625rem] text-papel/90 backdrop-blur-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Detalle */}
            <div className="flex flex-col">
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-papel/80">{p.subtitulo}</p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-papel/14 py-5">
                <div>
                  <dt className="etiqueta text-papel/45">Cuándo</dt>
                  <dd className="mt-1 font-semibold">{p.temporada}</dd>
                </div>
                <div>
                  <dt className="etiqueta text-papel/45">Duración</dt>
                  <dd className="mt-1 font-semibold">{p.duracion}</dd>
                  <dt className="etiqueta mt-4 text-sol/75">Precio</dt>
                  <dd className="mt-1 text-[1.125rem] font-bold text-sol">{p.precio}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="etiqueta text-papel/45">Salida</dt>
                  <dd className="mt-1 font-semibold">{p.salida}</dd>
                </div>
              </dl>

              <p className="etiqueta mt-6 text-sol">{p.demo ? 'Qué podemos coordinar' : 'Qué incluye'}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.incluye.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.9375rem] leading-snug text-papel/82">
                    <Tilde className="mt-0.5 size-4 shrink-0 text-sol" />
                    {i}
                  </li>
                ))}
              </ul>

              {p.nota && (
                <p className="mt-6 border-l-2 border-violeta-cl pl-4 text-[0.875rem] leading-relaxed text-papel/60">
                  {p.nota}
                </p>
              )}

              {p.demo && (
                <p className="mt-4 text-[0.8125rem] leading-relaxed text-papel/50">
                  Las fechas, servicios y tarifas se confirman al cotizar.
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={linkPaquete(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solido"
                >
                  <WhatsApp className="size-[1.05rem]" />
                  {p.demo ? 'Consultar esta idea' : 'Consultar por este viaje'}
                  <FlechaDer />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export default function IndiceDeseos() {
  const destacado = paquetes.find((p) => p.destacado) ?? paquetes[0]
  const [abierto, setAbierto] = useState<string | null>(destacado.id)
  const [filtro, setFiltro] = useState<Categoria | null>(null)
  const ref = useRevelar<HTMLDivElement>()

  const visibles = filtro ? paquetes.filter((p) => p.categoria === filtro) : paquetes

  // Al filtrar, abrimos la primera propuesta que quedó a la vista.
  // Depende sólo de `filtro`: no queremos reabrir nada al cerrar una banda.
  useEffect(() => {
    setAbierto(filtro ? paquetes.find((p) => p.categoria === filtro)?.id ?? null : destacado.id)
  }, [filtro, destacado.id])

  return (
    <section
      id="propuestas"
      className="grano relative overflow-hidden bg-ciruela pt-20 sm:pt-28 lg:pt-36"
      aria-labelledby="titulo-propuestas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-violeta/22 to-transparent"
      />

      <div ref={ref} className="contenedor relative">
        {/* Encabezado */}
        <div>
          <p className="etiqueta rev text-sol">
            Ideas de viaje <span className="text-papel/30">/</span> {paquetes.length} destinos
          </p>
          <h2
            id="titulo-propuestas"
            className="rev display-ancho mt-4 text-[clamp(2.4rem,9vw,5.6rem)]"
            style={{ '--rev-d': '80ms' } as React.CSSProperties}
          >
            Destinos para
            <br />
            <span className="display-contorno-grueso text-sol">empezar a pensar</span>
          </h2>
        </div>

        {/* Filtros */}
        <div
          className="rev mt-12 flex flex-wrap items-center gap-2 sm:mt-16"
          style={{ '--rev-d': '220ms' } as React.CSSProperties}
          role="group"
          aria-label="Filtrar propuestas por tipo"
        >
          {[null, ...categorias].map((c) => {
            const activo = filtro === c
            return (
              <button
                key={c ?? 'todo'}
                type="button"
                onClick={() => setFiltro(c)}
                aria-pressed={activo}
                className={`etiqueta rounded-full border-2 px-4 py-2.5 transition-all duration-300 ${
                  activo
                    ? 'border-sol bg-sol text-tinta'
                    : 'border-papel/22 text-papel/70 hover:border-papel/50 hover:text-papel'
                }`}
              >
                {c ?? 'Todo'}
              </button>
            )
          })}
        </div>

        {/* Índice */}
        <div
          className="rev mt-6 border-t border-papel/14"
          style={{ '--rev-d': '280ms' } as React.CSSProperties}
        >
          {visibles.map((p, i) => (
            <Banda
              key={p.id}
              p={p}
              n={i + 1}
              abierta={abierto === p.id}
              onToggle={() => setAbierto(abierto === p.id ? null : p.id)}
            />
          ))}
        </div>

        <p className="py-10 text-center text-[0.9375rem] text-papel/55 sm:py-14">
          ¿No está el destino que tenés en mente?{' '}
          <a
            href="#consulta"
            className="font-semibold text-sol underline decoration-sol/40 decoration-2 underline-offset-4 transition-colors hover:decoration-sol"
          >
            Contanos qué buscás
          </a>
          .
        </p>
      </div>

      <div aria-hidden="true" className="grano-capa" />
    </section>
  )
}
