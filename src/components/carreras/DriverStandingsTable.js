export default function DriverStandingsTable({ standings }) {
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
          Clasificación de Pilotos
        </div>

        <div className="flex flex-col">
          {standings.map((d) => {
            const pos = parseInt(d.position)
            const name = `${d.Driver.givenName} ${d.Driver.familyName}`
            const team = d.Constructors[0]?.name ?? ''
            const isTop3 = pos <= 3

            return (
              <div
                key={d.Driver.driverId}
                className="flex items-center gap-4 py-[10px] border-b border-[var(--color-border)] last:border-b-0"
              >
                <span
                  className="font-display font-black text-[18px] min-w-[28px] text-right"
                  style={{ color: isTop3 ? 'var(--color-green)' : 'rgba(255,255,255,0.2)' }}
                >
                  {d.position}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-[family:var(--font-stack)] font-bold text-[13px] md:text-[14px] uppercase leading-none mb-[3px] tracking-[0.5px]">
                    {name}
                  </div>
                  <div className="text-[11px] text-[var(--color-faint)] uppercase tracking-[0.8px] truncate">
                    {team}
                  </div>
                </div>

                <span className="font-display font-black text-[16px] tabular-nums">
                  {d.points}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
