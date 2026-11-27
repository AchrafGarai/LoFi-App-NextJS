'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTheme } from 'next-themes'
import { CheckIcon, ChevronDownIcon } from './icons'

export const THEMES = [
  { id: 'dark', label: 'Lime', swatch: '#b0f53e' },
  { id: 'blue', label: 'Cyan', swatch: '#4ce9e9' },
  { id: 'violet', label: 'Violet', swatch: '#b39ffe' },
  { id: 'pink', label: 'Pink', swatch: '#ef9ad5' },
  { id: 'spotify', label: 'Green', swatch: '#1cd064' },
  { id: 'white', label: 'Light', swatch: '#ffffff' },
] as const

export function ThemeMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-raised">
        <span aria-hidden="true" className="size-4 rounded-full bg-accent" />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-44 rounded-2xl border border-muted/15 bg-surface p-1.5 text-fg shadow-xl"
        >
          <DropdownMenu.Label className="px-3 py-2 text-xs text-muted">Theme</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            {THEMES.map((option) => (
              <DropdownMenu.RadioItem
                key={option.id}
                value={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none data-[highlighted]:bg-raised"
              >
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border border-muted/30"
                  style={{ background: option.swatch }}
                />
                <span className="flex-1">{option.label}</span>
                <DropdownMenu.ItemIndicator>
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
