import { motion } from 'framer-motion'

const row1 = [
  'Telugu తెలుగు', 'Hindi हिन्दी', 'Tamil தமிழ்', 'Kannada ಕನ್ನಡ',
  'Malayalam മലയാളം', 'Bengali বাংলা', 'Marathi मराठी', 'Gujarati ગુજરાતી',
  'Punjabi ਪੰਜਾਬੀ', 'Urdu اردو', 'English', 'Spanish',
]

const row2 = [
  'French', 'German', 'Portuguese', 'Japanese 日本語', 'Korean 한국어',
  'Arabic العربية', 'Indonesian', 'Thai ไทย', 'Chinese 中文',
  'Russian Русский', 'Turkish', 'Vietnamese',
]

function LanguagePill({ text }) {
  return (
    <div className="flex-shrink-0 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300">
      <span className="text-sm font-noto text-white/70 whitespace-nowrap font-medium">
        {text}
      </span>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-container py-2">
      <div className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {doubled.map((item, i) => (
          <LanguagePill key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  )
}

export default function LanguageMarquee() {
  return (
    <section id="languages" className="py-20 relative scroll-mt-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Your Language. Your Audience.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            24 languages with native script support and phonetic romanization.
          </p>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  )
}
