import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Bienvenue chez TimeTravel Agency ! ✨ Je suis votre assistant virtuel. Je peux vous conseiller sur nos trois destinations — l'Égypte Ancienne, l'Empire Romain et le Japon Féodal — ainsi que sur les prix, tenues recommandées et niveaux de risque. Comment puis-je vous aider ?",
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)' }}>
        ⏳
      </div>
      <div className="chat-bubble-bot px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.slice(1), userMsg].map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const reply = data.reply || data.error || "Désolé, une erreur est survenue. Veuillez réessayer."
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Je suis momentanément indisponible. Pour toute question, n'hésitez pas à utiliser notre formulaire de contact ou à consulter directement nos pages de destinations. 🙏",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: open
            ? 'rgba(30,42,58,0.95)'
            : 'linear-gradient(135deg, #c9a84c, #e0c06a)',
          boxShadow: open
            ? '0 4px 30px rgba(0,0,0,0.5)'
            : '0 4px 30px rgba(201,168,76,0.4)',
          border: open ? '1px solid rgba(201,168,76,0.3)' : 'none',
        }}
        aria-label="Ouvrir le chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-void"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: 'rgba(8,11,20,0.97)',
              border: '1px solid rgba(30,42,58,0.8)',
              backdropFilter: 'blur(20px)',
              height: '480px',
              maxHeight: 'calc(100vh - 140px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(30,42,58,0.8)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                ⏳
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-white tracking-wide truncate">
                  Assistant TimeTravel
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-inter text-xs text-gray-500">En ligne</span>
                </div>
              </div>
              <button
                onClick={() => setMessages([INITIAL_MESSAGE])}
                className="text-gray-600 hover:text-gray-400 transition-colors"
                title="Réinitialiser la conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      ⏳
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 font-inter text-sm leading-relaxed ${
                      msg.role === 'user' ? 'chat-bubble-user text-gray-200' : 'chat-bubble-bot text-gray-300'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-end gap-2 px-3 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(30,42,58,0.8)' }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez vos questions sur les voyages temporels..."
                rows={1}
                disabled={loading}
                className="flex-1 bg-midnight/80 border border-slate/50 rounded-xl px-3 py-2.5 font-inter text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 resize-none transition-colors min-h-[42px] max-h-[100px]"
                style={{ scrollbarWidth: 'none' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40"
                style={{
                  background: input.trim() && !loading
                    ? 'linear-gradient(135deg, #c9a84c, #e0c06a)'
                    : 'rgba(30,42,58,0.6)',
                }}
              >
                <svg
                  className={`w-4 h-4 ${input.trim() && !loading ? 'text-void' : 'text-gray-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
