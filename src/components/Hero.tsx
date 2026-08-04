import { useState } from 'react'
import { FlechaDer } from './Iconos'
import SolHero from './SolHero'
import { gradeMarca, heroFoto, heroSolDeTrama, solHero, usarFotoHero } from '../data/imagenes'
import type { Foto } from '../data/imagenes'
import { useAlMontar } from '../lib/hooks'

/* ============================================================================
   HERO — el amanecer antes del viaje
   La composición es un cartel: tipografía dominante, sol de trama y un
   horizonte en capas que se separa al scrollear (parallax por CSS var).
   ========================================================================== */

/** Cada capa se mueve a distinta velocidad: profundidad sin JS por frame. */
function Horizonte({ quieto }: { quieto: boolean }) {
  const capa = (v: number) =>
    quieto ? undefined : { transform: `translate3d(0, calc(var(--pantallas, 0) * ${v}px), 0)` }

  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-[62vh] w-full sm:h-[58vh]"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="h-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A0D3C" stopOpacity="0" />
          <stop offset="45%" stopColor="#5A1280" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E8613C" stopOpacity="0.9" />
        </linearGradient>
        <pattern id="h-puntos" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.3" fill="#F3C126" />
        </pattern>
        {/* Banda suave: la trama entra y sale sin cantos duros */}
        <linearGradient id="h-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="26%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="h-mask">
          <rect width="1440" height="620" fill="url(#h-fade)" />
        </mask>
      </defs>

      <rect width="1440" height="620" fill="url(#h-cielo)" />
      <rect width="1440" height="620" fill="url(#h-puntos)" mask="url(#h-mask)" opacity="0.4" />

      {/* Cordillera lejana — cumbres separadas y asimétricas, no dientes de sierra */}
      <g style={capa(72)}>
        <path
          fill="#46156B"
          d="M0 358 L140 316 L252 330 L402 224 L520 296 L612 280 L762 198 L902 298 L1014 284 L1152 230 L1292 304 L1382 290 L1440 310 L1440 620 L0 620 Z"
        />
      </g>
      {/* Sierra media */}
      <g style={capa(44)}>
        <path
          fill="#2F0C44"
          d="M0 418 C 180 390 302 430 462 406 C 622 382 702 424 862 402 C 1022 380 1152 424 1292 404 C 1362 394 1402 410 1440 402 L1440 620 L0 620 Z"
        />
      </g>
      {/* Lomas cercanas */}
      <g style={capa(20)}>
        <path
          fill="#221913"
          d="M0 502 C 200 450 400 514 580 484 C 760 454 900 510 1090 486 C 1270 464 1370 504 1440 484 L1440 620 L0 620 Z"
        />
      </g>
      {/* Llano y ruta que se pierde en el horizonte — la promesa del viaje */}
      <g style={capa(6)}>
        <path
          fill="#1E1712"
          d="M0 558 C 300 542 600 568 900 552 C 1152 539 1302 560 1440 550 L1440 620 L0 620 Z"
        />
        <path fill="#140F0C" d="M534 620 L690 486 L706 486 L886 620 Z" />
        <path
          stroke="#F3C126"
          strokeWidth="4.5"
          strokeDasharray="20 26"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
          d="M698 492 L706 620"
        />
      </g>
    </svg>
  )
}

/* ============================================================================
   FONDO FOTOGRÁFICO
   ----------------------------------------------------------------------------
   Cuando hay foto, se aplican tres cosas encima, en este orden:
   1. Grade de marca: teñido violeta arriba / ámbar abajo. Hace que fotos de
      orígenes distintos parezcan de la misma producción.
   2. Velos de contraste: garantizan que el titular se lea sobre CUALQUIER
      foto. Diagonal en escritorio (el texto vive a la izquierda), vertical en
      celular (el texto vive al centro).
   3. Trama de puntos: firma la foto con el lenguaje impreso de la marca.
   ========================================================================== */
function FondoFoto({
  foto,
  quieto,
  onFallo,
}: {
  foto: Foto
  quieto: boolean
  onFallo: () => void
}) {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-ciruela">
      <picture>
        {foto.alta && <source media="(max-width: 639px)" srcSet={foto.alta} />}
        <img
          src={foto.ancha}
          alt={foto.alt}
          width={2400}
          height={1400}
          fetchPriority="high"
          decoding="async"
          onError={onFallo}
          className="size-full object-cover"
          style={{
            objectPosition: foto.foco ?? 'center 60%',
            ...(quieto
              ? null
              : {
                  transform: 'scale(1.08) translate3d(0, calc(var(--pantallas, 0) * 54px), 0)',
                  willChange: 'transform',
                }),
          }}
        />
      </picture>

      {/* 1 — Grade de marca */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          opacity: gradeMarca,
          background:
            'linear-gradient(168deg, #6B1C93 0%, #2A0D3C 42%, #8A3A2A 78%, #F3C126 100%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ciruela/18 mix-blend-multiply" />

      {/* Sol: luz aditiva sobre la foto. Va acá, antes de los velos, para que
          el velo que protege el titular también lo apague. */}
      {solHero && <SolHero config={solHero} quieto={quieto} />}

      {/* 2 — Velos de contraste */}
      <div
        aria-hidden="true"
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,15,12,0.78) 0%, rgba(42,13,60,0.60) 34%, rgba(42,13,60,0.72) 66%, rgba(20,15,12,0.92) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(96deg, rgba(20,15,12,0.94) 0%, rgba(42,13,60,0.80) 34%, rgba(42,13,60,0.34) 62%, rgba(42,13,60,0.10) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ciruela/90 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-tinta via-tinta/45 to-transparent"
      />

    </div>
  )
}

export default function Hero({ quieto }: { quieto: boolean }) {
  // La entrada se dispara un frame después del montaje para que se vea animar
  const listo = useAlMontar() ? 'true' : 'false'
  // Si la foto del hero no está cargada todavía, vuelve la ilustración
  const [fotoFallo, setFotoFallo] = useState(false)
  const conFoto = usarFotoHero && !fotoFallo

  return (
    <section
      id="inicio"
      className="grano relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ciruela pt-[68px] sm:pt-[84px]"
    >
      {/* Sol de trama: el punto de fuga emocional, detrás de la tipografía */}
      {heroSolDeTrama && (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10vw] top-[1vh] -z-10 sm:right-[-6vw] sm:top-[2vh] lg:right-[4vw]"
        style={quieto ? undefined : { transform: 'translate3d(0, calc(var(--pantallas, 0) * -120px), 0)' }}
      >
        <div className={`relative ${quieto ? '' : 'anim-flota'}`}>
          <div className="size-[46vw] max-w-[540px] rounded-full bg-violeta/30 blur-[70px] sm:size-[44vw]" />
          <div
            className={`trama-disco absolute inset-[6%] text-sol ${quieto ? '' : 'anim-deriva'}`}
          />
          {/* Núcleo sólido: el sol tiene centro, no es solo textura */}
          <div className="absolute inset-[34%] rounded-full bg-sol/90 blur-[2px]" />
        </div>
      </div>
      )}

      {/* Foto si usarFotos está activo y el archivo existe; si no, ilustración */}
      {conFoto ? (
        <FondoFoto foto={heroFoto} quieto={quieto} onFallo={() => setFotoFallo(true)} />
      ) : (
        <Horizonte quieto={quieto} />
      )}

      {/* ——— Contenido ——— */}
      <div className="contenedor relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-16">
        <p
          className="rev mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-papel/65 sm:mb-5"
          data-visible={listo}
          style={{ '--rev-d': '140ms' } as React.CSSProperties}
        >
          Agencia de viajes
        </p>
        <h1 data-visible={listo}>
          <span className="display-ancho block text-[clamp(2.85rem,12.5vw,8.4rem)]">
            <span className="rev-linea" style={{ '--rev-d': '220ms' } as React.CSSProperties}>
              <span>Tu viaje</span>
            </span>
            <span className="rev-linea" style={{ '--rev-d': '320ms' } as React.CSSProperties}>
              <span>empieza con</span>
            </span>
            <span className="rev-linea text-sol" style={{ '--rev-d': '420ms' } as React.CSSProperties}>
              <span>una charla.</span>
            </span>
          </span>
        </h1>

        <div
          className="rev mt-7 max-w-[46ch] sm:mt-9"
          data-visible={listo}
          style={{ '--rev-d': '640ms' } as React.CSSProperties}
        >
          <p className="font-sans text-[1.35rem] leading-[1.28] text-papel sm:text-[1.7rem]">
            Después, lo armamos con vos.
          </p>
          <p className="mt-4 text-[0.975rem] leading-relaxed text-papel/72 sm:text-[1.0625rem]">
            Salidas grupales acompañadas y viajes a medida, organizados de punta a punta por una
            persona que te acompaña de verdad.
          </p>
        </div>

        <div
          className="rev mt-9 flex flex-wrap items-center gap-3 sm:mt-11 sm:gap-4"
          data-visible={listo}
          style={{ '--rev-d': '780ms' } as React.CSSProperties}
        >
          <a href="#propuestas" className="btn btn-solido">
            Ver ideas de viaje
            <FlechaDer />
          </a>
          <a href="#consulta" className="btn btn-linea">
            Contanos tu viaje
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="grano-capa" />
    </section>
  )
}
