import { proceso } from '../data/sitio'
import { useRevelar } from '../lib/hooks'
import { FlechaDer } from './Iconos'

/* ============================================================================
   CÓMO TRABAJAMOS
   La ruta punteada del hero vuelve acá como hilo conductor: el mismo trazo
   amarillo que se perdía en el horizonte ahora ordena el proceso.
   ========================================================================== */

export default function Proceso() {
  const ref = useRevelar<HTMLDivElement>()

  return (
    <section
      id="como-trabajamos"
      className="grano relative overflow-hidden bg-papel text-tinta"
      aria-labelledby="titulo-proceso"
    >
      <div
        aria-hidden="true"
        className="trama pointer-events-none absolute inset-0 text-violeta opacity-[0.12]"
      />

      <div ref={ref} className="contenedor relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-[62ch]">
          <p className="etiqueta rev text-violeta">Cómo trabajamos</p>
          <h2
            id="titulo-proceso"
            className="rev display-ancho mt-4 text-[clamp(2.3rem,8vw,5rem)]"
            style={{ '--rev-d': '80ms' } as React.CSSProperties}
          >
            Cuatro momentos,
            <br />
            <span className="text-violeta">una sola persona</span>
          </h2>
          <p
            className="rev mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-tinta/72"
            style={{ '--rev-d': '160ms' } as React.CSSProperties}
          >
            No pasás de un sector a otro ni te atiende alguien distinto cada vez. Del primer mensaje
            al último, hablás siempre con la misma persona.
          </p>
        </div>

        {/* Hilo punteado */}
        <div className="relative mt-14 sm:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 hidden h-[calc(100%-3rem)] w-0 border-l-[3px] border-dashed border-sol sm:block lg:left-0 lg:top-[19px] lg:h-0 lg:w-full lg:border-l-0 lg:border-t-[3px]"
          />

          <ol className="relative grid gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
            {proceso.map((paso, i) => (
              <li
                key={paso.n}
                className="rev relative sm:pl-16 lg:pl-0 lg:pt-16"
                style={{ '--rev-d': `${200 + i * 90}ms` } as React.CSSProperties}
              >
                {/* Nodo */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden size-10 place-items-center rounded-full border-[3px] border-tinta bg-sol sm:grid lg:top-0"
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
            Empezar no te compromete a nada.
          </p>
          <a href="#consulta" className="btn btn-papel ml-auto">
            Contame tu viaje
            <FlechaDer />
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="grano-capa opacity-20" />
    </section>
  )
}
