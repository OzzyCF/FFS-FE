'use client'

import { useState, useEffect, Fragment } from 'react'

const FLAG_MAP = {
  'Australia': '🇦🇺', 'China': '🇨🇳', 'Japan': '🇯🇵',
  'Bahrain': '🇧🇭', 'Saudi Arabia': '🇸🇦',
  'United States': '🇺🇸', 'USA': '🇺🇸',
  'Italy': '🇮🇹', 'Monaco': '🇲🇨', 'Canada': '🇨🇦',
  'Spain': '🇪🇸', 'Austria': '🇦🇹',
  'United Kingdom': '🇬🇧', 'UK': '🇬🇧',
  'Hungary': '🇭🇺', 'Belgium': '🇧🇪', 'Netherlands': '🇳🇱',
  'Singapore': '🇸🇬', 'Azerbaijan': '🇦🇿',
  'Mexico': '🇲🇽', 'Brazil': '🇧🇷',
  'UAE': '🇦🇪', 'Abu Dhabi': '🇦🇪', 'Qatar': '🇶🇦',
}

function raceTarget(date, time) {
  return time ? `${date}T${time}` : `${date}T00:00:00Z`
}

function calcCountdown(target) {
  const diff = new Date(target) - Date.now()
  if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00' }
  const pad = (n) => String(n).padStart(2, '0')
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  }
}

const SESSION_MAP = {
  'Race':               'GRAN PREMIO',
  'Qualifying':         'CLASIFICACIÓN',
  'Practice 1':         'PRÁCTICA 1',
  'Practice 2':         'PRÁCTICA 2',
  'Practice 3':         'PRÁCTICA 3',
  'Sprint':             'SPRINT',
  'Sprint Qualifying':  'CLASIFICACIÓN SPRINT',
}

function findNextSession(sessions) {
  if (!Array.isArray(sessions) || !sessions.length) return null
  const now = Date.now()
  return sessions.find((s) => new Date(s.date_start) > now) ?? null
}

function formatSpainTime(dateStr, timeStr) {
  if (!timeStr) return null
  const utc = new Date(`${dateStr}T${timeStr}`)
  return utc.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
    hour12: false,
  }) + 'h (hora Madrid)'
}

export default function RaceCard({ race }) {
  const raceFallback = raceTarget(race.date, race.time)
  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' })
  const [activeSession, setActiveSession] = useState(null)

  useEffect(() => {
    function tick() {
      const next = findNextSession(race.sessions)
      setActiveSession(next)
      setCountdown(calcCountdown(next ? next.date_start : raceFallback))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [race.sessions, raceFallback])

  const flag = FLAG_MAP[race.country] ?? '🏁'
  const formattedDate = new Date(race.date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
  const spainTime = formatSpainTime(race.date, race.time)
  const dateDisplay = spainTime ? `${formattedDate} · ${spainTime}` : formattedDate

  const units = [
    { value: countdown.d, label: 'Días' },
    { value: countdown.h, label: 'Horas' },
    { value: countdown.m, label: 'Min' },
    { value: countdown.s, label: 'Seg' },
  ]

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '44px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '48px',
        alignItems: 'center',
        animation: 'fadeUp 0.7s 0.1s ease both',
      }}
    >
      {/* Inner highlight shimmer */}
      <div
        className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
      />

      {/* Race info */}
      <div>
        <div className="flex items-center gap-[14px] mb-[14px]">
          <span className="text-[30px]">{flag}</span>
          <span className="text-[12px] text-[var(--color-faint)] uppercase tracking-[2px] font-medium">
            {race.circuit} · {race.country}
          </span>
        </div>
        <div className="font-display font-black text-[46px] uppercase leading-[0.95] mb-[10px] tracking-[-1px]">
          {race.name}
        </div>
        <div className="text-[var(--color-dim)] text-[14px]">
          {dateDisplay}
        </div>
      </div>

      {/* Countdown */}
      <div className="flex flex-col items-end gap-3">
        {/* Session badge */}
        <div
          className="px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] border"
          style={{
            background: activeSession ? 'rgba(0,196,125,0.1)' : 'rgba(255,255,255,0.05)',
            borderColor: activeSession ? 'rgba(0,196,125,0.22)' : 'rgba(255,255,255,0.09)',
            color: activeSession ? '#00C47D' : 'rgba(255,255,255,0.26)',
          }}
        >
          {activeSession
            ? (SESSION_MAP[activeSession.name] ?? activeSession.name.toUpperCase())
            : 'GRAN PREMIO'}
        </div>
        <div className="flex items-start gap-[6px]">
        {units.map((unit, i) => (
          <Fragment key={unit.label}>
            <div className="flex flex-col items-center gap-[7px]">
              <div
                className="font-display font-black text-[56px] leading-none min-w-[74px] text-center"
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
              <span className="font-display text-[44px] text-[var(--color-faint)] font-light pt-[6px]">
                :
              </span>
            )}
          </Fragment>
        ))}
        </div>
      </div>
    </div>
  )
}
