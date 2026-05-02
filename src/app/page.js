import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import RaceCard from '@/components/RaceCard'
import EventCard from '@/components/EventCard'
import JoinForm from '@/components/JoinForm'
import Footer from '@/components/Footer'
import { getF1Data } from '@/lib/f1api'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const [f1Data, { count: memberCount }, { count: eventCount }] = await Promise.all([
    getF1Data(),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
  ])

  const raceDays = Math.ceil(
    (new Date(f1Data.nextRace.date) - Date.now()) / 86400000
  )

  return (
    <>
      {/* Background atmosphere — fixed blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* b1 — green, top-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 780, height: 780,
            background: 'radial-gradient(circle, rgba(0,196,125,0.38) 0%, transparent 68%)',
            filter: 'blur(110px)',
            top: -280, left: -180,
          }}
        />
        {/* b2 — gold, top-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 620, height: 620,
            background: 'radial-gradient(circle, rgba(212,168,67,0.32) 0%, transparent 68%)',
            filter: 'blur(110px)',
            top: -140, right: -200,
          }}
        />
        {/* b3 — green small, bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 440, height: 440,
            background: 'radial-gradient(circle, rgba(0,196,125,0.18) 0%, transparent 68%)',
            filter: 'blur(110px)',
            bottom: '15%', right: '8%',
          }}
        />
        {/* b4 — gold small, bottom-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(212,168,67,0.14) 0%, transparent 68%)',
            filter: 'blur(110px)',
            bottom: '10%', left: '5%',
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.032,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Page content */}
      <div className="relative z-[2] min-h-screen">
        <Nav />
        <Hero
          raceDays={raceDays > 0 ? raceDays : '—'}
          memberCount={memberCount ?? 0}
          eventCount={eventCount ?? 0}
        />

        {/* Divider */}
        <div
          className="relative z-[2] mx-auto max-w-[1180px] mx-7"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px auto 32px' }}
        />

        {/* Next race section */}
        <div className="relative z-[2]">
          <div className="px-7 pb-6 max-w-[1180px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[var(--color-green)] text-[15px] font-bold leading-none">//</span>
              <span className="font-display font-black text-white uppercase tracking-[4px] text-[13px]">Próximo evento</span>
            </div>
            <RaceCard race={f1Data.nextRace} />
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-[18px] px-7 pb-6 max-w-[1180px] mx-auto"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <section id="eventos" className="contents">
            <EventCard />
          </section>

          {/* Community card — inline, no separate component needed */}
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
              className="text-white border-none px-[26px] py-3 rounded-btn font-semibold text-[14px] cursor-pointer tracking-[0.2px] transition-all duration-200 hover:-translate-y-[2px]"
              style={{ background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)', boxShadow: '0 0 48px rgba(0,196,125,0.28)' }}
            >
              Crear mi perfil →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          className="relative z-[2]"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px 28px 32px', maxWidth: 1180, marginLeft: 'auto', marginRight: 'auto' }}
        />

        {/* Join section */}
        <section id="unete" className="px-7 pb-[60px] max-w-[680px] mx-auto">
          <JoinForm />
        </section>

        <Footer />
      </div>
    </>
  )
}
