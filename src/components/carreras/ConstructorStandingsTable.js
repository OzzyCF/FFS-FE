export default function ConstructorStandingsTable({ standings }) {
  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.42)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
      }}
    >
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)' }} />
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div style={{ padding: '28px 32px' }}>
        <div className="text-[11px] font-bold uppercase tracking-[2px] mb-5"
          style={{ color: 'var(--color-gold)' }}>
          Clasificación Constructores
        </div>

        <div className="flex flex-col">
          {standings.map((c) => {
            const pos = parseInt(c.position)
            const isTop3 = pos <= 3

            return (
              <div
                key={c.Constructor.constructorId}
                className="flex items-center gap-4 py-[10px] border-b border-[var(--color-border)] last:border-b-0"
              >
                <span
                  className="font-display font-black text-[18px] min-w-[28px] text-right"
                  style={{ color: isTop3 ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)' }}
                >
                  {c.position}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-[family:var(--font-stack)] font-bold text-[13px] md:text-[14px] uppercase leading-none tracking-[0.5px]">
                    {c.Constructor.name}
                  </div>
                </div>

                <span className="font-display font-black text-[16px] tabular-nums">
                  {c.points}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
