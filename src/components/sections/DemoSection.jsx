import { motion } from 'framer-motion'

export default function DemoSection() {
  return (
    <section id="demo" className="section-pad bg-bg-primary relative overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(195,255,51,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                See It In Action
              </span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">CAPTION INTEGRIT</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Watch how Caption Integrit transforms your caption workflow inside Premiere Pro in under 60 seconds.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative rounded-2xl overflow-hidden glass-strong group"
          style={{ aspectRatio: '16 / 9' }}
        >

          {/* Video */}
          <video
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
          </video>

          {/* Corner badge */}
          <div className="absolute top-4 left-4 z-20 glass neon-border rounded-lg px-3 py-1.5 flex items-center gap-2 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent">LIVE DEMO</span>
          </div>
        </motion.div>

        {/* Caption below */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-text-muted text-sm mt-6 font-mono"
        >
          * Full product demo available at launch — early access for waitlist members
        </motion.p>
      </div>
    </section>
  )
}

