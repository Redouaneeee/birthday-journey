import { useEffect } from 'react'
import soundManager from '../utils/soundManager'

export const useSound = () => {
  useEffect(() => {
    // Initialize on first user interaction
    const initSound = () => {
      soundManager.init()
      // Remove listeners after init
      document.removeEventListener('click', initSound)
      document.removeEventListener('touchstart', initSound)
      document.removeEventListener('keydown', initSound)
    }
    
    // Initialize on first user interaction (required for Chrome autoplay)
    document.addEventListener('click', initSound)
    document.addEventListener('touchstart', initSound)
    document.addEventListener('keydown', initSound)
    
    return () => {
      document.removeEventListener('click', initSound)
      document.removeEventListener('touchstart', initSound)
      document.removeEventListener('keydown', initSound)
    }
  }, [])

  return soundManager
}

export default useSound