'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signUp(formData) {
  const supabase = await createClient()
  const email    = formData.get('email')
  const nickname = formData.get('nickname')
  const password = formData.get('password')

  const { error } = await supabase.auth.signUp({
    email,
    password: password || undefined,
    options: {
      data: { nickname },
    },
  })

  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signInWithPassword(formData) {
  const supabase = await createClient()
  const email    = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signInWithOtp(formData) {
  const supabase = await createClient()
  const email    = formData.get('email')

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
