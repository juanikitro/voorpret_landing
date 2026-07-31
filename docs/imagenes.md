# Brief de imágenes — Voorpret

El sitio funciona **hoy** con ilustraciones vectoriales generadas por código.
Cada imagen que agregues reemplaza una ilustración, de a una, sin tocar el
diseño. Podés migrar en cualquier orden y volver atrás cuando quieras.

Son **9 imágenes**: 2 del hero (misma escena, dos encuadres) y 7 de destinos.

---

## 1. Cómo generarlas en ChatGPT

### El truco de la consistencia

Lo que hace que un set se vea como **una producción** y no como un collage de
stock es que todas compartan hora, paleta y tratamiento.

1. Abrí **un solo chat** y generá primero el hero horizontal.
2. Para cada imagen siguiente, en **ese mismo chat**, escribí:

   > Same photographic treatment, same colour palette and same time of day as
   > the previous image. Now generate this, as a landscape image:
   >
   > *(y pegás el prompt del destino)*

ChatGPT mantiene el estilo dentro de la conversación. Si abrís un chat nuevo
para cada imagen, te van a quedar nueve fotos que no parecen del mismo lugar.

### Medidas

ChatGPT genera en estos tamaños. No pidas otros, los recorta mal:

| Pedile | Medida | Para |
|---|---|---|
| *"as a landscape image"* | 1536 × 1024 | Hero horizontal y los 7 destinos |
| *"as a portrait image"* | 1024 × 1536 | Sólo el recorte vertical del hero |

1536 px de ancho alcanza: el sitio le aplica encima un grade de color y una
trama de puntos que disimulan cualquier blandura. Si querés más definición para
el hero, pasalo por un upscaler 2× antes de convertir.

### Una por mensaje

Pedí **una imagen por mensaje**: si le pedís varias juntas baja la calidad de
todas. Si alguna sale con gente o con carteles, respondé
*"regenerate without any people or signage"* en lugar de reescribir el prompt.

---

## 2. Los prompts

### Hero — horizontal

> A wide cinematic landscape photograph at early dusk: an empty two-lane
> asphalt road runs from the bottom of the frame toward the horizon, where
> layered Andean mountain ridges recede into violet atmospheric haze. The sky
> is a deep violet and magenta gradient at the top, warming to amber just above
> the ridgeline, with a low sun glow hidden behind the mountains. Dry
> high-altitude scrubland on both sides of the road. Photorealistic, shot on
> 35mm film, soft natural contrast, not oversaturated. No people, no vehicles,
> no road signs, no text.

→ `public/images/hero/atardecer-ancha.webp`

### Hero — vertical

El mismo prompt, agregando al final:

> Vertical portrait composition: the road occupies the lower third and the
> dramatic sky fills the upper two thirds.

→ `public/images/hero/atardecer-alta.webp`

⚠️ Si el hero te queda con un sol muy marcado **arriba a la derecha**, poné
`heroSolDeTrama = false` en [`src/data/imagenes.ts`](../src/data/imagenes.ts),
o van a quedar dos soles.

---

### Perú → `paquetes/peru.webp`

> A wide cinematic landscape photograph of the Machu Picchu stone terraces at
> golden hour, with the Huayna Picchu peak rising behind them and layered
> Andean ridges receding into violet haze in the distance. Warm raking sunlight
> across the ancient stone walls, low clouds drifting between the peaks. Deep
> violet sky above, warm amber light near the horizon. Photorealistic, shot on
> 35mm film. No people, no text.

### Caribe → `paquetes/caribe.webp`

> A wide cinematic photograph of a Caribbean beach at sunset: silhouetted palm
> trees lean over calm shallow water that the low sun has turned amber, with a
> bright reflection streaking across the surface toward the camera. Deep violet
> sky at the top fading to gold at the horizon. Empty white sand in the
> foreground. Photorealistic, shot on 35mm film. No people, no boats, no text.

### Europa → `paquetes/europa.webp`

> A wide cinematic photograph of a European old-town skyline at dusk, seen from
> across a calm river: domes, bell towers and tiled rooftops silhouetted
> against a pale amber horizon under a deep violet sky, warm lights beginning
> to glow in the windows, soft atmospheric haze over the water. Photorealistic,
> shot on 35mm film. No people in the foreground, no text, no signage.

### Norte argentino → `paquetes/norte.webp`

> A wide cinematic photograph of the Quebrada de Humahuaca in northern
> Argentina at golden hour: striped multicoloured rock hills with layered
> ochre, rust, cream and violet strata, tall cardón cacti silhouetted in the
> foreground, deep violet sky above, warm amber light raking across the
> hillsides. Photorealistic, shot on 35mm film. No people, no text.

### Japón → `paquetes/japon.webp`

> A wide cinematic photograph of Mount Fuji at dusk, seen framed beyond a
> traditional wooden torii gate: the symmetrical snow-capped cone in the
> distance, a deep violet and magenta sky with a pale golden band just above
> the horizon, low mist over the foreground. Photorealistic, shot on 35mm film.
> No people, no text.

### Egipto → `paquetes/egipto.webp`

> A wide cinematic photograph of the pyramids of Giza at golden hour: warm
> rippled sand dunes in the foreground, the pyramids silhouetted in the middle
> distance, long shadows raking across the sand, deep violet sky above fading
> to amber near the horizon, desert atmospheric haze. Photorealistic, shot on
> 35mm film. No people, no camels, no text.

### Brasil → `paquetes/brasil.webp`

> A wide cinematic photograph of Rio de Janeiro at sunset seen from a hillside:
> rounded granite peaks silhouetted over the bay, the low sun reflecting off
> the water, silhouetted palm fronds framing the left edge of the frame, deep
> violet sky fading to gold near the horizon. Photorealistic, shot on 35mm
> film. No people, no text.

---

### Para compartir el link

No hace falta generar nada nuevo: recortá el **hero horizontal** a
**1200 × 630** y guardalo como `public/brand/og.jpg`.

---

## 3. Antes de subirlas

1. **Convertí a WebP** en [squoosh.app](https://squoosh.app) → formato WebP,
   calidad **78-82**.
2. **Peso objetivo**: hero hasta 320 kB, destinos hasta 200 kB cada uno. Si
   pesa más, bajá la calidad antes que la medida.
3. **Nombre exacto** el de las flechas de arriba. El de cada destino es el `id`
   del paquete en `paquetes.ts`.

### Por qué conviene que NO vengan sobresaturadas

El sitio les aplica encima un **grade de marca** (teñido violeta arriba, ámbar
abajo) más la trama de puntos: ése es el color de marca. Si las fotos ya vienen
muy cargadas de color, se suman los dos efectos y quedan irreales. Si te pasa,
bajá `gradeMarca` en [`src/data/imagenes.ts`](../src/data/imagenes.ts).

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
foco: 'center 40%',   // opcional
```

`foco` usa la sintaxis de `object-position`, para cuando el recorte te come algo
importante: `center 30%` sube el encuadre, `70% center` lo corre a la derecha.
Si no lo ponés, centra.

### Volver atrás

Poné `null` de nuevo y vuelve la ilustración. Las ilustraciones no se borran:
quedan como respaldo permanente.
