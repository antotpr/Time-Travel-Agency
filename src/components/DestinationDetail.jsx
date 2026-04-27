import { useState } from 'react'
import { motion } from 'framer-motion'
import { getImage } from '../utils/images'

const riskColors = {
  'Faible': { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  'Modéré': { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  'Élevé': { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
}

export default function DestinationDetail({ destination: dest, onClose }) {
  const risk = riskColors[dest.risk]
  const [imgError, setImgError] = useState(false)
  const imageSrc = getImage(`${dest.id}.jpg`)

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${dest.glowColor} 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{ background: dest.cardGradient }}
      />
      {/* Border top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${dest.colors.primary}60, transparent)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Close button */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{dest.emoji}</span>
            <div>
              <p className="font-inter text-xs tracking-widest uppercase text-gray-500">{dest.period}</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                {dest.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 font-inter text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full border border-slate/40 hover:border-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Fermer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-6">
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-video"
              style={{
                background: dest.id === 'egypt'
                  ? 'linear-gradient(135deg, #2a1e00 0%, #1a1200 40%, #0a0d1a 70%, #1a3a5c 100%)'
                  : dest.id === 'rome'
                  ? 'linear-gradient(135deg, #2a0f00 0%, #1a0500 40%, #0a0d1a 70%, #4a3728 100%)'
                  : 'linear-gradient(135deg, #140a1a 0%, #0a0514 40%, #0a0d1a 70%, #1a2a3a 100%)',
                border: `1px solid ${dest.colors.primary}20`,
              }}
            >
              {imageSrc && !imgError ? (
                <img
                  src={imageSrc}
                  alt={dest.name}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl opacity-30" style={{ filter: 'blur(8px)' }}>{dest.emoji}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl">{dest.emoji}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-inter text-xs text-gray-400 text-center">
                      Ajoutez <code className="text-gold/60">src/assets/{dest.id}.jpg</code> pour afficher une photo
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(15,22,35,0.8)', border: `1px solid ${dest.colors.primary}20` }}
              >
                <p className="font-display text-lg font-bold" style={{ color: dest.colors.primary }}>
                  {dest.price}
                </p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Prix</p>
              </div>
              <div
                className={`rounded-xl p-4 text-center ${risk.bg} border ${risk.border}`}
              >
                <p className={`font-display text-sm font-semibold ${risk.text}`}>{dest.risk}</p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Risque</p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(15,22,35,0.8)', border: `1px solid ${dest.colors.primary}20` }}
              >
                <p className="font-display text-sm font-bold text-white">{dest.duration}</p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Durée</p>
              </div>
            </div>

            {/* Immersion level */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(15,22,35,0.8)', border: `1px solid rgba(30,42,58,0.8)` }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-inter text-xs tracking-widest uppercase text-gray-400">
                  Niveau d'immersion
                </span>
                <span className="font-display text-lg font-bold" style={{ color: dest.colors.primary }}>
                  {dest.immersion}%
                </span>
              </div>
              <div className="h-1 bg-slate/40 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dest.immersion}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  className="immersion-bar h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${dest.colors.primary}, ${dest.colors.accent || dest.colors.primary})`,
                  }}
                />
              </div>
            </div>

            {/* Outfit */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(15,22,35,0.8)', border: `1px solid rgba(30,42,58,0.8)` }}
            >
              <p className="font-inter text-xs tracking-widest uppercase text-gray-500 mb-2">
                Tenue recommandée
              </p>
              <p className="font-body-serif text-base text-gray-300 italic leading-relaxed">
                {dest.outfit}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="font-body-serif text-xl text-gray-300 leading-relaxed italic">
                {dest.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: dest.colors.primary }}>
                Points forts du voyage
              </h3>
              <ul className="space-y-3">
                {dest.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: dest.colors.primary }}
                    />
                    <span className="font-inter text-sm text-gray-300 leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div
              className="rounded-xl p-5"
              style={{
                background: `linear-gradient(135deg, ${dest.glowColor}, rgba(15,22,35,0.8))`,
                border: `1px solid ${dest.colors.primary}30`,
              }}
            >
              <h3 className="font-display text-xs tracking-widest uppercase mb-3" style={{ color: dest.colors.primary }}>
                ⚠ Conseils de voyage
              </h3>
              <p className="font-inter text-sm text-gray-300 leading-relaxed">
                {dest.tips}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-4 rounded-full font-display text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${dest.colors.primary}, ${dest.colors.accent || dest.colors.primary})`,
                color: '#080b14',
                boxShadow: `0 8px 30px ${dest.glowColor}`,
              }}
            >
              Réserver ce voyage →
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
