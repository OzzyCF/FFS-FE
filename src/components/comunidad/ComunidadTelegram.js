'use client'

export default function ComunidadTelegram() {
  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: 'rgba(6,7,10,0.65)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '64px 52px',
        textAlign: 'center',
        animation: 'fadeUp 0.7s 0.24s ease both',
      }}
    >
      {/* Inner shimmer */}
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />

      {/* Green top bar */}
      <div className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00C47D, transparent)', borderRadius: '0 0 2px 2px' }} />

      {/* Title */}
      <h2
        className="font-display font-black uppercase leading-[0.93] tracking-[-1px] text-white mb-5"
        style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
      >
        Es gratis. Es fácil.<br />Es Sevilla.
      </h2>

      {/* Body */}
      <p
        className="text-[17px] leading-[1.75] font-light mb-10 max-w-[480px] mx-auto"
        style={{ color: 'rgba(255,255,255,0.52)' }}
      >
        Regístrate en la web y únete al grupo de Telegram.<br />
        Eso es todo, illo.
      </p>

      {/* CTA button */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <a
          href="https://t.me/formulafansevilla"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full text-white font-bold tracking-[0.2px] transition-all duration-200 hover:-translate-y-[2px]"
          style={{
            fontSize: 16,
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)',
            boxShadow: '0 0 48px rgba(0,196,125,0.35), 0 8px 32px rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-stack)',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 72px rgba(0,196,125,0.55), 0 8px 32px rgba(0,0,0,0.3)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 48px rgba(0,196,125,0.35), 0 8px 32px rgba(0,0,0,0.3)'}
        >
          Únete al grupo →
        </a>
        <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
          @formulafansevilla
        </span>
      </div>

      {/* QR code */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[12px] uppercase tracking-[1.5px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          O escanea el código QR
        </span>
        <img
          src="/images/t_me-formulafansevilla.jpg"
          alt="QR Code @formulafansevilla"
          style={{
            width: 180,
            height: 'auto',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      </div>

    </div>
  )
}
