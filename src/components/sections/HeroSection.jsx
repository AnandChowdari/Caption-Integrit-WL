import { motion } from 'framer-motion'
import InlineWaitlistForm from '../ui/InlineWaitlistForm'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 },
  }),
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Radial gradient glow behind headline */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full orb-1"
          style={{
            background: 'radial-gradient(circle, rgba(198,255,52,0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full orb-2"
          style={{
            background: 'radial-gradient(circle, rgba(198,255,52,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2.5 border border-white/[0.08]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs text-text-secondary tracking-wide font-medium">
              Now in Early Access · Windows · Adobe CEP
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display font-bold leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
        >
          <span className="text-white">AI Captions for Premiere Pro{' '}</span>
          <span className="text-white">&amp; After Effects —{' '}</span>
          <span className="text-accent" style={{ textShadow: '0 0 30px rgba(198,255,52,0.3)' }}>
            Completely Free.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Generate captions in 24 languages. Native script, phonetic, or translated.
          Powered by your own free API keys. Zero subscriptions. Zero per-minute charges.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <InlineWaitlistForm id="hero" />
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
