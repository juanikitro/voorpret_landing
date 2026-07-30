import Header from './components/Header'
import Hero from './components/Hero'
import BandaDefinicion from './components/BandaDefinicion'
import IndiceDeseos from './components/IndiceDeseos'
import Proceso from './components/Proceso'
import Confianza from './components/Confianza'
import Cotizador from './components/Cotizador'
import Footer from './components/Footer'
import { useMenosMovimiento, useProgresoScroll } from './lib/hooks'

export default function App() {
  const quieto = useMenosMovimiento()
  // Con movimiento reducido no calculamos parallax: cero trabajo por scroll
  useProgresoScroll(!quieto)

  return (
    <>
      <a
        href="#propuestas"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-sol focus-visible:px-5 focus-visible:py-3 focus-visible:font-bold focus-visible:text-tinta"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero quieto={quieto} />
        <BandaDefinicion />
        <IndiceDeseos />
        <Proceso />
        <Confianza />
        <Cotizador />
      </main>

      <Footer />
    </>
  )
}
