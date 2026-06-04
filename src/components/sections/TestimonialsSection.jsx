import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Integrit cut our subtitle turnaround from 4 hours to under 15 minutes. The accuracy in Spanish and Portuguese is genuinely better than our human transcribers for technical content.",
    name: 'Marcus Vella',
    role: 'Senior Video Editor',
    company: 'Apex Post Studio',
    initials: 'MV',
  },
  {
    quote:
      "We localize product videos for 12 markets. Before Integrit, that meant 12 separate caption files and a lot of back-and-forth. Now it's one click per language inside the timeline.",
    name: 'Priya Iyer',
    role: 'Head of Content Production',
    company: 'NovaBrand Agency',
    initials: 'PI',
  },
  {
    quote:
      "The After Effects integration alone is worth the entire subscription. I can animate caption layers with full kinetic typography control without ever leaving the comp.",
    name: 'Jordan Holloway',
    role: 'Motion Designer & Editor',
    company: 'Freelance',
    initials: 'JH',
  },
  {
    quote:
      "I was skeptical of AI captions — tried four tools before Integrit. The timeline-native experience is the difference maker. It actually fits how editors work.",
    name: 'Sena Agyemang',
    role: 'Post-Production Supervisor',
    company: 'Silverframe Films',
    initials: 'SA',
  },
  {
    quote:
      "Our social media team requests 40+ captioned videos per week in 3 languages. Integrit automated 90% of that workflow. The ROI is immediate and obvious.",
    name: 'Tomás Reyes',
    role: 'Digital Content Lead',
    company: 'PulseMedia Group',
    initials: 'TR',
  },
  {
    quote:
      "The styling presets match our brand guidelines perfectly. We stopped writing custom CSS for caption animations entirely. Integrit just does it.",
    name: 'Anika Steinhoff',
    role: 'Creative Director',
    company: 'Studio Kairos',
    initials: 'AS',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
}

function TestimonialCard({ quote, name, role, company, initials }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass p-6 relative overflow-hidden group"
    >
      {/* Quote mark */}
      <div
        className="absolute top-4 right-5 font-display text-6xl text-accent/10 leading-none select-none group-hover:text-accent/15 transition-colors duration-500"
        aria-hidden="true"
      >
        "
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
          <span className="font-mono text-xs text-accent font-bold">{initials}</span>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{name}</p>
          <p className="text-text-muted text-xs">
            {role} · {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad bg-bg-primary relative overflow-hidden">
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
                Editor Reviews
              </span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            TRUSTED BY PROS
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            From solo editors to post-production studios — here's what the community says.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
