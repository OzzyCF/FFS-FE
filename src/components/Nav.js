'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPassword, signInWithOtp, signOut } from '@/lib/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Nav({ nickname }) {
  const router = useRouter()
  const [modalOpen,      setModalOpen]      = useState(false)
  const [modalEmail,     setModalEmail]     = useState('')
  const [modalPassword,  setModalPassword]  = useState('')
  const [modalStatus,    setModalStatus]    = useState('idle') // idle | loading | success
  const [modalError,     setModalError]     = useState(null)
  const [loginType,      setLoginType]      = useState(null)  // 'password' | 'otp'

  async function handleSignOut() {
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

  return (
    <>
      <nav className="sticky top-[14px] z-[100] px-7 max-w-[1180px] mx-auto mt-[14px]">
        <div
          className="flex items-center justify-between px-[22px] py-[13px] rounded-[18px] border border-[var(--color-border)]"
          style={{
            background: 'rgba(6,7,10,0.72)',
            backdropFilter: 'blur(44px) saturate(200%)',
            WebkitBackdropFilter: 'blur(44px) saturate(200%)',
          }}
        >
          {/* Logo */}
          <div
            className="font-black text-[20px] tracking-[-0.3px] font-[family:var(--font-stack)]"
            style={{
              background: 'linear-gradient(120deg, #00C47D 0%, #D4A843 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Formula Fan Sevilla
          </div>

          {/* Nav links */}
          <ul className="flex gap-7 list-none">
            {['Próxima Carrera', 'Eventos', 'Comunidad'].map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="text-[var(--color-dim)] no-underline text-[13px] font-medium tracking-[0.8px] uppercase transition-colors duration-[180ms] hover:text-white font-[family:var(--font-stack)]"
                >
                  {label}
                </a>
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
                className="text-[13px] font-medium cursor-pointer border-none bg-transparent transition-colors duration-[180ms] font-[family:var(--font-stack)] p-0"
                style={{ color: 'rgba(255,255,255,0.38)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
              >
                Ya soy miembro
              </button>
              <button
                onClick={() => document.getElementById('unete')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white border-none px-[22px] py-[9px] rounded-[10px] font-semibold text-[13px] cursor-pointer tracking-[0.2px] transition-all duration-[180ms] hover:opacity-[0.88] hover:-translate-y-px font-[family:var(--font-stack)]"
                style={{ background: 'linear-gradient(135deg, #00C47D 0%, #009B61 100%)' }}
              >
                Únete →
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Login modal */}
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
                    className="w-full text-white border-none py-[15px] px-8 rounded-btn font-bold text-[15px] cursor-pointer tracking-[0.3px] transition-all duration-200 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
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
