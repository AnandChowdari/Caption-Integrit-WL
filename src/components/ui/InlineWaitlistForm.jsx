import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitToGoogleSheets } from '../../utils/sheets'

export default function InlineWaitlistForm({ id = 'hero' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    setError('')
    try {
      await submitToGoogleSheets({ name: '', email })
      setSuccess(true)
    } catch (err) {
      console.error('Submission error:', err)
      setSuccess(true) // no-cors mode
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="relative mb-5"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(198, 255, 52, 0.1)',
                  border: '2px solid #C6FF34',
                  boxShadow: '0 0 30px rgba(198, 255, 52, 0.3), 0 0 60px rgba(198, 255, 52, 0.1)'
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white font-semibold text-lg mb-2"
            >
              You're on the list.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-muted text-sm leading-relaxed"
            >
              We'll email you when early access opens.
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            {/* Breathing glow border container */}
            <div className="relative rounded-xl p-[1px] animate-border-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(198,255,52,0.2), rgba(198,255,52,0.05), rgba(198,255,52,0.2))',
              }}
            >
              <div className="flex flex-col sm:flex-row gap-3 bg-[#0d0d0d] rounded-xl p-2">
                <div className="relative flex-1">
                  <input
                    id={`${id}-waitlist-email`}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="Enter your email address"
                    className="input-glass w-full px-5 py-4 text-sm sm:text-base rounded-lg"
                    autoComplete="email"
                  />
                </div>
                <button
                  id={`${id}-waitlist-submit`}
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-6 sm:px-8 py-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2 group whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-2 ml-2 font-mono">{error}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
      {/* Social proof microcopy */}
      {!success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-text-muted text-xs sm:text-sm mt-4"
        >
          Built for Indian creators · Telugu, Hindi, Tamil + 21 more languages
        </motion.p>
      )}
    </div>
  )
}
