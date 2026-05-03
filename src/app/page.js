import NavServer from '@/components/SiteNavigationBarWithAuth'
import Hero from '@/components/ClubHeroSection'
import RaceCard from '@/components/NextRaceCountdownCard'
import EventCard from '@/components/WatchPartyEventCard'
import ClientCommunityCard from '@/components/ClientCommunityCard'
import AuthAwareJoinSection from '@/components/MemberSignupOrWelcomeSection'
import Footer from '@/components/SiteFooter'
import { getF1Data } from '@/lib/f1RaceDataService'
import { createClient } from '@/lib/supabase/serverClient'

export default async function Home() {
  const supabase = await createClient()

  const [f1Data, { count: memberCount }, { count: eventCount }, { data: { user } }] = await Promise.all([
    getF1Data(),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.auth.getUser(),
  ])

  const isLoggedIn = !!user

  // eslint-disable-next-line react-hooks/purity
  const now = Date.now()
  const raceDays = Math.ceil(
    (new Date(f1Data.nextRace.date) - now) / 86400000
  )

  const { data: nextEvent } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date(now).toISOString())
    .order('event_date', { ascending: true })
    .limit(1)
    .single()

  const { data: rsvps } = nextEvent
    ? await supabase.from('event_interest').select('status').eq('event_id', nextEvent.id)
    : { data: [] }

  const goingCount = rsvps?.filter(r => r.status === 'going').length ?? 0
  const maybeCount = rsvps?.filter(r => r.status === 'maybe').length ?? 0

  const { data: userRsvpData } = user && nextEvent
    ? await supabase.from('event_interest').select('status').eq('event_id', nextEvent.id).eq('user_id', user.id).single()
    : { data: null }

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
        <NavServer />
        <Hero
          raceDays={raceDays > 0 ? raceDays : '—'}
          memberCount={memberCount ?? 0}
          eventCount={eventCount ?? 0}
          isLoggedIn={isLoggedIn}
        />

        {/* Divider */}
        <div
          className="relative z-[2] mx-auto max-w-[1180px] mx-7"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px auto 32px' }}
        />

        {/* Next race section */}
        <div id="proxima-carrera" className="relative z-[2]">
          <div className="px-7 pb-6 max-w-[1180px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[var(--color-green)] text-[15px] font-bold leading-none">{'//'}</span>
              <span className="font-display font-black text-white uppercase tracking-[4px] text-[13px]">Próximo evento</span>
            </div>
            <RaceCard race={f1Data.nextRace} />
          </div>
        </div>

        {/* Cards grid */}
        <div
          id="eventos"
          className="grid gap-[18px] px-7 pb-6 max-w-[1180px] mx-auto"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <EventCard
              event={nextEvent}
              goingCount={goingCount}
              maybeCount={maybeCount}
              userRsvp={userRsvpData?.status ?? null}
              isLoggedIn={isLoggedIn}
            />
          <ClientCommunityCard />
        </div>

        {/* Divider */}
        <div
          className="relative z-[2]"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px 28px 32px', maxWidth: 1180, marginLeft: 'auto', marginRight: 'auto' }}
        />

        {/* Join section */}
        <section id="unete" className="px-7 pb-[60px] max-w-[680px] mx-auto">
          <AuthAwareJoinSection />
        </section>

        <Footer />
      </div>
    </>
  )
}
