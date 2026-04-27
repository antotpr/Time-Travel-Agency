import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Réservation', href: '#reservation' },
]

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 px-4">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">⏳</span>
            <span className="font-display text-sm font-semibold tracking-widest gold-text uppercase">
              TimeTravel Agency
            </span>
          </motion.div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="font-inter text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Destinations quick links */}
          <div className="flex gap-3">
            {['🏺', '⚔️', '⛩️'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleNav('#destinations')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(30,42,58,0.6)', border: '1px solid rgba(30,42,58,0.8)' }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(30,42,58,0.6)' }}
        >
          <p className="font-inter text-xs text-gray-600">
            © 2024 TimeTravel Agency — Projet fictif à des fins éducatives. Aucun voyage temporel réel n'est proposé.
          </p>
          <p className="font-inter text-xs text-gray-700 mt-1">
            Réalisé avec React, Vite, Framer Motion, Three.js & Mistral AI
          </p>
        </div>
      </div>
    </footer>
  )
}
