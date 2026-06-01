import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Brain,
  Globe2,
  Layers,
  Sparkles,
  Type,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Caption Generation',
    description:
      'Powered by cutting-edge speech recognition models. Transcribe and caption any audio with near-perfect accuracy in seconds.',
  },
  {
    icon: Globe2,
    title: 'Multi-language Captions',
    description:
      'Support for 120+ languages with automatic translation. Reach global audiences without manual translation workflows.',
  },
  {
    icon: Layers,
    title: 'Premiere Pro Integration',
    description:
      'Native plugin architecture that lives directly inside your Premiere Pro timeline. No context switching, no exports.',
  },
  {
    icon: Sparkles,
    title: 'After Effects Support',
    description:
      'Animate captions with After Effects power. Generate, style, and animate subtitle layers directly from the plugin.',
  },
  {
    icon: Type,
    title: 'Auto Subtitle Styling',
    description:
      'Intelligent styling presets that match your brand. Fonts, colors, animations and positioning — all automated.',
  },
  {
    icon: Zap,
    title: 'Fast Export Workflow',
    description:
      'Export finalized captions as SRT, VTT, or embedded burn-ins. One click. Full project compatibility guaranteed.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass rounded-2xl p-6 neon-border group cursor-default relative overflow-hidden"
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(195,255,51,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
          <Icon className="w-5 h-5 text-accent" />
        </div>

        <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="section-pad bg-bg-secondary relative scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Core Capabilities
              </span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            EVERYTHING YOU NEED
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A complete caption pipeline built for professional video editors. No compromise, no workarounds.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
