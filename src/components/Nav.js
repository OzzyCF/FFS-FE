'use client'

export default function Nav() {
  return (
    <nav className="sticky top-[14px] z-[100] px-7 max-w-[1180px] mx-auto mt-[14px]">
      <div
        className="flex items-center justify-between px-[22px] py-[13px] rounded-[18px] border border-[var(--color-border)]"
        style={{
          background: 'rgba(6,7,10,0.72)',
          backdropFilter: 'blur(44px) saturate(200%)',
          WebkitBackdropFilter: 'blur(44px) saturate(200%)',
        }}
      >
        {/* Logo */}
        <div
          className="font-black text-[20px] tracking-[-0.3px] font-[family:var(--font-stack)]"
          style={{
            background: 'linear-gradient(120deg, #00C47D 0%, #D4A843 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Formula Fan Sevilla
        </div>

        {/* Nav links */}
        <ul className="flex gap-7 list-none">
          {['Próxima Carrera', 'Eventos', 'Comunidad'].map((label) => (
            <li key={label}>
              <a
                href="#"
                className="text-[var(--color-dim)] no-underline text-[13px] font-medium tracking-[0.8px] uppercase transition-colors duration-[180ms] hover:text-white font-[family:var(--font-stack)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white border-none px-[22px] py-[9px] rounded-[10px] font-semibold text-[13px] cursor-pointer tracking-[0.2px] transition-all duration-[180ms] hover:opacity-[0.88] hover:-translate-y-px font-[family:var(--font-stack)]"
          style={{
            background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)',
          }}
        >
          Únete →
        </button>
      </div>
    </nav>
  )
}
