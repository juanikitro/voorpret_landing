import type { ComponentPropsWithoutRef } from 'react'

type DotGridProps = ComponentPropsWithoutRef<'div'> & {
  animated?: boolean
}

/** Trama ambiental liviana inspirada en Dot Grid de ReactBits. */
export default function DotGrid({ animated = true, className = '', ...props }: DotGridProps) {
  return <div aria-hidden="true" className={`dot-grid${animated ? ' dot-grid--animated' : ''} ${className}`} {...props} />
}
