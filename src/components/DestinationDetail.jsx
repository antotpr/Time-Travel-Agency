import { useState } from 'react'
import { motion } from 'framer-motion'
import { getImage, getGalleryImages } from '../utils/images'

const riskColors = {
  'Faible': { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  'Modéré': { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  'Élevé':  { text: 'text-red-400',   bg: 'bg-red-400/10',    border: 'border-red-400/30'    },
}

const bgGradients = {
  egypt: 'linear-gradient(135deg, #2a1e00 0%, #1a1200 40%, #0a0d1a 70%, #1a3a5c 100%)',
  rome:  'linear-gradient(135deg, #2a0f00 0%, #1a0500 40%, #0a0d1a 70%, #4a3728 100%)',
  japan: 'linear-gradient(135deg, #140a1a 0%, #0a0514 40%, #0a0d1a 70%, #1a2a3a 100%)',
}

function ImageBlock({ dest }) {
  const [mainError, setMainError] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const detailSrc   = getImage(dest.id, 'detail')
  const galleryImgs = getGalleryImages(dest.id)

  // Image principale : detail en priorité, sinon première de la galerie
  const mainSrc = (!mainError && detailSrc) ? detailSrc
                : (!mainError && galleryImgs[0]) ? galleryImgs[0]
                : null

  // Galerie : toutes les images disponibles
  const hasGallery = galleryImgs.length > 1

  return (
    <div className="space-y-3">
      {/* Image principale */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-video"
        style={{
          background: bgGradients[dest.id],
          border: `1px solid ${dest.colors.primary}20`,
        }}
      >
        {mainSrc ? (
          <>
            <img
              src={hasGallery ? galleryImgs[activeIdx] : mainSrc}
              alt={dest.imageAlt || dest.name}
              loading="eager"
              onError={() => setMainError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay gradient pour lisibilité */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
          </>
        ) : (
          /* Fallback si aucune image */
          <>
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="text-9xl opacity-20" style={{ filter: 'blur(10px)' }}>{dest.emoji}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="text-7xl">{dest.emoji}</span>
            </div>
            <p className="absolute bottom-4 left-0 right-0 font-inter text-xs text-gray-500 text-center px-4">
              Placez <code className="text-[#c9a84c]/60">src/assets/{dest.id}/{dest.id}-detail.jpeg</code> pour afficher une photo
            </p>
          </>
        )}
      </div>

      {/* Miniatures galerie — affichées seulement si plusieurs images disponibles */}
      {hasGallery && (
        <div className="flex gap-2">
          {galleryImgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="relative flex-1 aspect-video rounded-lg overflow-hidden transition-all duration-200"
              style={{
                border: activeIdx === i
                  ? `2px solid ${dest.colors.primary}`
                  : '2px solid rgba(30,42,58,0.6)',
                opacity: activeIdx === i ? 1 : 0.55,
              }}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DestinationDetail({ destination: dest, onClose }) {
  const risk = riskColors[dest.risk]

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Fond coloré selon la destination */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${dest.glowColor} 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 z-0 opacity-25" style={{ background: dest.cardGradient }} />

      {/* Liseré coloré en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${dest.colors.primary}80, transparent)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* En-tête avec nom + bouton fermer */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl flex-shrink-0" aria-hidden="true">{dest.emoji}</span>
            <div className="min-w-0">
              <p className="font-inter text-xs tracking-widest uppercase text-gray-500 truncate">
                {dest.period}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                {dest.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 flex-shrink-0 font-inter text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full border border-[#1e2a3a]/60 hover:border-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Fermer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Colonne gauche : image + stats ── */}
          <div className="space-y-5">
            <ImageBlock dest={dest} />

            {/* Stats rapides */}
            <div className="grid grid-cols-3 gap-3">
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(15,22,35,0.85)', border: `1px solid ${dest.colors.primary}25` }}
              >
                <p className="font-display text-base font-bold leading-tight" style={{ color: dest.colors.primary }}>
                  {dest.price}
                </p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Prix</p>
              </div>
              <div className={`rounded-xl p-4 text-center ${risk.bg} border ${risk.border}`}>
                <p className={`font-display text-sm font-semibold ${risk.text}`}>{dest.risk}</p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Risque</p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(15,22,35,0.85)', border: `1px solid ${dest.colors.primary}25` }}
              >
                <p className="font-display text-sm font-bold text-white">{dest.duration}</p>
                <p className="font-inter text-xs text-gray-500 mt-1 tracking-wider uppercase">Durée</p>
              </div>
            </div>

            {/* Barre d'immersion */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(15,22,35,0.85)', border: '1px solid rgba(30,42,58,0.8)' }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-inter text-xs tracking-widest uppercase text-gray-400">
                  Niveau d'immersion
                </span>
                <span className="font-display text-lg font-bold" style={{ color: dest.colors.primary }}>
                  {dest.immersion}%
                </span>
              </div>
              <div className="h-1.5 bg-[#1e2a3a]/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dest.immersion}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${dest.colors.primary}, ${dest.colors.accent || dest.colors.primary})`,
                    boxShadow: `0 0 8px ${dest.colors.primary}60`,
                  }}
                />
              </div>
            </div>

            {/* Tenue recommandée */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(15,22,35,0.85)', border: '1px solid rgba(30,42,58,0.8)' }}
            >
              <p className="font-inter text-xs tracking-widest uppercase text-gray-500 mb-2">
                Tenue recommandée
              </p>
              <p className="font-body-serif text-base text-gray-300 italic leading-relaxed">
                {dest.outfit}
              </p>
            </div>
          </div>

          {/* ── Colonne droite : texte ── */}
          <div className="space-y-6">
            <p className="font-body-serif text-xl text-gray-300 leading-relaxed italic">
              {dest.description}
            </p>

            {/* Points forts */}
            <div>
              <h3
                className="font-display text-xs tracking-widest uppercase mb-4"
                style={{ color: dest.colors.primary }}
              >
                Points forts du voyage
              </h3>
              <ul className="space-y-3">
                {dest.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: dest.colors.primary }}
                      aria-hidden="true"
                    />
                    <span className="font-inter text-sm text-gray-300 leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Conseils */}
            <div
              className="rounded-xl p-5"
              style={{
                background: `linear-gradient(135deg, ${dest.glowColor}, rgba(15,22,35,0.85))`,
                border: `1px solid ${dest.colors.primary}30`,
              }}
            >
              <h3
                className="font-display text-xs tracking-widest uppercase mb-3"
                style={{ color: dest.colors.primary }}
              >
                ⚠ Conseils de voyage
              </h3>
              <p className="font-inter text-sm text-gray-300 leading-relaxed">{dest.tips}</p>
            </div>

            {/* CTA réservation */}
            <button
              onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-4 rounded-full font-display text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
