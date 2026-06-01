import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LANGS = [
  {
    id: 'hi',
    label: 'HI · hindi',
    badge: 'HI · hindi',
    color: '#2ecc71',
    font: "'Noto Sans Devanagari', sans-serif",
    chars: ['इ', 'न', 'ट', 'ए', 'ग', 'र', 'ि', 'ट'],
    pool: ['अ', 'आ', 'इ', 'ई', 'उ', 'क', 'ख', 'ग', 'ट', 'त', 'द', 'न', 'प', 'म', 'र', 'ल', 'व', 'श', 'स', 'ह', 'ञ', 'ध', 'फ', 'ब', 'भ']
  },
  {
    id: 'te',
    label: 'TE · telugu',
    badge: 'TE · telugu',
    color: '#e74c3c',
    font: "'Noto Sans Telugu', sans-serif",
    chars: ['ఇ', 'న', 'ట', 'ఎ', 'గ', 'ర', 'ి', 'ట'],
    pool: ['అ', 'ఆ', 'ఇ', 'ఉ', 'క', 'ఖ', 'గ', 'ట', 'త', 'ద', 'న', 'ప', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'స', 'హ', 'ఘ', 'చ', 'జ', 'ధ', 'ఫ']
  },
  {
    id: 'ta',
    label: 'TA · tamil',
    badge: 'TA · tamil',
    color: '#a855f7',
    font: "'Noto Sans Tamil', sans-serif",
    chars: ['இ', 'ந', 'ட', 'எ', 'க', 'ர', 'ி', 'ட'],
    pool: ['அ', 'ஆ', 'இ', 'உ', 'க', 'ங', 'ச', 'ட', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன', 'ஞ', 'ஐ', 'ஒ', 'ஓ', 'ண']
  },
  {
    id: 'ml',
    label: 'ML · malayalam',
    badge: 'ML · malayalam',
    color: '#1abc9c',
    font: "'Noto Sans Malayalam', sans-serif",
    chars: ['ഇ', 'ൻ', 'ട', 'എ', 'ഗ', 'ർ', 'ി', 'ട'],
    pool: ['അ', 'ആ', 'ഇ', 'ഉ', 'ക', 'ഖ', 'ग', 'ട', 'ത', 'ദ', 'ന', 'പ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'സ', 'ഹ', 'ഘ', 'ച', 'జ', 'ధ', 'ഫ']
  }
]

const SOURCE = ['I', 'N', 'T', 'E', 'G', 'R', 'I', 'T']
const TIMINGS = ['00:00-00:00.6', '00:00.6-00:01.2', '00:01.2-00:01.8', '00:01.8-00:02.4']

export default function InteractiveDecoder() {
  const [currentLangIdx, setCurrentLangIdx] = useState(0)
  const [lockedChars, setLockedChars] = useState(0)
  const [scrambleChar, setScrambleChar] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const [isSequenceComplete, setIsSequenceComplete] = useState(false)
  const [frameCount, setFrameCount] = useState(0)

  // 1. High performance ticking timecode
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameCount((f) => f + 1)
    }, 42)
    return () => clearInterval(interval)
  }, [])

  const formatTC = (frame) => {
    const fps = 24
    const f = frame % fps
    const s = Math.floor(frame / fps) % 60
    const m = Math.floor(frame / (fps * 60)) % 60
    const h = Math.floor(frame / (fps * 3600))
    const pad2 = (n) => String(n).padStart(2, '0')
    return `${pad2(h)}:${pad2(m)}:${pad2(s)}:${pad2(f)}`
  }

  // 2. Pure React Scrambling State Machine
  useEffect(() => {
    if (isSequenceComplete) {
      const resetTimeout = setTimeout(() => {
        setCurrentLangIdx(0);
        setLockedChars(0);
        setIsSequenceComplete(false);
      }, 2000)
      return () => clearTimeout(resetTimeout)
    }

    if (currentLangIdx >= LANGS.length) {
      setIsSequenceComplete(true)
      return
    }

    let scrCount = 0
    let intervalId

    const currentLang = LANGS[currentLangIdx]

    if (lockedChars < SOURCE.length) {
      setIsScrambling(true)
      intervalId = setInterval(() => {
        scrCount++
        const randomChar = currentLang.pool[Math.floor(Math.random() * currentLang.pool.length)]
        setScrambleChar(randomChar)

        if (scrCount >= 4) {
          setLockedChars((prev) => prev + 1)
          setIsScrambling(false)
          scrCount = 0
        }
      }, 60)
    } else {
      const delayTimeout = setTimeout(() => {
        setCurrentLangIdx((prev) => prev + 1)
        setLockedChars(0)
      }, 800)
      return () => clearTimeout(delayTimeout)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [currentLangIdx, lockedChars, isSequenceComplete])

  // 3. Render functions
  const renderCaption = () => {
    if (isSequenceComplete) {
      return SOURCE.map((char, i) => (
        <span key={i} className="text-white/40 font-mono tracking-wider">
          {char}
        </span>
      ))
    }

    const l = LANGS[currentLangIdx]
    return SOURCE.map((srcChar, i) => {
      if (i < lockedChars) {
        return (
          <span key={i} style={{ color: l.color, fontFamily: l.font }}>
            {l.chars[i]}
          </span>
        )
      } else if (i === lockedChars && isScrambling) {
        return (
          <span key={i} style={{ color: l.color, opacity: 0.8, fontFamily: l.font }} className="animate-pulse">
            {scrambleChar}
          </span>
        )
      } else {
        return (
          <span key={i} className="text-white/30 font-mono tracking-wider">
            {srcChar}
          </span>
        )
      }
    })
  }

  const renderScriptPreview = (idx) => {
    const l = LANGS[idx]
    if (idx < currentLangIdx) return l.chars.join('')
    if (idx > currentLangIdx || isSequenceComplete) return '········'
    
    let sc = ''
    for (let i = 0; i < SOURCE.length; i++) {
      if (i < lockedChars) sc += l.chars[i]
      else sc += '·'
    }
    return sc
  }

  const getProgressWidth = (idx) => {
    if (isSequenceComplete) return '0%'
    if (idx < currentLangIdx) return '100%'
    if (idx > currentLangIdx) return '0%'
    return `${(lockedChars / SOURCE.length) * 100}%`
  }

  const currentLangObj = LANGS[currentLangIdx] || LANGS[0]

  return (
    <section id="live-demo" className="section-pad bg-bg-primary relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(195,255,51,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Interactive Preview
              </span>
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            REAL-TIME AI DECODING
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            See exactly how Integrit phonetically decodes timeline dialogue from standard Latin characters into native Indian regional scripts.
          </p>
        </motion.div>

        {/* Decoder Mockup Windows Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="w-full bg-[#141414] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] group relative"
        >
          {/* Accent glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              boxShadow: `inset 0 0 40px ${currentLangObj.color}15`,
            }}
          />

          {/* 1. Title bar */}
          <div className="bg-[#1c1c1c] px-4 py-3 flex items-center justify-between border-b border-[#222]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] text-text-muted font-mono tracking-wider uppercase">
              caption Integrit · integrit_decode.aep
            </span>
            <span className="text-[10px] text-[#444] font-mono hidden sm:inline">
              Adobe After Effects
            </span>
          </div>

          {/* 2. Visual Preview Port */}
          <div className="relative bg-[#0b0f0c] h-72 flex flex-col items-center justify-center overflow-hidden border-b border-[#1a1a1a]">
            {/* Ambient Radial glow matching active language color */}
            <div
              className="absolute w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle, ${currentLangObj.color} 0%, transparent 70%)`,
              }}
            />

            {/* Rec Badge */}
            <div className="absolute top-4 left-4 text-[11px] text-[#888] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1.2s_infinite]" />
              <span>{formatTC(frameCount)}</span>
            </div>

            {/* Language Badge */}
            <div
              className="absolute top-4 right-4 border rounded-full px-3 py-1 text-xs font-mono flex items-center gap-2 transition-colors duration-500 bg-black/40 backdrop-blur-sm"
              style={{
                borderColor: currentLangObj.color,
                color: currentLangObj.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: currentLangObj.color }} />
              <span>{isSequenceComplete ? 'STANDBY' : currentLangObj.badge.toUpperCase()}</span>
            </div>

            {/* Active Output Caption text */}
            <div className="text-center px-6">
              <div 
                className="text-4xl md:text-5xl font-bold tracking-wide transition-all min-h-[60px] flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {renderCaption()}
              </div>
            </div>

            {/* Bottom mini-progress bars */}
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 bg-black/20">
              {LANGS.map((lang, idx) => (
                <div key={lang.id} className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: getProgressWidth(idx),
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Timeline Layer Stack */}
          <div className="bg-[#111] overflow-x-auto">
            {/* Header row */}
            <div className="flex px-4 py-2 border-b border-[#1c1c1c] text-[10px] text-white/30 font-mono tracking-wider min-w-[500px]">
              <span className="w-8">#</span>
              <span className="flex-1">SOURCE TIMELINE LAYER</span>
              <span className="flex-1">AI PHONETIC SCRIPT</span>
              <span className="w-28 text-right">TIMING</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#181818]">
              {LANGS.map((lang, idx) => {
                const isActive = idx === currentLangIdx && !isSequenceComplete
                return (
                  <div
                    key={lang.id}
                    className={`flex items-center px-4 py-3 text-xs min-w-[500px] transition-all duration-300 ${
                      isActive ? 'bg-[#152019]' : 'opacity-60'
                    }`}
                  >
                    <span className="w-8 font-mono text-white/30">{14 + idx}</span>
                    
                    {/* Layer Title */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: lang.color }} />
                      <span className="font-mono text-white/80">T</span>
                      <span className={`font-mono transition-colors ${isActive ? 'text-accent font-semibold' : 'text-[#888]'}`}>
                        {lang.label.toUpperCase()}
                      </span>
                    </div>

                    {/* Live Scrambled/Locked Regional Script column */}
                    <div 
                      className="flex-1 font-bold tracking-wide"
                      style={{ 
                        color: lang.color, 
                        fontFamily: lang.font,
                        fontSize: '14px' 
                      }}
                    >
                      {renderScriptPreview(idx)}
                    </div>

                    {/* Layer timing */}
                    <span className="w-28 text-right font-mono text-[#555]">{TIMINGS[idx]}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4. Bottom Timing Grid bar */}
          <div className="flex justify-between px-4 py-2.5 bg-[#0e0e0e] border-t border-[#1c1c1c] text-[10px] text-[#444] font-mono">
            <span>00:00:00</span>
            <span>00:00:12</span>
            <span>00:00:24</span>
          </div>

          {/* 5. Mock Clip Tracks */}
          <div className="flex gap-1 p-2 bg-[#0c0c0c] overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => {
              const isActive = !isSequenceComplete && (i === currentLangIdx * 2 || i === currentLangIdx * 2 + 1)
              return (
                <div
                  key={i}
                  className="h-4 rounded-sm flex-1 transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? currentLangObj.color : '#222',
                    boxShadow: isActive ? `0 0 10px ${currentLangObj.color}40` : 'none',
                    opacity: isActive ? 1 : 0.4,
                  }}
                />
              )}
            )}
            <div className="h-4 rounded-sm flex-1 bg-[#222] opacity-20" />
            <div className="h-4 rounded-sm flex-1 bg-[#222] opacity-20" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
