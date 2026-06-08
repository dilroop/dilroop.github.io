import { MoonStar, SunMedium } from 'lucide-react'

import { useTheme } from '@/features/theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10 dark:bg-white/5"
    >
      {theme === 'light' ? <MoonStar className="h-4.5 w-4.5" /> : <SunMedium className="h-4.5 w-4.5" />}
    </button>
  )
}
