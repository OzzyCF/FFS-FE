'use client'

const SESSION_LABELS = {
  'Practice 1': 'Libre 1',
  'Practice 2': 'Libre 2',
  'Practice 3': 'Libre 3',
  'Qualifying': 'Clasificación',
  'Sprint': 'Sprint',
  'Sprint Qualifying': 'Clasif. Sprint',
  'Sprint Shootout': 'Clasif. Sprint',
  'Race': 'Carrera',
}

function formatSession(dateStr) {
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('es-ES', {
      weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Madrid',
    }),
    time: d.toLocaleTimeString('es-ES', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid', hour12: false,
    }) + 'h',
  }
}

export default function WeekendSessionsList({ sessions }) {
  if (!sessions?.length) return null

  const now = new Date()

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.42)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
      }}
    >
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,196,125,0.6), transparent)' }} />
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div style={{ padding: '28px 32px' }}>
        <div className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--color-green)] mb-5">
          Sesiones del fin de semana
        </div>

        <div className="flex flex-col">
          {sessions.map((s, i) => {
            const label = SESSION_LABELS[s.session_name] ?? s.session_name
            const { day, time } = formatSession(s.date_start)
            const isPast = s.date_end ? new Date(s.date_end) < now : new Date(s.date_start) < now
            const isNext = !isPast && (i === sessions.findIndex(x => !x.date_end || new Date(x.date_end) >= now))

            return (
              <div
                key={i}
                className="flex items-center justify-between py-[11px] border-b border-[var(--color-border)] last:border-b-0"
                style={{ opacity: isPast ? 0.38 : 1 }}
              >
                <div className="flex items-center gap-3">
                  {isNext && (
                    <div className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                      style={{ background: '#00C47D', boxShadow: '0 0 7px rgba(0,196,125,0.8)' }} />
                  )}
                  {!isNext && <div className="w-[6px]" />}
                  <span className="font-display font-bold text-[15px] uppercase">{label}</span>
                  {isPast && (
                    <span className="text-[10px] text-[var(--color-faint)] uppercase tracking-[1px]">completado</span>
                  )}
                </div>

                <div className="flex items-center gap-5 text-[13px]">
                  <span className="text-[var(--color-dim)] capitalize">{day}</span>
                  <span
                    className="font-medium min-w-[52px] text-right"
                    style={{ color: isNext ? 'var(--color-green)' : 'rgba(255,255,255,0.55)' }}
                  >
                    {time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
