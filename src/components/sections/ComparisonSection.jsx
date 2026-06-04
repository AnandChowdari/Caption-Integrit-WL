import { motion } from 'framer-motion'
import { Check, X as XIcon, Minus } from 'lucide-react'

const headers = ['Feature', 'Caption Integrit', 'Simon Says', 'AutoCaptions', 'Descript']

const rows = [
  {
    feature: 'Price',
    values: ['Free (BYOK)', '$15/hr', '$9/mo', '$24/mo'],
  },
  {
    feature: 'Indian Languages',
    values: ['24 (10 Indian)', 'Limited', 'English only', 'Limited'],
  },
  {
    feature: 'Phonetic Captions',
    values: [true, false, false, false],
    sublabel: ['Tenglish, Hinglish, etc.', null, null, null],
  },
  {
    feature: 'Works Inside Adobe',
    values: ['Native Panel', 'Web upload', 'Separate app', 'Separate app'],
  },
  {
    feature: 'Word-by-Word Style',
    values: [true, false, true, false],
  },
  {
    feature: 'Built-in Editor',
    values: [true, false, 'Basic', true],
  },
  {
    feature: 'Custom Dictionary',
    values: [true, false, false, false],
  },
]

function CellValue({ value, sublabel }) {
  if (value === true) {
    return (
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-accent flex-shrink-0" />
        {sublabel && <span className="text-xs text-text-muted">{sublabel}</span>}
      </div>
    )
  }
  if (value === false) {
    return <XIcon className="w-4 h-4 text-red-400/60" />
  }
  return <span>{value}</span>
}

export default function ComparisonSection() {
  return (
    <section id="compare" className="section-pad relative scroll-mt-20" style={{ background: '#0e0e0e' }}>
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
            Compare. The Choice is Obvious.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            See how Caption Integrit stacks up against everything else.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-white/[0.06]"
          style={{ background: 'rgba(255,255,255,0.01)' }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={header}
                    className={`${i === 1 ? 'highlight' : ''} ${i === 0 ? 'min-w-[160px]' : 'min-w-[120px]'}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature}>
                  <td className="text-white font-medium text-sm">{row.feature}</td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`text-sm ${i === 0 ? 'highlight text-accent font-semibold' : 'text-text-muted'}`}
                    >
                      <CellValue
                        value={value}
                        sublabel={row.sublabel?.[i]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
