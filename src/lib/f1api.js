const BASE_URL = 'https://api.jolpi.ca/ergast/f1/2026'

export async function getF1Data() {
  const [scheduleRes, driversRes, constructorsRes, openf1Res] = await Promise.all([
    fetch(`${BASE_URL}.json`, { next: { revalidate: 86400 } }),
    fetch(`${BASE_URL}/driverStandings.json`, { next: { revalidate: 86400 } }),
    fetch(`${BASE_URL}/constructorStandings.json`, { next: { revalidate: 86400 } }),
    fetch('https://api.openf1.org/v1/sessions?year=2026', { next: { revalidate: 86400 } }),
  ])

  const [scheduleData, driversData, constructorsData, openf1Raw] = await Promise.all([
    scheduleRes.json(),
    driversRes.json(),
    constructorsRes.json(),
    openf1Res.ok ? openf1Res.json() : Promise.resolve([]),
  ])

  const races = scheduleData.MRData.RaceTable.Races

  const today = new Date()
  const nextRaceRaw = races.find((r) => {
    const raceDateTime = r.time ? `${r.date}T${r.time}` : `${r.date}T23:59:59Z`
    return new Date(raceDateTime) >= today
  }) ?? races[races.length - 1]

  // Filter OpenF1 sessions to the next race weekend (up to 5 days before race day)
  const raceDateTime = new Date(
    nextRaceRaw.time ? `${nextRaceRaw.date}T${nextRaceRaw.time}` : `${nextRaceRaw.date}T23:59:59Z`
  )
  const weekendStart = new Date(raceDateTime)
  weekendStart.setDate(weekendStart.getDate() - 5)

  const sessions = Array.isArray(openf1Raw)
    ? openf1Raw
        .filter((s) => {
          const start = new Date(s.date_start)
          return start >= weekendStart && start <= raceDateTime
        })
        .map((s) => ({ name: s.session_name, date_start: s.date_start, date_end: s.date_end }))
        .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
    : []

  const nextRace = {
    round: nextRaceRaw.round,
    name: nextRaceRaw.raceName,
    circuit: nextRaceRaw.Circuit.circuitName,
    country: nextRaceRaw.Circuit.Location.country,
    date: nextRaceRaw.date,
    time: nextRaceRaw.time ?? null,
    sessions,
  }

  const driverStandings =
    driversData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings.slice(0, 5).map((d) => ({
      position: d.position,
      name: `${d.Driver.givenName} ${d.Driver.familyName}`,
      team: d.Constructors[0]?.name ?? '',
      points: d.points,
    })) ?? []

  const constructorStandings =
    constructorsData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings.slice(0, 3).map((c) => ({
      position: c.position,
      name: c.Constructor.name,
      points: c.points,
    })) ?? []

  const calendar = races.map((r) => ({
    round: r.round,
    name: r.raceName,
    circuit: r.Circuit.circuitName,
    country: r.Circuit.Location.country,
    date: r.date,
  }))

  return { nextRace, driverStandings, constructorStandings, calendar }
}
