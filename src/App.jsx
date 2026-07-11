import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Background from './components/background/Background'
import GlowingCursor from './components/ui/GlowingCursor'
import SoundToggle from './components/ui/SoundToggle'
import Intro from './pages/Intro'
import Hub from './pages/Hub'
import BirthdayStation from './pages/BirthdayStation'
import SecretDoor from './pages/SecretDoor'
import Finale from './pages/Finale'

function App() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Background />
      <GlowingCursor />
      <SoundToggle />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/birthday-station" element={<BirthdayStation />} />
          <Route path="/secret-door" element={<SecretDoor />} />
          <Route path="/finale" element={<Finale />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App