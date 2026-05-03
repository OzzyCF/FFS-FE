'use client'

export default function ClientCommunityCard() {
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
      {/* Inner highlight */}
      <div
        className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
      />
      {/* Gold top bar */}
      <div
        className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, #D4A843, transparent)',
          borderRadius: '0 0 2px 2px',
        }}
      />
      {/* Badge */}
      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-[22px] border text-[var(--color-gold)]"
        style={{ background: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.22)' }}
      >
        Comunidad
      </div>
      <div className="font-display font-black text-[32px] uppercase leading-[1.05] mb-3 tracking-[-0.5px]">
        ¿Quién eres<br />en la parrilla?
      </div>
      <div className="text-[var(--color-dim)] text-[14px] leading-[1.7] mb-7 font-light">
        Únete, elige tu equipo y empieza a vivir la temporada con la única comunidad de Fórmula 1 de Sevilla. Sin complicaciones, sin spam.
      </div>
      <button
        onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
        className="text-white border-none px-[26px] py-3 rounded-btn font-semibold text-[14px] cursor-pointer tracking-[0.2px] transition-all duration-200 hover:-translate-y-[2px]"
        style={{ background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)', boxShadow: '0 0 48px rgba(0,196,125,0.28)' }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 72px rgba(0,196,125,0.44)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 48px rgba(0,196,125,0.28)'}
      >
        Crear mi perfil →
      </button>
    </div>
  )
}
