import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 6.075 4.425 11.14 10.25 11.98V20.75a9.96 9.96 0 007.5-9.75c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    title: 'Voyages 100% sécurisés',
    desc: 'Protocoles temporels certifiés et équipes de sécurité déployées à chaque ère. Votre retour est toujours garanti.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Expériences historiques immersives',
    desc: 'Vivez des moments authentiques au cœur des plus grandes civilisations. Chaque détail est méticuleusement reconstitué.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Accompagnement personnalisé par IA',
    desc: 'Notre assistant IA analyse vos préférences pour construire le voyage parfait. De la sélection à l\'immersion totale.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
            Notre agence
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
            L'excellence du voyage<br />
            <span className="gold-text">à travers les âges</span>
          </h2>
          <div className="section-divider mb-8" />
          <p className="font-body-serif text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
            Depuis notre fondation, TimeTravel Agency repousse les frontières du possible.
            Nous ne proposons pas de simples vacances — nous offrons des expériences qui changent
            votre vision du monde et de l'Histoire.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 group hover:border-gold/30 transition-colors duration-500"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-gold transition-all duration-500 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.08)' }}
              >
                {feat.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3 tracking-wide">
                {feat.title}
              </h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-4 border border-slate/40 rounded-2xl p-8"
          style={{ background: 'rgba(15,22,35,0.5)' }}
        >
          {[
            { value: '3', label: 'Destinations' },
            { value: '99.8%', label: 'Taux de retour' },
            { value: '+2 400', label: 'Voyageurs satisfaits' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gold-text mb-2">
                {stat.value}
              </div>
              <div className="font-inter text-xs tracking-widest uppercase text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
