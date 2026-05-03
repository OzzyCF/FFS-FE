'use client'

import { useState } from 'react'
import { rsvpToEvent, cancelRsvp } from '@/lib/eventActions'

export default function WatchPartyEventCard({ event, goingCount = 0, maybeCount = 0, userRsvp = null, isLoggedIn = false }) {
  const [localRsvp, setLocalRsvp] = useState(userRsvp)
  const [localGoing, setLocalGoing] = useState(goingCount)
  const [localMaybe, setLocalMaybe] = useState(maybeCount)
  const [loading, setLoading] = useState(false)

  async function handleRsvp(status) {
    if (!isLoggedIn) {
      document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    setLoading(true)

    const prev = localRsvp
    if (localRsvp === status) {
      // Cancel RSVP
      setLocalRsvp(null)
      if (status === 'going') setLocalGoing(c => c - 1)
      if (status === 'maybe') setLocalMaybe(c => c - 1)
      const result = await cancelRsvp(event.id)
      if (result.error) {
        setLocalRsvp(prev)
        if (status === 'going') setLocalGoing(c => c + 1)
        if (status === 'maybe') setLocalMaybe(c => c + 1)
      }
    } else {
      // New or changed RSVP
      if (prev === 'going') setLocalGoing(c => c - 1)
      if (prev === 'maybe') setLocalMaybe(c => c - 1)
      setLocalRsvp(status)
      if (status === 'going') setLocalGoing(c => c + 1)
      if (status === 'maybe') setLocalMaybe(c => c + 1)
      const result = await rsvpToEvent(event.id, status)
      if (result.error) {
        setLocalRsvp(prev)
        if (status === 'going') setLocalGoing(c => c + 1)
        if (status === 'maybe') setLocalMaybe(c => c + 1)
      }
    }

    setLoading(false)
  }

  if (!event) {
    return (
      <div
        className="rounded-glass border border-[var(--color-border)] relative overflow-hidden p-9"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          animation: 'fadeUp 0.7s 0.2s ease both',
        }}
      >
        <div className="absolute inset-0 rounded-glass pointer-events-none"
          style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
        <div
          className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-[22px] border text-[var(--color-green)]"
          style={{ background: 'rgba(0,196,125,0.1)', borderColor: 'rgba(0,196,125,0.22)' }}
        >
          Próximo evento
        </div>
        <div className="font-display font-black text-[28px] uppercase leading-[1.05] mb-3 tracking-[-0.5px] text-[var(--color-dim)]">
          Próximamente — ¡estamos organizando el próximo evento!
        </div>
      </div>
    )
  }

  const dateStr = new Date(event.event_date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
  const timeStr = new Date(event.event_date).toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  }) + 'h (hora Madrid)'

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden p-9"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        animation: 'fadeUp 0.7s 0.2s ease both',
      }}
    >
      {/* Inner highlight shimmer */}
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />

      {/* Badge */}
      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-[22px] border text-[var(--color-green)]"
        style={{ background: 'rgba(0,196,125,0.1)', borderColor: 'rgba(0,196,125,0.22)' }}
      >
        Próximo evento
      </div>

      {/* Title */}
      <div className="font-display font-black text-[32px] uppercase leading-[1.05] mb-3 tracking-[-0.5px]">
        {event.title}
      </div>

      {/* Meta */}
      <div className="text-[var(--color-dim)] text-[14px] leading-[1.7] mb-7 font-light">
        📍 {event.venue_name} · {event.venue_address}<br />
        📅 {dateStr} · {timeStr}
      </div>

      {/* RSVP */}
      {isLoggedIn ? (
        <div className="flex gap-[10px] mb-4">
          <button
            onClick={() => handleRsvp('going')}
            disabled={loading}
            className="px-[22px] py-[10px] rounded-[10px] font-semibold text-[13px] text-white border cursor-pointer tracking-[0.2px] transition-all duration-[180ms] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: localRsvp === 'going' ? 'rgba(0,196,125,0.2)' : '#00C47D',
              borderColor: localRsvp === 'going' ? '#00C47D' : 'transparent',
            }}
          >
            ✓&nbsp; Voy
          </button>
          <button
            onClick={() => handleRsvp('maybe')}
            disabled={loading}
            className="px-[22px] py-[10px] rounded-[10px] font-semibold text-[13px] text-white cursor-pointer tracking-[0.2px] transition-all duration-[180ms] border disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: localRsvp === 'maybe' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
              borderColor: localRsvp === 'maybe' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.16)',
            }}
          >
            ?&nbsp; Quizás
          </button>
        </div>
      ) : (
        <p className="text-[13px] mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Inicia sesión para confirmar asistencia
        </p>
      )}

      {/* Attendee count */}
      <div className="text-[13px] text-[var(--color-faint)]">
        {localGoing} confirmados · {localMaybe} quizás
      </div>
    </div>
  )
}
