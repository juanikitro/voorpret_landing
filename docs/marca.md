# Marca — archivos del logo

El logo original ya está integrado. Estos son los archivos y para qué sirve cada uno.

### Se publican — `public/brand/`

| Archivo | Medida | Peso | Lo usa |
|---|---|---|---|
| `voorpret-logo.webp` | 360 × 256 | 89 kB | **El sitio**: header, menú móvil y footer |
| `voorpret-icono-180.png` | 180 × 180 | 38 kB | Ícono de iOS al agregar a inicio |
| `voorpret-icono-32.png` | 32 × 32 | 2 kB | Favicon de la pestaña |
| `og.jpg` | 1200 × 630 | **falta** | Previsualización al compartir el link |

### No se publican — `assets-fuente/`

| Archivo | Medida | Peso | Para qué |
|---|---|---|---|
| `voorpret-logo-original.jpg` | 1080 × 1080 | 115 kB | El original entregado por el cliente |
| `voorpret-logo-master.png` | 888 × 632 | 572 kB | Master transparente, para imprenta y otros usos |
| `voorpret-logo-trazado.svg` | vector | 488 kB | Trazado automático, ver más abajo |

## Qué se hizo con el original

1. **Fondo transparente.** Se quitó el blanco por relleno desde los bordes, no
   borrando "todo lo blanco": las letras de VOORPRET son blancas y el globo
   tiene zonas claras, así que un borrado global las habría agujereado. El
   antialias del JPG se resolvió con alfa parcial, sin halo.
2. **Recorte de márgenes** al contenido real: 1080 × 1080 → 888 × 632.
3. **Ícono aparte.** El favicon usa sólo el globo + avión (recorte por encima
   del wordmark), porque un lockup de 1,4:1 a 32 px es un borrón ilegible.

El logo **no se redibujó ni se reinterpretó** en ningún momento.

## Sobre el SVG

`assets-fuente/voorpret-logo-trazado.svg` es un trazado automático (VTracer)
del JPG. Está en el repo por si lo necesitás, pero **el sitio no lo carga**,
por dos razones:

- **Peso**: 488 kB contra 89 kB del WebP, para mostrarse a 56 px de alto.
- **Fidelidad**: el trazado degrada la trama de puntos del globo (los puntitos
  se empastan), deja el borde del círculo dentado y pierde el sombreado del
  avión. Se probaron varias configuraciones; todas pierden algo.

Un JPG no contiene información vectorial: cualquier conversión es una
aproximación. **Si necesitás vectores de verdad** (cartelería grande, bordado,
serigrafía), pedile al diseñador que hizo el logo el archivo original en
`.ai`, `.eps`, `.pdf` o `.svg`. Es un pedido de dos minutos y es la única forma
de tener un vector fiel.

Para todo lo que es web, el WebP transparente es la opción correcta: pesa 5×
menos y es pixel a pixel igual al original.

## Si cambia el logo

Reemplazá `voorpret-logo.webp` manteniendo el nombre y la proporción (1,4:1
aprox). El componente [`Marca.tsx`](../src/components/Marca.tsx) deduce el
ancho del alto, así que no hay que tocar código.

Si el logo nuevo **no** incluyera el wordmark, habría que agregar el texto al
lado en ese componente (hoy no se escribe, justamente para no duplicarlo).
