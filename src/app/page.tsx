import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandIntro from '@/components/BrandIntro'
import Gallery from '@/components/Gallery'
import CrewTransmissions from '@/components/CrewTransmissions'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main>
        <Navbar />
        <Hero />
        <BrandIntro />
        <Gallery />
        <CrewTransmissions />
        <Menu />
        <Footer />
      </main>
    </>
  )
}
