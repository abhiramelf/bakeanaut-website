import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandIntro from '@/components/BrandIntro'
import Gallery from '@/components/Gallery'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandIntro />
      <Gallery />
      <Menu />
      <Footer />
    </main>
  )
}
