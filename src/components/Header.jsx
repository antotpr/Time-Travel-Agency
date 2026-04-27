import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Réservation', href: '#reservation' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/95 backdrop-blur-xl border-b border-slate/40 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNav('#accueil')}
              className="flex items-center gap-2 group"
            >
              <span className="text-xl">⏳</span>
              <span className="font-display text-sm sm:text-base font-semibold tracking-widest gold-text uppercase">
                TimeTravel Agency
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="font-inter text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNav('#reservation')}
                className="hidden md:block btn-gold px-5 py-2 rounded-full text-xs tracking-widest uppercase"
              >
                <span>Planifier mon voyage</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-center"
                aria-label="Menu"
              >
                <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-void/98 backdrop-blur-xl border-b border-slate/40 md:hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left font-display text-sm tracking-widest uppercase text-gray-300 hover:text-gold py-2 border-b border-slate/30 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#reservation')}
                className="btn-gold mt-2 py-3 rounded-full text-xs tracking-widest uppercase"
              >
                <span>Planifier mon voyage</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
