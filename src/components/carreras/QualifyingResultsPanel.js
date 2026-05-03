'use client'

import { useState, useEffect } from 'react'

function toSeconds(str) {
  if (!str) return null
  const [min, rest] = str.split(':')
  return parseFloat(min) * 60 + parseFloat(rest)
}

function formatGap(poleSeconds, driverSeconds) {
  if (poleSeconds === null || driverSeconds === null) return null
  const diff = driverSeconds - poleSeconds
  if (diff <= 0) return null
  return `+${diff.toFixed(3)}`
}

function QColRow({ pos, code, team, time, eliminated, isPole, gap }) {
  return (
    <div
      className="py-[6px] px-[8px] rounded-[5px]"
      style={{
        background: eliminated ? 'rgba(255,50,50,0.05)' : 'transparent',
        border: eliminated ? '1px solid rgba(255,50,50,0.1)' : '1px solid transparent',
        marginBottom: 2,
      }}
    >
      <div className="flex items-center gap-[6px]">
        <span
          className="text-[10px] font-semibold min-w-[18px] flex-shrink-0 tabular-nums"
          style={{ color: isPole ? 'var(--color-gold)' : eliminated ? 'rgba(255,100,100,0.4)' : 'rgba(255,255,255,0.2)' }}
        >
          {pos}
        </span>
        <span
          className="font-[family:var(--font-stack)] font-bold text-[13px] flex-shrink-0 tracking-[1.5px] uppercase"
          style={{ color: eliminated ? 'rgba(255,150,150,0.75)' : isPole ? 'var(--color-gold)' : 'white' }}
        >
          {code}
        </span>
        <span className="flex-1" />
        {gap && (
          <span className="text-[10px] tabular-nums flex-shrink-0" style={{ color: 'rgba(255,255,255,0.32)' }}>
            {gap}
          </span>
        )}
        {isPole && (
          <span
            className="text-[7px] font-bold uppercase tracking-[1px] px-[5px] py-[1px] rounded-full flex-shrink-0"
            style={{ color: 'var(--color-gold)', background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.28)' }}
          >
            POLE
          </span>
        )}
        {eliminated && (
          <span
            className="text-[7px] font-bold uppercase tracking-[0.8px] px-[5px] py-[1px] rounded-full flex-shrink-0"
            style={{ color: 'rgba(255,100,100,0.85)', background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.2)' }}
          >
            ELIMINADO
          </span>
        )}
        <span
          className="text-[13px] tabular-nums flex-shrink-0"
          style={{ color: isPole ? 'var(--color-gold)' : eliminated ? 'rgba(255,130,130,0.6)' : 'rgba(255,255,255,0.55)' }}
        >
          {time || '—'}
        </span>
      </div>
      <div className="flex items-center mt-[1px]" style={{ paddingLeft: 24 }}>
        <span className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.22)' }}>
          {team}
        </span>
      </div>
    </div>
  )
}

function QColHeader({ title, subtitle, color = 'rgba(255,255,255,0.9)' }) {
  return (
    <div className="mb-4">
      <div className="font-display font-black leading-none" style={{ fontSize: 52, color }}>
        {title}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[2px] mt-[5px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
        {subtitle}
      </div>
    </div>
  )
}

const GLASS = {
  background: 'rgba(6,7,10,0.42)',
  backdropFilter: 'blur(36px) saturate(200%)',
  WebkitBackdropFilter: 'blur(36px) saturate(200%)',
}

const TAB_META = {
  Q1: { subtitle: 'CLASIFICACIÓN · 22 PILOTOS',    color: 'rgba(255,255,255,0.9)' },
  Q2: { subtitle: 'CLASIFICACIÓN · 16 PILOTOS',    color: 'rgba(255,255,255,0.9)' },
  Q3: { subtitle: 'SHOOTOUT FINAL · 10 PILOTOS',   color: 'var(--color-gold)' },
}

export default function QualifyingResultsPanel({ round }) {
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('Q1')

  useEffect(() => {
    fetch(`https://api.jolpi.ca/ergast/f1/2026/${round}/qualifying.json`)
      .then(r => r.ok ? r.json() : null)
      .then(json => setResults(json?.MRData?.RaceTable?.Races?.[0]?.QualifyingResults ?? []))
      .catch(() => setResults([]))
  }, [round])

  // Loading
  if (results === null) {
    return (
      <div className="rounded-glass border border-[var(--color-border)] relative overflow-hidden" style={GLASS}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
        <div style={{ padding: '28px 32px' }}>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-faint)] mb-3">Clasificación</div>
          <div className="text-[14px] text-[var(--color-faint)] py-4">Cargando...</div>
        </div>
      </div>
    )
  }

  // No data
  if (results.length === 0) {
    return (
      <div className="rounded-glass border border-[var(--color-border)] relative overflow-hidden" style={GLASS}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
        <div style={{ padding: '28px 32px' }}>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-faint)] mb-3">Clasificación</div>
          <div className="text-[14px] text-[var(--color-faint)] py-4">Clasificación aún no disponible</div>
        </div>
      </div>
    )
  }

  // ── Build sorted lists ───────────────────────────────────────────────────
  const q1Sorted = [...results].sort((a, b) => {
    const ta = toSeconds(a.Q1), tb = toSeconds(b.Q1)
    if (ta === null && tb === null) return 0
    if (ta === null) return 1
    if (tb === null) return -1
    return ta - tb
  })
  const q1EliminatedIds = new Set(q1Sorted.slice(16).map(d => d.Driver.driverId))

  const q2Sorted = [...results]
    .filter(d => d.Q2)
    .sort((a, b) => (toSeconds(a.Q2) ?? Infinity) - (toSeconds(b.Q2) ?? Infinity))
  const q2EliminatedIds = new Set(q2Sorted.slice(10).map(d => d.Driver.driverId))

  const q3Sorted = [...results]
    .filter(d => d.Q3)
    .sort((a, b) => (toSeconds(a.Q3) ?? Infinity) - (toSeconds(b.Q3) ?? Infinity))
  const poleSeconds = q3Sorted.length > 0 ? toSeconds(q3Sorted[0].Q3) : null

  // ── Column renderers ─────────────────────────────────────────────────────
  function renderQ1() {
    return q1Sorted.map((d, i) => (
      <QColRow key={d.Driver.driverId} pos={i + 1} code={d.Driver.code} team={d.Constructor.name}
        time={d.Q1} eliminated={q1EliminatedIds.has(d.Driver.driverId)} />
    ))
  }

  function renderQ2() {
    if (!q2Sorted.length) return <div className="text-[13px] text-[var(--color-faint)] py-6 text-center">Sesión aún no disponible</div>
    return q2Sorted.map((d, i) => (
      <QColRow key={d.Driver.driverId} pos={i + 1} code={d.Driver.code} team={d.Constructor.name}
        time={d.Q2} eliminated={q2EliminatedIds.has(d.Driver.driverId)} />
    ))
  }

  function renderQ3() {
    if (!q3Sorted.length) return <div className="text-[13px] text-[var(--color-faint)] py-6 text-center">Sesión aún no disponible</div>
    return q3Sorted.map((d, i) => (
      <QColRow key={d.Driver.driverId} pos={i + 1} code={d.Driver.code} team={d.Constructor.name}
        time={d.Q3} isPole={i === 0} gap={i > 0 ? formatGap(poleSeconds, toSeconds(d.Q3)) : null} />
    ))
  }

  const Divider = () => (
    <div className="flex-shrink-0"
      style={{ width: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px', alignSelf: 'stretch' }} />
  )

  return (
    <div className="rounded-glass border border-[var(--color-border)] relative overflow-hidden" style={GLASS}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div style={{ padding: '24px 28px' }}>

        {/* ── MOBILE: Tabs ── */}
        <div className="md:hidden">
          {/* Tab row */}
          <div className="flex mb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Q1', 'Q2', 'Q3'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 pb-3 font-display font-black text-[32px] uppercase border-none bg-transparent cursor-pointer"
                style={{
                  color: activeTab === tab ? (tab === 'Q3' ? 'var(--color-gold)' : '#00C47D') : 'rgba(255,255,255,0.18)',
                  borderBottom: activeTab === tab
                    ? `2px solid ${tab === 'Q3' ? 'var(--color-gold)' : '#00C47D'}`
                    : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'color 150ms',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Subtitle */}
          <div className="text-[10px] font-bold uppercase tracking-[2px] mb-4"
            style={{ color: TAB_META[activeTab].color === 'var(--color-gold)' ? 'rgba(212,168,67,0.7)' : 'rgba(255,255,255,0.28)' }}>
            {TAB_META[activeTab].subtitle}
          </div>

          {/* Active tab content */}
          {activeTab === 'Q1' && renderQ1()}
          {activeTab === 'Q2' && renderQ2()}
          {activeTab === 'Q3' && renderQ3()}
        </div>

        {/* ── DESKTOP: 3 columns ── */}
        <div className="hidden md:flex" style={{ alignItems: 'flex-start' }}>

          <div className="flex-1 min-w-0">
            <QColHeader title="Q1" subtitle="CLASIFICACIÓN · 22 PILOTOS" />
            {renderQ1()}
          </div>

          <Divider />

          <div className="flex-1 min-w-0">
            {q2Sorted.length > 0
              ? <><QColHeader title="Q2" subtitle="CLASIFICACIÓN · 16 PILOTOS" />{renderQ2()}</>
              : <><QColHeader title="Q2" subtitle="CLASIFICACIÓN · 16 PILOTOS" /><div className="text-[13px] text-[var(--color-faint)] py-6 text-center">Sesión aún no disponible</div></>
            }
          </div>

          <Divider />

          <div className="flex-1 min-w-0">
            {q3Sorted.length > 0
              ? <><QColHeader title="Q3" subtitle="SHOOTOUT FINAL · 10 PILOTOS" color="var(--color-gold)" />{renderQ3()}</>
              : <><QColHeader title="Q3" subtitle="SHOOTOUT FINAL · 10 PILOTOS" color="var(--color-gold)" /><div className="text-[13px] text-[var(--color-faint)] py-6 text-center">Sesión aún no disponible</div></>
            }
          </div>

        </div>
      </div>
    </div>
  )
}
