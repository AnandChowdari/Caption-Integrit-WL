import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import InteractiveDecoder from '../components/sections/InteractiveDecoder'
import FeaturesSection from '../components/sections/FeaturesSection'
import DemoSection from '../components/sections/DemoSection'
import StatsSection from '../components/sections/StatsSection'
import FaqSection from '../components/sections/FaqSection'
import WaitlistForm from '../components/sections/WaitlistForm'

export default function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  const openWaitlist = () => setWaitlistOpen(true)
  const closeWaitlist = () => setWaitlistOpen(false)

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar onJoinWaitlist={openWaitlist} />
      <main>
        <HeroSection onJoinWaitlist={openWaitlist} />
        <InteractiveDecoder />
        <FeaturesSection />
        <DemoSection />
        <StatsSection />
        <FaqSection />
      </main>
      <Footer />
      <WaitlistForm isOpen={waitlistOpen} onClose={closeWaitlist} />
    </div>
  )
}
