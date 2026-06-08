/* eslint-disable react-refresh/only-export-components */

import { QueryClient } from '@tanstack/react-query'
import { createHashHistory } from '@tanstack/history'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router'
import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  House,
  Layers3,
  Mail,
  MoonStar,
  Phone,
} from 'lucide-react'

import { cvQueryOptions, useCvData } from '@/features/cv/useCvData'
import type { CvRepository } from '@/features/cv/repository/cvRepository'
import { useTheme } from '@/features/theme/ThemeProvider'
import { cn } from '@/shared/lib/cn'

type RouterContext = {
  cvRepository: CvRepository
  queryClient: QueryClient
}

const navItems = [
  { icon: House, label: 'Home', to: '/' },
  { icon: Layers3, label: 'Projects', to: '/projects' },
  { icon: BriefcaseBusiness, label: 'Experience', to: '/experience' },
  { icon: GraduationCap, label: 'Education', to: '/education' },
  { icon: Mail, label: 'Contact', to: '/contact' },
] as const

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cvQueryOptions(context.cvRepository)),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('@/features/cv/routes/HomePage'), 'HomePage'),
})

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: lazyRouteComponent(
    () => import('@/features/cv/routes/ProjectsPage'),
    'ProjectsPage',
  ),
})

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/$projectSlug',
  component: lazyRouteComponent(
    () => import('@/features/cv/routes/ProjectDetailPage'),
    'ProjectDetailPage',
  ),
})

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience',
  component: lazyRouteComponent(
    () => import('@/features/cv/routes/ExperiencePage'),
    'ExperiencePage',
  ),
})

const educationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/education',
  component: lazyRouteComponent(
    () => import('@/features/cv/routes/EducationPage'),
    'EducationPage',
  ),
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: lazyRouteComponent(() => import('@/features/cv/routes/ContactPage'), 'ContactPage'),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  projectDetailRoute,
  experienceRoute,
  educationRoute,
  contactRoute,
])

function ThemeButton() {
  const { toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10 dark:bg-white/5"
    >
      <MoonStar className="h-4.5 w-4.5" />
    </button>
  )
}

function RootLayout() {
  const { data } = useCvData()
  const socials = data.profile.socials.filter((social) => social.label.trim() && social.url.trim())
  const email = data.profile.email.trim()
  const phone = data.profile.phone?.trim() ?? ''
  const cvUrl = data.profile.cvUrl?.trim() ?? ''

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-black/8 bg-[color-mix(in_srgb,var(--surface)_84%,white)]/90 backdrop-blur-xl dark:border-white/8 dark:bg-[color-mix(in_srgb,var(--surface)_88%,black)]/88">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="min-w-0">
            <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">{data.profile.name}</p>
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
            <ThemeButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Outlet />
      </main>

      <footer className="border-t border-black/8 bg-[color-mix(in_srgb,var(--surface)_92%,white)] dark:border-white/8 dark:bg-[color-mix(in_srgb,var(--surface)_94%,black)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <p className="font-display text-2xl font-semibold">{data.profile.name}</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
              {data.profile.role}
            </p>
            {data.profile.location ? (
              <p className="mt-3 text-sm text-[var(--muted)]">{data.profile.location}</p>
            ) : null}
          </div>

          {(email || phone) ? (
            <div>
              <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Contact</h3>
              <div className="mt-4 grid gap-3 text-sm">
                {email ? (
                  <a
                    href={email}
                    className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                  >
                    <Mail className="h-4 w-4" />
                    {email.replace('mailto:', '')}
                  </a>
                ) : null}
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                  >
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <Link to="/" className="transition-colors hover:text-[var(--accent)]">
                Home
              </Link>
              <Link to="/projects" className="transition-colors hover:text-[var(--accent)]">
                Projects
              </Link>
              <Link to="/experience" className="transition-colors hover:text-[var(--accent)]">
                Experience
              </Link>
              <Link to="/education" className="transition-colors hover:text-[var(--accent)]">
                Education
              </Link>
              <Link to="/contact" className="transition-colors hover:text-[var(--accent)]">
                Contact
              </Link>
            </div>
            {socials.length ? (
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]"
                  >
                    {social.label}
                    {!social.url.startsWith('mailto:') ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : null}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  )
}

export function createAppRouter(context: RouterContext) {
  return createRouter({
    context,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    history: createHashHistory(),
    routeTree,
    scrollRestoration: true,
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}
