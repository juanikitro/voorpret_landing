/**
 * Lockup de marca: isotipo + wordmark tipográfico.
 * Para cambiar el logo, ver public/brand/README.md
 */
const ARCHIVO_LOGO = '/brand/voorpret-logo.svg'

type Props = {
  /** false si el archivo de logo ya trae el wordmark incluido */
  wordmark?: boolean
  className?: string
  claro?: boolean
}

export default function Marca({ wordmark = true, className = '', claro = true }: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={ARCHIVO_LOGO}
        alt="Voorpret"
        width={44}
        height={44}
        className="size-9 shrink-0 sm:size-11"
        fetchPriority="high"
      />
      {wordmark && (
        <span className="hidden leading-none sm:block">
          <span
            className="block font-display text-[1.32rem] font-extrabold tracking-[-0.045em]"
            style={{ fontVariationSettings: "'wdth' 108" }}
          >
            VOORPRET
          </span>
          <span
            className={`etiqueta mt-[3px] block text-[0.5625rem] tracking-[0.24em] ${
              claro ? 'text-papel/55' : 'text-tinta/55'
            }`}
          >
            25 de Mayo
          </span>
        </span>
      )}
    </span>
  )
}
