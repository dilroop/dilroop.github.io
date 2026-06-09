import { Link } from '@tanstack/react-router'
import { ArrowDownToLine } from 'lucide-react'

import { navItems } from '@/app/navigation'
import { useCvData } from '@/features/cv/useCvData'
import { ThemeToggle } from '@/features/theme/ThemeToggle'
import { cn } from '@/shared/lib/cn'

export function AppHeader() {
  const { data } = useCvData()
  const cvUrl = data.profile.cvUrl?.trim() ?? ''

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-[color-mix(in_srgb,var(--surface)_84%,white)]/90 backdrop-blur-xl dark:border-white/8 dark:bg-[color-mix(in_srgb,var(--surface)_88%,black)]/88">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="min-w-0">
          <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">
            {data.profile.name}
          </p>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map(({ icon: Icon, label, to }) => (
            <Link
              key={to}
              to={to}
              activeOptions={to === '/' ? { exact: true } : undefined}
              activeProps={{
                className:
                  'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]',
              }}
              inactiveProps={{
                className:
                  'border-black/10 bg-black/5 text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10 dark:bg-white/5',
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {cvUrl ? (
            <a
              href={cvUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--surface)] transition hover:opacity-90 sm:inline-flex"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Download CV
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
