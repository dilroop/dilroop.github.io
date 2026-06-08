/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, type PropsWithChildren } from 'react'

import type { CvRepository } from '@/features/cv/repository/cvRepository'

type AppServices = {
  cvRepository: CvRepository
}

const AppServicesContext = createContext<AppServices | null>(null)

export function AppServicesProvider({
  children,
  services,
}: PropsWithChildren<{ services: AppServices }>) {
  return <AppServicesContext.Provider value={services}>{children}</AppServicesContext.Provider>
}

export function useAppServices() {
  const services = useContext(AppServicesContext)

  if (!services) {
    throw new Error('App services are not available.')
  }

  return services
}
