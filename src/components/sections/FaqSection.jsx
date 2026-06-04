import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is Caption Integrit really free?',
    answer: 'Yes — completely. The plugin itself requires a one-time license key (free for early access members). You bring your own API keys from providers like ElevenLabs, Deepgram, or Google Gemini — all of which have free tiers. We never charge per minute or per video.',
  },
  {
    question: 'What API keys do I need?',
    answer: 'At minimum, one Speech-to-Text key (ElevenLabs or Deepgram) and one LLM key (Google Gemini recommended — it has the most generous free quota). All providers offer free tiers ranging from $0 to $200 in free credits. Setup takes under 5 minutes.',
  },
  {
    question: 'Does it work with Telugu, Hindi, Tamil, and other Indian languages?',
    answer: "Yes — this is what we built it for. Caption Integrit supports 10 Indian languages with full phonetic romanization (Tenglish, Hinglish, Tanglish, etc.). It's also code-switching aware — so if a speaker mixes English into Telugu, the AI handles it correctly.",
  },
  {
    question: "What's the difference between Native Script, Phonetic, and Translation modes?",
    answer: 'Native Script keeps captions in the original language (e.g., నేను బాగున్నాను). Phonetic romanizes it into English letters (e.g., nenu baagunnanu) — great for audiences who speak the language but don\'t read the script. Translation converts the full meaning to English (e.g., I am doing well).',
  },
  {
    question: 'Does it work inside Adobe or do I need to leave the app?',
    answer: 'It works 100% inside Adobe. In After Effects, it generates real Text Layers directly in your composition. In Premiere Pro, it auto-imports an SRT file into your Project Bin. You never leave your editing software.',
  },
  {
    question: 'What Adobe versions are supported?',
    answer: 'Adobe After Effects v16+ and Adobe Premiere Pro v13+. Windows only right now — macOS support is coming soon.',
  },
  {
    question: 'Can I edit the captions before they go on the timeline?',
    answer: 'Yes. After generation, a full Caption Editor appears where you can edit text, fix timestamps, merge or split captions, find/replace words, and bulk-delete filler words like "um" or "uh". You only push to the timeline when you\'re satisfied.',
  },
  {
    question: 'How accurate is the transcription?',
    answer: "Very accurate — especially with ElevenLabs Scribe for Indian language content. There's also an optional Verification Pass: a second AI step that specifically catches common STT mishearings and fixes them before you see the output.",
  },
  {
    question: 'What is the Custom Brand Dictionary?',
    answer: 'A field in the Advanced settings where you list brand names and technical terms (e.g., "ChatGPT, Adobe, Hormozi, PingWin"). The AI is explicitly instructed to spell these exactly as entered — so your brand names never get mangled.',
  },
  {
    question: 'When will it launch? When will I get access?',
    answer: "We're in final testing. Everyone on the waitlist gets notified first — and early access members receive a free license key. No credit card required to join.",
  },
]

function FaqItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.04 }}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        id={`faq-item-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 sm:px-4 py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-medium text-sm sm:text-base transition-colors duration-300 pr-4 ${
            isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
          }`}
        >
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-accent/15 border border-accent/30'
              : 'bg-white/[0.03] border border-white/[0.08] group-hover:border-accent/20'
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-300 ${
              isOpen ? 'text-accent rotate-180' : 'text-text-muted'
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="accordion-content"
          >
            <p className="px-2 sm:px-4 pb-5 sm:pb-6 text-text-muted text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="section-pad relative scroll-mt-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Were About to Google.
          </h2>
          <p className="text-text-muted text-base sm:text-lg">
            Straight answers. No marketing fluff.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.01)' }}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              index={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
