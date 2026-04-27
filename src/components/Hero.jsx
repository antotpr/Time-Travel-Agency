import { useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Stars } from '@react-three/drei'

function TemporalOrb() {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08
      meshRef.current.rotation.y = t * 0.12
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.15
      innerRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group>
      {/* Outer distorted sphere */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#c9a84c"
          attach="material"
          distort={0.45}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </Sphere>

      {/* Inner glowing core */}
      <Sphere ref={innerRef} args={[0.85, 32, 32]}>
        <MeshDistortMaterial
          color="#40bcd8"
          attach="material"
          distort={0.6}
          speed={2.5}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Bright core */}
      <Sphere args={[0.35, 16, 16]}>
        <meshStandardMaterial
          color="#e0c06a"
          emissive="#c9a84c"
          emissiveIntensity={2.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 8, 100]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.3, 0]}>
        <torusGeometry args={[2.3, 0.01, 8, 100]} />
        <meshStandardMaterial
          color="#40bcd8"
          emissive="#40bcd8"
          emissiveIntensity={1}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#c9a84c" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#40bcd8" />
      <Stars radius={80} depth={50} count={400} factor={3} saturation={0} fade speed={0.8} />
      <Suspense fallback={null}>
        <TemporalOrb />
      </Suspense>
    </>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Stars background */}
      <div className="stars" aria-hidden="true" />

      {/* Deep gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(15,22,35,0.8) 0%, #080b14 70%)',
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Radial glow behind orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(64,188,216,0.04) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="block w-8 h-px bg-gold/60" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/80">
              Agence Premium de Voyage Temporel
            </span>
            <span className="block w-8 h-px bg-gold/60" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
            style={{ textShadow: '0 0 80px rgba(201,168,76,0.2)' }}
          >
            <span className="gold-text">Voyagez</span>
            <br />
            <span className="text-white">au-delà du temps.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-body-serif text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed italic"
          >
            Découvrez des civilisations mythiques grâce à une expérience temporelle
            immersive, sécurisée et personnalisée.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => handleNav('#destinations')}
              className="btn-gold px-8 py-4 rounded-full text-sm tracking-widest uppercase"
            >
              <span>Explorer les destinations</span>
            </button>
            <button
              onClick={() => handleNav('#quiz')}
              className="btn-outline px-8 py-4 rounded-full text-sm tracking-widest uppercase"
            >
              Trouver mon époque idéale
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="font-inter text-xs tracking-widest uppercase text-gray-500">
              Défiler
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080b14, transparent)' }}
      />
    </section>
  )
}
