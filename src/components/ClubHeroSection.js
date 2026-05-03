'use client'

import { useEffect, useRef, useState } from 'react'
import { LiquidButton } from '@/components/ui/LiquidGlassButton'
import { MapPin } from 'lucide-react'

export default function Hero({ raceDays = '—', memberCount = 0, eventCount = 0, isLoggedIn = false }) {
  const parallaxRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const images = [
    { src: '/images/drivers-26-facing-right.webp', pos: 'center top' },
    { src: '/images/4-cars-2026.webp',             pos: 'center center' },
    { src: '/images/vertical-cars-stack.jpg',      pos: 'center center' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % images.length)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * -0.15}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative z-[2]"
      style={{ minHeight: '88vh', overflow: 'hidden' }}
    >

      {/* ── Hero image — right half, diagonal left edge, full viewport width, desktop only */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          zIndex: 0,
          clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)',
        }}
      >
        <div
          ref={parallaxRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '150%', top: '-25%' }}
        >
          {images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: img.pos,
                opacity: i === activeIdx ? 1 : 0,
                transition: 'opacity 5s ease-in-out',
              }}
            />
          ))}
        </div>
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        {/* Left fade */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '220px',
          background: 'linear-gradient(to right, #06070A 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Text content — centered, max-width, z-index 10 */}
      <div
        className="flex items-center px-7 pt-[80px] md:pt-[100px] pb-[80px] max-w-[1180px] mx-auto"
        style={{ minHeight: '88vh' }}
      >
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-[15px] py-[5px] rounded-[100px] text-[var(--color-green)] text-[12px] font-semibold tracking-[2px] uppercase mb-9 border"
          style={{
            background: 'rgba(0,196,125,0.09)',
            borderColor: 'rgba(0,196,125,0.22)',
            animation: 'fadeUp 0.6s ease both',
          }}
        >
          <MapPin size={13} strokeWidth={2} /> Sevilla · Andalucía · España
        </div>

        {/* Title */}
        <h1
          className="font-display font-black uppercase mb-8 leading-[0.89] tracking-[-2px]"
          style={{
            fontSize: 'clamp(76px, 13vw, 148px)',
            animation: 'fadeUp 0.7s 0.08s ease both',
          }}
        >
          <span
            className="block text-white"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.9), -1px -1px 0 rgba(0,0,0,0.6)' }}
          >
            FORMULA
          </span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(160deg, #00ff9d 0%, #00C47D 28%, #00ffaa 48%, #00a366 62%, #00e68a 78%, #00C47D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 32px rgba(0,196,125,0.45)) drop-shadow(1px 1px 0 rgba(0,0,0,0.95))',
            }}
          >
            FAN
          </span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(160deg, #c8932a 0%, #f0c040 18%, #ffe066 32%, #c8841a 46%, #ffd54f 58%, #e6a820 70%, #fff0a0 80%, #c88020 90%, #f0c040 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(212,168,67,0.55)) drop-shadow(1px 1px 0 rgba(0,0,0,0.95))',
            }}
          >
            SEVILLA
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[17px] text-[var(--color-dim)] leading-[1.65] max-w-[500px] font-light mb-12"
          style={{ animation: 'fadeUp 0.7s 0.16s ease both' }}
        >
          La comunidad de motorsport de Sevilla. Seguimos cada carrera juntos, organizamos quedadas y vivimos la Fórmula 1 como se merece — con pasión andaluza.
        </p>

        {/* CTAs */}
        <div
          className="flex gap-[14px] flex-wrap mb-[60px]"
          style={{ animation: 'fadeUp 0.7s 0.24s ease both' }}
        >
          {!isLoggedIn && (
            <LiquidButton
              size="xl"
              onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white font-semibold tracking-[0.2px]"
            >
              Únete al club →
            </LiquidButton>
          )}
          <LiquidButton
            size="xl"
            onClick={() => document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-medium tracking-[0.2px]"
          >
            Ver próximos eventos
          </LiquidButton>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-y-4"
          style={{ animation: 'fadeUp 0.7s 0.32s ease both' }}
        >
          {[
            { value: memberCount, label: 'Miembros' },
            { value: eventCount,  label: 'Eventos' },
            { value: raceDays,    label: 'Días para la próxima carrera' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="pr-9 mr-9 border-r border-[var(--color-border)] last:border-r-0 last:mr-0 last:pr-0"
            >
              <div className="font-display font-extrabold text-[26px] md:text-[32px] leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] text-[var(--color-faint)] uppercase tracking-[1.2px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </section>
  )
}
