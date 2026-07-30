import { useEffect, useRef, useState } from 'react'

/** true cuando el usuario pidió menos movimiento a nivel sistema operativo. */
export function useMenosMovimiento(): boolean {
  const [reducido, setReducido] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducido(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reducido
}

/**
 * Revela un elemento cuando entra en viewport. Agrega el atributo
 * data-visible="true", que el CSS usa para animar. Se desconecta al primer
 * disparo: sin listeners de scroll permanentes.
 */
export function useRevelar<T extends HTMLElement>(margen = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.visible = 'true'
      return
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.dataset.visible = 'true'
          io.disconnect()
        }
      },
      { rootMargin: margen, threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margen])
  return ref
}

/**
 * Progreso de scroll de la página (0 → 1), actualizado con rAF y escrito
 * en una custom property para que lo consuma el CSS sin re-renders.
 */
export function useProgresoScroll(activo = true) {
  useEffect(() => {
    if (!activo) return
    let pedido = 0
    const actualizar = () => {
      pedido = 0
      const raiz = document.documentElement
      const alto = raiz.scrollHeight - window.innerHeight
      const p = alto > 0 ? window.scrollY / alto : 0
      raiz.style.setProperty('--scroll', p.toFixed(4))
      // Progreso local en "pantallas": lo usa el hero para su parallax
      const pantallas = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4)
      raiz.style.setProperty('--pantallas', pantallas.toFixed(4))
    }
    const onScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(actualizar)
    }
    actualizar()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (pedido) cancelAnimationFrame(pedido)
    }
  }, [activo])
}

/**
 * Pasa a true después del primer par de frames. Sirve para que la entrada del
 * hero se anime en la carga en vez de aparecer ya terminada.
 */
export function useAlMontar(): boolean {
  const [listo, setListo] = useState(false)
  useEffect(() => {
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setListo(true))
    })
    return () => {
      cancelAnimationFrame(a)
      if (b) cancelAnimationFrame(b)
    }
  }, [])
  return listo
}

/** Detecta punteros finos (mouse) para habilitar interacciones de hover. */
export function usePunteroFino(): boolean {
  const [fino, setFino] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFino(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fino
}
