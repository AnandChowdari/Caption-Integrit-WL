import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import LightRays from '../ui/LightRays'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 },
  }),
}

export default function HeroSection({ onJoinWaitlist }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Light Rays Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#c6ff34"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.05}
        />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-20">

        {/* Badge: an Integrit Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-center mb-10"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase rounded-full px-4 py-2"
            style={{
              color: 'rgba(198,255,52,0.75)',
              background: 'rgba(198,255,52,0.06)',
              border: '1px solid rgba(198,255,52,0.12)',
            }}
          >
            <img src="/logo.png" alt="Integrit" className="w-4 h-4 object-contain" />
            an Integrit Product
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-4">
          {/* Line 1: Don't waste hours */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display font-bold leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            <span className="text-white">Don't waste </span>
            <span className="highlight-red">hours</span>
          </motion.h1>

          {/* Line 2: Create in seconds — slides up after a beat */}
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 1.2,
            }}
            className="font-display font-bold leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            <span className="text-white">Create in </span>
            <span className="highlight-lime">seconds</span>
          </motion.h1>
        </div>

        {/* Product name subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={12}
          className="font-display font-semibold text-accent mb-3"
          style={{
            fontSize: 'clamp(1.1rem, 2.8vw, 2rem)',
            textShadow: '0 0 30px rgba(198,255,52,0.25)',
            letterSpacing: '0.02em',
          }}
        >
          CAPTION INTEGRIT
        </motion.p>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={14}
          className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          AI-powered captions in 24 languages - One Click Away - One Time subscriptions
        </motion.p>

        {/* Waitlist Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={15}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="relative rounded-xl p-[1px] animate-border-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(198,255,52,0.2), rgba(198,255,52,0.05), rgba(198,255,52,0.2))',
            }}
          >
            <button
              id="hero-waitlist-trigger"
              onClick={onJoinWaitlist}
              className="btn-primary px-8 py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-center text-text-muted text-xs sm:text-sm mt-1">
            Built for editors by editors
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
