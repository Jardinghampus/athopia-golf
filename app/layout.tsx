import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Athopia Golf — AI-driven golfanalys',
  description: 'Personaliserade nyheter, djupanalys och live-statistik för golfentusiaster.',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="sv" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#BA7517" />
        </head>
        <body className="bg-[#0A0A08] text-[#F5F0E8]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
