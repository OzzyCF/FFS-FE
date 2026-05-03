import { getFlagUrl } from '@/lib/countryFlags'

export default function SeasonCalendarGrid({ calendar, nextRound }) {
  const today = new Date()

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.42)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
      }}
    >
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div style={{ padding: '28px 32px' }}>
        <div className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--color-faint)] mb-5">
          Calendario 2026
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '4px',
          }}
        >
          {calendar.map((race) => {
            const raceDate = new Date(race.date + 'T' + (race.time ?? '23:59:59Z'))
            const isPast = raceDate < today
            const isNext = race.round === nextRound
            const flagUrl = getFlagUrl(race.Circuit.Location.country, 40)
            const formattedDate = new Date(race.date).toLocaleDateString('es-ES', {
              day: 'numeric', month: 'short', timeZone: 'UTC',
            })

            return (
              <div
                key={race.round}
                className="flex items-center gap-3 px-3 py-[9px] rounded-[10px]"
                style={{
                  background: isNext ? 'rgba(0,196,125,0.09)' : 'rgba(255,255,255,0.02)',
                  border: isNext
                    ? '1px solid rgba(0,196,125,0.22)'
                    : '1px solid transparent',
                  opacity: isPast ? 0.35 : 1,
                }}
              >
                <img
                  src={flagUrl}
                  alt={race.Circuit.Location.country}
                  className="rounded-[3px] flex-shrink-0"
                  style={{ height: 18, width: 'auto', objectFit: 'cover' }}
                />

                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[12px] uppercase leading-none mb-[2px] truncate">
                    {race.Circuit.Location.country}
                  </div>
                  <div className="text-[10px] text-[var(--color-faint)]">{formattedDate}</div>
                </div>

                <span className="text-[10px] font-medium text-[var(--color-faint)]">
                  R{race.round}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
