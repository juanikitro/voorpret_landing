import { useState } from 'react'
import type { SolHeroConfig, SolHeroPosicion } from '../data/imagenes'

/* ============================================================================
   SOL DEL HERO
   ----------------------------------------------------------------------------
   El sol es una imagen raster, no un div. Se compone con `mix-blend-screen`,
   que es blending aditivo: un archivo con fondo negro puro aporta cero en las
   zonas negras y suma luz en el resplandor. Es cómo se compone luz de verdad,
   y evita depender del canal alfa.

   Dos cosas que parecen detalles y no lo son:

   1. Va DENTRO de la capa fotográfica, antes de los velos de contraste. Así el
      velo que protege la lectura del titular también apaga el sol, y no hace
      falta enmascararlo aparte.

   2. Nada de `mask-image` en un contenedor padre: una máscara crea un grupo
      aislado y el `mix-blend-screen` deja de ver la foto, con lo cual el
      rectángulo negro del archivo tapa la imagen en lugar de sumar luz.

   El archivo se guarda sin pérdida (lo hace npm run imagenes): con compresión
   el negro deja de ser #000 y el screen levanta todo el rectángulo.
   ========================================================================== */

export default function SolHero({
  config,
  quieto,
}: {
  config: SolHeroConfig
  quieto: boolean
}) {
  // Mientras el archivo no exista, el hero queda como si no hubiera sol
  const [fallo, setFallo] = useState(false)
  if (fallo) return null

  const estilo = (posicion: SolHeroPosicion) => ({
    left: `${posicion.x}%`,
    top: `${posicion.y}%`,
    width: `${posicion.tamano}%`,
    opacity: posicion.opacidad,
    marginLeft: `-${posicion.tamano / 2}%`,
    translate: '0 -50%',
  })

  const claseBase = `pointer-events-none absolute max-w-none select-none mix-blend-screen ${
    quieto ? '' : 'anim-sol'
  }`

  return (
    <>
      {config.movil && (
        <img
          src={config.imagen}
          alt=""
          aria-hidden="true"
          tabIndex={-1}
          draggable={false}
          decoding="async"
          onError={() => setFallo(true)}
          className={`${claseBase} sm:hidden`}
          style={estilo(config.movil)}
        />
      )}
      <img
        src={config.imagen}
        alt=""
        aria-hidden="true"
        tabIndex={-1}
        draggable={false}
        decoding="async"
        onError={() => setFallo(true)}
        className={`${claseBase} hidden sm:block`}
        style={estilo(config)}
      />
    </>
  )
}
