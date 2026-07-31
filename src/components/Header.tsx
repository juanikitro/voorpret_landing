import { useEffect, useRef, useState } from 'react'
import Marca from './Marca'
import { FlechaDer, WhatsApp } from './Iconos'
import { linkGeneral } from '../lib/whatsapp'
import { sitio } from '../data/sitio'

const enlaces = [
  { href: '#propuestas', texto: 'Propuestas' },
  { href: '#como-trabajamos', texto: 'Cómo trabajamos' },
  { href: '#nosotros', texto: 'Nosotros' },
]

export default function Header() {
  const [compacto, setCompacto] = useState(false)
  const [menu, setMenu] = useState(false)
  const cerrarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setCompacto(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú móvil: bloqueo de scroll, Escape y foco inicial
  useEffect(() => {
    if (!menu) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cerrarRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previo
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      {/* Barra de progreso de lectura */}
      <div
        aria-hidden="true"
        className="no-imprimir fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-sol"
        style={{ transform: 'scaleX(var(--scroll))' }}
      />

      <header
        className={`no-imprimir fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          compacto
            ? 'border-b border-papel/12 bg-ciruela/88 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="contenedor flex h-[68px] items-center justify-between gap-4 sm:h-[84px]">
          <a href="#inicio" className="rounded-sm" aria-label="Voorpret — inicio">
            <Marca sucursal={false} prioridad />
          </a>

          <nav aria-label="Secciones" className="hidden items-center gap-1 lg:flex">
            {enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                className="group relative px-3.5 py-2 text-sm font-semibold text-papel/78 transition-colors hover:text-papel"
              >
                {e.texto}
                <span className="absolute inset-x-3.5 bottom-1 h-[2px] origin-left scale-x-0 bg-sol transition-transform duration-300 ease-[var(--ease-anticipa)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={linkGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solido !px-4 !py-2.5 !text-[0.8125rem] sm:!px-5 sm:!py-3 sm:!text-sm"
            >
              <WhatsApp className="size-4" />
              <span className="hidden sm:inline">Escribinos</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMenu(true)}
              className="grid size-11 place-items-center rounded-full border-2 border-papel/25 text-papel transition-colors hover:border-sol hover:text-sol lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={menu}
            >
              <span className="sr-only">Menú</span>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ——— Menú móvil ——— */}
      {menu && (
        <div
          className="no-imprimir fixed inset-0 z-50 flex flex-col bg-ciruela lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="contenedor relative flex h-[68px] shrink-0 items-center justify-between">
            <Marca sucursal={false} />
            <button
              ref={cerrarRef}
              type="button"
              onClick={() => setMenu(false)}
              className="grid size-11 place-items-center rounded-full border-2 border-papel/25 text-papel transition-colors hover:border-sol hover:text-sol"
              aria-label="Cerrar menú"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Secciones" className="contenedor relative flex flex-1 flex-col justify-center gap-1 pb-16">
            {[...enlaces, { href: '#consulta', texto: 'Cotizá tu viaje' }].map((e, i) => (
              <a
                key={e.href}
                href={e.href}
                onClick={() => setMenu(false)}
                className="anim-entra-arriba group flex items-baseline gap-4 border-b border-papel/12 py-4"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="etiqueta w-6 text-sol/70">0{i + 1}</span>
                <span className="display-ancho text-[2.4rem] leading-[0.95] transition-colors group-hover:text-sol">
                  {e.texto}
                </span>
              </a>
            ))}

            <a
              href={linkGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenu(false)}
              className="btn btn-solido anim-entra-arriba mt-8 self-start"
              style={{ animationDelay: '240ms' }}
            >
              <WhatsApp className="size-[1.05rem]" />
              {sitio.whatsapp.visible}
              <FlechaDer />
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
