/**
 * Lockup de marca: el logo original de Voorpret (globo + avión + wordmark)
 * más la bajada de sucursal, que el logo no incluye.
 *
 * El archivo ya trae el wordmark, así que acá NO se vuelve a escribir
 * "VOORPRET" con tipografía: se evita el doble wordmark.
 * Ver public/brand/README.md para los formatos disponibles.
 */
const LOGO = '/brand/voorpret-logo.webp'

type Props = {
  /** Muestra "25 de Mayo / Buenos Aires" al lado del logo */
  sucursal?: boolean
  /** Clases de alto. El ancho se deduce de la relación del archivo. */
  alto?: string
  className?: string
  /** true sobre fondos oscuros */
  claro?: boolean
  prioridad?: boolean
}

export default function Marca({
  sucursal = true,
  alto = 'h-11 sm:h-14',
  className = '',
  claro = true,
  prioridad = false,
}: Props) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src={LOGO}
        alt="Voorpret"
        width={888}
        height={632}
        className={`${alto} w-auto shrink-0`}
        fetchPriority={prioridad ? 'high' : 'auto'}
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
