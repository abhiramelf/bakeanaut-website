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
import { getSiteContent, getMenuData } from '@/lib/content'

export const revalidate = 3600

export default async function Home() {
  const [content, menuData] = await Promise.all([getSiteContent(), getMenuData()])

  return (
    <>
      <LoadingScreen systemChecks={content.loadingScreen.systemChecks} />
      <main id="main-content">
        <Navbar whatsappPhone={content.contact.whatsappPhone} />
        <Hero hero={content.hero} whatsappPhone={content.contact.whatsappPhone} />
        <BrandIntro brandIntro={content.brandIntro} />
        <ErrorBoundary>
          <Gallery gallery={content.gallery} />
        </ErrorBoundary>
        <CrewTransmissions crewTransmissions={content.crewTransmissions} />
        <ErrorBoundary>
          <FeaturedMissions
            featuredMissions={content.featuredMissions}
            menuData={menuData}
          />
        </ErrorBoundary>
        <CrewProgram crewProgram={content.crewProgram} whatsappPhone={content.contact.whatsappPhone} />
        <Footer contact={content.contact} footer={content.footer} />
      </main>
    </>
  )
}
