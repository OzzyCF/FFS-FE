import { createClient } from '@/lib/supabase/serverClient'
import ComunidadHeader from '@/components/comunidad/ComunidadHeader'
import ComunidadHero from '@/components/comunidad/ComunidadHero'
import ComunidadManifesto from '@/components/comunidad/ComunidadManifesto'
import ComunidadPillars from '@/components/comunidad/ComunidadPillars'
import ComunidadTelegram from '@/components/comunidad/ComunidadTelegram'
import Footer from '@/components/SiteFooter'

export const metadata = {
  title: 'Comunidad — Formula Fan Sevilla',
  description: 'La comunidad de fans de Fórmula 1 de Sevilla. Únete al paddock.',
}

export default async function ComunidadPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { count: memberCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return (
    <>
      {/* TODO: page-specific background — to be decided */}

      <div className="relative z-[2] min-h-screen">
        <ComunidadHeader />

        <main className="relative z-[2] max-w-[1180px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-7 pt-8 pb-[80px]">
          <ComunidadHero memberCount={memberCount ?? 0} />
          <ComunidadManifesto />
          <ComunidadPillars />
          <ComunidadTelegram />
        </main>

        <Footer />
      </div>
    </>
  )
}
