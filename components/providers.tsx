'use client'

import { ThemeProvider } from 'next-themes'
import { THEMES } from './theme-menu'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={THEMES.map((theme) => theme.id)}
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
