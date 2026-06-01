import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
const faqs = [
  {
    question: 'What is Caption Integrit?',
    answer:
      'Caption Integrit is an Adobe CEP plugin for Premiere Pro and After Effects that automatically transcribes, converts, and imports captions directly into your timeline — without leaving your editing software.',
  },
  {
    question: 'Which languages does it support?',
    answer:
      'It supports all major Indian regional languages including Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi and more — with English phonetic conversion for all of them.',
  },
  {
    question: 'Do I need an internet connection?',
    answer:
      'Yes, Caption Integrit uses AI APIs for transcription and conversion. A stable internet connection is required during caption generation.',
  },
  {
    question: 'Is it really a one-time purchase?',
    answer:
      'Yes. Pay once, own it forever. No monthly fees, no subscriptions. Updates are included and ship every 2 months.',
  },
  {
    question: 'What if the captions are wrong?',
    answer:
      'Caption Integrit has a built-in caption editor. You can review, fix, merge, split, or delete any caption line before it ever touches your timeline.',
  },
  {
    question: 'Which Adobe apps does it work with?',
    answer:
      'Caption Integrit works inside Adobe Premiere Pro and After Effects as a native panel plugin.',
  },
  {
    question: 'Can it handle speakers who mix languages?',
    answer:
      'Absolutely. If your speaker switches between Telugu and English mid-sentence, Caption Integrit keeps English words as-is and only converts the regional language words phonetically.',
  },
  {
    question: 'How many devices can I use it on?',
    answer:
      'Your license is tied to one device. Need to transfer to a new machine? Contact our support and we’ll sort it out.',
  },
  {
    question: 'Why pay every month for something you should own?',
    answer:
      'Caption Integrit is a single purchase. Yours forever. No subscriptions. No renewals. No surprises.',
  },
  {
    question: 'And it only gets better.',
    answer:
      'Fresh updates every 2 months — new features, new languages, better accuracy. All included.',
  },
  {
    question: 'Ever wished your regional captions just… worked?',
    answer:
      'Telugu, Hindi, Tamil, Kannada — Caption Integrit reads them all and writes them the way they sound in English.',
  },
  {
    question: 'Your speaker just switched languages mid-sentence. Now what?',
    answer:
      'Caption Integrit figures it out automatically. No manual fixes. No wrong phonetics. Just clean captions.',
  },
  {
    question: 'What if you could fix every caption before it touched your timeline?',
    answer:
      'Review. Edit. Perfect. Then import. All without leaving your Adobe panel.',
  },
  {
    question: 'What if captioning a full video took less time than making a coffee?',
    answer:
      'One click. Entire video. Every word. Done.',
  },
  {
    question: 'Still jumping between apps just to add captions?',
    answer:
      'Caption Integrit lives inside Premiere Pro and After Effects. Your workflow stays yours.',
  },
]


function FaqItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'neon-border' : 'border border-white/08'
        }`}
    >
      <button
        id={`faq-item-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
            }`}
        >
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isOpen
            ? 'bg-accent/15 border border-accent/30'
            : 'glass border border-white/10 group-hover:border-accent/20'
            }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="accordion-content"
          >
            <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-text-muted text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="section-pad bg-bg-secondary relative scroll-mt-20">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">FAQ</span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            GOT QUESTIONS?
          </h2>
          <p className="text-text-muted text-lg">
            Everything you need to know about Integrit before joining the waitlist.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {(showAll ? faqs : faqs.slice(0, 5)).map((faq, i) => (
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

        {faqs.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary px-6 py-2.5 rounded-lg text-sm transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
