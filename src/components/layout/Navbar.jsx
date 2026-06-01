import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Stats', href: '#stats' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ onJoinWaitlist }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        {/* Single unified row — everything aligned to the same 64px tall strip */}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo + Wordmark ── */}
          <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Integrit"
              className="h-7 w-7 object-contain transition-all duration-300
                         group-hover:drop-shadow-[0_0_10px_rgba(195,255,51,0.7)]"
            />
            <span className="font-display font-bold text-[1.4rem] leading-none text-white tracking-[0.08em]
                             group-hover:text-accent transition-colors duration-300">
              INTEGRIT
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-text-muted hover:text-white transition-colors duration-300
                           text-sm font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => { setMenuOpen(false); onJoinWaitlist?.() }}
              className="btn-primary px-5 py-2 rounded-lg text-sm"
            >
              Join Waitlist
            </button>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            id="nav-menu-toggle"
            className="md:hidden text-white p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/10
                       px-6 pt-4 pb-6 flex flex-col gap-1 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-left text-white font-medium py-3 border-b border-white/5
                           hover:text-accent transition-colors text-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onJoinWaitlist?.() }}
              className="btn-primary w-full py-3 rounded-lg text-sm mt-3"
            >
              Join Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

