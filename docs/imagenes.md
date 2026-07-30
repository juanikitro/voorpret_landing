# Brief de imágenes — Voorpret

El sitio funciona **hoy** con ilustraciones vectoriales generadas por código.
Cada imagen que agregues acá reemplaza una ilustración, de a una, sin tocar el
diseño ni romper nada. Podés migrar en cualquier orden y en cualquier momento.

---

## 1. Dirección de arte (leer antes de generar)

Lo que hace que un set de fotos se vea como **una producción** y no como un
collage de stock son tres cosas. Respetalas en todas las imágenes:

| | |
|---|---|
| **Hora** | Siempre golden hour o crepúsculo. Nunca mediodía, nunca noche cerrada. |
| **Paleta** | Cielo violeta/magenta profundo arriba, ámbar cálido cerca del horizonte. Es la paleta de la marca. |
| **Encuadre** | Plano general cinematográfico, horizonte bajo, mucho cielo. |
| **Sin gente** | Nada de caras. Siluetas lejanas está bien; retratos no. |
| **Sin texto** | Ni carteles, ni marcas de agua, ni logos. |

La página además aplica un **grade de marca** automático sobre cada foto
(teñido violeta/ámbar + trama de puntos). Por eso conviene que las fotos
vengan **más bien neutras y no sobresaturadas**: el color de marca lo pone el
sitio. Si te quedan muy teñidas, bajá `gradeMarca` en
[`src/data/imagenes.ts`](../src/data/imagenes.ts).

### Prompt negativo (usalo en todas)

```
people, faces, crowds, text, letters, signage, watermark, logo,
oversaturated HDR, cartoon, illustration, painting, 3d render,
fisheye, tilt-shift, blurry, low quality, duplicated horizon
```

---

## 2. Archivos que hacen falta

### Hero — 2 imágenes de la misma escena

| Archivo | Medida | Relación | Para |
|---|---|---|---|
| `hero/atardecer-ancha.webp` | 2400 × 1400 | 12:7 | Escritorio y tablet |
| `hero/atardecer-alta.webp` | 1200 × 1600 | 3:4 | Celular (recorte vertical) |

> Son **la misma escena en dos encuadres**, no dos fotos distintas. Si generás
> con IA, generá la horizontal y después pedí la vertical con el mismo prompt
> agregando `vertical composition, tall sky, road in the lower third`.

**Prompt — hero**

```
A deserted two-lane road winding toward distant Andean mountain ridges at dusk,
layered silhouetted mountain ranges receding into violet atmospheric haze,
deep magenta and violet sky fading to warm amber near the horizon,
low sun glow behind the ridges, empty road in the foreground leading to the
vanishing point, cinematic wide landscape, photorealistic, shot on 35mm,
no people, no vehicles, no signs
```

⚠️ Si la foto que elegís tiene un sol muy marcado arriba a la derecha, poné
`heroSolDeTrama = false` en `src/data/imagenes.ts` para que no queden dos soles.

### Destinos — 1 imagen por paquete

Todas **1600 × 1000 (16:10)**. Guardalas en `paquetes/`.

| Archivo | Prompt |
|---|---|
| `peru.webp` | `Machu Picchu stone terraces and the Huayna Picchu peak at golden hour, layered Andean ridges receding into violet haze behind, dramatic low clouds, warm raking light, cinematic wide, photorealistic` |
| `caribe.webp` | `Caribbean beach at sunset, silhouetted palm trees leaning over calm turquoise water turned amber by the low sun, sun reflection streaking across the water, deep violet sky fading to gold at the horizon, cinematic wide, photorealistic` |
| `europa.webp` | `European old town skyline at dusk seen across a river, domes and bell towers silhouetted against a pale amber horizon under a deep violet sky, warm window lights, atmospheric haze, cinematic wide, photorealistic` |
| `norte.webp` | `Quebrada de Humahuaca in northern Argentina, striped multicolored rock hills at golden hour, layered ochre rust and violet strata, tall cardon cacti silhouetted in the foreground, deep violet sky, cinematic wide, photorealistic` |
| `japon.webp` | `Mount Fuji at dusk seen beyond a traditional torii gate, symmetrical snow-capped cone, deep violet and magenta sky with a pale golden band at the horizon, low mist over the foreground, cinematic wide, photorealistic` |
| `egipto.webp` | `Pyramids of Giza at golden hour, warm rippled sand dunes in the foreground, low sun casting long shadows, deep violet sky fading to amber, desert atmospheric haze, cinematic wide, photorealistic` |
| `brasil.webp` | `Rio de Janeiro at sunset from a hillside, rounded granite peaks silhouetted over the bay, sun reflection on the water, silhouetted palm fronds framing the left edge, deep violet sky fading to gold, cinematic wide, photorealistic` |

### Para compartir el link

| Archivo | Medida | Para |
|---|---|---|
| `public/brand/og.jpg` | 1200 × 630 | Previsualización en WhatsApp, Instagram y Google |

Lo más simple: el hero horizontal recortado a 1200 × 630.

---

## 3. Cómo dejarlas listas

1. **Convertí a WebP.** Si la IA te da PNG o JPG, pasalo por
   [squoosh.app](https://squoosh.app) → formato WebP, calidad **78-82**.
2. **Objetivo de peso**: hero hasta 320 kB, destinos hasta 200 kB cada uno.
   Si pesa más, bajá la calidad antes que la medida.
3. **Guardá con el nombre exacto** de las tablas de arriba.

---

## 4. Cómo activarlas

### El hero

En [`src/data/imagenes.ts`](../src/data/imagenes.ts), reemplazá el `null`:

```ts
export const heroFoto: Foto | null = {
  ancha: '/images/hero/atardecer-ancha.webp',
  alta: '/images/hero/atardecer-alta.webp',
  alt: 'Cordillera al atardecer con un camino que se pierde en el horizonte',
  foco: 'center 62%',
}
```

### Un destino

En [`src/data/paquetes.ts`](../src/data/paquetes.ts), en ese paquete:

```ts
imagen: '/images/paquetes/peru.webp',
foco: 'center 40%',   // opcional: qué parte no se puede recortar
```

`foco` usa la sintaxis de `object-position`. Serví para cuando el recorte te
come algo importante: `center 30%` sube el encuadre, `70% center` lo corre a la
derecha. Si no lo ponés, centra.

### Volver atrás

Poné `null` de nuevo y vuelve la ilustración. No se pierde nada: las
ilustraciones no se borran, quedan como respaldo permanente.
