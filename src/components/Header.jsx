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

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
          scrolled || menuOpen
            ? 'bg-[#080b14]/95 backdrop-blur-xl border-b border-[#1e2a3a]/40 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo — flex-shrink-0 évite l'écrasement sur mobile */}
            <button
              onClick={() => handleNav('#accueil')}
              className="flex items-center gap-2 flex-shrink-0 group"
              aria-label="Accueil TimeTravel Agency"
            >
              <span className="text-lg sm:text-xl" aria-hidden="true">⏳</span>
              <span className="font-display text-xs sm:text-sm lg:text-base font-semibold tracking-[0.15em] sm:tracking-widest gold-text uppercase whitespace-nowrap">
                TimeTravel Agency
              </span>
            </button>

            {/* Desktop Nav — visible seulement à partir de lg (1024px) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="font-inter text-xs tracking-widest uppercase text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA desktop + Hamburger mobile */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* CTA — visible seulement à partir de lg */}
              <button
                onClick={() => handleNav('#reservation')}
                className="hidden lg:block btn-gold px-5 py-2 rounded-full text-xs tracking-widest uppercase whitespace-nowrap"
              >
                <span>Planifier mon voyage</span>
              </button>

              {/* Hamburger — visible en dessous de lg */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-[#1e2a3a]/60 hover:border-[#c9a84c]/40 transition-colors duration-200"
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                <span
                  className={`block w-5 h-px bg-[#c9a84c] transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-[#c9a84c] transition-all duration-300 ${
                    menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-[#c9a84c] transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-[3px]'
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile / Tablet Menu — position calculée selon la hauteur du header */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop cliquable pour fermer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panneau du menu */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-40 lg:hidden"
              style={{
                background: 'rgba(8,11,20,0.98)',
                borderBottom: '1px solid rgba(30,42,58,0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <nav
                className="flex flex-col px-4 sm:px-6 py-4"
                aria-label="Navigation mobile"
              >
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNav(link.href)}
                    className="text-left font-display text-sm tracking-widest uppercase text-gray-300 hover:text-[#c9a84c] py-3.5 border-b border-[#1e2a3a]/30 transition-colors duration-200 last:border-b-0"
                  >
                    {link.label}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  onClick={() => handleNav('#reservation')}
                  className="btn-gold mt-4 py-3 rounded-full text-xs tracking-widest uppercase"
                >
                  <span>Planifier mon voyage</span>
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
