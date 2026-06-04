import { useState } from 'react'
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
import WaitlistForm from '../components/sections/WaitlistForm'

export default function LandingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const handleOpenWaitlist = () => setIsWaitlistOpen(true)
  const handleCloseWaitlist = () => setIsWaitlistOpen(false)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navbar onJoinWaitlist={handleOpenWaitlist} />
      <main>
        <HeroSection onJoinWaitlist={handleOpenWaitlist} />
        <CaptionModesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LanguageMarquee />
        <ComparisonSection />
        <ProblemSection />
        <TechSection />
        <FaqSection />
        <FinalCtaSection onJoinWaitlist={handleOpenWaitlist} />
      </main>
      <Footer />

      <WaitlistForm isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </div>
  )
}
