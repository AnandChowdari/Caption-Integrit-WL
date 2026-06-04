import { motion } from 'framer-motion'

const techPoints = [
  {
    label: 'Adobe CEP Architecture',
    text: 'HTML/CSS/JS frontend + ExtendScript backend. Runs natively inside Adobe as a panel.',
  },
  {
    label: 'Audio Pipeline',
    text: 'FFmpeg audio extraction → 16kHz mono → base64 → STT API. Optimized for accuracy.',
  },
  {
    label: 'Smart Chunking',
    text: 'Long clips auto-chunked. Word timestamps stitched seamlessly across chunks.',
  },
  {
    label: 'One-Click Install',
    text: 'install.bat — auto-installs FFmpeg, copies files, sets registry keys. Zero config.',
  },
  {
    label: 'License System',
    text: 'Device fingerprinting with device-limit enforcement. Secure and frictionless.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export default function TechSection() {
  return (
    <section id="tech" className="section-pad relative" style={{ background: '#0e0e0e' }}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Built Properly. Not Hacked Together.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            For the technically curious — here's what's under the hood.
          </p>
        </motion.div>

        {/* Tech points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4"
        >
          {techPoints.map((point) => (
            <motion.div
              key={point.label}
              variants={itemVariant}
              className="rounded-xl border border-white/[0.06] p-5 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <span className="font-mono text-xs text-accent tracking-wider whitespace-nowrap flex-shrink-0 pt-0.5">
                {`// ${point.label}`}
              </span>
              <p className="text-white/70 text-sm leading-relaxed font-mono">
                {point.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
