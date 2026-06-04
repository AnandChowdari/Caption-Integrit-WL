import { motion } from 'framer-motion'
import { Type, Languages, ArrowRightLeft } from 'lucide-react'

const modes = [
  {
    icon: Type,
    title: 'Native Script',
    badge: null,
    description: 'Keep captions in the original language.',
    example: 'నేను బాగున్నాను',
    exampleLabel: 'Telugu',
  },
  {
    icon: Languages,
    title: 'English Phonetic',
    badge: 'Most Popular',
    description: 'Romanize how it sounds in English letters.',
    example: 'nenu baagunnanu',
    exampleLabel: 'Tenglish',
  },
  {
    icon: ArrowRightLeft,
    title: 'English Translation',
    badge: null,
    description: 'Translate full meaning to English.',
    example: 'I am doing well',
    exampleLabel: 'English',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export default function CaptionModesSection() {
  return (
    <section id="caption-modes" className="section-pad relative" style={{ background: '#0a0a0a' }}>
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
            Three Ways to Caption. One Plugin.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            Choose how your captions appear — native script, phonetic, or translated.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {modes.map((mode) => (
            <motion.div
              key={mode.title}
              variants={cardVariants}
              className="glass-card p-6 sm:p-8 group relative"
            >
              {/* Badge */}
              {mode.badge && (
                <div className="absolute top-4 right-4 bg-accent/10 border border-accent/30 rounded-full px-3 py-1">
                  <span className="text-accent text-[10px] font-mono tracking-wider uppercase font-semibold">
                    {mode.badge}
                  </span>
                </div>
              )}

              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <mode.icon className="w-5 h-5 text-accent" />
              </div>

              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                {mode.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {mode.description}
              </p>

              {/* Example */}
              <div className="rounded-lg bg-black/40 border border-white/[0.06] p-4">
                <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase block mb-2">
                  {mode.exampleLabel}
                </span>
                <p className="text-accent font-noto text-base font-medium">
                  {mode.example}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
