import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FinalCtaSection({ onJoinWaitlist }) {
  return (
    <section id="final-cta" className="section-pad relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: '#0a0a0a' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(198,255,52,0.04) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Be the First to Get Caption Integrit.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto mb-10">
            Join the waitlist. Early access members get a free license key — no card required.
          </p>

          {/* Waitlist Button */}
          <div className="flex justify-center">
            <button
              id="final-cta-waitlist-trigger"
              onClick={onJoinWaitlist}
              className="btn-primary px-8 py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-text-muted text-xs sm:text-sm mt-8 font-mono"
          >
            Windows · Premiere Pro v13+ · After Effects v16+ · macOS coming soon
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
