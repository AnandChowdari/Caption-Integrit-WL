import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import ProblemSection from '../components/sections/ProblemSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import LanguageMarquee from '../components/sections/LanguageMarquee'
import ComparisonSection from '../components/sections/ComparisonSection'
import CaptionModesSection from '../components/sections/CaptionModesSection'
import TechSection from '../components/sections/TechSection'
import FaqSection from '../components/sections/FaqSection'
import FinalCtaSection from '../components/sections/FinalCtaSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LanguageMarquee />
        <ComparisonSection />
        <CaptionModesSection />
        <TechSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
