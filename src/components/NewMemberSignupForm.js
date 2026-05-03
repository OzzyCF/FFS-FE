'use client'

import { useState } from 'react'
import { signUp } from '@/lib/memberAuthActions'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NICK_RE  = /^[a-zA-Z0-9_]+$/

export default function JoinForm() {
  const [nickname,  setNickname]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [errors,    setErrors]    = useState({})
  const [status,    setStatus]    = useState('idle') // idle | loading | success
  const [authError, setAuthError] = useState(null)

  function validate() {
    const e = {}
    if (nickname.length < 3)          e.nickname = 'Mínimo 3 caracteres.'
    else if (!NICK_RE.test(nickname))  e.nickname = 'Solo letras, números y _ (sin espacios).'
    if (!EMAIL_RE.test(email))         e.email    = 'Introduce un email válido.'
    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    setAuthError(null)
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStatus('loading')
    const formData = new FormData()
    formData.set('email', email)
    formData.set('nickname', nickname)
    if (password) formData.set('password', password)
    const result = await signUp(formData)
    if (result?.error) {
      setAuthError(result.error)
      setStatus('idle')
    } else {
      setStatus('success')
    }
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div
        className="rounded-glass border border-[var(--color-border)] relative overflow-hidden text-center"
        style={{
          background: 'rgba(6,7,10,0.65)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          padding: '56px 52px',
        }}
      >
        <div className="absolute inset-0 rounded-glass pointer-events-none"
          style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
        <div className="text-[48px] mb-6">📬</div>
        <div className="font-display font-black text-[36px] uppercase leading-[1] mb-4 tracking-[-0.5px]">
          ¡Revisa tu email!
        </div>
        <p className="text-[var(--color-dim)] text-[16px] leading-[1.65] font-light max-w-[360px] mx-auto">
          Te hemos enviado un enlace para acceder al paddock.
        </p>
      </div>
    )
  }

  /* ── Form (idle / loading) ── */
  const busy = status === 'loading'

  return (
    <div
      className="rounded-glass border border-[var(--color-border)] relative overflow-hidden text-center"
      style={{
        background: 'rgba(6,7,10,0.65)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        padding: '56px 52px',
        animation: 'fadeUp 0.7s 0.1s ease both',
      }}
    >
      <div className="absolute inset-0 rounded-glass pointer-events-none"
        style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />

      {/* Title */}
      <div className="font-display font-black text-[56px] uppercase leading-[0.92] mb-[18px] tracking-[-1px]">
        Únete.<br />
        <span style={{
          background: 'linear-gradient(120deg, #00C47D 0%, #D4A843 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Es gratis.
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-[var(--color-dim)] text-[16px] leading-[1.65] mb-9 font-light max-w-[420px] mx-auto">
        Solo necesitamos tu apodo y tu email. Sin formularios eternos, sin tarjeta de crédito. Solo Fórmula 1 y Sevilla.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">

        {/* Nickname */}
        <div className="flex flex-col gap-1 text-left">
          <input
            type="text"
            placeholder="Tu apodo en el paddock..."
            value={nickname}
            onChange={e => { setNickname(e.target.value); setErrors(v => ({ ...v, nickname: null })) }}
            disabled={busy}
            className="w-full px-5 py-[15px] rounded-btn text-[15px] text-white outline-none transition-all duration-200 border disabled:opacity-50 placeholder:text-white/50"
            style={{
              background: errors.nickname ? 'rgba(255,80,80,0.04)' : 'rgba(255,255,255,0.045)',
              borderColor: errors.nickname ? 'rgba(255,100,100,0.5)' : 'rgba(255,255,255,0.09)',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={e => { if (!errors.nickname) { e.target.style.borderColor = 'rgba(0,196,125,0.44)'; e.target.style.background = 'rgba(0,196,125,0.035)' } }}
            onBlur={e  => { if (!errors.nickname) { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.045)' } }}
          />
          {errors.nickname && (
            <span className="text-[12px] text-left pl-1" style={{ color: 'rgba(255,120,120,0.9)' }}>
              {errors.nickname}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 text-left">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: null })) }}
            disabled={busy}
            className="w-full px-5 py-[15px] rounded-btn text-[15px] text-white outline-none transition-all duration-200 border disabled:opacity-50"
            style={{
              background: errors.email ? 'rgba(255,80,80,0.04)' : 'rgba(255,255,255,0.045)',
              borderColor: errors.email ? 'rgba(255,100,100,0.5)' : 'rgba(255,255,255,0.09)',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={e => { if (!errors.email) { e.target.style.borderColor = 'rgba(0,196,125,0.44)'; e.target.style.background = 'rgba(0,196,125,0.035)' } }}
            onBlur={e  => { if (!errors.email)  { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.045)' } }}
          />
          {errors.email && (
            <span className="text-[12px] text-left pl-1" style={{ color: 'rgba(255,120,120,0.9)' }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Password (optional) */}
        <div className="flex flex-col gap-1 text-left">
          <label className="text-[12px] font-medium pl-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
            Contraseña (opcional)
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={busy}
            className="w-full px-5 py-[15px] rounded-btn text-[15px] text-white outline-none transition-all duration-200 border disabled:opacity-50"
            style={{
              background: 'rgba(255,255,255,0.045)',
              borderColor: 'rgba(255,255,255,0.09)',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={e => { e.target.style.borderColor = 'rgba(0,196,125,0.44)'; e.target.style.background = 'rgba(0,196,125,0.035)' }}
            onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.045)' }}
          />
          <span className="text-[12px] pl-1" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            Si no introduces contraseña usaremos magic link por email
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="w-full text-white border-none py-[17px] px-8 rounded-full font-bold text-[16px] cursor-pointer tracking-[0.3px] transition-all duration-200 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)',
            boxShadow: '0 0 48px rgba(0,196,125,0.28)',
            fontFamily: 'var(--font-body)',
          }}
          onMouseEnter={e => { if (!busy) e.currentTarget.style.boxShadow = '0 0 72px rgba(0,196,125,0.44)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 48px rgba(0,196,125,0.28)' }}
        >
          {busy ? 'Enviando...' : 'Entrar al paddock →'}
        </button>

        {/* Auth error */}
        {authError && (
          <p className="text-[13px] mt-1" style={{ color: 'rgba(255,120,120,0.9)' }}>
            {authError}
          </p>
        )}
      </form>

      <p className="mt-4 text-[12px] text-[var(--color-faint)] tracking-[0.3px]">
        Sin tarjeta. Sin compromisos. Siempre gratis.
      </p>
    </div>
  )
}
