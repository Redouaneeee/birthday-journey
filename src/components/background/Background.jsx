import React from 'react'
import StarField from './StarField'
import Nebula from './Nebula'
import ShootingStar from './ShootingStar'
import ParticleSystem from './ParticleSystem'

const Background = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #1a0e38 0%, #0a0618 70%, #05020a 100%)'
      }}
    >
      <Nebula />
      <StarField />
      <ShootingStar />
      <ParticleSystem />
      
      {/* Animated glow orbs - purple galaxy feel */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(107, 63, 245, 0.15)',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(192, 132, 252, 0.1)',
          filter: 'blur(100px)',
          animation: 'float 25s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(244, 114, 182, 0.05)',
          filter: 'blur(120px)',
          animation: 'float 30s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}

export default Background