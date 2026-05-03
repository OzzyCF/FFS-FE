import Link from 'next/link'
import { Home } from 'lucide-react'

export default function EventosHeader() {
  return (
    <header
      className="relative z-[2] px-8 max-w-[1180px] mx-auto"
      style={{ paddingTop: 28, paddingBottom: 20 }}
    >
      <div className="grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* Logo — left */}
        <img
          src="/images/logo-ffs.svg"
          alt="Formula Fan Sevilla"
          className="h-7 w-auto"
        />

        {/* Page title — center */}
        <span
          className="font-display font-black text-white uppercase leading-none tracking-[0.2em] md:tracking-[0.52em]"
          style={{ fontSize: 'clamp(22px, 8vw, 52px)' }}
        >
          EVENTOS
        </span>

        {/* Home — right */}
        <div className="flex justify-end">
          <Link
            href="/"
            className="text-white/35 hover:text-white transition-colors duration-300"
          >
            <Home size={24} strokeWidth={1.5} />
          </Link>
        </div>

      </div>
    </header>
  )
}
