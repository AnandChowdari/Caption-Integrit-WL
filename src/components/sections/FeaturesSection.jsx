import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Infinity as InfinityIcon,
  Globe2,
  Layers,
  MessageSquareText,
  PenLine,
  Brain,
} from 'lucide-react'

const features = [

  {
    icon: Globe2,
    title: '24 Languages',
    description:
      '10 Indian languages + 14 global. With phonetic romanization for every Indian language — Tenglish, Hinglish, Tanglish, Kanglish, Benglish, and more.',
  },
  {
    icon: Layers,
    title: 'Native Adobe Integration',
    description:
      "Real Text Layers directly in your AE composition. Auto-imported SRT in Premiere's Project Bin. Full undo support. No app switching.",
  },
  {
    icon: MessageSquareText,
    title: '3 Caption Styles',
    description:
      'Natural Phrase for YouTube. Full Sentence for podcasts. Word-by-Word for Reels and TikTok. One plugin, every use case.',
  },
  {
    icon: PenLine,
    title: 'Built-in Caption Editor',
    description:
      'Review before you publish. Edit text, fix timestamps, merge, split, find/replace, bulk-delete filler words. Then push to timeline when ready.',
  },

]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="section-pad relative scroll-mt-20" style={{ background: '#0e0e0e' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need. Nothing You Don't.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            A complete caption pipeline built for professional video editors.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card p-6 sm:p-8 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
