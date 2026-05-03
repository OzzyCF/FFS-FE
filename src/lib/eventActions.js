'use server'

import { createClient } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'

export async function rsvpToEvent(eventId, status) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('event_interest')
    .upsert({
      event_id: eventId,
      user_id: user.id,
      status,
    }, {
      onConflict: 'event_id,user_id'
    })

  if (error) return { error: error.message }

  revalidatePath('/')
  return { success: true }
}

export async function cancelRsvp(eventId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('event_interest')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/')
  return { success: true }
}
