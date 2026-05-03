import { getCarrerasPageData } from '@/lib/f1RaceDataService'
import FloatingPathsBackground from '@/components/ui/FloatingPathsBackground'
import CarrerasHeroSection from '@/components/carreras/CarrerasHeroSection'
import WeekendSessionsList from '@/components/carreras/WeekendSessionsList'
import DriverStandingsTable from '@/components/carreras/DriverStandingsTable'
import ConstructorStandingsTable from '@/components/carreras/ConstructorStandingsTable'
import SeasonCalendarGrid from '@/components/carreras/SeasonCalendarGrid'
import LastRaceResultCard from '@/components/carreras/LastRaceResultCard'
import QualifyingResultsPanel from '@/components/carreras/QualifyingResultsPanel'
import CarrerasHeader from '@/components/carreras/CarrerasHeader'

export const metadata = {
  title: 'Carreras — Formula Fan Sevilla',
  description: 'Próxima carrera, calendario, clasificaciones y sesiones del fin de semana.',
}

export default async function CarrerasPage() {
  const {
    nextRace,
    lastRace,
    weekendSessions,
    driverStandings,
    constructorStandings,
    calendar,
  } = await getCarrerasPageData()

  return (
    <>
      {/* Page-specific background — floating SVG paths */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingPathsBackground />
      </div>

      <CarrerasHeader />

    <main className="relative z-[2] max-w-[1180px] mx-auto px-7 pt-8 pb-[80px]">
      {/* Hero — next race + countdown */}
      <div className="mb-6">
        <CarrerasHeroSection nextRace={nextRace} />
      </div>

      {/* Weekend sessions (only shown when data is available) */}
      {weekendSessions.length > 0 && (
        <div className="mb-6">
          <WeekendSessionsList sessions={weekendSessions} />
        </div>
      )}

      {/* Last race */}
      {lastRace && (
        <div className="mb-6">
          <LastRaceResultCard lastRace={lastRace} />
        </div>
      )}

      {/* Qualifying results for last completed race */}
      {lastRace && (
        <div className="mb-6">
          <QualifyingResultsPanel round={lastRace.round} />
        </div>
      )}

      {/* Standings — drivers + constructors side by side */}
      <div
        className="mb-6"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
      >
        <DriverStandingsTable standings={driverStandings} />
        <ConstructorStandingsTable standings={constructorStandings} />
      </div>

      {/* Full season calendar */}
      <SeasonCalendarGrid calendar={calendar} nextRound={nextRace.round} />
    </main>
    </>
  )
}
