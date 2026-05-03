import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradientAnimation'
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

  const { data: profileData } = user
    ? await supabase.from('profiles').select('nickname').eq('id', user.id).single()
    : { data: null }
  const nickname = profileData?.nickname ?? null

  const { data: recentMembers } = await supabase
    .from('profiles')
    .select('id, nickname, created_at')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <>
      {/* Background gradient animation */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <BackgroundGradientAnimation interactive={false} />
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
          className="relative z-[2] mx-auto max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-7"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px auto 32px' }}
        />

        {/* Next race section */}
        <div id="proxima-carrera" className="relative z-[2]">
          <div className="px-7 pb-6 max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[var(--color-green)] text-[22px] font-bold leading-none">{'//'}</span>
              <span className="font-display font-black text-white uppercase tracking-[6px] text-[20px]">Próximo evento</span>
            </div>
            <RaceCard race={f1Data.nextRace} />
          </div>
        </div>

        {/* Cards grid */}
        <div
          id="eventos"
          className="grid grid-cols-1 md:grid-cols-2 gap-[18px] px-7 pb-6 max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto"
        >
          <EventCard
              event={nextEvent}
              goingCount={goingCount}
              maybeCount={maybeCount}
              userRsvp={userRsvpData?.status ?? null}
              isLoggedIn={isLoggedIn}
            />
          <ClientCommunityCard isLoggedIn={isLoggedIn} nickname={nickname} members={recentMembers ?? []} />
        </div>

        {/* Divider */}
        <div
          className="relative z-[2] max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)', margin: '8px auto 32px' }}
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
