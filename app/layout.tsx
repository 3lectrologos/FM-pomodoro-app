import type { Metadata } from "next"
import { Space_Mono, Kumbh_Sans, Roboto_Slab } from "next/font/google"
import "./globals.css"
import { SettingsProvider } from "@/app/SettingsContext"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh-sans",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "Pomodoro App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${kumbhSans.variable} ${spaceMono.variable} ${robotoSlab.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
