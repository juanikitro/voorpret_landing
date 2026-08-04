import { useEffect } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { useEnVista } from '../lib/hooks'

const PAD = 20

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

// Shader de SpecularButton de ReactBits: conserva el brillo especular sobre
// los bordes y la orientación según la posición del puntero.
const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 L = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;
  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}`

/** Adaptación estructural de SpecularButton para una tarjeta no interactiva. */
export default function SpecularCard({ children, className = '', ...props }: ComponentPropsWithoutRef<'li'>) {
  const [cardRef, enVista] = useEnVista<HTMLLIElement>()
  const [effectRef, efectoEnVista] = useEnVista<HTMLSpanElement>()

  useEffect(() => {
    const card = cardRef.current
    const effect = effectRef.current
    // No abrimos contextos WebGL ni dejamos rAF corriendo en tarjetas fuera de
    // pantalla. El borde estático sigue presente; el brillo vuelve al acercarse.
    if (!card || !effect || !enVista || !efectoEnVista || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tarjeta = card
    const efecto = effect
    let cancelado = false
    let liberar: (() => void) | undefined

    async function iniciar() {
      // OGL viaja en un chunk aparte: no bloquea el JS necesario para pintar
      // el hero y solo se descarga al acercarse a esta sección.
      const { Color, Mesh, Program, Renderer, Triangle } = await import('ogl')
      if (cancelado) return

    // El brillo es un detalle de borde: limitar la resolución evita cuatro
    // canvases gigantes en pantallas retina sin cambiar la lectura visual.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 2 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uBaseColor: { value: [0.32, 0.32, 0.32] },
        uIntensity: { value: 1 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    efecto.appendChild(gl.canvas)

    const size = { width: 1, height: 1 }
    const resize = () => {
      const rect = tarjeta.getBoundingClientRect()
      size.width = rect.width
      size.height = rect.height
      renderer.setSize(rect.width + PAD * 2, rect.height + PAD * 2)
      program.uniforms.uCenter.value = [(PAD + rect.width / 2) * dpr, (PAD + rect.height / 2) * dpr]
      program.uniforms.uHalfSize.value = [(rect.width / 2) * dpr, (rect.height / 2) * dpr]
    }
    const observer = new ResizeObserver(resize)
    observer.observe(tarjeta)
    resize()

    let pointerAngle: number | null = null
    let proximity = 0
    const onPointerMove = (event: PointerEvent) => {
      const rect = tarjeta.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right)
      const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom)
      const distance = Math.hypot(dx, dy)
      if (distance === 0) {
        const nx = (event.clientX - centerX) / (rect.width / 2)
        const ny = (centerY - event.clientY) / (rect.height / 2)
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15
      } else {
        pointerAngle = Math.atan2(centerY - event.clientY, event.clientX - centerX)
      }
      const t = Math.max(0, 1 - distance / 250)
      proximity = t * t * (3 - 2 * t)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const lineColor = new Color('#f3c126')
    const baseColor = new Color('#765084')
    let angle = 2.4
    let idleAngle = 2.4
    let brightness = 0
    let previous = performance.now()
    let frame = 0
    let ultimoDibujo = 0
    const render = (now: number) => {
      if (now - ultimoDibujo < 1000 / 30) {
        frame = window.requestAnimationFrame(render)
        return
      }
      ultimoDibujo = now
      frame = window.requestAnimationFrame(render)
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now
      idleAngle += 0.35 * delta
      const target = pointerAngle ?? idleAngle
      const difference = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      angle += difference * (1 - Math.exp(-delta * 7))
      brightness += (proximity - brightness) * (1 - Math.exp(-delta * 8))

      program.uniforms.uAngle.value = angle
      program.uniforms.uRadius.value = Math.min(2, Math.min(size.width, size.height) / 2) * dpr
      program.uniforms.uLineColor.value = [lineColor.r, lineColor.g, lineColor.b]
      program.uniforms.uBaseColor.value = [baseColor.r, baseColor.g, baseColor.b]
      program.uniforms.uIntensity.value = 1.15 * brightness
      program.uniforms.uShineSize.value = (14 * Math.PI) / 180
      program.uniforms.uShineFade.value = (42 * Math.PI) / 180
      program.uniforms.uThickness.value = 1.2 * dpr
      renderer.render({ scene: mesh })
    }
    frame = window.requestAnimationFrame(render)

    liberar = () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      if (gl.canvas.parentNode === efecto) efecto.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    }

    void iniciar().catch(() => undefined)
    return () => {
      cancelado = true
      liberar?.()
    }
  }, [cardRef, effectRef, efectoEnVista, enVista])

  return (
    <li ref={cardRef} className={`specular-card ${className}`} {...props}>
      <span ref={effectRef} className="specular-card__fx" aria-hidden="true" />
      <div className="specular-card__content">{children}</div>
    </li>
  )
}
