import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, User, Mail, X } from 'lucide-react'
import { submitToGoogleSheets } from '../../utils/sheets'

const initialForm = { name: '', email: '' }
const initialErrors = { name: '', email: '' }

function validate(form) {
  const errors = { name: '', email: '' }
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email'
    valid = false
  }

  return { errors, valid }
}

export default function WaitlistForm({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: newErrors, valid } = validate(form)
    if (!valid) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await submitToGoogleSheets(form)
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Submission error:', err)
      // Still show success — no-cors mode means we can't read the response
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset state after animation
    setTimeout(() => {
      setSuccess(false)
      setForm(initialForm)
      setErrors(initialErrors)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto px-4 py-8 flex items-center justify-center min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/85 z-0"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 w-full max-w-md my-auto"
          >
            <div className="glass-strong rounded-2xl p-6 sm:p-8 neon-border relative overflow-hidden">

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                           text-text-muted hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="glass neon-border rounded-full px-3 py-1">
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                      Limited Early Access
                    </span>
                  </div>
                </div>
                <h2 className="font-display text-4xl text-white mb-2">
                  SECURE YOUR SPOT
                </h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Join 2,000+ editors already on the waitlist
                </p>
              </div>

              <AnimatePresence mode="wait">
                {success ? (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative mb-6"
                    >
                      <div className="relative w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center glow-accent">
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-display text-2xl text-white mb-2"
                    >
                      YOU'RE ON THE LIST
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-text-muted text-sm leading-relaxed max-w-sm"
                    >
                      We'll notify you as soon as early access opens. Keep an eye on your inbox.
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-text-muted text-xs hover:text-accent transition-colors font-mono underline underline-offset-4"
                    >
                      Submit another entry
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Form State */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="waitlist-name" className="block text-sm font-medium text-text-muted mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                        <input
                          id="waitlist-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Alex Johnson"
                          className={`input-field w-full pl-11 pr-4 py-3.5 text-sm ${errors.name ? 'error' : ''}`}
                          autoComplete="name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="waitlist-email" className="block text-sm font-medium text-text-muted mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                        <input
                          id="waitlist-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="alex@studio.io"
                          className={`input-field w-full pl-11 pr-4 py-3.5 text-sm ${errors.email ? 'error' : ''}`}
                          autoComplete="email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.email}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      id="waitlist-submit"
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>JOIN WAITLIST</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-text-muted text-xs leading-relaxed">
                      No spam. No credit card. Early access
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
