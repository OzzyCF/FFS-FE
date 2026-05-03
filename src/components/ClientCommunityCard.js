'use client'

import { LiquidButton } from '@/components/ui/LiquidGlassButton'
import { UserPlus, Send, Users } from 'lucide-react'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'hoy'
  if (days === 1) return 'ayer'
  if (days < 7) return `hace ${days} días`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `hace ${weeks} sem.`
  const months = Math.floor(days / 30)
  if (months < 12) return `hace ${months} mes${months > 1 ? 'es' : ''}`
  return `hace ${Math.floor(months / 12)} año${Math.floor(months / 12) > 1 ? 's' : ''}`
}

export default function ClientCommunityCard({ isLoggedIn = false, nickname = null, members = [] }) {
  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden p-9 flex flex-col"
      style={{
        background: 'rgba(6,7,10,0.65)',
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

      {/* Header */}
      {isLoggedIn ? (
        <div className="mb-5">
          <div
            className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-4 border text-[var(--color-green)]"
            style={{ background: 'rgba(0,196,125,0.1)', borderColor: 'rgba(0,196,125,0.22)' }}
          >
            Comunidad
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-[8px] h-[8px] rounded-full flex-shrink-0"
              style={{ background: '#00C47D', boxShadow: '0 0 10px rgba(0,196,125,0.85)' }}
            />
            <div className="font-display font-bold text-[30px] leading-[1.05] tracking-[0px]">
              {nickname ? `Hola, ${nickname}` : 'Estás dentro'}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div
            className="inline-block px-[13px] py-[4px] rounded-[100px] text-[10px] font-bold uppercase tracking-[1.8px] mb-4 border text-[var(--color-gold)]"
            style={{ background: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.22)' }}
          >
            Comunidad
          </div>
          <div className="font-display font-black text-[32px] uppercase leading-[1.05] tracking-[-0.5px]">
            ¿Quién eres<br />en la parrilla?
          </div>
        </div>
      )}

      {/* Member list */}
      {members.length > 0 && (
        <div className="flex flex-col gap-[6px] mb-6 flex-1">
          {members.map((m, i) => (
            <div
              key={m.id}
              className="flex items-center justify-between py-[7px] border-b border-[var(--color-border)]"
              style={{ opacity: 1 - i * 0.09 }}
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ background: i < 3 ? '#00C47D' : 'rgba(255,255,255,0.2)' }}
                />
                <span className="text-[13px] font-medium text-white tracking-[0.2px]">
                  {m.nickname}
                </span>
              </div>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {timeAgo(m.created_at)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {isLoggedIn ? (
        <div>
          <p className="text-[var(--color-dim)] text-[13px] leading-[1.6] mb-5 font-light">
            Únete al grupo de Telegram y habla con otros fans de Sevilla en tiempo real.
          </p>
          <a
            href="https://t.me/formulafansevilla"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <LiquidButton
              size="lg"
              className="text-white font-semibold tracking-[0.2px]"
            >
              <Send size={16} strokeWidth={2} /> Únete al grupo
            </LiquidButton>
          </a>
        </div>
      ) : (
        <div>
          <p className="text-[var(--color-dim)] text-[13px] leading-[1.6] mb-5 font-light">
            Regístrate y únete a la conversación.
          </p>
          <LiquidButton
            size="lg"
            onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-semibold tracking-[0.2px]"
          >
            Crear mi perfil <UserPlus size={15} strokeWidth={2.5} />
          </LiquidButton>
        </div>
      )}
    </div>
  )
}
