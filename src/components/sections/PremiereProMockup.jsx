import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ── Caption data ─────────────────────────────────────── */
const C1 = [
  { l: '2%', w: '12%', t: 'Yaar, sun toh…' },
  { l: '15%', w: '11%', t: 'Bhai sahi bola' },
  { l: '27%', w: '10%', t: 'Matlab kya hai' },
  { l: '38%', w: '12%', t: 'Seedha baat kar' },
  { l: '51%', w: '10%', t: 'Chal na yaar' },
  { l: '62%', w: '11%', t: 'Arey woh dekh!' },
  { l: '74%', w: '10%', t: 'Ekdum mast hai' },
  { l: '85%', w: '10%', t: 'Sach mein bro' },
]
const C2 = [
  { l: '2%', w: '11%', t: 'nenu cheppindi' },
  { l: '14%', w: '13%', t: 'adi correct ga undi' },
  { l: '28%', w: '10%', t: 'akkada chuso' },
  { l: '39%', w: '11%', t: 'prati saari idhey' },
  { l: '51%', w: '10%', t: 'okay ra bhai' },
  { l: '62%', w: '12%', t: 'ippudu chuddam' },
  { l: '75%', w: '10%', t: 'chala bagundi' },
  { l: '86%', w: '10%', t: 'correct ga undi' },
]

/* ── Animation phases ─────────────────────────────────── */
const PHASES = [
  { n: 'enter', d: 800 },
  { n: 'to-clip', d: 1000 },
  { n: 'click-clip', d: 300 },
  { n: 'hold-clip', d: 500 },
  { n: 'to-btn', d: 1000 },
  { n: 'hover-btn', d: 350 },
  { n: 'click-btn', d: 300 },
  { n: 'hold-result', d: 1800 },
  { n: 'exit', d: 700 },
  { n: 'wait', d: 700 },
]

function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function PremiereProMockup() {
  const wRef = useRef(null)
  const curRef = useRef(null)
  const ringRef = useRef(null)
  const btnRef = useRef(null)
  const mcRef = useRef(null)
  const ct1Ref = useRef(null)
  const ct2Ref = useRef(null)
  const cc1Ref = useRef(null)
  const cc2Ref = useRef(null)
  const phRef = useRef(null)
  const capOvRef = useRef(null)
  const clipFieldRef = useRef(null)

  const phaseRef = useRef(0)
  const psRef = useRef(null)
  const flagsRef = useRef({})
  const droppedRef = useRef(false)
  const rafRef = useRef(null)

  /* ── helpers ──────────────────────────────────────────── */
  const gR = useCallback((el) => {
    if (!wRef.current || !el) return { x: 0, y: 0 }
    const wr = wRef.current.getBoundingClientRect()
    const e = el.getBoundingClientRect()
    return { x: e.left - wr.left + e.width / 2, y: e.top - wr.top + e.height / 2 }
  }, [])

  const mv = useCallback((x, y) => {
    if (!curRef.current) return
    curRef.current.style.left = (x - 3) + 'px'
    curRef.current.style.top = (y - 2) + 'px'
  }, [])

  const showRing = useCallback((x, y) => {
    const ring = ringRef.current
    if (!ring) return
    ring.style.left = (x - 11) + 'px'
    ring.style.top = (y - 11) + 'px'
    ring.style.opacity = '1'
    ring.style.transform = 'scale(.3)'
    ring.style.transition = 'none'
    requestAnimationFrame(() => {
      ring.style.transition = 'opacity .35s, transform .35s'
      ring.style.opacity = '0'
      ring.style.transform = 'scale(2)'
    })
  }, [])

  const dropCaptions = useCallback(() => {
    if (droppedRef.current) return
    droppedRef.current = true
    if (cc1Ref.current) cc1Ref.current.innerHTML = ''
    if (cc2Ref.current) cc2Ref.current.innerHTML = ''
    if (ct1Ref.current) ct1Ref.current.classList.add('show')
    setTimeout(() => { if (ct2Ref.current) ct2Ref.current.classList.add('show') }, 120)

    C1.forEach((c, i) => {
      const el = document.createElement('div')
      el.className = 'pp-cc'
      el.style.left = c.l
      el.style.width = c.w
      el.textContent = c.t
      if (cc1Ref.current) cc1Ref.current.appendChild(el)
      setTimeout(() => el.classList.add('in'), i * 70 + 80)
    })
    C2.forEach((c, i) => {
      const el = document.createElement('div')
      el.className = 'pp-cc'
      el.style.left = c.l
      el.style.width = c.w
      el.textContent = c.t
      if (cc2Ref.current) cc2Ref.current.appendChild(el)
      setTimeout(() => el.classList.add('in'), i * 70 + 180)
    })
    setTimeout(() => {
      if (capOvRef.current) capOvRef.current.style.opacity = '1'
    }, 700)
  }, [])

  const resetAll = useCallback(() => {
    droppedRef.current = false
    if (ct1Ref.current) ct1Ref.current.classList.remove('show')
    if (ct2Ref.current) ct2Ref.current.classList.remove('show')
    if (cc1Ref.current) cc1Ref.current.innerHTML = ''
    if (cc2Ref.current) cc2Ref.current.innerHTML = ''
    if (btnRef.current) btnRef.current.classList.remove('lit')
    if (mcRef.current) { mcRef.current.style.outline = ''; mcRef.current.style.filter = '' }
    if (clipFieldRef.current) {
      clipFieldRef.current.style.color = '#3a3a3a'
      clipFieldRef.current.innerHTML = 'No clip selected <span>—</span>'
    }
    if (capOvRef.current) capOvRef.current.style.opacity = '0'
    if (phRef.current) phRef.current.style.left = '2%'
  }, [])

  const getTargets = useCallback((p) => {
    if (!wRef.current) return { sx: 0, sy: 0, ex: 0, ey: 0 }
    const wr = wRef.current.getBoundingClientRect()
    const W2 = wr.width
    const H = wr.height
    const br = gR(btnRef.current)
    const cr = gR(mcRef.current)
    switch (PHASES[p].n) {
      case 'enter': return { sx: W2 + 30, sy: H * 0.5, ex: W2 + 30, ey: H * 0.5 }
      case 'to-clip': return { sx: W2 + 30, sy: H * 0.5, ex: cr.x, ey: cr.y }
      case 'click-clip': return { sx: cr.x, sy: cr.y, ex: cr.x, ey: cr.y }
      case 'hold-clip': return { sx: cr.x, sy: cr.y, ex: cr.x, ey: cr.y }
      case 'to-btn': return { sx: cr.x, sy: cr.y, ex: br.x, ey: br.y }
      case 'hover-btn': return { sx: br.x, sy: br.y, ex: br.x, ey: br.y }
      case 'click-btn': return { sx: br.x, sy: br.y, ex: br.x, ey: br.y }
      case 'hold-result': return { sx: br.x, sy: br.y, ex: br.x, ey: br.y }
      case 'exit': return { sx: br.x, sy: br.y, ex: W2 + 30, ey: H * 0.5 }
      case 'wait': return { sx: W2 + 30, sy: H * 0.5, ex: W2 + 30, ey: H * 0.5 }
      default: return { sx: 0, sy: 0, ex: 0, ey: 0 }
    }
  }, [gR])

  /* ── animation loop ──────────────────────────────────── */
  useEffect(() => {
    const tick = (now) => {
      if (psRef.current === null) psRef.current = now
      const phaseName = PHASES[phaseRef.current].n
      const dur = PHASES[phaseRef.current].d
      const el = now - psRef.current
      const rawT = Math.min(el / dur, 1)
      const t = ease(rawT)
      const tg = getTargets(phaseRef.current)
      mv(lerp(tg.sx, tg.ex, t), lerp(tg.sy, tg.ey, t))

      if (phaseName === 'click-clip' && rawT > 0.5 && !flagsRef.current.clipClick) {
        flagsRef.current.clipClick = true
        const cr = gR(mcRef.current)
        showRing(cr.x, cr.y)
        if (mcRef.current) {
          mcRef.current.style.outline = '1.5px solid #c8f000'
          mcRef.current.style.filter = 'brightness(1.5)'
        }
        if (clipFieldRef.current) {
          clipFieldRef.current.style.color = '#c8f000'
          clipFieldRef.current.innerHTML = 'MAIN_REEL.mp4 <span style="color:#4a6000;">● selected</span>'
        }
      }
      if (phaseName === 'hover-btn' && btnRef.current) {
        btnRef.current.style.filter = 'brightness(1.1)'
      }
      if (phaseName === 'click-btn' && rawT > 0.4 && !flagsRef.current.btnClick) {
        flagsRef.current.btnClick = true
        const br = gR(btnRef.current)
        showRing(br.x, br.y)
        if (btnRef.current) btnRef.current.classList.add('lit')
        setTimeout(dropCaptions, 200)
      }
      if (phaseName === 'hold-clip' && phRef.current) {
        phRef.current.style.left = (2 + rawT * 2) + '%'
      }

      if (rawT >= 1) {
        phaseRef.current++
        psRef.current = now
        if (phaseRef.current >= PHASES.length) {
          phaseRef.current = 0
          flagsRef.current = {}
          resetAll()
          if (btnRef.current) btnRef.current.style.filter = ''
        }
        if (phaseRef.current < PHASES.length) {
          const ng = getTargets(phaseRef.current)
          mv(ng.sx, ng.sy)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [mv, gR, showRing, dropCaptions, resetAll, getTargets])

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
                Live Preview
              </span>
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            SEE IT IN ACTION
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Watch Caption Integrit generate phonetic captions directly inside Adobe Premiere Pro — automated, precise, instant.
          </p>
        </motion.div>

        {/* Premiere Pro Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="pp-w" ref={wRef}>
            {/* Title bar */}
            <div className="pp-tb">
              <div className="pp-tb-dot" style={{ background: '#e55' }} />
              <div className="pp-tb-dot" style={{ background: '#fa0' }} />
              <div className="pp-tb-dot" style={{ background: '#4c4' }} />
              <div className="pp-tb-txt">
                Caption Integrit &nbsp;·&nbsp; REEL_FINAL.prproj — Adobe Premiere Pro
              </div>
            </div>

            {/* Body */}
            <div className="pp-body">
              {/* Preview */}
              <div className="pp-prev">
                <div className="pp-screen">
                  <div className="pp-screen-lbl">PROGRAM MONITOR</div>
                  <div className="pp-cap-ov" ref={capOvRef}>
                    Yaar, sun toh sahi ek baar
                  </div>
                </div>
              </div>

              {/* Plugin panel */}
              <div className="pp-plug">
                <div className="pp-ph">
                  <div className="pp-ph-ico"><span /></div>
                  <div className="pp-ph-title">CAPTION INTEGRIT</div>
                  <div className="pp-ph-v">v1.0</div>
                </div>
                <div className="pp-pb">
                  <div className="pp-sec-lbl">SELECTED CLIP</div>
                  <div className="pp-field" ref={clipFieldRef} style={{ color: '#3a3a3a' }}>
                    No clip selected <span>—</span>
                  </div>
                  <div className="pp-sec-lbl">STT PROVIDER</div>
                  <div className="pp-field">ElevenLabs Scribe <span>▾</span></div>
                  <div className="pp-sec-lbl">CAPTION OUTPUT</div>
                  <div className="pp-pill-row">
                    <div className="pp-pill">Native</div>
                    <div className="pp-pill on">Phonetic</div>
                    <div className="pp-pill">English</div>
                  </div>
                  <div className="pp-sec-lbl">CAPTION STYLE</div>
                  <div className="pp-pill-row">
                    <div className="pp-pill on">Phrase</div>
                    <div className="pp-pill">Sentence</div>
                  </div>
                  <div className="pp-gen-btn" ref={btnRef}>▶ GENERATE CAPTIONS</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="pp-tl">
              <div className="pp-tl-hd">
                <span>00:00:00:00</span>
                <span style={{ flex: 1, textAlign: 'center', color: '#2a2a2a' }}>
                  TIMELINE · REEL_FINAL
                </span>
                <span>00:00:24:00</span>
              </div>
              <div className="pp-ruler">
                <div className="pp-rm">0:00</div>
                <div className="pp-rm">0:06</div>
                <div className="pp-rm">0:12</div>
                <div className="pp-rm">0:18</div>
                <div className="pp-rm">0:24</div>
              </div>
              <div className="pp-tracks">
                <div className="pp-cap-track" ref={ct1Ref}>
                  <div className="pp-tlbl" style={{ color: '#5a6a00' }}>C1</div>
                  <div className="pp-clips" ref={cc1Ref} />
                </div>
                <div className="pp-cap-track" ref={ct2Ref}>
                  <div className="pp-tlbl" style={{ color: '#5a6a00' }}>C2</div>
                  <div className="pp-clips" ref={cc2Ref} />
                </div>
                <div className="pp-track">
                  <div className="pp-tlbl">V1</div>
                  <div className="pp-clips">
                    <div className="pp-clip pp-cv" ref={mcRef} style={{ left: '2%', width: '94%' }}>
                      MAIN_REEL.mp4
                    </div>
                  </div>
                </div>
                <div className="pp-track">
                  <div className="pp-tlbl">A1</div>
                  <div className="pp-clips">
                    <div className="pp-clip pp-ca" style={{ left: '2%', width: '94%' }}>AUDIO.wav</div>
                  </div>
                </div>
              </div>
              <div className="pp-ph-line" ref={phRef}>
                <div className="pp-ph-head" />
              </div>
            </div>

            {/* Animated cursor */}
            <div className="pp-ring" ref={ringRef} />
            <svg
              className="pp-cur"
              ref={curRef}
              style={{ left: '-40px', top: '-40px' }}
              viewBox="0 0 18 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2 L2 16 L6 12 L9.5 18.5 L11.5 17.5 L8 11 L13.5 11 Z"
                fill="white"
                stroke="#111"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
