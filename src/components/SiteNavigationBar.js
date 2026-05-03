'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPassword, signInWithOtp, signOut } from '@/lib/memberAuthActions'
import { UserPlus, Menu, X, LogOut, DoorOpen } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Nav({ nickname }) {
  const router = useRouter()
  const [modalOpen,      setModalOpen]      = useState(false)
  const [modalEmail,     setModalEmail]     = useState('')
  const [modalPassword,  setModalPassword]  = useState('')
  const [modalStatus,    setModalStatus]    = useState('idle') // idle | loading | success
  const [modalError,     setModalError]     = useState(null)
  const [loginType,      setLoginType]      = useState(null)  // 'password' | 'otp'
  const [menuOpen,       setMenuOpen]       = useState(false)

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
  }

  function closeModal() {
    setModalOpen(false)
    setModalEmail('')
    setModalPassword('')
    setModalStatus('idle')
    setModalError(null)
    setLoginType(null)
  }

  async function handleModalSubmit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(modalEmail)) {
      setModalError('Introduce un email válido.')
      return
    }
    setModalError(null)
    setModalStatus('loading')

    if (modalPassword) {
      const formData = new FormData()
      formData.append('email', modalEmail)
      formData.append('password', modalPassword)
      const result = await signInWithPassword(formData)
      if (result?.error) {
        setModalError(result.error)
        setModalStatus('idle')
      } else {
        setLoginType('password')
        setModalStatus('success')
        router.refresh()
        setTimeout(closeModal, 1500)
      }
    } else {
      const formData = new FormData()
      formData.append('email', modalEmail)
      const result = await signInWithOtp(formData)
      if (result?.error) {
        setModalError(result.error)
        setModalStatus('idle')
      } else {
        setLoginType('otp')
        setModalStatus('success')
      }
    }
  }

  const glassStyle = {
    background: 'rgba(6,7,10,0.72)',
    backdropFilter: 'blur(44px) saturate(200%)',
    WebkitBackdropFilter: 'blur(44px) saturate(200%)',
  }

  return (
    <>
      <nav className="sticky top-[14px] z-[100] px-5 md:px-7 max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto mt-[14px] relative">

        {/* ── DESKTOP NAV ── */}
        <div
          className="hidden md:flex items-center justify-between px-[22px] py-[13px] rounded-full border border-[var(--color-border)]"
          style={glassStyle}
        >
          {/* Logo */}
          <img src="/images/logo-ffs.svg" alt="Formula Fan Sevilla" className="h-8 w-auto" />

          {/* Nav links */}
          <ul className="flex items-center gap-0 list-none">
            {[
              { label: 'Carreras',  href: '/carreras' },
              { label: 'Eventos',   href: '/eventos' },
              { label: 'Comunidad', href: '/comunidad' },
            ].map(({ label, href }, i, arr) => (
              <li key={label} className="flex items-center">
                <button
                  onClick={() => router.push(href)}
                  className="text-white text-[22px] font-black tracking-[4px] uppercase font-display border-none bg-transparent cursor-pointer px-5 py-1"
                  onMouseEnter={e => {
                    e.currentTarget.style.transition = 'color 180ms, text-shadow 180ms'
                    e.currentTarget.style.color = '#00C47D'
                    e.currentTarget.style.textShadow = '0 0 12px rgba(0,196,125,0.7)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transition = 'color 1000ms, text-shadow 1000ms'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  {label}
                </button>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, userSelect: 'none' }}>|</span>
                )}
              </li>
            ))}
          </ul>

          {/* User state */}
          {nickname ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-[7px]">
                <div
                  className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                  style={{ background: '#00C47D', boxShadow: '0 0 8px rgba(0,196,125,0.75)' }}
                />
                <span
                  className="text-[13px] font-semibold font-[family:var(--font-stack)]"
                  style={{ color: 'rgba(255,255,255,0.88)' }}
                >
                  {nickname}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-[12px] font-medium cursor-pointer border-none bg-transparent transition-colors duration-[180ms] font-[family:var(--font-stack)] p-0"
                style={{ color: 'rgba(255,255,255,0.32)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-[6px] text-[13px] font-medium cursor-pointer border-none bg-transparent transition-colors duration-[180ms] font-[family:var(--font-stack)] p-0"
                style={{ color: 'rgba(255,255,255,0.38)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
              >
                <DoorOpen size={14} strokeWidth={2} />
                Entrar
              </button>
              <button
                onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-[7px] text-white border-none px-[22px] py-[9px] rounded-full font-semibold text-[13px] cursor-pointer tracking-[0.2px] transition-all duration-[180ms] hover:opacity-[0.88] hover:-translate-y-px font-[family:var(--font-stack)]"
                style={{ background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)' }}
              >
                Únete
                <UserPlus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* ── MOBILE NAV ── */}
        <div
          className="flex md:hidden items-center px-[18px] py-[12px] rounded-full border border-[var(--color-border)]"
          style={glassStyle}
        >
          {/* Logo — always left */}
          <img src="/images/logo-ffs.svg" alt="Formula Fan Sevilla" className="h-7 w-auto flex-shrink-0" />

          {/* Center area */}
          {nickname ? (
            /* Logged in: nickname centered */
            <div className="flex-1 flex items-center justify-center gap-[7px]">
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: '#00C47D', boxShadow: '0 0 7px rgba(0,196,125,0.8)' }}
              />
              <span
                className="text-[13px] font-semibold font-[family:var(--font-stack)] truncate max-w-[140px]"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                {nickname}
              </span>
            </div>
          ) : (
            /* Not logged in: Entrar + Únete right-aligned before burger */
            <div className="flex-1 flex items-center justify-end gap-2 pr-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-[5px] text-[12px] font-medium cursor-pointer border-none bg-transparent transition-colors duration-[180ms] font-[family:var(--font-stack)]"
                style={{ color: 'rgba(255,255,255,0.42)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
              >
                <DoorOpen size={13} strokeWidth={2} />
                Entrar
              </button>
              <button
                onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-[6px] text-white border-none px-4 py-[7px] rounded-full font-semibold text-[12px] cursor-pointer tracking-[0.2px] font-[family:var(--font-stack)]"
                style={{ background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)' }}
              >
                Únete
                <UserPlus size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Burger — always right */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 border-none bg-transparent cursor-pointer text-white"
          >
            {menuOpen ? <X size={19} strokeWidth={2} /> : <Menu size={19} strokeWidth={2} />}
          </button>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {menuOpen && (
          <div
            className="md:hidden absolute left-0 right-0 mt-2 rounded-2xl border border-[var(--color-border)] overflow-hidden"
            style={{
              background: 'rgba(6,7,10,0.97)',
              backdropFilter: 'blur(44px) saturate(200%)',
              WebkitBackdropFilter: 'blur(44px) saturate(200%)',
            }}
          >
            {/* Nav links */}
            {[
              { label: 'Carreras',  href: '/carreras' },
              { label: 'Eventos',   href: '/eventos' },
              { label: 'Comunidad', href: '/comunidad' },
            ].map(({ label, href }) => (
              <button
                key={label}
                onClick={() => { setMenuOpen(false); router.push(href) }}
                className="w-full text-left px-6 py-[17px] text-white text-[28px] font-black uppercase tracking-[4px] border-none bg-transparent cursor-pointer font-display"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </button>
            ))}

            {/* Auth row — only shown when logged in */}
            {nickname && (
              <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-[8px] border-none bg-transparent cursor-pointer transition-colors duration-150 font-[family:var(--font-stack)]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  <LogOut size={15} strokeWidth={2} />
                  <span className="text-[13px] font-medium">Salir</span>
                </button>
              </div>
            )}
          </div>
        )}

      </nav>

      {/* ── LOGIN MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[420px] rounded-glass border border-[var(--color-border)] overflow-hidden"
            style={{
              background: 'rgba(8,9,13,0.94)',
              backdropFilter: 'blur(44px) saturate(200%)',
              WebkitBackdropFilter: 'blur(44px) saturate(200%)',
              padding: '48px 44px 44px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Inner highlight */}
            <div
              className="absolute inset-0 rounded-glass pointer-events-none"
              style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }}
            />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border-none bg-transparent cursor-pointer transition-colors duration-150 text-[16px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              ✕
            </button>

            {modalStatus === 'success' ? (
              <div className="text-center">
                {loginType === 'password' ? (
                  <>
                    <div className="text-[44px] mb-5">✅</div>
                    <div className="font-display font-black text-[30px] uppercase leading-[1] mb-3 tracking-[-0.5px]">
                      ¡Bienvenido!
                    </div>
                    <p className="text-[var(--color-dim)] text-[14px] leading-[1.65] font-light max-w-[280px] mx-auto">
                      Sesión iniciada correctamente.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-[44px] mb-5">📬</div>
                    <div className="font-display font-black text-[30px] uppercase leading-[1] mb-3 tracking-[-0.5px]">
                      ¡Revisa tu email!
                    </div>
                    <p className="text-[var(--color-dim)] text-[14px] leading-[1.65] font-light max-w-[280px] mx-auto">
                      Te hemos enviado un enlace para acceder al paddock.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="font-display font-black text-[34px] uppercase leading-[1.02] mb-3 tracking-[-0.5px]">
                  Bienvenido<br />de vuelta
                </div>
                <p className="text-[var(--color-dim)] text-[14px] leading-[1.65] mb-7 font-light">
                  Introduce tu email y te enviamos un enlace.
                </p>

                <form onSubmit={handleModalSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={modalEmail}
                      onChange={e => { setModalEmail(e.target.value); setModalError(null) }}
                      disabled={modalStatus === 'loading'}
                      className="w-full px-5 py-[14px] rounded-btn text-[15px] text-white outline-none transition-all duration-200 border disabled:opacity-50"
                      style={{
                        background: modalError ? 'rgba(255,80,80,0.04)' : 'rgba(255,255,255,0.045)',
                        borderColor: modalError ? 'rgba(255,100,100,0.5)' : 'rgba(255,255,255,0.09)',
                        fontFamily: 'var(--font-body)',
                      }}
                      onFocus={e => { if (!modalError) { e.target.style.borderColor = 'rgba(0,196,125,0.44)'; e.target.style.background = 'rgba(0,196,125,0.035)' } }}
                      onBlur={e => { if (!modalError) { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.045)' } }}
                    />
                    {modalError && (
                      <span className="text-[12px] pl-1" style={{ color: 'rgba(255,120,120,0.9)' }}>
                        {modalError}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={modalPassword}
                      onChange={e => setModalPassword(e.target.value)}
                      disabled={modalStatus === 'loading'}
                      className="w-full px-5 py-[14px] rounded-btn text-[15px] text-white outline-none transition-all duration-200 border disabled:opacity-50"
                      style={{
                        background: 'rgba(255,255,255,0.045)',
                        borderColor: 'rgba(255,255,255,0.09)',
                        fontFamily: 'var(--font-body)',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,196,125,0.44)'; e.target.style.background = 'rgba(0,196,125,0.035)' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.045)' }}
                    />
                    <span className="text-[12px] pl-1" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                      ¿Sin contraseña? Te enviamos un enlace
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={modalStatus === 'loading'}
                    className="w-full text-white border-none py-[15px] px-8 rounded-full font-bold text-[15px] cursor-pointer tracking-[0.3px] transition-all duration-200 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)',
                      boxShadow: '0 0 48px rgba(0,196,125,0.25)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={e => { if (modalStatus !== 'loading') e.currentTarget.style.boxShadow = '0 0 72px rgba(0,196,125,0.42)' }}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 48px rgba(0,196,125,0.25)'}
                  >
                    {modalStatus === 'loading' ? 'Enviando...' : (modalPassword ? 'Entrar →' : 'Enviarme el enlace →')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
