import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Type, Languages, ArrowRightLeft, Mic } from 'lucide-react'

const sequences = [
  {
    lang: "TELUGU",
    nativeLang: "TELUGU",
    phoneticLang: "TENGLISH",
    native: "నేను బాగున్నాను",
    phonetic: "nenu baagunnanu",
    translation: "I am doing well"
  },
  {
    lang: "HINDI",
    nativeLang: "HINDI",
    phoneticLang: "HINGLISH",
    native: "मुझे खुशी है",
    phonetic: "mujhe khushi hai",
    translation: "I am happy"
  },
  {
    lang: "TAMIL",
    nativeLang: "TAMIL",
    phoneticLang: "TANGLISH",
    native: "நான் நலமாக இருக்கிறேன்",
    phonetic: "naan nalamaga irukiren",
    translation: "I am doing well"
  },
  {
    lang: "MALAYALAM",
    nativeLang: "MALAYALAM",
    phoneticLang: "MANGLISH",
    native: "എനിക്ക് സന്തോഷം",
    phonetic: "enikku santhosham",
    translation: "I feel happy"
  }
]

const bars = [
  { height: '12px', delay: '0s' },
  { height: '22px', delay: '0.1s' },
  { height: '28px', delay: '0.2s' },
  { height: '18px', delay: '0.3s' },
  { height: '30px', delay: '0s' },
  { height: '16px', delay: '0.15s' },
  { height: '26px', delay: '0.25s' },
  { height: '20px', delay: '0.05s' },
  { height: '14px', delay: '0.35s' },
  { height: '24px', delay: '0.1s' },
  { height: '10px', delay: '0.2s' },
  { height: '28px', delay: '0s' },
]

export default function CaptionModesSection() {
  const [lang, setLang] = useState("TELUGU")
  const [nativeLang, setNativeLang] = useState("TELUGU")
  const [phoneticLang, setPhoneticLang] = useState("TENGLISH")

  const [typedNative, setTypedNative] = useState("")
  const [typedPhonetic, setTypedPhonetic] = useState("")
  const [typedTranslation, setTypedTranslation] = useState("")
  const [cursorPos, setCursorPos] = useState("native") // 'native', 'phonetic', 'translation', or 'none'

  useEffect(() => {
    let isMounted = true
    let timerId = null

    const delay = (ms) => new Promise((resolve) => {
      timerId = setTimeout(resolve, ms)
    })

    const runAnimation = async () => {
      let currentSeqIdx = 0

      while (isMounted) {
        const seq = sequences[currentSeqIdx]

        if (!isMounted) break
        setLang(seq.lang)
        setNativeLang(seq.nativeLang)
        setPhoneticLang(seq.phoneticLang)

        setTypedNative("")
        setTypedPhonetic("")
        setTypedTranslation("")
        setCursorPos("native")

        // 1. Type Native
        for (let i = 0; i <= seq.native.length; i++) {
          if (!isMounted) return
          setTypedNative(seq.native.slice(0, i))
          await delay(60)
        }
        await delay(100)

        // 2. Type Phonetic
        if (!isMounted) return
        setCursorPos("phonetic")
        for (let i = 0; i <= seq.phonetic.length; i++) {
          if (!isMounted) return
          setTypedPhonetic(seq.phonetic.slice(0, i))
          await delay(60)
        }
        await delay(100)

        // 3. Type Translation
        if (!isMounted) return
        setCursorPos("translation")
        for (let i = 0; i <= seq.translation.length; i++) {
          if (!isMounted) return
          setTypedTranslation(seq.translation.slice(0, i))
          await delay(60)
        }
        await delay(2200)

        // 4. Erase Translation
        for (let i = seq.translation.length; i >= 0; i--) {
          if (!isMounted) return
          setTypedTranslation(seq.translation.slice(0, i))
          await delay(30)
        }
        setCursorPos("phonetic")

        // 5. Erase Phonetic
        for (let i = seq.phonetic.length; i >= 0; i--) {
          if (!isMounted) return
          setTypedPhonetic(seq.phonetic.slice(0, i))
          await delay(30)
        }
        setCursorPos("native")

        // 6. Erase Native
        for (let i = seq.native.length; i >= 0; i--) {
          if (!isMounted) return
          setTypedNative(seq.native.slice(0, i))
          await delay(30)
        }

        await delay(400)
        currentSeqIdx = (currentSeqIdx + 1) % sequences.length
      }
    }

    const startTimer = setTimeout(() => {
      runAnimation()
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(startTimer)
      clearTimeout(timerId)
    }
  }, [])

  return (
    <section id="caption-modes" className="section-pad relative" style={{ background: '#0a0a0a' }}>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(1.7); opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
        }
        .animate-pulse-dot {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Three Ways to Caption. One Plugin.
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto">
            Choose how your captions appear — native script, phonetic, or translated.
          </p>
        </motion.div>

        {/* Animation & Cards Wrapper */}
        <div className="max-w-4xl mx-auto font-body">
          {/* Audio Input Bar */}
          <div className="flex items-center gap-[10px] bg-[#111111] rounded-xl px-[18px] py-[14px] mb-6 border border-[#2a2a2a]">
            <Mic className="w-5 h-5 text-accent animate-pulse" />
            <div className="flex items-center gap-[3px] h-8 flex-1">
              {bars.map((bar, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm bg-accent animate-wave"
                  style={{ height: bar.height, animationDelay: bar.delay }}
                />
              ))}
            </div>
            <span className="text-accent text-[13px] font-semibold tracking-wider min-w-[70px] text-right">{lang}</span>
          </div>

          {/* Dots Connector */}
          <div className="flex justify-center items-center gap-2 my-6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Native Script Card */}
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <Type className="w-[18px] h-[18px] text-accent" />
              </div>
              <h3 className="text-white text-[15px] font-semibold mb-1 group-hover:text-accent transition-colors duration-300">Native Script</h3>
              <p className="text-text-muted text-[12px] mb-4 leading-relaxed">
                Keep captions in the original language.
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-3 min-h-[64px] flex flex-col justify-between">
                <div className="text-text-muted text-[10px] tracking-widest font-semibold uppercase">{nativeLang}</div>
                <div className="text-accent text-[15px] font-medium font-noto min-h-[22px] flex items-center mt-1">
                  {typedNative}
                  {cursorPos === 'native' && <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-blink" />}
                </div>
              </div>
            </div>

            {/* Phonetic Card */}
            <div className="glass-card p-6 relative overflow-hidden border-accent/40 group hover:border-accent/60">
              <div className="absolute top-3 right-3 bg-accent text-[#0a0a0a] text-[9px] font-bold tracking-wider px-2.5 py-[3px] rounded-full uppercase">
                Most Popular
              </div>
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <Languages className="w-[18px] h-[18px] text-accent" />
              </div>
              <h3 className="text-white text-[15px] font-semibold mb-1 group-hover:text-accent transition-colors duration-300">Phonetic</h3>
              <p className="text-text-muted text-[12px] mb-4 leading-relaxed">
                Romanize how it sounds in English letters.
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-3 min-h-[64px] flex flex-col justify-between">
                <div className="text-text-muted text-[10px] tracking-widest font-semibold uppercase">{phoneticLang}</div>
                <div className="text-accent text-[15px] font-medium font-noto min-h-[22px] flex items-center mt-1">
                  {typedPhonetic}
                  {cursorPos === 'phonetic' && <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-blink" />}
                </div>
              </div>
            </div>

            {/* Translation Card */}
            <div className="glass-card p-6 relative overflow-hidden group">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <ArrowRightLeft className="w-[18px] h-[18px] text-accent" />
              </div>
              <h3 className="text-white text-[15px] font-semibold mb-1 group-hover:text-accent transition-colors duration-300">Translation</h3>
              <p className="text-text-muted text-[12px] mb-4 leading-relaxed">
                Translate full meaning to English.
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-3 min-h-[64px] flex flex-col justify-between">
                <div className="text-text-muted text-[10px] tracking-widest font-semibold uppercase">ENGLISH</div>
                <div className="text-accent text-[15px] font-medium font-noto min-h-[22px] flex items-center mt-1">
                  {typedTranslation}
                  {cursorPos === 'translation' && <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-blink" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
