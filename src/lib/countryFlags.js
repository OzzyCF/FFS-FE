export const COUNTRY_ISO = {
  'Australia': 'au', 'China': 'cn', 'Japan': 'jp',
  'Bahrain': 'bh', 'Saudi Arabia': 'sa', 'United States': 'us',
  'USA': 'us', 'Italy': 'it', 'Monaco': 'mc', 'Canada': 'ca',
  'Spain': 'es', 'Austria': 'at', 'UK': 'gb',
  'United Kingdom': 'gb', 'Hungary': 'hu', 'Belgium': 'be',
  'Netherlands': 'nl', 'Singapore': 'sg', 'Azerbaijan': 'az',
  'Mexico': 'mx', 'Brazil': 'br', 'Qatar': 'qa',
  'UAE': 'ae', 'Abu Dhabi': 'ae', 'Miami': 'us',
}

export function getFlagUrl(country, size = 40) {
  const iso = COUNTRY_ISO[country] ?? 'un'
  return `https://flagcdn.com/w${size}/${iso}.png`
}
