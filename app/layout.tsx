import type { Metadata } from 'next'
import { Space_Mono, Kumbh_Sans } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({ weight: "400", subsets: ['latin'] })
const kumbhSans = Kumbh_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pomodoro App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>{children}</body>
    </html>
  )
}
