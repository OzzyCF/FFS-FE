'use client'

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-[var(--color-border)] px-7 py-7 max-w-[1180px] mx-auto flex justify-between items-center">
      <div
        className="font-black text-[18px] font-[family:var(--font-stack)]"
        style={{
          background: 'linear-gradient(120deg, #00C47D 0%, #D4A843 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        FFS
      </div>
      <a
        href="https://buymeacoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-200 font-[family:var(--font-stack)]"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          borderRadius: '100px',
          padding: '6px 16px',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
        }}
      >
        ☕ Apoya el club con un cafelito
      </a>

      <div className="text-[12px] text-[var(--color-faint)] tracking-[0.3px] font-[family:var(--font-stack)]">
        Hecho con ❤️ en Sevilla · formulafansevilla.com · 2026
      </div>
    </footer>
  )
}
