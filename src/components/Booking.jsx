import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '../data/destinations'

const initialForm = {
  prenom: '',
  nom: '',
  email: '',
  destination: '',
  date: '',
  voyageurs: '1',
  message: '',
}

export default function Booking({ selectedDestination }) {
  const [form, setForm] = useState({
    ...initialForm,
    destination: selectedDestination?.id || '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!form.prenom.trim()) errs.prenom = true
    if (!form.nom.trim()) errs.nom = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
    if (!form.destination) errs.destination = true
    if (!form.date) errs.date = true
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  const selectedDest = destinations.find((d) => d.id === form.destination)

  const inputClass = (field) =>
    `bg-midnight border rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-gray-600 focus:outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-slate/60 focus:border-gold/50'
    }`

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,22,35,0.6) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
            Pré-réservation
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Planifiez votre<br />
            <span className="gold-text">voyage dans le temps</span>
          </h2>
          <div className="section-divider mb-4" />
          <p className="font-body-serif text-lg text-gray-400 italic">
            Remplissez ce formulaire et notre équipe vous contactera sous 48h.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-16 px-8 rounded-2xl"
              style={{ background: 'rgba(15,22,35,0.8)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <div className="text-6xl mb-6">⏳</div>
              <h3 className="font-display text-2xl font-semibold gold-text mb-4">
                Demande reçue !
              </h3>
              <p className="font-body-serif text-lg text-gray-300 italic mb-2">
                Merci {form.prenom}, votre demande de pré-réservation
                {selectedDest ? ` pour ${selectedDest.name}` : ''} a bien été enregistrée.
              </p>
              <p className="font-inter text-sm text-gray-500 mb-8">
                Notre équipe temporelle vous contactera dans les 48h à l'adresse {form.email}.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm) }}
                className="btn-outline px-8 py-3 rounded-full font-display text-xs tracking-widest uppercase"
              >
                Nouvelle demande
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 sm:p-10 space-y-6"
              style={{ background: 'rgba(15,22,35,0.8)', border: '1px solid rgba(30,42,58,0.8)' }}
            >
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                    Prénom <span className="text-gold/60">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.prenom}
                    onChange={set('prenom')}
                    placeholder="Jean"
                    className={inputClass('prenom')}
                  />
                  {errors.prenom && <p className="text-red-400 text-xs">Requis</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                    Nom <span className="text-gold/60">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.nom}
                    onChange={set('nom')}
                    placeholder="Dupont"
                    className={inputClass('nom')}
                  />
                  {errors.nom && <p className="text-red-400 text-xs">Requis</p>}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                  Email <span className="text-gold/60">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="jean.dupont@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs">Email invalide</p>}
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                  Destination <span className="text-gold/60">*</span>
                </label>
                <select
                  value={form.destination}
                  onChange={set('destination')}
                  className={`${inputClass('destination')} cursor-pointer`}
                  style={{ appearance: 'none' }}
                >
                  <option value="">Choisir une destination...</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id} style={{ background: '#0f1623' }}>
                      {d.emoji} {d.name} — {d.price}
                    </option>
                  ))}
                </select>
                {errors.destination && <p className="text-red-400 text-xs">Requis</p>}
              </div>

              {/* Date + Voyageurs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                    Date souhaitée <span className="text-gold/60">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={set('date')}
                    min={new Date().toISOString().split('T')[0]}
                    className={`${inputClass('date')} [color-scheme:dark]`}
                  />
                  {errors.date && <p className="text-red-400 text-xs">Requis</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                    Nombre de voyageurs
                  </label>
                  <input
                    type="number"
                    value={form.voyageurs}
                    onChange={set('voyageurs')}
                    min="1"
                    max="10"
                    className={inputClass('voyageurs')}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-xs tracking-widest uppercase text-gray-400">
                  Message (optionnel)
                </label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  placeholder="Précisez vos attentes, questions particulières..."
                  className="bg-midnight border border-slate/60 rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-gold py-4 rounded-full font-display text-sm tracking-widest uppercase"
              >
                <span>Envoyer ma demande →</span>
              </button>

              <p className="text-center font-inter text-xs text-gray-600">
                Aucune base de données utilisée. Projet fictif à des fins éducatives.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
