/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-tertiary': '#141414',
        'accent': '#C6FF34',
        'accent-dim': 'rgba(198,255,52,0.35)',
        'accent-glow': 'rgba(198,255,52,0.15)',
        'text-primary': '#FFFFFF',
        'text-muted': '#888888',
        'text-secondary': '#aaaaaa',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        'body': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'noto': ['"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marqueeReverse 45s linear infinite',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(198,255,52,0.15), 0 0 40px rgba(198,255,52,0.05)' },
          '50%': { boxShadow: '0 0 30px rgba(198,255,52,0.3), 0 0 60px rgba(198,255,52,0.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(198,255,52,0.2)' },
          '50%': { borderColor: 'rgba(198,255,52,0.5)' },
        },
      },
    },
  },
  plugins: [],
}
