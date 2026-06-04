import { useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointerClick, Settings2, Sparkles, PenLine, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    label: 'SELECT',
    title: 'Click any clip',
    desc: "Click any clip. Hit 'Read Selected Clip'.",
  },
  {
    icon: Settings2,
    label: 'CONFIGURE',
    title: 'Choose settings',
    desc: 'Choose language, style, and output mode.',
  },
  {
    icon: Sparkles,
    label: 'GENERATE',
    title: 'AI processes',
    desc: 'AI extracts audio, transcribes, and converts.',
  },
  {
    icon: PenLine,
    label: 'REVIEW',
    title: 'Edit captions',
    desc: 'Edit, merge, split, find/replace in the built-in editor.',
  },
  {
    icon: CheckCircle2,
    label: 'APPLY',
    title: 'One click',
    desc: 'One click — text layers in AE, or SRT in Premiere.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const stepVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="section-pad relative scroll-mt-20" style={{ background: '#0a0a0a' }}>
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
            From Timeline to Captions in 30 Seconds
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            Five steps. No app switching. No exports. No re-imports.
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="hidden md:flex items-start justify-between"
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start flex-1">
              <motion.div
                variants={stepVariant}
                className={`flex flex-col items-center text-center cursor-pointer group flex-1 transition-all duration-300 ${
                  activeStep === i ? 'scale-105' : ''
                }`}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
              >
                {/* Icon circle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    activeStep === i
                      ? 'bg-accent/20 border-2 border-accent shadow-[0_0_20px_rgba(198,255,52,0.2)]'
                      : 'bg-white/[0.03] border border-white/[0.08] group-hover:border-accent/30'
                  }`}
                >
                  <step.icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      activeStep === i ? 'text-accent' : 'text-text-muted group-hover:text-accent'
                    }`}
                  />
                </div>
                {/* Step label */}
                <span className={`font-mono text-[11px] tracking-widest uppercase mb-2 transition-colors duration-300 ${
                  activeStep === i ? 'text-accent' : 'text-text-muted'
                }`}>
                  Step {i + 1} — {step.label}
                </span>
                {/* Description */}
                <p className="text-white/80 text-sm leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>
              </motion.div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="step-connector mt-7 mx-1" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Mobile: Vertical flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="md:hidden flex flex-col"
        >
          {steps.map((step, i) => (
            <div key={step.label}>
              <motion.div
                variants={stepVariant}
                className="flex items-start gap-4 py-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-accent block mb-1">
                    Step {i + 1} — {step.label}
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="step-connector" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-text-muted text-sm font-mono"
        >
          Total time: Under 30 seconds for a 1-minute clip.
        </motion.p>
      </div>
    </section>
  )
}
