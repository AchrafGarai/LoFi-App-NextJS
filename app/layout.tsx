import type { Metadata, Viewport } from 'next'
import { Navigation } from '@/components/navigation'
import { PlayerBar } from '@/components/player/player-bar'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Lo-Fi: beats to relax and study to', template: '%s · Lo-Fi' },
  description: 'A lo-fi music player with playlists, shuffle, repeat and six colour themes.',
}

export const viewport: Viewport = {
  themeColor: '#090c05',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // next-themes sets data-theme before hydration, so the attribute differs.
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <a
            href="#content"
            className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Navigation />
          <main id="content" className="mx-auto max-w-6xl px-4 pb-36 md:px-6">
            {children}
          </main>
          <PlayerBar />
        </Providers>
      </body>
    </html>
  )
}
