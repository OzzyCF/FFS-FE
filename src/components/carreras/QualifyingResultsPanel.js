// Server component — fetches qualifying data directly
async function fetchQualifying(round) {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/2026/${round}/qualifying.json`,
      { next: { revalidate: 43200 } }
    )
    if (!res.ok) return null
    const json = await res.json()
    return json.MRData?.RaceTable?.Races?.[0]?.QualifyingResults ?? null
  } catch {
    return null
  }
}

// "1:27.444" → seconds as float
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

// Compact two-line row for use inside a narrow column
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
      {/* Line 1: pos + code + time/gap + badge */}
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

        {/* Gap (Q3 P2–P10) */}
        {gap && (
          <span className="text-[10px] tabular-nums flex-shrink-0" style={{ color: 'rgba(255,255,255,0.32)' }}>
            {gap}
          </span>
        )}

        {/* Badges — left of time */}
        {isPole && (
          <span
            className="text-[7px] font-bold uppercase tracking-[1px] px-[5px] py-[1px] rounded-full flex-shrink-0"
            style={{
              color: 'var(--color-gold)',
              background: 'rgba(212,168,67,0.12)',
              border: '1px solid rgba(212,168,67,0.28)',
            }}
          >
            POLE
          </span>
        )}
        {eliminated && (
          <span
            className="text-[7px] font-bold uppercase tracking-[0.8px] px-[5px] py-[1px] rounded-full flex-shrink-0"
            style={{
              color: 'rgba(255,100,100,0.85)',
              background: 'rgba(255,50,50,0.1)',
              border: '1px solid rgba(255,50,50,0.2)',
            }}
          >
            ELIMINADO
          </span>
        )}

        {/* Time */}
        <span
          className="text-[13px] tabular-nums flex-shrink-0"
          style={{
            color: isPole ? 'var(--color-gold)' : eliminated ? 'rgba(255,130,130,0.6)' : 'rgba(255,255,255,0.55)',
          }}
        >
          {time || '—'}
        </span>
      </div>

      {/* Line 2: team only */}
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
      <div
        className="font-display font-black leading-none"
        style={{ fontSize: 52, color }}
      >
        {title}
      </div>
      <div
        className="text-[10px] font-bold uppercase tracking-[2px] mt-[5px]"
        style={{ color: 'rgba(255,255,255,0.28)' }}
      >
        {subtitle}
      </div>
    </div>
  )
}

function EmptyCol({ title, subtitle }) {
  return (
    <div>
      <QColHeader title={title} subtitle={subtitle} />
      <div className="text-[13px] text-[var(--color-faint)] py-6 text-center">
        Sesión aún no disponible
      </div>
    </div>
  )
}

export default async function QualifyingResultsPanel({ round }) {
  const results = await fetchQualifying(round)

  const GLASS = {
    background: 'rgba(6,7,10,0.42)',
    backdropFilter: 'blur(36px) saturate(200%)',
    WebkitBackdropFilter: 'blur(36px) saturate(200%)',
  }

  // Placeholder — qualifying hasn't happened at all
  if (!results || results.length === 0) {
    return (
      <div className="rounded-glass border border-[var(--color-border)] relative overflow-hidden" style={GLASS}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
        <div style={{ padding: '28px 32px' }}>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-faint)] mb-3">
            Clasificación
          </div>
          <div className="text-[14px] text-[var(--color-faint)] py-4">
            Clasificación aún no disponible
          </div>
        </div>
      </div>
    )
  }

  // ─── Build sorted lists ───────────────────────────────────────────────────

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

  // ─── Divider between columns ──────────────────────────────────────────────
  const Divider = () => (
    <div
      className="flex-shrink-0"
      style={{ width: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px', alignSelf: 'stretch' }}
    />
  )

  return (
    <div className="rounded-glass border border-[var(--color-border)] relative overflow-hidden" style={GLASS}>
      {/* Top accent bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
      {/* Inner highlight */}
      <div
        className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }}
      />

      <div style={{ padding: '24px 28px' }}>
        {/* Three-column layout */}
        <div className="flex" style={{ alignItems: 'flex-start' }}>

          {/* ── Q1 ── */}
          <div className="flex-1 min-w-0">
            <QColHeader title="Q1" subtitle="CLASIFICACIÓN · 22 PILOTOS" />
            {q1Sorted.map((d, i) => (
              <QColRow
                key={d.Driver.driverId}
                pos={i + 1}
                code={d.Driver.code}
                team={d.Constructor.name}
                time={d.Q1}
                eliminated={q1EliminatedIds.has(d.Driver.driverId)}
              />
            ))}
          </div>

          <Divider />

          {/* ── Q2 ── */}
          <div className="flex-1 min-w-0">
            {q2Sorted.length > 0 ? (
              <>
                <QColHeader title="Q2" subtitle="CLASIFICACIÓN · 16 PILOTOS" />
                {q2Sorted.map((d, i) => (
                  <QColRow
                    key={d.Driver.driverId}
                    pos={i + 1}
                    code={d.Driver.code}
                    team={d.Constructor.name}
                    time={d.Q2}
                    eliminated={q2EliminatedIds.has(d.Driver.driverId)}
                  />
                ))}
              </>
            ) : (
              <EmptyCol title="Q2" subtitle="CLASIFICACIÓN · 16 PILOTOS" />
            )}
          </div>

          <Divider />

          {/* ── Q3 ── */}
          <div className="flex-1 min-w-0">
            {q3Sorted.length > 0 ? (
              <>
                <QColHeader title="Q3" subtitle="SHOOTOUT FINAL · 10 PILOTOS" color="var(--color-gold)" />
                {q3Sorted.map((d, i) => {
                  const dSeconds = toSeconds(d.Q3)
                  return (
                    <QColRow
                      key={d.Driver.driverId}
                      pos={i + 1}
                      code={d.Driver.code}
                      team={d.Constructor.name}
                      time={d.Q3}
                      isPole={i === 0}
                      gap={i > 0 ? formatGap(poleSeconds, dSeconds) : null}
                    />
                  )
                })}
              </>
            ) : (
              <EmptyCol title="Q3" subtitle="SHOOTOUT FINAL · 10 PILOTOS" />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
