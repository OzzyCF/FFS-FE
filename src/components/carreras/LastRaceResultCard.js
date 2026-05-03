import { getFlagUrl } from '@/lib/countryFlags'

export default function LastRaceResultCard({ lastRace }) {
  if (!lastRace) return null

  const flagUrl = getFlagUrl(lastRace.country, 80)
  const formattedDate = new Date(lastRace.date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.42)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '28px 32px',
      }}
    >
      <div
        className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)',
          borderRadius: '0 0 2px 2px',
        }}
      />
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-4 border"
        style={{
          color: 'var(--color-gold)',
          background: 'rgba(212,168,67,0.08)',
          borderColor: 'rgba(212,168,67,0.2)',
        }}
      >
        Carrera anterior · Ronda {lastRace.round}
      </div>

      <div className="flex items-center gap-4">
        <img
          src={flagUrl}
          alt={lastRace.country}
          className="rounded-[4px]"
          style={{ height: 30, width: 'auto', objectFit: 'cover' }}
        />
        <div>
          <div className="font-display font-black text-[32px] uppercase leading-[0.93] tracking-[-0.5px]">
            {lastRace.name}
          </div>
          <div className="text-[12px] text-[var(--color-faint)] uppercase tracking-[1.5px] mt-1">
            {lastRace.locality}, {lastRace.country} · {formattedDate}
          </div>
        </div>
      </div>
    </div>
  )
}
