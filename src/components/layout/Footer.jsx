export default function Footer() {
  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Languages', href: '#languages' },
    { label: 'Compare', href: '#compare' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <footer className="relative" style={{ background: '#080808', borderTop: '1px solid rgba(198,255,52,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Caption Integrit
              </span>
              <img
                src="/logo.png"
                alt="Integrit logo"
                className="w-6 h-6 object-contain"
                style={{ filter: 'drop-shadow(0 0 6px rgba(198,255,52,0.6))' }}
              />
            </div>
            <p className="text-text-muted text-sm">
              AI-Powered Captions. Free Forever.
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-text-muted hover:text-white text-sm transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Copyright */}
          <p className="text-text-muted text-xs text-center md:text-right">
            © {new Date().getFullYear()} Caption Integrit.<br className="hidden sm:block" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
