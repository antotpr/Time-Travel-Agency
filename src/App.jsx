import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import DestinationDetail from './components/DestinationDetail'
import Quiz from './components/Quiz'
import Booking from './components/Booking'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState(null)

  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest)
    setTimeout(() => {
      document.getElementById('destination-detail')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleCloseDetail = () => {
    setSelectedDestination(null)
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Noise overlay for premium texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Header />

      <main>
        <section id="accueil">
          <Hero />
        </section>

        <About />

        <section id="destinations">
          <Destinations onSelect={handleSelectDestination} selected={selectedDestination} />
        </section>

        {selectedDestination && (
          <div id="destination-detail">
            <DestinationDetail destination={selectedDestination} onClose={handleCloseDetail} />
          </div>
        )}

        <section id="quiz">
          <Quiz onSelectDestination={handleSelectDestination} />
        </section>

        <section id="reservation">
          <Booking selectedDestination={selectedDestination} />
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
