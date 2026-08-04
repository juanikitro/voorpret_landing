import { useEffect } from 'react'
import { useEnVista } from '../lib/hooks'
type ShapeGridProps = {
  direction?: 'up' | 'right' | 'down' | 'left'
  speed?: number
  squareSize?: number
  borderColor?: string
}

/** Implementación local de ShapeGrid de ReactBits para el fondo del cotizador. */
export default function ShapeGrid({
  direction = 'right',
  speed = 1,
  squareSize = 40,
  borderColor = '#999',
}: ShapeGridProps) {
  const [canvasRef, enVista] = useEnVista<HTMLCanvasElement>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enVista) return
    const context = canvas.getContext('2d')
    if (!context) return

    const offset = { x: 0, y: 0 }
    let frame = 0
    let ultimoDibujo = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    const draw = (ahora: number) => {
      // La deriva es ambiental: 30 fps mantiene el mismo movimiento y reduce
      // a la mitad el trabajo del canvas, especialmente en móviles.
      if (ahora - ultimoDibujo < 1000 / 30) {
        frame = window.requestAnimationFrame(draw)
        return
      }
      const delta = ultimoDibujo ? (ahora - ultimoDibujo) / (1000 / 60) : 1
      ultimoDibujo = ahora
      const effectiveSpeed = Math.max(speed, 0.1) * delta
      if (direction === 'up') offset.y = (offset.y - effectiveSpeed + squareSize) % squareSize
      if (direction === 'down') offset.y = (offset.y + effectiveSpeed + squareSize) % squareSize
      if (direction === 'left') offset.x = (offset.x - effectiveSpeed + squareSize) % squareSize
      if (direction === 'right') offset.x = (offset.x + effectiveSpeed + squareSize) % squareSize

      context.clearRect(0, 0, canvas.width, canvas.height)
      const offsetX = ((offset.x % squareSize) + squareSize) % squareSize
      const offsetY = ((offset.y % squareSize) + squareSize) % squareSize
      const columns = Math.ceil(canvas.width / squareSize) + 3
      const rows = Math.ceil(canvas.height / squareSize) + 3
      for (let column = -2; column < columns; column++) {
        for (let row = -2; row < rows; row++) {
          const x = column * squareSize + offsetX
          const y = row * squareSize + offsetY
          context.strokeStyle = borderColor
          context.strokeRect(x, y, squareSize, squareSize)
        }
      }

      const vignette = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.hypot(canvas.width, canvas.height) / 2,
      )
      vignette.addColorStop(0, 'rgb(0 0 0 / 0)')
      vignette.addColorStop(1, '#120F17')
      context.fillStyle = vignette
      context.fillRect(0, 0, canvas.width, canvas.height)
      frame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [borderColor, canvasRef, direction, enVista, speed, squareSize])

  return <canvas ref={canvasRef} className="shape-grid size-full" aria-hidden="true" />
}
