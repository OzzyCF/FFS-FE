'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const AuthContext = createContext({ user: null, nickname: null, loading: true })

export function AuthProvider({ children }) {
  const [user,     setUser]     = useState(null)
  const [nickname, setNickname] = useState(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    async function fetchNickname(userId) {
      const { data } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('id', userId)
        .single()
      if (data?.nickname && mounted) setNickname(data.nickname)
    }

    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user && mounted) {
        setUser(session.user)
        await fetchNickname(session.user.id)
      }
      if (mounted) setLoading(false)
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        if (session?.user) {
          setUser(session.user)
          await fetchNickname(session.user.id)
        } else {
          setUser(null)
          setNickname(null)
        }
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, nickname, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
