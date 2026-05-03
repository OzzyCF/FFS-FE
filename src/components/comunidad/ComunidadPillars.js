import { Users, Calendar, Send } from 'lucide-react'

const pillars = [
  {
    icon: Users,
    title: 'Una comunidad',
    body: 'Fans reales de Sevilla que seguimos la F1 juntos. Sin elitismos, sin drama. Solo pasión.',
    accent: '#00C47D',
    borderColor: 'rgba(0,196,125,0.28)',
    bg: 'rgba(0,196,125,0.07)',
    barGradient: 'linear-gradient(90deg, transparent, #00C47D, transparent)',
  },
  {
    icon: Calendar,
    title: 'Watch parties',
    body: 'Cada carrera es un evento. Buscamos el mejor sitio de Sevilla para vivirla juntos.',
    accent: '#D4A843',
    borderColor: 'rgba(212,168,67,0.28)',
    bg: 'rgba(212,168,67,0.07)',
    barGradient: 'linear-gradient(90deg, transparent, #D4A843, transparent)',
  },
  {
    icon: Send,
    title: 'Un grupo de Telegram',
    body: 'Donde ocurre la conversación real. Análisis, memes, predicciones y mucho más.',
    accent: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(255,255,255,0.12)',
    bg: 'rgba(255,255,255,0.04)',
    barGradient: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
  },
]

export default function ComunidadPillars() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      style={{ animation: 'fadeUp 0.7s 0.18s ease both' }}
    >
      {pillars.map(({ icon: Icon, title, body, accent, borderColor, bg, barGradient }) => (
        <div
          key={title}
          className="rounded-glass border relative overflow-hidden"
          style={{
            background: 'rgba(6,7,10,0.60)',
            backdropFilter: 'blur(36px) saturate(200%)',
            WebkitBackdropFilter: 'blur(36px) saturate(200%)',
            borderColor,
            padding: '36px 32px',
          }}
        >
          {/* Inner shimmer */}
          <div className="absolute inset-0 rounded-glass pointer-events-none"
            style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />

          {/* Accent top bar */}
          <div className="absolute top-0 left-8 right-8 pointer-events-none"
            style={{ height: 2, background: barGradient, borderRadius: '0 0 2px 2px' }} />

          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
            style={{ background: bg, border: `1px solid ${borderColor}` }}
          >
            <Icon size={18} style={{ color: accent }} strokeWidth={1.75} />
          </div>

          {/* Title */}
          <div
            className="font-display font-black text-[22px] uppercase leading-none tracking-[-0.3px] mb-3"
            style={{ color: accent }}
          >
            {title}
          </div>

          {/* Body */}
          <p className="text-[14px] leading-[1.7] font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {body}
          </p>
        </div>
      ))}
    </div>
  )
}
