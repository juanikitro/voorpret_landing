type P = { className?: string }

export function FlechaDer({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function FlechaAbajo({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  )
}

export function WhatsApp({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.14c-.24.68-1.42 1.3-1.96 1.35-.54.05-1.05.24-3.54-.73-3-1.18-4.9-4.28-5.05-4.48-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.83 2.04.9 2.19.07.15.12.32.02.51-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.12.07.71-.17 1.39Z" />
    </svg>
  )
}

export function Mas({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Tilde({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

export function Pin({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.8" />
    </svg>
  )
}

export function Instagram({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Facebook({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 8.5V6.9c0-.8.2-1.2 1.3-1.2h1.4V2.9h-2.4c-2.9 0-4 1.5-4 4v1.6H8.6V11h2.2v10h3.7V11h2.5l.3-2.5h-2.8Z" />
    </svg>
  )
}

export function Avion({ className = 'size-4' }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.3 11.2 13 9.5V4.2c0-.8-.5-1.5-1.2-1.5s-1.2.7-1.2 1.5v5.3L2.3 11.2c-.4.1-.7.5-.7.9v1.3c0 .3.3.5.6.4l8.2-2.1v4.6l-2.3 1.5c-.2.1-.3.4-.3.6v1c0 .3.3.5.6.4l3.2-1 3.2 1c.3.1.6-.1.6-.4v-1c0-.2-.1-.5-.3-.6l-2.3-1.5v-4.6l8.2 2.1c.3.1.6-.1.6-.4v-1.3c0-.4-.3-.8-.7-.9Z" />
    </svg>
  )
}
