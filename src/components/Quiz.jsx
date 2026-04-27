import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations, quizQuestions } from '../data/destinations'

const personalizedMessages = {
  egypt: "Votre âme d'explorateur vous attire vers les mystères millénaires de l'Égypte. Les temples de Karnak, les pyramides de Gizeh et les secrets du Nil n'attendent que vous.",
  rome: "Votre esprit stratège et votre soif de grandeur vous destinent à l'Empire Romain. Rome à son apogée vous réserve une immersion épique dans la plus grande civilisation de l'Antiquité.",
  japan: "Votre sensibilité esthétique et votre quête de sérénité vous guident vers le Japon Féodal. Sanctuaires shinto, cerisiers en fleurs et samouraïs vous promettent une expérience d'une beauté rare.",
}

export default function Quiz({ onSelectDestination }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [direction, setDirection] = useState(1)

  const totalSteps = quizQuestions.length

  const handleAnswer = (dest) => {
    setSelected(dest)
    setTimeout(() => {
      const newAnswers = [...answers, dest]
      if (step < totalSteps - 1) {
        setDirection(1)
        setAnswers(newAnswers)
        setStep(step + 1)
        setSelected(null)
      } else {
        // Calculate result
        const scores = { egypt: 0, rome: 0, japan: 0 }
        newAnswers.forEach((d) => scores[d]++)
        const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
        setResult(winner)
      }
    }, 300)
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
    setDirection(1)
  }

  const currentQuestion = quizQuestions[step]
  const resultDest = result ? destinations.find((d) => d.id === result) : null

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
            Découvrez votre époque
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Quiz de recommandation
          </h2>
          <div className="section-divider mb-4" />
          <p className="font-body-serif text-lg text-gray-400 italic">
            4 questions pour révéler votre destination idéale
          </p>
        </motion.div>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'rgba(15,22,35,0.8)', border: '1px solid rgba(30,42,58,0.8)' }}
        >
          {!result ? (
            <>
              {/* Progress bar */}
              <div className="h-0.5 bg-slate/40">
                <motion.div
                  className="h-full"
                  style={{ background: 'linear-gradient(90deg, #c9a84c, #e0c06a)' }}
                  animate={{ width: `${((step) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-8 sm:p-10">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-inter text-xs tracking-widest uppercase text-gray-500">
                    Question {step + 1} sur {totalSteps}
                  </span>
                  <div className="flex gap-1.5">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          background: i <= step ? '#c9a84c' : 'rgba(30,42,58,0.8)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-8 leading-relaxed">
                      {currentQuestion.question}
                    </h3>

                    <div className="space-y-3">
                      {currentQuestion.answers.map((answer) => (
                        <motion.button
                          key={answer.dest}
                          onClick={() => handleAnswer(answer.dest)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full flex items-center gap-4 p-5 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: selected === answer.dest
                              ? 'rgba(201,168,76,0.15)'
                              : 'rgba(30,42,58,0.3)',
                            border: selected === answer.dest
                              ? '1px solid rgba(201,168,76,0.5)'
                              : '1px solid rgba(30,42,58,0.6)',
                          }}
                        >
                          <span className="text-2xl flex-shrink-0">{answer.icon}</span>
                          <span className="font-inter text-sm text-gray-200">{answer.text}</span>
                          {selected === answer.dest && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-gold/80 flex items-center justify-center"
                            >
                              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Result */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-10"
            >
              {/* Full progress */}
              <div className="h-0.5 bg-gradient-to-r from-gold to-gold-light mb-8 rounded-full" />

              <div className="text-center mb-8">
                <p className="font-inter text-xs tracking-widest uppercase text-gold/70 mb-3">
                  Votre destination idéale
                </p>
                <div className="text-7xl mb-4">{resultDest?.emoji}</div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  {resultDest?.name}
                </h3>
                <p className="font-inter text-xs tracking-widest uppercase text-gray-500 mb-6">
                  {resultDest?.period}
                </p>
                <div
                  className="w-16 h-px mx-auto mb-6"
                  style={{ background: `linear-gradient(90deg, transparent, ${resultDest?.colors.primary}, transparent)` }}
                />
                <p className="font-body-serif text-lg text-gray-300 leading-relaxed italic max-w-xl mx-auto">
                  {personalizedMessages[result]}
                </p>
              </div>

              {/* Price */}
              <div
                className="rounded-xl p-4 mb-6 text-center"
                style={{
                  background: `${resultDest?.glowColor}`,
                  border: `1px solid ${resultDest?.colors.primary}30`,
                }}
              >
                <p className="font-inter text-xs text-gray-500 uppercase tracking-wider mb-1">
                  À partir de
                </p>
                <p className="font-display text-2xl font-bold" style={{ color: resultDest?.colors.primary }}>
                  {resultDest?.price}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    if (resultDest) onSelectDestination(resultDest)
                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex-1 btn-gold py-4 rounded-full font-display text-xs tracking-widest uppercase"
                >
                  <span>Découvrir cette destination</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="flex-1 btn-outline py-4 rounded-full font-display text-xs tracking-widest uppercase"
                >
                  Recommencer le quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
