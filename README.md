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
| `src/data/paquetes.ts` | Las propuestas: nombre, temporada, qué incluye, recorrido, ilustración |
| `src/data/sitio.ts` | WhatsApp, redes, legajo, ubicación, textos del proceso y de confianza |

### Agregar o cambiar una propuesta

Abrí `src/data/paquetes.ts` y copiá un bloque existente. Los campos están
comentados ahí mismo. Tres reglas:

- **Nunca se publican precios.** Todo lleva a consultar por WhatsApp.
- `demo: true` marca contenido inventado para la demo. Borralo o reemplazalo
  antes de publicar.
- `imagen: null` usa la ilustración generada. Para poner una foto real, ver
  [`public/images/paquetes/README.md`](public/images/paquetes/README.md).

### Cambiar el número de WhatsApp

`src/data/sitio.ts` → `whatsapp`. Dos formatos: `visible` (lo que lee la
persona) y `wa` (el que usa el enlace, sin `+` ni espacios). Se actualizan de
una vez los 10 puntos de contacto de la página.

---

## Antes de publicar — pendientes

| # | Qué | Dónde |
|---|---|---|
| 1 | **Logo real** de Voorpret (hoy hay un placeholder geométrico) | `public/brand/` — ver README ahí |
| 2 | **Validar el legajo 16130** con el dueño | `src/data/sitio.ts` |
| 3 | **Reemplazar los 6 paquetes con `demo: true`** por propuestas reales | `src/data/paquetes.ts` |
| 4 | **Imagen para compartir** el link (og.jpg, 1200 × 630) | `public/brand/og.jpg` |
| 5 | **Fotos reales** de las salidas, sobre todo de la grupal a Perú | `public/images/paquetes/` |
| 6 | **Dominio final** en `canonical`, `og:url` y el JSON-LD | `index.html` |
| 7 | Confirmar la **dirección del local** si se quiere publicar calle y número | hoy sólo dice "25 de Mayo, Buenos Aires" a propósito |

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
    paquetes.ts        ← contenido de las propuestas (único lugar a editar)
    sitio.ts           ← contacto, redes, textos institucionales
  lib/
    whatsapp.ts        ← armado de los enlaces wa.me
    hooks.ts           ← revelados, parallax, movimiento reducido
  components/
    ArteDestino.tsx    ← motor de ilustraciones (o la foto real si existe)
    IndiceDeseos.tsx   ← el índice de propuestas
    Cotizador.tsx      ← la consulta general de 3 datos
    ...
  styles/global.css    ← tokens de color, tipografía, trama y animaciones
public/
  brand/               ← logo y og:image
  images/paquetes/     ← fotos reales cuando se carguen
```

## Notas técnicas

- **Accesibilidad**: el índice es un acordeón real (`aria-expanded` /
  `aria-controls`), los paneles cerrados quedan `inert`, hay foco visible en
  todo, y `prefers-reduced-motion` desactiva el movimiento sin esconder nada ni
  romper la conversión.
- **Peso**: ~77 kB gz de JS (casi todo React) y ~10 kB gz de CSS. Las
  ilustraciones son SVG generados en el cliente, no descargan nada.
- **Sin scroll-jacking**: el parallax escribe una custom property con `rAF` y
  el CSS hace el resto. Con movimiento reducido no se calcula nada.
- Los enlaces de WhatsApp usan `wa.me`, que resuelve solo entre app móvil,
  app de escritorio y WhatsApp Web.
