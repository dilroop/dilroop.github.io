/* eslint-disable react-refresh/only-export-components */

import { QueryClient } from '@tanstack/react-query'
import { createHashHistory } from '@tanstack/history'
import {
  Outlet,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router'

import { AppFooter } from '@/app/components/AppFooter'
import { AppHeader } from '@/app/components/AppHeader'
import { cvQueryOptions, useCvData } from '@/features/cv/useCvData'
import type { CvRepository } from '@/features/cv/repository/cvRepository'

type RouterContext = {
  cvRepository: CvRepository
  queryClient: QueryClient
}

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

function RootLayout() {
  useCvData()

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Outlet />
      </main>
      <AppFooter />
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
