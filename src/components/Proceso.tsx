import { useEffect, useRef } from 'react'
import { proceso } from '../data/sitio'
import { useRevelar } from '../lib/hooks'
import { FlechaDer } from './Iconos'
import DotGrid from './DotGrid'

/* ============================================================================
   CÓMO TRABAJAMOS
   La ruta punteada del hero vuelve acá como hilo conductor: el mismo trazo
   amarillo que se perdía en el horizonte ahora ordena el proceso.
   ========================================================================== */

export default function Proceso() {
  const ref = useRevelar<HTMLDivElement>()
  const lineaRef = useRef<HTMLDivElement>(null)
  const lineaYaFueVisible = useRef(false)

  useEffect(() => {
    const el = lineaRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.procesoVisible = 'true'
      return
    }

    const io = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        lineaYaFueVisible.current = true
        el.dataset.procesoVisible = 'true'
      } else if (lineaYaFueVisible.current) {
        el.dataset.procesoVisible = 'false'
        el.dataset.procesoSalio = 'true'
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="como-trabajamos"
      className="grano relative overflow-hidden bg-papel text-tinta"
      aria-labelledby="titulo-proceso"
    >
      <DotGrid className="pointer-events-none absolute inset-0 text-violeta opacity-[0.12]" />

      <div ref={ref} className="contenedor relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-[62ch]">
          <h2
            id="titulo-proceso"
            className="rev display-ancho text-[clamp(2.3rem,8vw,5rem)]"
            style={{ '--rev-d': '80ms' } as React.CSSProperties}
          >
            De la idea
            <br />
            <span className="text-violeta">a la reserva</span>
          </h2>
          <p
            className="rev mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-tinta/72"
            style={{ '--rev-d': '160ms' } as React.CSSProperties}
          >
            Una consulta directa, opciones para elegir y confirmaciones por escrito. Así ordenamos el
            viaje, paso a paso.
          </p>
        </div>

        {/* Hilo punteado */}
        <div ref={lineaRef} className="relative mt-14 sm:mt-20">
          <div
            aria-hidden="true"
            className="proceso-trazo absolute left-[19px] top-2 hidden h-[calc(100%-3rem)] w-0 border-l-[3px] border-dashed border-sol sm:block lg:left-0 lg:top-[19px] lg:h-0 lg:w-full lg:border-l-0 lg:border-t-[3px]"
          />

          <ol className="relative grid gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
            {proceso.map((paso, i) => (
              <li
                key={paso.n}
                className="rev proceso-paso relative sm:pl-16 lg:pl-0 lg:pt-16"
                style={{ '--rev-d': `${160 + i * 420}ms` } as React.CSSProperties}
              >
                {/* Nodo */}
                <span
                  aria-hidden="true"
                  className="proceso-nodo absolute left-0 top-0 hidden size-10 place-items-center rounded-full border-[3px] border-tinta bg-sol sm:grid lg:top-0"
                >
                  <span className="size-2.5 rounded-full bg-tinta" />
                </span>

                <p className="etiqueta text-violeta">{paso.label}</p>
                <p
                  className="display-contorno-grueso mt-1 font-display text-[3.4rem] leading-[0.85] text-tinta/35 sm:text-[4.2rem]"
                  aria-hidden="true"
                >
                  {paso.n}
                </p>
                <h3 className="mt-3 text-[1.4rem] leading-tight sm:text-[1.55rem]">{paso.titulo}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-tinta/70">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="rev mt-16 flex flex-wrap items-center gap-4 border-t-2 border-tinta/12 pt-10"
          style={{ '--rev-d': '560ms' } as React.CSSProperties}
        >
          <p className="max-w-[34ch] font-serif text-[1.5rem] leading-[1.2] italic sm:text-[1.85rem]">
            Una consulta puede ser el primer paso.
          </p>
          <a href="#consulta" className="btn btn-papel ml-auto">
            Contanos tu viaje
            <FlechaDer />
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="grano-capa opacity-20" />
    </section>
  )
}
