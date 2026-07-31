# Prompts para generar las imágenes

Copiar y pegar. Nada más.

---

## El ritual (igual para todas)

ChatGPT **no puede guardar archivos en tu disco**: te da la imagen y vos la
descargás. Así que para cada imagen son tres pasos:

1. Pegá el prompt en ChatGPT.
2. Descargá la imagen y guardala en `public/images/paquetes/` con el **nombre
   exacto** que dice cada bloque. Podés dejarla en PNG o JPG, no importa.
3. Cuando tengas todas, corré una sola vez:

```bash
npm run imagenes
```

Ese comando las convierte a WebP, las achica a la medida justa, guarda los
originales en `assets-fuente/imagenes-originales/` y te dice qué falta. Si un
nombre no coincide, te avisa cuál usar.

> **Hacelas todas en la misma conversación de ChatGPT, una atrás de la otra.**
> Mantiene el estilo consistente entre imágenes, que es justamente lo que hace
> que un set parezca una producción y no un collage.

---

## ✅ El hero ya está

`hero-ancha.webp` — la que generaste (la ruta de montaña al atardecer) ya está
integrada y funcionando. No hace falta tocar nada.

**Opcional**, si querés un recorte vertical propio para celular en lugar del
recorte automático:

```
Generá una versión VERTICAL (formato retrato, más alto que ancho) de esta misma
escena: la misma ruta de montaña al atardecer, la misma cordillera y el mismo
cielo. Composición vertical: mucho cielo arriba y la ruta ocupando el tercio
inferior, entrando desde abajo del encuadre hacia el punto de fuga. Fotografía
realista, sin personas, sin vehículos, sin carteles y sin ningún texto.
```

Guardala como `hero-alta.png` en `public/images/hero/`, corré `npm run imagenes`
y después descomentá la línea `alta:` en
[`src/data/imagenes.ts`](../src/data/imagenes.ts).

---

## Falta: el sol del hero → `sol.png`

El sol se compone **encima** de la foto como luz aditiva. Va a
`public/images/hero/`.

```
Imagen cuadrada sobre fondo NEGRO PURO (#000000) absoluto, sin ningún otro
elemento. En el centro, solamente el sol y su luz: un núcleo dorado muy
brillante, un halo ámbar que se difunde en anillos suaves, y neblina atmosférica
cálida que se estira un poco en horizontal, como el aire cerca del horizonte al
atardecer. La luz tiene que desvanecerse por completo hasta negro absoluto ANTES
de llegar a los bordes: los cuatro bordes tienen que quedar 100% negros. Sin
paisaje, sin nubes, sin montañas, sin siluetas, sin destellos hexagonales de
lente, sin texto ni marcas. Fotorrealista, no ilustración. Formato cuadrado.
```

### Por qué fondo negro y no transparente

Se compone con `mix-blend-mode: screen`, que es blending **aditivo**: el negro
aporta cero y el resplandor suma luz. Es cómo se compone luz de verdad, y evita
depender del canal alfa, que las IA generan de forma poco confiable.

La frase de que **la luz se apague antes de los bordes** es la más importante
del prompt: si el resplandor llega al borde, se ve el rectángulo del archivo
recortado sobre la foto.

`npm run imagenes` guarda este archivo **sin pérdida** (a diferencia del resto).
Con compresión, el negro deja de ser exactamente `#000` y el screen levanta todo
el rectángulo, dibujando un borde visible.

### Ajustes

En `solHero` dentro de [`src/data/imagenes.ts`](../src/data/imagenes.ts):

| Campo | Qué hace |
|---|---|
| `x`, `y` | Posición en % del hero. Hoy `63 / 44`: a la derecha del titular |
| `tamano` | Ancho en % del hero. Hoy `52` |
| `opacidad` | Cuánta luz suma. Hoy `0.72` |

El sol **no se muestra en celular**: ahí el titular está centrado y ocupa todo
el ancho, no hay lado libre. Y si el archivo no existe, el hero se ve como
ahora, sin sol y sin errores.

---

## Los 7 destinos

Todas van a `public/images/paquetes/`.

### 1 · `peru.png`

```
Fotografía realista de las terrazas de piedra de Machu Picchu con el pico del
Huayna Picchu al fondo, a la hora dorada. Luz rasante y cálida sobre las
piedras, cadenas de montañas andinas superponiéndose hacia el fondo y
perdiéndose en una neblina violácea, nubes bajas dramáticas. Cielo violeta
profundo arriba que se vuelve ámbar cálido cerca del horizonte. Plano general
panorámico cinematográfico, horizonte bajo. Sin personas, sin carteles, sin
marcas de agua y sin ningún texto en la imagen. Formato horizontal.
```

### 2 · `caribe.png`

```
Fotografía realista de una playa del Caribe al atardecer. Palmeras en contraluz
inclinadas sobre agua turquesa en calma, que el sol bajo vuelve dorada. Reflejo
del sol quebrándose sobre el agua hacia la cámara. Cielo violeta profundo arriba
que se vuelve dorado cerca del horizonte. Plano general panorámico
cinematográfico, horizonte bajo, arena en primer plano. Sin personas, sin
sombrillas, sin sillas, sin carteles y sin ningún texto en la imagen. Formato
horizontal.
```

### 3 · `europa.png`

```
Fotografía realista del casco histórico de una ciudad europea al anochecer,
vista desde el otro lado de un río. Cúpulas y campanarios recortados en
contraluz contra un horizonte ámbar pálido, bajo un cielo violeta profundo.
Luces cálidas encendidas en algunas ventanas, neblina atmosférica suave, reflejo
de la ciudad sobre el agua. Plano general panorámico cinematográfico. Sin
personas en primer plano, sin autos, sin carteles y sin ningún texto en la
imagen. Formato horizontal.
```

### 4 · `norte.png`

```
Fotografía realista de la Quebrada de Humahuaca en el norte argentino a la hora
dorada. Cerros de roca con estratos de colores en capas: ocre, óxido, terracota
y violeta. Cardones altos recortados en contraluz en primer plano. Cielo violeta
profundo arriba que se vuelve ámbar cerca del horizonte, aire seco y limpio de
altura. Plano general panorámico cinematográfico. Sin personas, sin vehículos,
sin carteles y sin ningún texto en la imagen. Formato horizontal.
```

### 5 · `japon.png`

```
Fotografía realista del monte Fuji al anochecer, visto a través de un portal
torii tradicional. El cono nevado simétrico al fondo, el torii recortado en
contraluz a un costado del encuadre. Cielo violeta profundo y magenta con una
franja dorada pálida sobre el horizonte, niebla baja en primer plano. Plano
general panorámico cinematográfico. Sin personas, sin carteles y sin ningún
texto en la imagen. Formato horizontal.
```

### 6 · `egipto.png`

```
Fotografía realista de las pirámides de Giza a la hora dorada. Dunas de arena
onduladas y cálidas en primer plano, el sol bajo proyectando sombras largas
sobre la arena. Cielo violeta profundo arriba que se vuelve ámbar cerca del
horizonte, neblina de calor del desierto. Plano general panorámico
cinematográfico, horizonte bajo. Sin personas, sin camellos, sin turistas, sin
carteles y sin ningún texto en la imagen. Formato horizontal.
```

### 7 · `brasil.png`

```
Fotografía realista de Río de Janeiro al atardecer, vista desde un morro. Cerros
de granito redondeados recortados en contraluz sobre la bahía, reflejo del sol
quebrándose en el agua. Hojas de palmera en contraluz enmarcando el borde
izquierdo del encuadre. Cielo violeta profundo que se vuelve dorado cerca del
horizonte. Plano general panorámico cinematográfico. Sin personas, sin carteles,
sin marcas de agua y sin ningún texto en la imagen. Formato horizontal.
```

---

## Cuando tengas las 7

```bash
npm run imagenes
```

Y en [`src/data/imagenes.ts`](../src/data/imagenes.ts):

```ts
export const usarFotosPaquetes = true
```

Listo. **No hace falta tocar nada más**: cada paquete busca su foto por el
nombre del archivo. Si falta alguna, ese destino sigue mostrando su ilustración
— nunca queda una imagen rota.

---

## Si algo no queda como querés

| Problema | Solución |
|---|---|
| La foto se ve muy violeta, se pierde | Bajá `gradeMarca` en `src/data/imagenes.ts` (está en `0.3`; probá `0.2` o `0`) |
| Se ve poco de la marca, parece stock | Subí `gradeMarca` a `0.45` |
| El recorte corta algo importante | Agregá `foco: 'center 35%'` a ese paquete en `paquetes.ts`. Sube el encuadre; `70% center` lo corre a la derecha |
| Quedan dos soles en el hero | `heroSolDeTrama = false` en `imagenes.ts` |
| Una foto no me gusta | Borrá el `.webp` de `public/images/paquetes/` y vuelve la ilustración de ese destino |
| Quiero volver a todo ilustrado | `usarFotoHero = false` y `usarFotosPaquetes = false` |

## Por qué los prompts repiten siempre lo mismo

Las tres cosas que se repiten no son relleno, son lo que hace que el set se vea
coherente:

- **Hora dorada / atardecer** en todas: unifica la luz.
- **Cielo violeta arriba, ámbar en el horizonte**: es la paleta de la marca, así
  las fotos ya nacen en el color del sitio y necesitan menos corrección.
- **Sin personas y sin texto**: las caras generadas por IA envejecen mal, y
  cualquier texto inventado dentro de una imagen se lee como error.

## Más adelante: fotos propias

Cuando tengas fotos reales de las salidas, reemplazá estas con el mismo nombre y
volvé a correr `npm run imagenes`. Las fotos propias valen más que cualquier
imagen generada: son la prueba de que los viajes existen. Si aparecen viajeros
reconocibles, pedí autorización antes de publicar.
