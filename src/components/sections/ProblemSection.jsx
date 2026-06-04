import { motion } from 'framer-motion'
import { DollarSign, Languages, Type, ArrowLeftRight } from 'lucide-react'

const painPoints = [
  {
    icon: DollarSign,
    number: '01',
    text: 'Existing tools charge $10–30/month per minute. A 10-min YouTube video costs $100+.',
  },
  {
    icon: Languages,
    number: '02',
    text: 'No plugin understands Telugu, Tamil, Kannada, or code-switched Hinglish/Tenglish.',
  },
  {
    icon: Type,
    number: '03',
    text: "Phonetic captions (Tenglish, Hinglish) simply don't exist anywhere.",
  },
  {
    icon: ArrowLeftRight,
    number: '04',
    text: 'Every tool forces you out of Adobe — export, upload, download, re-import. Broken.',
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

export default function ProblemSection() {
  return (
    <section id="problem" className="section-pad relative" style={{ background: '#0e0e0e' }}>
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
            Why Every Other Tool Fails Indian Creators
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            The captioning market wasn't built for you. We're changing that.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.number}
              variants={cardVariants}
              className="glass-card p-6 sm:p-8 flex gap-5 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-accent font-mono text-xs tracking-wider mb-2 block">
                  {point.number}
                </span>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
