import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import ParticleField from '../ui/ParticleField'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function HeroSection({ onJoinWaitlist }) {
  const scrollToWaitlist = () => {
    if (onJoinWaitlist) onJoinWaitlist()
  }
  const scrollToDemo = () => {
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary grid-bg"
    >
      {/* Particle Field */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Neon Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(195,255,51,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(195,255,51,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(195,255,51,0.04) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="glass neon-border rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              AI-Powered Caption Plugin
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="leading-none mb-6 font-bold"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 'clamp(2.75rem, 6vw, 72px)', fontWeight: 800 }}
        >
          <span className="block text-white">Caption </span>
          <span className="block gradient-text text-glow">Integrit</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Generate multilingual captions directly inside{' '}
          <span className="text-white font-medium">Adobe Premiere Pro</span> &{' '}
          <span className="text-white font-medium">After Effects</span> using AI‑powered automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-join-waitlist"
            onClick={scrollToWaitlist}
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base group"
          >
            Join Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            id="hero-watch-demo"
            onClick={scrollToDemo}
            className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-xl text-base group"
          >
            <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent/50 transition-colors">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </div>
            Watch Demo
          </button>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14 max-w-2xl mx-auto glass neon-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {[
            ['2,000+', 'Editors Waiting'],
            ['120+', 'Languages'],
            ['10,000+', 'Captions Generated'],
          ].map(([num, label]) => (
            <div key={label} className="flex flex-col sm:flex-row items-center gap-2 pt-3 sm:pt-0 first:pt-0 sm:px-6 w-full justify-center">
              <span className="font-display text-2xl text-accent leading-none">{num}</span>
              <span className="text-text-muted text-xs sm:text-sm font-medium tracking-wide leading-none">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
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
