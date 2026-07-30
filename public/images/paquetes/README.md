# Fotos de los paquetes

Hoy cada propuesta se muestra con una **ilustración generada por código**
(`src/components/ArteDestino.tsx`), no con fotos. Pesa pocos kB, escala a
cualquier tamaño y mantiene todos los destinos dentro de la misma dirección
visual.

## Cómo poner una foto real

1. Guardá la imagen en esta carpeta, por ejemplo `peru.jpg`.
2. Abrí `src/data/paquetes.ts` y en ese paquete cambiá:

   ```ts
   imagen: null,
   ```

   por:

   ```ts
   imagen: '/images/paquetes/peru.jpg',
   ```

Listo. La foto reemplaza la ilustración **sin tocar el diseño**: hereda el
mismo encuadre, el mismo tratamiento de color de la marca y la misma trama de
puntos, así que conviven fotos e ilustraciones sin que se note el parche.

Podés migrar de a una: los paquetes que sigan con `imagen: null` mantienen su
ilustración.

## Especificaciones

| | |
|---|---|
| Relación | **16:10** (el encuadre del sistema) |
| Medida recomendada | 1600 × 1000 px |
| Formato | `.webp` o `.avif` preferido; `.jpg` funciona |
| Peso máximo sugerido | 200 kB por imagen |
| Encuadre | El interés visual en el centro: la miniatura del índice recorta un poco los costados |

Las imágenes se cargan con `loading="lazy"` automáticamente (salvo la primera),
así que no afectan la velocidad de la primera pantalla.

## Recomendación de contenido

Priorizá **fotos propias de las salidas grupales** por encima del stock: son el
activo más valioso que tiene la agencia y es lo que diferencia la web de
cualquier otra. Si son de viajeros reconocibles, pedí autorización antes.
