import { Barlow_Condensed } from 'next/font/google'
import '@fontsource-variable/stack-sans-headline'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata = {
  title: 'Formula Fan Sevilla',
  description: 'La comunidad de motorsport de Sevilla — seguimos cada carrera juntos.',
  icons: {
    icon: '/images/logo-ffs.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={barlowCondensed.variable}>
      <body>{children}</body>
    </html>
  )
}
