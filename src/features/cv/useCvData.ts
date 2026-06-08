import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { useAppServices } from '@/app/services'
import type { CvRepository } from '@/features/cv/repository/cvRepository'

export function cvQueryOptions(cvRepository: CvRepository) {
  return queryOptions({
    queryFn: () => cvRepository.getCv(),
    queryKey: ['cv-document'],
  })
}

export function useCvData() {
  const { cvRepository } = useAppServices()
  return useSuspenseQuery(cvQueryOptions(cvRepository))
}
