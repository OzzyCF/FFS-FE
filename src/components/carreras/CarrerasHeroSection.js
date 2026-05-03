'use client'

import { useState, useEffect, Fragment } from 'react'
import { getFlagUrl } from '@/lib/countryFlags'

function calcCountdown(target) {
  const diff = new Date(target) - Date.now()
  if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00' }
  const pad = n => String(n).padStart(2, '0')
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  }
}

export default function CarrerasHeroSection({ nextRace }) {
  const target = nextRace.time
    ? `${nextRace.date}T${nextRace.time}`
    : `${nextRace.date}T23:59:59Z`

  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' })

  useEffect(() => {
    const tick = () => setCountdown(calcCountdown(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const formattedDate = new Date(nextRace.date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

  const madridTime = nextRace.time
    ? new Date(`${nextRace.date}T${nextRace.time}`).toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid', hour12: false,
      }) + 'h (hora Madrid)'
    : null

  const flagUrl = getFlagUrl(nextRace.country, 80)

  const units = [
    { value: countdown.d, label: 'Días' },
    { value: countdown.h, label: 'Horas' },
    { value: countdown.m, label: 'Min' },
    { value: countdown.s, label: 'Seg' },
  ]

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden flex flex-col gap-6 px-5 py-7 md:grid md:grid-cols-[1fr_auto] md:gap-12 md:items-center md:px-[52px] md:py-[48px]"
      style={{
        background: 'rgba(6,7,10,0.42)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        animation: 'fadeUp 0.7s 0.1s ease both',
      }}
    >
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
      <div className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', borderRadius: '0 0 2px 2px' }} />

      {/* Race info */}
      <div>
        <div
          className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-5 border text-[var(--color-green)]"
          style={{ background: 'rgba(0,196,125,0.1)', borderColor: 'rgba(0,196,125,0.22)' }}
        >
          Próxima carrera · Ronda {nextRace.round}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={flagUrl}
            alt={nextRace.country}
            className="rounded-[4px]"
            style={{ height: 36, width: 'auto', objectFit: 'cover' }}
          />
          <span className="text-[12px] text-[var(--color-faint)] uppercase tracking-[2px] font-medium">
            {nextRace.circuit} · {nextRace.locality}, {nextRace.country}
          </span>
        </div>

        <div className="font-display font-black text-[52px] uppercase leading-[0.93] mb-3 tracking-[-1px]">
          {nextRace.name}
        </div>

        <div className="text-[var(--color-dim)] text-[14px]">
          {formattedDate}{madridTime ? ` · ${madridTime}` : ''}
        </div>
      </div>

      {/* Countdown */}
      <div className="flex items-start gap-[6px]">
        {units.map((unit, i) => (
          <Fragment key={unit.label}>
            <div className="flex flex-col items-center gap-[7px]">
              <div
                className="font-display font-black text-[40px] md:text-[56px] leading-none min-w-[52px] md:min-w-[74px] text-center"
                style={{
                  background: 'linear-gradient(160deg, #00C47D 0%, #D4A843 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {unit.value}
              </div>
              <div className="text-[10px] text-[var(--color-faint)] uppercase tracking-[1.5px]">
                {unit.label}
              </div>
            </div>
            {i < 3 && (
              <span className="font-display text-[30px] md:text-[44px] text-[var(--color-faint)] font-light pt-[6px]">:</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
