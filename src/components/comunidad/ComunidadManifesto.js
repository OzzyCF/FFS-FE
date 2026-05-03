export default function ComunidadManifesto() {
  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden mb-6"
      style={{
        background: 'rgba(6,7,10,0.65)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '48px 52px',
        animation: 'fadeUp 0.7s 0.12s ease both',
      }}
    >
      {/* Inner shimmer */}
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />

      {/* Gold top bar */}
      <div className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{ height: 2, background: 'linear-gradient(90deg, transparent, #D4A843, transparent)', borderRadius: '0 0 2px 2px' }} />

      {/* Section title */}
      <div
        className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-8 border"
        style={{
          background: 'rgba(212,168,67,0.1)',
          borderColor: 'rgba(212,168,67,0.28)',
          color: '#D4A843',
        }}
      >
        El Paddock de Sevilla
      </div>

      {/* Body copy */}
      <div
        className="text-[18px] leading-[1.85] font-light max-w-[680px]"
        style={{ color: 'rgba(255,255,255,0.72)' }}
      >
        <p className="mb-5">
          Sevilla tiene pasión para todo. Para el fútbol,
          para la Semana Santa, para las Ferias, para la vida.
        </p>
        <p className="mb-5">
          Y ahora también para la Fórmula 1.
        </p>
        <p className="mb-5">
          Formula Fan Sevilla nació porque ningún gran
          deporte merece vivirse solo frente a una pantalla.
          Cada carrera es un evento. Cada clasificación
          es una excusa para reunirse.
        </p>
        <p>
          Llevamos los colores de Andalucía — verde y oro —
          al paddock más apasionado del mundo.
        </p>
      </div>

    </div>
  )
}
