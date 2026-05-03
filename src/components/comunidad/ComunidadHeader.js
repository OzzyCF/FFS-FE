import Link from 'next/link'
import { Home } from 'lucide-react'

export default function ComunidadHeader() {
  return (
    <header
      className="relative z-[2] px-8 max-w-[1180px] mx-auto"
      style={{ paddingTop: 28, paddingBottom: 20 }}
    >
      <div className="grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        <img
          src="/images/logo-ffs.svg"
          alt="Formula Fan Sevilla"
          className="h-7 w-auto"
        />

        <span
          className="font-display font-black text-white uppercase leading-none"
          style={{ fontSize: 52, letterSpacing: '0.52em' }}
        >
          COMUNIDAD
        </span>

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
