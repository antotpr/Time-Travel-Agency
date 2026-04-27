import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import { getImage } from '../utils/images'

const riskColors = {
  'Faible': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Modéré': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Élevé': 'text-red-400 bg-red-400/10 border-red-400/20',
}

// Gradients de fond par destination (visibles si image absente ou en superposition)
const bgGradients = {
  egypt: 'linear-gradient(160deg, #2a1e00 0%, #1a1200 35%, #0c1020 65%, #1a3a5c 100%)',
  rome:  'linear-gradient(160deg, #2a0f00 0%, #1a0500 35%, #0c1020 65%, #3a2818 100%)',
  japan: 'linear-gradient(160deg, #140a1a 0%, #0a0514 35%, #0c1020 65%, #1a2a3a 100%)',
}

function DestinationCard({ dest, onSelect, isSelected }) {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Charge l'image "card" spécifique à cette destination
  const imageSrc = getImage(dest.id, 'card')
  const hasImage = imageSrc && !imgError

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: y * -10, y: x * 10 })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="card-3d-wrapper"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(dest)}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
            isSelected ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)'
          }`,
          transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
          background: dest.cardGradient,
          border: isSelected
            ? `1px solid ${dest.colors.primary}80`
            : isHovered
            ? `1px solid ${dest.colors.primary}50`
            : '1px solid rgba(30,42,58,0.8)',
          boxShadow: isHovered
            ? `0 24px 60px ${dest.glowColor}, 0 0 40px ${dest.glowColor}`
            : isSelected
            ? `0 0 30px ${dest.glowColor}`
            : '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Zone image ── */}
        <div className="relative h-56 overflow-hidden">
          {/* Fond gradient permanent (visible derrière l'image ou si absente) */}
          <div
            className="absolute inset-0"
            style={{ background: bgGradients[dest.id] }}
          />

          {/* Image réelle si disponible */}
          {hasImage ? (
            <img
              src={imageSrc}
              alt={dest.imageAlt || dest.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
            />
          ) : (
            /* Fallback emoji si image absente */
            <>
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="text-8xl opacity-15" style={{ filter: 'blur(6px)' }}>
                  {dest.emoji}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="text-6xl">{dest.emoji}</span>
              </div>
            </>
          )}

          {/* Overlay sombre sur l'image pour garder les badges lisibles */}
          {hasImage && (
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)' }}
            />
          )}

          {/* Badges risque + durée */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
            <span className={`font-inter text-xs px-3 py-1 rounded-full border backdrop-blur-sm ${riskColors[dest.risk]}`}>
              Risque {dest.risk}
            </span>
            <span className="font-inter text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10 text-gray-300 backdrop-blur-sm">
              {dest.duration}
            </span>
          </div>

          {/* Gradient bas pour lisibilité du contenu text en dessous */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28"
            style={{ background: 'linear-gradient(to top, rgba(8,11,20,1) 0%, rgba(8,11,20,0.4) 60%, transparent 100%)' }}
          />
        </div>

        {/* ── Contenu texte ── */}
        <div className="p-6">
          <span className="font-inter text-xs tracking-widest uppercase text-gray-500 block mb-1">
            {dest.period}
          </span>
          <h3 className="font-display text-xl font-semibold text-white mb-2 tracking-wide">
            {dest.name}
          </h3>
          <p className="font-inter text-sm text-gray-400 leading-relaxed mb-5">
            {dest.shortDesc}
          </p>

          {/* Prix + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-inter text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                À partir de
              </p>
              <p className="font-display text-lg font-semibold" style={{ color: dest.colors.primary }}>
                {dest.price}
              </p>
            </div>
            <button
              className="font-inter text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300"
              style={{
                background: isHovered ? `${dest.colors.primary}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${dest.colors.primary}40`,
                color: dest.colors.primary,
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              Découvrir →
            </button>
          </div>
        </div>

        {/* Indicateur sélection */}
        {isSelected && (
          <div
            className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center z-10"
            style={{ background: dest.colors.primary }}
          >
            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Destinations({ onSelect, selected }) {
  return (
    <section className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
            Nos destinations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
            Choisissez votre<br />
            <span className="gold-text">époque mythique</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="font-body-serif text-lg text-gray-400 max-w-xl mx-auto italic">
            Trois civilisations d'exception vous attendent. Chacune une promesse unique,
            une aventure inoubliable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              onSelect={onSelect}
              isSelected={selected?.id === dest.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
