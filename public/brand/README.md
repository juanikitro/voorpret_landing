# Marca — archivos a reemplazar

## `voorpret-logo.svg` — **REEMPLAZAR ANTES DE PUBLICAR**

El archivo actual es un **placeholder geométrico deliberado**: disco violeta,
trama de puntos y una "V". **No es un redibujo del logo real** — el logo
original (globo + avión + wordmark) no se modificó ni se reinterpretó.

### Cómo reemplazarlo

1. Conseguí el logo original en **SVG** (ideal) o **PNG con fondo transparente**
   de al menos **512 × 512 px**.
2. Guardalo en esta carpeta como `voorpret-logo.svg` (o `.png`).
3. Si usás `.png`, cambiá la extensión en `src/components/Marca.tsx`
   (constante `ARCHIVO_LOGO`).

No hace falta tocar nada más: el tamaño, el espaciado y el lockup con el texto
"VOORPRET / 25 DE MAYO" ya están resueltos y se adaptan al archivo nuevo.

### Nota sobre el wordmark

En el encabezado y el pie, el texto "VOORPRET" se compone tipográficamente
(Archivo 800) al lado del isotipo. Si el logo original que cargás **ya incluye
el wordmark**, pasá `soloIsotipo={false}` → `wordmark={false}` en `Marca` para
no duplicarlo (ver comentario en el componente).

---

## Otros archivos de esta carpeta

| Archivo | Estado | Para qué |
|---|---|---|
| `voorpret-logo.svg` | provisorio | isotipo en header, footer y favicon |
| `og.jpg` | **falta** | imagen de previsualización al compartir el link (1200 × 630) |
