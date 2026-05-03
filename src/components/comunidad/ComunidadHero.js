import { Radar, LocationPin } from '@/components/ui/RadarEffect'

// Positions mapped to real Seville geography (% of container).
// Radar center is anchored at bottom-center — top = north, right = east.
const BARRIOS = [
  { text: 'Pino Montano',  left: '47%', top: 'calc(4% + 30px)',  delay: 0.2 }, // far north, 12 o'clock
  { text: 'Macarena',      left: '30%', top: 'calc(14% + 30px)', delay: 0.3 }, // north, 11 o'clock
  { text: 'Sevilla Este',  left: '74%', top: 'calc(9% + 30px)',  delay: 0.4 }, // northeast, 2 o'clock
  { text: 'Nervión',       left: '66%', top: 'calc(38% + 30px)', delay: 0.5 }, // east, 3-4 o'clock
  { text: 'Triana',        left:  '7%', top: 'calc(40% + 30px)', delay: 0.6 }, // west, 9 o'clock
  { text: 'Los Remedios',  left: '13%', top: 'calc(60% + 30px)', delay: 0.7 }, // southwest, 8 o'clock
  { text: 'Heliópolis',    left: '26%', top: 'calc(74% + 30px)', delay: 0.8 }, // south-southwest, 7 o'clock
]

export default function ComunidadHero({ memberCount = 0 }) {
  return (
    <div
      className="mb-10 relative overflow-hidden"
      style={{ minHeight: '460px', animation: 'fadeUp 0.7s 0.05s ease both' }}
    >

      {/* Radar — absolute background, right 70%, desktop only */}
      <div
        className="hidden md:block absolute inset-y-0 right-0"
        style={{ width: '70%', zIndex: 0 }}
      >
        {/* Geo-positioned pins */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
          {BARRIOS.map(({ text, left, top, delay }) => (
            <div
              key={text}
              style={{
                position: 'absolute',
                left,
                top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <LocationPin text={text} delay={delay} />
            </div>
          ))}
        </div>

        {/* Radar sweep — anchored to bottom center */}
        <Radar className="absolute -bottom-48 left-1/2 -translate-x-1/2" />

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[41] h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,196,125,0.18), transparent)' }}
        />

        {/* Top fade — fades radar into background at the top */}
        <div
          className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #06070A, transparent)' }}
        />

        {/* Left fade — blends radar into the dark text side */}
        <div
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #06070A, transparent)' }}
        />
      </div>

      {/* Text content — on top, left side */}
      <div className="relative" style={{ zIndex: 10, maxWidth: 520 }}>
        <h1
          className="font-display font-black uppercase leading-[0.9] tracking-[-2px] text-white mb-6"
          style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
        >
          Somos los fans<br />
          de Fórmula 1<br />
          de Sevilla.
        </h1>

        <p
          className="text-[18px] leading-[1.75] font-light mb-8"
          style={{ color: 'rgba(255,255,255,0.52)' }}
        >
          No somos una página de estadísticas.<br />
          Somos una comunidad real — nos reunimos,<br />
          gritamos juntos, sufrimos juntos y celebramos juntos.
        </p>

        {/* Member count badge */}
        <div
          className="inline-flex items-center gap-[10px] px-5 py-3 rounded-full border"
          style={{
            background: 'rgba(0,196,125,0.08)',
            borderColor: 'rgba(0,196,125,0.22)',
          }}
        >
          <div
            className="w-[8px] h-[8px] rounded-full flex-shrink-0"
            style={{ background: '#00C47D', boxShadow: '0 0 10px rgba(0,196,125,0.8)' }}
          />
          <span
            className="font-semibold text-[14px] tracking-[0.3px]"
            style={{ color: '#00C47D' }}
          >
            {memberCount} personas ya en el paddock
          </span>
        </div>
      </div>

    </div>
  )
}
