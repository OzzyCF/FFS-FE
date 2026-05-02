import { Barlow_Condensed, Stack_Sans_Headline } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const stackSans = Stack_Sans_Headline({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-stack',
  display: 'swap',
})

export const metadata = {
  title: 'Formula Fan Sevilla',
  description: 'La comunidad de motorsport de Sevilla — seguimos cada carrera juntos.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${barlowCondensed.variable} ${stackSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
