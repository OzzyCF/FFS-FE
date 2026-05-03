export default function EventCard() {
  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden p-9"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        animation: 'fadeUp 0.7s 0.2s ease both',
      }}
    >
      {/* Inner highlight shimmer */}
      <div
        className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
      />

      {/* Badge */}
      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-[22px] border text-[var(--color-green)]"
        style={{
          background: 'rgba(0,196,125,0.1)',
          borderColor: 'rgba(0,196,125,0.22)',
        }}
      >
        Próximo evento
      </div>

      {/* Title */}
      <div className="font-display font-black text-[32px] uppercase leading-[1.05] mb-3 tracking-[-0.5px]">
        Watch Party —<br />GP de Canadá
      </div>

      {/* Meta */}
      <div className="text-[var(--color-dim)] text-[14px] leading-[1.7] mb-7 font-light">
        📍 Bar El Rincón · Calle Betis, Sevilla<br />
        📅 15 junio · Puertas abren a las 19:30h
      </div>

      {/* RSVP buttons */}
      <div className="flex gap-[10px] mb-4">
        <button
          className="px-[22px] py-[10px] rounded-[10px] font-semibold text-[13px] text-white border-none cursor-pointer tracking-[0.2px] transition-all duration-[180ms] hover:bg-[#009B61]"
          style={{ background: '#00C47D' }}
        >
          ✓&nbsp; Voy
        </button>
        <button
          className="px-[22px] py-[10px] rounded-[10px] font-semibold text-[13px] text-white cursor-pointer tracking-[0.2px] transition-all duration-[180ms] border border-[var(--color-border-hi)] hover:bg-[rgba(255,255,255,0.1)]"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          ?&nbsp; Quizás
        </button>
      </div>

      {/* Attendee count */}
      <div className="text-[13px] text-[var(--color-faint)]">
        12 confirmados · 4 quizás
      </div>
    </div>
  )
}
