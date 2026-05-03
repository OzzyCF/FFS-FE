'use client'

import { useState } from 'react'
import Link from 'next/link'
import { rsvpToEvent, cancelRsvp } from '@/lib/eventActions'
import { LiquidButton } from '@/components/ui/LiquidGlassButton'
import { MapPin, Calendar, Check, HelpCircle } from 'lucide-react'

export default function EventosListCard({ event, goingCount = 0, maybeCount = 0, userRsvp = null, isLoggedIn = false, animDelay = 0.2 }) {
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
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
  const timeStr = new Date(event.event_date).toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  }) + 'h'

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.55)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '28px 36px',
        animation: `fadeUp 0.7s ${animDelay}s ease both`,
      }}
    >
      {/* Inner shimmer */}
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div className="flex items-center justify-between gap-6 flex-wrap">

        {/* Info */}
        <div className="flex flex-col gap-[6px] min-w-0">
          <div className="font-display font-black text-[24px] uppercase leading-none tracking-[-0.3px] truncate">
            {event.title}
          </div>
          <div className="flex items-center gap-[7px] text-[var(--color-dim)] text-[13px] font-light">
            <MapPin size={12} className="flex-shrink-0" />
            {event.venue_name}
          </div>
          <div className="flex items-center gap-[7px] text-[var(--color-faint)] text-[13px] font-light">
            <Calendar size={12} className="flex-shrink-0" />
            {dateStr} · {timeStr}
          </div>
        </div>

        {/* Right side — count + buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-[12px] text-[var(--color-faint)] whitespace-nowrap">
            {localGoing} van · {localMaybe} quizás
          </span>

          {isLoggedIn ? (
            <div className="flex gap-2">
              <LiquidButton
                size="sm"
                tint={localRsvp === 'going' ? 'green' : undefined}
                onClick={() => handleRsvp('going')}
                disabled={loading}
                className="text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={12} strokeWidth={2.5} /> Voy
              </LiquidButton>
              <LiquidButton
                size="sm"
                tint={localRsvp === 'maybe' ? 'green' : undefined}
                onClick={() => handleRsvp('maybe')}
                disabled={loading}
                className="text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HelpCircle size={12} strokeWidth={2.5} /> Quizás
              </LiquidButton>
            </div>
          ) : (
            <Link
              href="/#unete"
              className="text-[12px] font-semibold px-4 py-[7px] rounded-full border transition-colors duration-200 whitespace-nowrap"
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
