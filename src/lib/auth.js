import { createClient } from '@/lib/supabase/client'

export async function signUp(email, nickname) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password: null,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: { nickname },
    },
  })
  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
