import { createClient } from '@/lib/supabase/server'
import Nav from './Nav'

export default async function NavServer() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let nickname = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('nickname')
      .eq('id', user.id)
      .single()
    nickname = data?.nickname ?? null
  }

  return <Nav nickname={nickname} />
}
