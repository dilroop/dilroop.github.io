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
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, House, Mail } from 'lucide-react'

import { cvQueryOptions, useCvData } from '@/features/cv/useCvData'
import type { CvRepository } from '@/features/cv/repository/cvRepository'
import { ThemeToggle } from '@/features/theme/ThemeToggle'
import { cn } from '@/shared/lib/cn'

type RouterContext = {
  cvRepository: CvRepository
  queryClient: QueryClient
}

const navItems = [
  { icon: House, label: 'About', to: '/' },
  { icon: BriefcaseBusiness, label: 'Projects', to: '/projects' },
  { icon: ArrowUpRight, label: 'Experience', to: '/experience' },
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
  component: lazyRouteComponent(() => import('@/features/cv/routes/AboutPage'), 'AboutPage'),
})

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: lazyRouteComponent(
    () => import('@/features/cv/routes/ProjectsPage'),
    'ProjectsPage',
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
  experienceRoute,
  educationRoute,
  contactRoute,
])

function RootLayout() {
  const { data } = useCvData()

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:flex-row lg:px-8 lg:py-8">
        <aside className="panel relative overflow-hidden lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-[23rem] lg:flex-none">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,var(--accent-soft),transparent_68%)]" />
          <div className="relative flex h-full flex-col gap-8 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                  {data.profile.availability}
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {data.profile.name}
                </h1>
                <p className="mt-3 max-w-sm text-lg text-[var(--muted)]">
                  {data.profile.role}
                </p>
              </div>
              <ThemeToggle />
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
              {data.profile.tagline}
            </p>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {data.profile.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/55 px-4 py-4 backdrop-blur dark:bg-white/5"
                >
                  <p className="font-display text-2xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <nav className="flex flex-wrap gap-2">
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

            <div className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.profile.focusAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-[var(--muted)] dark:border-white/10 dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                {data.profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]"
                  >
                    {social.label}
                    {!social.url.startsWith('mailto:') && <ArrowUpRight className="h-3.5 w-3.5" />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="panel min-h-full p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
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
