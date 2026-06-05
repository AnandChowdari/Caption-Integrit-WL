import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Languages', href: '#languages' },
  { label: 'Compare', href: '#compare' },
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
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Caption Integrit Home">
            <span className="font-display font-bold text-xl text-white tracking-tight group-hover:text-accent transition-colors duration-300">
              Caption Integrit
            </span>
            <img
              src="/logo.png"
              alt="Integrit logo"
              className="w-8 h-8 object-contain flex-shrink-0"
              style={{ filter: 'drop-shadow(0 0 8px rgba(198,255,52,0.6))' }}
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-text-muted hover:text-white transition-colors duration-300
                           text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button
              id="nav-join-waitlist"
              onClick={onJoinWaitlist}
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            id="nav-menu-toggle"
            className="lg:hidden text-white p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 pt-4 pb-6 flex flex-col gap-1 lg:hidden"
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
              onClick={() => { setMenuOpen(false); onJoinWaitlist() }}
              className="btn-primary w-full py-3 text-sm mt-3"
            >
              Join Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
