'use client'

import { useState } from 'react'
import Link from 'next/link'
import { rsvpToEvent, cancelRsvp } from '@/lib/eventActions'
import { LiquidButton } from '@/components/ui/LiquidGlassButton'
import { MapPin, Calendar, Check, HelpCircle } from 'lucide-react'

export default function EventosFeaturedCard({ event, goingCount = 0, maybeCount = 0, userRsvp = null, isLoggedIn = false }) {
  const [localRsvp, setLocalRsvp]   = useState(userRsvp)
  const [localGoing, setLocalGoing] = useState(goingCount)
  const [localMaybe, setLocalMaybe] = useState(maybeCount)
  const [loading, setLoading]       = useState(false)

  async function handleRsvp(status) {
    if (!isLoggedIn) return
    setLoading(true)
    const prev = localRsvp

    if (localRsvp === status) {
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

  const dateStr = new Date(event.event_date).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
  const timeStr = new Date(event.event_date).toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  }) + 'h (hora Madrid)'

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.65)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '48px 52px',
        animation: 'fadeUp 0.7s 0.1s ease both',
      }}
    >
      {/* Inner shimmer */}
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />

      {/* Green top bar */}
      <div className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00C47D, transparent)', borderRadius: '0 0 2px 2px' }} />

      {/* Badge */}
      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-6 border text-[var(--color-green)]"
        style={{ background: 'rgba(0,196,125,0.1)', borderColor: 'rgba(0,196,125,0.22)' }}
      >
        Próximo evento
      </div>

      {/* Title */}
      <div className="font-display font-black uppercase leading-[0.95] mb-5 tracking-[-1px]"
        style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}>
        {event.title}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-[7px] mb-6">
        <span className="flex items-center gap-[9px] text-[var(--color-dim)] text-[15px] font-light">
          <MapPin size={15} className="flex-shrink-0 text-[var(--color-green)]" />
          {event.venue_name}{event.venue_address ? ` · ${event.venue_address}` : ''}
        </span>
        <span className="flex items-center gap-[9px] text-[var(--color-dim)] text-[15px] font-light">
          <Calendar size={15} className="flex-shrink-0 text-[var(--color-green)]" />
          {dateStr} · {timeStr}
        </span>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-[var(--color-dim)] text-[15px] leading-[1.7] font-light max-w-[640px] mb-8">
          {event.description}
        </p>
      )}

      {/* RSVP */}
      {isLoggedIn ? (
        <div className="flex items-center gap-3 flex-wrap">
          <LiquidButton
            size="lg"
            tint={localRsvp === 'going' ? 'green' : undefined}
            onClick={() => handleRsvp('going')}
            disabled={loading}
            className="text-white font-semibold tracking-[0.2px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={14} strokeWidth={2.5} /> Voy
          </LiquidButton>
          <LiquidButton
            size="lg"
            tint={localRsvp === 'maybe' ? 'green' : undefined}
            onClick={() => handleRsvp('maybe')}
            disabled={loading}
            className="text-white font-semibold tracking-[0.2px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HelpCircle size={14} strokeWidth={2.5} /> Quizás
          </LiquidButton>
          <span className="text-[13px] text-[var(--color-faint)] ml-1">
            {localGoing} confirmados · {localMaybe} quizás
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Inicia sesión para confirmar asistencia
          </p>
          <Link
            href="/#unete"
            className="text-[13px] font-semibold px-5 py-[9px] rounded-full border transition-colors duration-200"
            style={{
              borderColor: 'rgba(0,196,125,0.35)',
              color: 'rgba(0,196,125,0.85)',
            }}
          >
            Únete al club →
          </Link>
        </div>
      )}
    </div>
  )
}
