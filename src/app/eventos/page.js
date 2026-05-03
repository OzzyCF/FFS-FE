import { createClient } from '@/lib/supabase/serverClient'
import { BeamsBackground } from '@/components/ui/BeamsBackground'
import EventosHeader from '@/components/eventos/EventosHeader'
import EventosFeaturedCard from '@/components/eventos/EventosFeaturedCard'
import EventosListCard from '@/components/eventos/EventosListCard'
import Footer from '@/components/SiteFooter'

export const metadata = {
  title: 'Eventos — Formula Fan Sevilla',
  description: 'Próximos eventos y quedadas del club Formula Fan Sevilla en Sevilla.',
}

export default async function EventosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(5)

  const eventIds = events?.map(e => e.id) ?? []

  const rsvpCounts = {}
  const userRsvps  = {}

  if (eventIds.length > 0) {
    const [rsvpData, userRsvpData] = await Promise.all([
      supabase
        .from('event_interest')
        .select('event_id, status')
        .in('event_id', eventIds),
      user
        ? supabase
            .from('event_interest')
            .select('event_id, status')
            .in('event_id', eventIds)
            .eq('user_id', user.id)
        : { data: [] },
    ])

    eventIds.forEach(id => {
      const rows = rsvpData.data?.filter(r => r.event_id === id) ?? []
      rsvpCounts[id] = {
        going: rows.filter(r => r.status === 'going').length,
        maybe: rows.filter(r => r.status === 'maybe').length,
      }
      const userRow = userRsvpData.data?.find(r => r.event_id === id)
      userRsvps[id] = userRow?.status ?? null
    })
  }

  const isLoggedIn = !!user
  const [featuredEvent, ...restEvents] = events ?? []

  return (
    <>
      {/* Page background — animated beams */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BeamsBackground intensity="medium" />
      </div>

      <div className="relative z-[2] min-h-screen">
        <EventosHeader />

        <main className="relative z-[2] max-w-[1180px] mx-auto px-7 pt-8 pb-[80px]">

          {!featuredEvent ? (
            // Empty state
            <div
              className="rounded-glass border border-[var(--color-border)] relative overflow-hidden p-9"
              style={{
                background: 'rgba(6,7,10,0.65)',
                backdropFilter: 'blur(36px) saturate(200%)',
                WebkitBackdropFilter: 'blur(36px) saturate(200%)',
                animation: 'fadeUp 0.7s 0.1s ease both',
              }}
            >
              <div className="absolute inset-0 rounded-glass pointer-events-none"
                style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
              <div className="font-display font-black text-[28px] uppercase leading-[1.05] tracking-[-0.5px] text-[var(--color-dim)]">
                Próximamente — ¡estamos organizando los próximos eventos!
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Featured — first upcoming event */}
              <EventosFeaturedCard
                event={featuredEvent}
                goingCount={rsvpCounts[featuredEvent.id]?.going ?? 0}
                maybeCount={rsvpCounts[featuredEvent.id]?.maybe ?? 0}
                userRsvp={userRsvps[featuredEvent.id] ?? null}
                isLoggedIn={isLoggedIn}
              />

              {/* List — remaining events */}
              {restEvents.map((event, i) => (
                <EventosListCard
                  key={event.id}
                  event={event}
                  goingCount={rsvpCounts[event.id]?.going ?? 0}
                  maybeCount={rsvpCounts[event.id]?.maybe ?? 0}
                  userRsvp={userRsvps[event.id] ?? null}
                  isLoggedIn={isLoggedIn}
                  animDelay={0.18 + i * 0.07}
                />
              ))}
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  )
}
