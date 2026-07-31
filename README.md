# Voorpret 25 de Mayo — Landing

Landing oficial de **Voorpret 25 de Mayo**, agencia de viajes de 25 de Mayo,
Buenos Aires. Conversión principal: iniciar una conversación por WhatsApp.

React + TypeScript + Vite + Tailwind v4. Sin backend, sin base de datos, sin CMS.

---

## Arrancar

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Deploy en Vercel: framework **Vite**, build `npm run build`, output `dist`.
No hace falta ninguna variable de entorno.

---

## Dónde se edita cada cosa

Todo el contenido está centralizado en dos archivos. **No hace falta tocar
componentes para actualizar la web.**

| Archivo | Qué contiene |
|---|---|
| `src/data/paquetes.ts` | Las propuestas: nombre, temporada, qué incluye, recorrido, ilustración o foto |
| `src/data/sitio.ts` | WhatsApp, redes, legajo, ubicación, textos del proceso y de confianza |
| `src/data/imagenes.ts` | La foto del hero y la intensidad del grade de marca |

### Ilustraciones o fotos

Hoy la página usa **fotos** en el hero y en los 7 destinos. Debajo siguen
existiendo las **ilustraciones vectoriales generadas por código**, que actúan de
respaldo automático: si una foto falta o está mal nombrada, ese lugar muestra su
ilustración en vez de una imagen rota.

Dos interruptores en `src/data/imagenes.ts` controlan todo:

```ts
export const usarFotoHero = true
export const usarFotosPaquetes = true
```

Ponelos en `false` y vuelve la versión ilustrada completa. Es reversible siempre.

👉 Medidas, nombres de archivo y prompts listos para copiar:
[`docs/imagenes.md`](docs/imagenes.md)

### Agregar o cambiar una propuesta

Abrí `src/data/paquetes.ts` y copiá un bloque existente. Los campos están
comentados ahí mismo. Tres reglas:

- **Nunca se publican precios.** Todo lleva a consultar por WhatsApp.
- `demo: true` marca contenido inventado para la demo. Borralo o reemplazalo
  antes de publicar.
- **La foto no se declara acá.** Cada paquete busca solo
  `/images/paquetes/<id>.webp`. Ver [`docs/imagenes.md`](docs/imagenes.md).

### Cambiar el número de WhatsApp

`src/data/sitio.ts` → `whatsapp`. Dos formatos: `visible` (lo que lee la
persona) y `wa` (el que usa el enlace, sin `+` ni espacios). Se actualizan de
una vez los 10 puntos de contacto de la página.

---

## Antes de publicar — pendientes

| # | Qué | Dónde |
|---|---|---|
| 1 | **Validar el legajo 16130** con el dueño | `src/data/sitio.ts` |
| 2 | **Reemplazar los 6 paquetes con `demo: true`** por propuestas reales | `src/data/paquetes.ts` |
| 3 | **Imagen para compartir** el link (og.jpg, 1200 × 630) | `public/brand/og.jpg` |
| 4 | **Dominio final** en `canonical`, `og:url` y el JSON-LD | `index.html` |
| 5 | Confirmar la **dirección del local** si se quiere publicar calle y número | hoy sólo dice "25 de Mayo, Buenos Aires" a propósito |

✅ El **logo original** ya está integrado (transparente, con favicon aparte).
✅ Las **9 imágenes** están integradas: hero ancha y vertical, el sol y los 7 destinos.

---

## Volver a una versión anterior

El repo tiene puntos de restauración con tag:

| Tag | Qué es |
|---|---|
| `v1-ilustrado` | Todo con ilustraciones vectoriales, logo provisorio |
| `v2-logo-real` | Logo original integrado + sistema de fotos listo (ilustraciones activas) |
| `v3-hero-foto` | Foto del hero integrada, destinos todavía ilustrados |
| `v4-fotografico` | Fotos en el hero y en los 7 destinos + sol compuesto |

```bash
git checkout v1-ilustrado
```

Para volver a la última versión: `git checkout master`. Para recuperar sólo un
archivo de un tag: `git checkout v1-ilustrado -- src/components/Hero.tsx`.

### Lo que deliberadamente NO está

Para no publicar nada que no se pueda respaldar:

- Sin reseñas, testimonios, estrellas ni cantidad de viajeros.
- Sin premios, certificaciones ni logos de proveedores u organismos.
- Sin contadores de cupos, urgencia inventada ni "quedan 2 lugares".
- Sin calle ni numeración (hay información pública contradictoria).

El bloque de prueba social ya está diseñado y **desactivado** en
`src/components/Confianza.tsx` (`MOSTRAR_PRUEBA_SOCIAL = false`). Cuando haya
reseñas reales y con permiso de los viajeros, se pone en `true` y se cargan.

---

## Estructura

```
src/
  data/
    paquetes.ts        ← contenido de las propuestas (el archivo a editar)
    sitio.ts           ← contacto, redes, textos institucionales
    imagenes.ts        ← foto del hero + intensidad del grade
  lib/
    whatsapp.ts        ← armado de los enlaces wa.me
    hooks.ts           ← revelados, parallax, movimiento reducido
  components/
    ArteDestino.tsx    ← motor de ilustraciones (o la foto real si existe)
    IndiceDeseos.tsx   ← el índice de propuestas
    Cotizador.tsx      ← la consulta general de 3 datos
    ...
  styles/global.css    ← tokens de color, tipografía, trama y animaciones

public/                ← SÓLO lo que se sirve al navegador
  brand/               ← logo webp + favicons
  images/hero/         ← hero ancha, hero vertical y el sol
  images/paquetes/     ← las 7 fotos + su miniatura de 320 px

assets-fuente/         ← no se publica: originales del logo y el trazado svg
docs/
  imagenes.md          ← medidas, nombres y prompts de las imágenes
  marca.md             ← qué se hizo con el logo y cómo reemplazarlo
```

## Notas técnicas

- **Accesibilidad**: el índice es un acordeón real (`aria-expanded` /
  `aria-controls`), los paneles cerrados quedan `inert`, hay foco visible en
  todo, y `prefers-reduced-motion` desactiva el movimiento sin esconder nada ni
  romper la conversión.
- **Peso**: ~78 kB gz de JS (casi todo React) y ~10 kB gz de CSS. Las fotos van
  con `loading="lazy"` salvo el hero, y el índice cerrado usa miniaturas de
  320 px (`<id>-mini.webp`): bajar las fotos de 1600 px para mostrarlas a 74 px
  costaba ~927 kB, ahora son 46 kB.
- **El sol del hero** es una imagen compuesta con `mix-blend-mode: screen`
  dentro de la capa fotográfica. Va antes de los velos de contraste, así el
  mismo velo que protege la lectura del titular también lo atenúa. Ver
  `src/components/SolHero.tsx`.
- **Sin scroll-jacking**: el parallax escribe una custom property con `rAF` y
  el CSS hace el resto. Con movimiento reducido no se calcula nada.
- Los enlaces de WhatsApp usan `wa.me`, que resuelve solo entre app móvil,
  app de escritorio y WhatsApp Web.
