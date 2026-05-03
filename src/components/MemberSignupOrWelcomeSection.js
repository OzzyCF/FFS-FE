import { createClient } from '@/lib/supabase/serverClient'
import JoinForm from '@/components/NewMemberSignupForm'

export default async function AuthAwareJoinSection() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return <JoinForm />

  const { data } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', user.id)
    .single()

  const nickname = data?.nickname ?? null

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden text-center"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '56px 52px',
        animation: 'fadeUp 0.5s ease both',
      }}
    >
      <div
        className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
      />

      {/* Green top bar */}
      <div
        className="absolute top-0 left-12 right-12 pointer-events-none"
        style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, #00C47D, transparent)',
          borderRadius: '0 0 2px 2px',
        }}
      />

      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className="w-[10px] h-[10px] rounded-full flex-shrink-0"
          style={{ background: '#00C47D', boxShadow: '0 0 14px rgba(0,196,125,0.85)' }}
        />
        <div className="font-display font-black text-[34px] uppercase leading-[1] tracking-[-0.5px]">
          Estás en el paddock{nickname ? `, ${nickname}` : ''}
        </div>
      </div>

      <p className="text-[var(--color-dim)] text-[16px] leading-[1.65] font-light max-w-[400px] mx-auto">
        Ya eres parte del club. ¡Nos vemos en la próxima quedada!
      </p>
    </div>
  )
}
