/**
 * Lockup de marca: el logo original de Voorpret (globo + avión + wordmark)
 * más la bajada de sucursal, que el logo no incluye.
 *
 * El archivo ya trae el wordmark, así que acá NO se vuelve a escribir
 * "VOORPRET" con tipografía: se evita el doble wordmark.
 * Ver public/brand/README.md para los formatos disponibles.
 */
import { logoMarca } from '../data/imagenes'

type Props = {
  /** Muestra "25 de Mayo / Buenos Aires" al lado del logo */
  sucursal?: boolean
  /** Clases de alto. El ancho se deduce de la relación del archivo. */
  alto?: string
  className?: string
  /** true sobre fondos oscuros */
  claro?: boolean
}

export default function Marca({
  sucursal = true,
  alto = 'h-11 sm:h-14',
  className = '',
  claro = true,
}: Props) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoMarca.src}
        srcSet={logoMarca.srcSet}
        sizes={logoMarca.sizes}
        alt="Voorpret"
        width={logoMarca.width}
        height={logoMarca.height}
        className={`${alto} w-auto shrink-0`}
        decoding="async"
      />
      {sucursal && (
        <span className="hidden items-center gap-3 lg:flex">
          <span
            className={`h-8 w-px shrink-0 ${claro ? 'bg-papel/25' : 'bg-tinta/25'}`}
            aria-hidden="true"
          />
          <span
            className={`etiqueta text-[0.5625rem] tracking-[0.2em] ${
              claro ? 'text-papel/60' : 'text-tinta/60'
            }`}
          >
            25 de Mayo
          </span>
        </span>
      )}
    </span>
  )
}
