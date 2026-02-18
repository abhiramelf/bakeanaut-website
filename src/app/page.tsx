import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandIntro from '@/components/BrandIntro'
import Gallery from '@/components/Gallery'
import CrewTransmissions from '@/components/CrewTransmissions'
import FeaturedMissions from '@/components/FeaturedMissions'
import CrewProgram from '@/components/CrewProgram'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main id="main-content">
        <Navbar />
        <Hero />
        <BrandIntro />
        <ErrorBoundary>
          <Gallery />
        </ErrorBoundary>
        <CrewTransmissions />
        <ErrorBoundary>
          <FeaturedMissions />
        </ErrorBoundary>
        <CrewProgram />
        <Footer />
      </main>
    </>
  )
}
