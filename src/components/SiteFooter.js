'use client'

import { Coffee } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-[var(--color-border)] px-7 py-7 max-w-[1180px] mx-auto flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
      <img
        src="/images/logo-ffs.svg"
        alt="Formula Fan Sevilla"
        className="h-7 w-auto"
      />
      <a
        href="https://buymeacoffee.com/formulafansevilla"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-200 font-[family:var(--font-stack)] font-semibold"
        style={{
          background: 'linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(212,168,67,0.08) 100%)',
          border: '1px solid rgba(212,168,67,0.45)',
          color: 'white',
          fontSize: '14px',
          borderRadius: '100px',
          padding: '11px 26px',
          textDecoration: 'none',
          boxShadow: '0 0 24px rgba(212,168,67,0.12)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,168,67,0.28) 0%, rgba(212,168,67,0.14) 100%)'
          e.currentTarget.style.borderColor = 'rgba(212,168,67,0.7)'
          e.currentTarget.style.boxShadow = '0 0 36px rgba(212,168,67,0.25)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(212,168,67,0.08) 100%)'
          e.currentTarget.style.borderColor = 'rgba(212,168,67,0.45)'
          e.currentTarget.style.boxShadow = '0 0 24px rgba(212,168,67,0.12)'
        }}
      >
        <Coffee size={14} className="inline-block mr-[7px] relative top-[-1px]" />
        Apoya el club con un cafelito
      </a>

      <div className="text-[12px] text-[var(--color-faint)] tracking-[0.3px] font-[family:var(--font-stack)]">
        Hecho con ❤️ en Sevilla · formulafansevilla.com · 2026
      </div>
    </footer>
  )
}
