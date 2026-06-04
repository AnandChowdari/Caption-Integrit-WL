import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 10000, suffix: '+', label: 'Captions Generated', prefix: '' },
  { value: 120, suffix: '+', label: 'Languages Supported', prefix: '' },
  { value: 2000, suffix: '+', label: 'Editors Waiting', prefix: '' },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatItem({ value, suffix, label, prefix, start }) {
  const count = useCountUp(value, 2200, start)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-center px-8 py-8 md:py-0"
    >
      <div
        className="font-display mb-3 text-accent drop-shadow-[4px_4px_0px_#ffffff]"
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1 }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-text-muted text-base font-medium tracking-wide">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" className="section-pad bg-bg-secondary relative overflow-hidden scroll-mt-20">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
                By the Numbers
              </span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">GROWING FAST</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Caption Integrit is trusted by editors and creators worldwide before it has even officially launched.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-center divide-y-2 md:divide-y-0 md:divide-x-2 divide-[rgba(255,255,255,0.8)]"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} start={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
