# Resaltado de “alegría”

## Objetivo

Destacar la palabra “alegría” dentro de la definición de *voorpret* sin cambiar
la composición, el copy ni el comportamiento de la sección.

## Opciones evaluadas

1. Rectángulo plano: replica la referencia, pero aporta poco carácter propio.
2. Subrayado ancho: es más sutil, aunque pierde presencia en un titular grande.
3. Pincel editorial: recomendado. Mantiene el amarillo de marca, suma borde
   irregular y una pequeña sobreimpresión que dialoga con la estética risográfica.

## Diseño aprobado

La palabra se renderiza en un `span` semántico y decorativo. Un pseudo-elemento
forma el fondo amarillo cálido con un recorte leve e irregular; otro suma una
sombra corta de tinta para darle profundidad sin reducir el contraste. No hay
JavaScript, assets ni movimiento, por lo que el resultado también respeta la
preferencia de movimiento reducido.

## Validación

Ejecutar el typecheck y comprobar que el diff sólo afecte el dato/componente,
el estilo local y este registro de diseño.
