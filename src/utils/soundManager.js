class SoundManager {
  constructor() {
    this.audioContext = null
    this.isMuted = false
    this.isInitialized = false
    this.ambientGain = null
    this.ambientOscillators = []
    this.lofiGain = null
    this.lofiSource = null
    this.currentMusicType = 'happy' // 'happy', 'mysterious', 'intro'
    this.musicGain = null
  }

  init() {
    if (this.isInitialized) return
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }
      
      this.isInitialized = true
      console.log('🎵 Sound system initialized!')
      
      // Start with intro music
      this.startIntroMusic()
    } catch (e) {
      console.log('Sound system error:', e)
    }
  }

  // INTRO MUSIC - Soft and dreamy
  startIntroMusic() {
    this.stopAll()
    this.currentMusicType = 'intro'
    
    try {
      if (!this.audioContext) return

      this.musicGain = this.audioContext.createGain()
      this.musicGain.gain.value = 0.12
      this.musicGain.connect(this.audioContext.destination)

      // Gentle piano-like arpeggios
      const notes = [523, 587, 659, 784, 880, 987, 1047]
      let time = 0
      
      notes.forEach((freq, index) => {
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()
        
        osc.type = 'sine'
        osc.frequency.value = freq
        
        const startTime = this.audioContext.currentTime + time
        const endTime = startTime + 0.6
        
        gain.gain.setValueAtTime(0.01, startTime)
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.1)
        gain.gain.linearRampToValueAtTime(0.01, endTime)
        
        osc.connect(gain)
        gain.connect(this.musicGain)
        
        osc.start(startTime)
        osc.stop(endTime)
        
        this.ambientOscillators.push({ osc, gain })
        time += 0.4
      })

      console.log('🎵 Intro music started!')
    } catch (e) {
      console.log('Intro music error:', e)
    }
  }

  // BIRTHDAY STATION MUSIC - Happy and uplifting
  startHappyMusic() {
    this.stopAll()
    this.currentMusicType = 'happy'
    
    try {
      if (!this.audioContext) return

      this.musicGain = this.audioContext.createGain()
      this.musicGain.gain.value = 0.15
      this.musicGain.connect(this.audioContext.destination)

      // Happy major chord progression
      const progressions = [
        { notes: [261.63, 329.63, 392.00], duration: 1.5 }, // C
        { notes: [293.66, 369.99, 440.00], duration: 1.5 }, // D
        { notes: [329.63, 392.00, 493.88], duration: 1.5 }, // E
        { notes: [349.23, 440.00, 523.25], duration: 1.5 }, // F
        { notes: [392.00, 493.88, 587.33], duration: 1.5 }, // G
        { notes: [440.00, 523.25, 659.25], duration: 1.5 }, // A
        { notes: [493.88, 587.33, 739.99], duration: 1.5 }, // B
        { notes: [523.25, 659.25, 783.99], duration: 2.0 }, // C
      ]

      let time = 0
      progressions.forEach((prog) => {
        prog.notes.forEach((freq, idx) => {
          const osc = this.audioContext.createOscillator()
          const gain = this.audioContext.createGain()
          
          osc.type = 'sine'
          osc.frequency.value = freq
          
          // Brighter sound for happy music
          osc.type = idx === 0 ? 'sine' : 'sine'
          
          const startTime = this.audioContext.currentTime + time + (idx * 0.1)
          const endTime = startTime + prog.duration * 0.7
          
          gain.gain.setValueAtTime(0.01, startTime)
          gain.gain.linearRampToValueAtTime(0.04, startTime + 0.1)
          gain.gain.linearRampToValueAtTime(0.01, endTime)
          
          osc.connect(gain)
          gain.connect(this.musicGain)
          
          osc.start(startTime)
          osc.stop(endTime + 0.1)
          
          this.ambientOscillators.push({ osc, gain })
        })
        time += prog.duration
      })

      // Add happy rhythmic element
      this.addHappyRhythm()

      console.log('🎵 Happy birthday music started!')
    } catch (e) {
      console.log('Happy music error:', e)
    }
  }

  addHappyRhythm() {
    try {
      if (!this.audioContext) return
      
      // Soft rhythmic tapping
      for (let i = 0; i < 16; i++) {
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()
        
        osc.type = 'sine'
        osc.frequency.value = 150 + Math.random() * 50
        
        const startTime = this.audioContext.currentTime + i * 0.3
        const endTime = startTime + 0.05
        
        gain.gain.setValueAtTime(0.01, startTime)
        gain.gain.linearRampToValueAtTime(0.02, startTime + 0.02)
        gain.gain.linearRampToValueAtTime(0.001, endTime)
        
        osc.connect(gain)
        gain.connect(this.musicGain)
        
        osc.start(startTime)
        osc.stop(endTime)
        
        this.ambientOscillators.push({ osc, gain })
      }
    } catch (e) {}
  }

  // SECRET DOOR MUSIC - Mysterious and magical
  startMysteriousMusic() {
    this.stopAll()
    this.currentMusicType = 'mysterious'
    
    try {
      if (!this.audioContext) return

      this.musicGain = this.audioContext.createGain()
      this.musicGain.gain.value = 0.12
      this.musicGain.connect(this.audioContext.destination)

      // Mysterious minor chords with echoes
      const progressions = [
        { notes: [261.63, 311.13, 369.99], duration: 2 }, // Cm
        { notes: [293.66, 349.23, 415.30], duration: 2 }, // Dm
        { notes: [329.63, 392.00, 466.16], duration: 2 }, // Em
        { notes: [349.23, 415.30, 493.88], duration: 2 }, // Fm
        { notes: [261.63, 311.13, 369.99], duration: 3 }, // Cm
      ]

      let time = 0
      progressions.forEach((prog) => {
        prog.notes.forEach((freq, idx) => {
          const osc = this.audioContext.createOscillator()
          const gain = this.audioContext.createGain()
          
          // Use a mix of waveforms for mysterious feel
          osc.type = idx === 0 ? 'sine' : idx === 1 ? 'sine' : 'triangle'
          osc.frequency.value = freq
          
          // Add slight detune for eerie feel
          osc.detune.value = (Math.random() - 0.5) * 5
          
          const startTime = this.audioContext.currentTime + time + (idx * 0.15)
          const endTime = startTime + prog.duration * 0.8
          
          gain.gain.setValueAtTime(0.01, startTime)
          gain.gain.linearRampToValueAtTime(0.035, startTime + 0.3)
          gain.gain.linearRampToValueAtTime(0.01, endTime)
          
          osc.connect(gain)
          gain.connect(this.musicGain)
          
          osc.start(startTime)
          osc.stop(endTime + 0.2)
          
          this.ambientOscillators.push({ osc, gain })
        })
        time += prog.duration
      })

      // Add mysterious wind-like pad
      this.addMysteriousPad()

      console.log('🎵 Mysterious music started!')
    } catch (e) {
      console.log('Mysterious music error:', e)
    }
  }

  addMysteriousPad() {
    try {
      if (!this.audioContext) return
      
      const bufferSize = this.audioContext.sampleRate * 6
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)
      
      for (let i = 0; i < bufferSize; i++) {
        const t = i / this.audioContext.sampleRate
        const envelope = Math.sin(t * 0.05) * 0.5 + 0.5
        const value = 
          Math.sin(t * 110 * 2 * Math.PI + t * 0.02) * 0.3 +
          Math.sin(t * 165 * 2 * Math.PI + t * 0.04) * 0.2 +
          Math.sin(t * 220 * 2 * Math.PI + t * 0.06) * 0.15
        data[i] = value * envelope * 0.03
      }
      
      const source = this.audioContext.createBufferSource()
      source.buffer = buffer
      source.loop = true
      
      const gain = this.audioContext.createGain()
      gain.gain.value = 0.05
      
      source.connect(gain)
      gain.connect(this.musicGain)
      
      source.start()
      this.lofiSource = source
    } catch (e) {}
  }

  // Play shooting star sound
  playShootingStar() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const gainNode = ctx.createGain()
      gainNode.gain.value = 0.08
      gainNode.connect(ctx.destination)
      
      const osc1 = ctx.createOscillator()
      osc1.frequency.value = 2000
      osc1.type = 'sine'
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.3)
      
      const osc2 = ctx.createOscillator()
      osc2.frequency.value = 2500
      osc2.type = 'sine'
      osc2.frequency.exponentialRampToValueAtTime(1000, now + 0.25)
      
      const wobble = ctx.createOscillator()
      wobble.frequency.value = 6
      const wobbleGain = ctx.createGain()
      wobbleGain.gain.value = 50
      wobble.connect(wobbleGain)
      wobbleGain.connect(osc1.frequency)
      wobbleGain.connect(osc2.frequency)
      wobble.start()
      wobble.stop(now + 0.3)
      
      osc1.connect(gainNode)
      osc2.connect(gainNode)
      
      osc1.start(now)
      osc1.stop(now + 0.3)
      osc2.start(now + 0.02)
      osc2.stop(now + 0.28)
      
      gainNode.gain.setValueAtTime(0.08, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      
      setTimeout(() => {
        try {
          osc1.disconnect()
          osc2.disconnect()
          wobble.disconnect()
          wobbleGain.disconnect()
          gainNode.disconnect()
        } catch (e) {}
      }, 400)
      
    } catch (e) {}
  }

  // Play chime sound
  playChime() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const notes = [523, 659, 784, 1047]
      
      notes.forEach((freq, index) => {
        const gain = ctx.createGain()
        gain.gain.value = 0.06
        gain.connect(ctx.destination)
        
        const osc = ctx.createOscillator()
        osc.frequency.value = freq
        osc.type = 'sine'
        
        const vibrato = ctx.createOscillator()
        vibrato.frequency.value = 5
        const vibratoGain = ctx.createGain()
        vibratoGain.gain.value = 15
        vibrato.connect(vibratoGain)
        vibratoGain.connect(osc.frequency)
        vibrato.start(now + index * 0.08)
        vibrato.stop(now + index * 0.08 + 0.2)
        
        osc.connect(gain)
        osc.start(now + index * 0.08)
        osc.stop(now + index * 0.08 + 0.2)
        
        gain.gain.setValueAtTime(0.06, now + index * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.2)
        
        setTimeout(() => {
          try {
            osc.disconnect()
            vibrato.disconnect()
            vibratoGain.disconnect()
            gain.disconnect()
          } catch (e) {}
        }, (index * 0.08 + 0.3) * 1000)
      })
    } catch (e) {}
  }

  // Play click sound
  playClick() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const gainNode = ctx.createGain()
      gainNode.gain.value = 0.05
      gainNode.connect(ctx.destination)
      
      const osc = ctx.createOscillator()
      osc.frequency.value = 800
      osc.type = 'sine'
      
      osc.connect(gainNode)
      osc.start(now)
      osc.stop(now + 0.02)
      
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
      
      setTimeout(() => {
        try {
          osc.disconnect()
          gainNode.disconnect()
        } catch (e) {}
      }, 50)
    } catch (e) {}
  }

  // Play success sound
  playSuccess() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const notes = [523, 659, 784]
      
      notes.forEach((freq, index) => {
        const gain = ctx.createGain()
        gain.gain.value = 0.08
        gain.connect(ctx.destination)
        
        const osc = ctx.createOscillator()
        osc.frequency.value = freq
        osc.type = 'sine'
        
        osc.connect(gain)
        osc.start(now + index * 0.08)
        osc.stop(now + index * 0.08 + 0.15)
        
        gain.gain.setValueAtTime(0.08, now + index * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.15)
        
        setTimeout(() => {
          try {
            osc.disconnect()
            gain.disconnect()
          } catch (e) {}
        }, (index * 0.08 + 0.2) * 1000)
      })
    } catch (e) {}
  }

  // Play celebration sound
  playCelebration() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const notes = [523, 587, 659, 784, 880, 1047]
      
      notes.forEach((freq, index) => {
        const gain = ctx.createGain()
        gain.gain.value = 0.07
        gain.connect(ctx.destination)
        
        const osc = ctx.createOscillator()
        osc.frequency.value = freq
        osc.type = 'sine'
        
        osc.connect(gain)
        osc.start(now + index * 0.06)
        osc.stop(now + index * 0.06 + 0.12)
        
        gain.gain.setValueAtTime(0.07, now + index * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.12)
        
        setTimeout(() => {
          try {
            osc.disconnect()
            gain.disconnect()
          } catch (e) {}
        }, (index * 0.06 + 0.2) * 1000)
      })
    } catch (e) {}
  }

  // Play door open sound
  playDoorOpen() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const gainNode = ctx.createGain()
      gainNode.gain.value = 0.06
      gainNode.connect(ctx.destination)
      
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = 150
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.4)
      
      osc.connect(gainNode)
      osc.start(now)
      osc.stop(now + 0.4)
      
      gainNode.gain.setValueAtTime(0.06, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      
      setTimeout(() => {
        try {
          osc.disconnect()
          gainNode.disconnect()
        } catch (e) {}
      }, 500)
    } catch (e) {}
  }

  // Play blow sound
  playBlow() {
    if (this.isMuted) return
    this.resumeContext()
    
    try {
      if (!this.audioContext) return
      
      const ctx = this.audioContext
      const now = ctx.currentTime
      
      const gainNode = ctx.createGain()
      gainNode.gain.value = 0.03
      gainNode.connect(ctx.destination)
      
      const bufferSize = ctx.sampleRate * 0.3
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      
      for (let i = 0; i < bufferSize; i++) {
        const t = i / ctx.sampleRate
        const envelope = Math.exp(-t * 10)
        data[i] = (Math.random() * 2 - 1) * envelope * 0.3
      }
      
      const source = ctx.createBufferSource()
      source.buffer = buffer
      
      source.connect(gainNode)
      source.start(now)
      
      gainNode.gain.setValueAtTime(0.03, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      
      setTimeout(() => {
        try {
          source.disconnect()
          gainNode.disconnect()
        } catch (e) {}
      }, 400)
    } catch (e) {}
  }

  resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.musicGain) {
      this.musicGain.gain.value = this.isMuted ? 0 : 0.15
    }
    return this.isMuted
  }

  getMuteStatus() {
    return this.isMuted
  }

  stopAll() {
    if (this.ambientOscillators) {
      this.ambientOscillators.forEach(({ osc, gain }) => {
        try {
          osc.stop()
          osc.disconnect()
          gain.disconnect()
        } catch (e) {}
      })
      this.ambientOscillators = []
    }
    if (this.lofiSource) {
      try {
        this.lofiSource.stop()
        this.lofiSource.disconnect()
      } catch (e) {}
      this.lofiSource = null
    }
    if (this.musicGain) {
      try {
        this.musicGain.disconnect()
      } catch (e) {}
      this.musicGain = null
    }
  }
}

const soundManager = new SoundManager()
export default soundManager