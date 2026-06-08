import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { createAppQueryClient } from '@/app/queryClient'
import { createAppRouter } from '@/app/router'
import { AppServicesProvider } from '@/app/services'
import { createStaticCvRepository } from '@/features/cv/repository/staticCvRepository'
import { ThemeProvider } from '@/features/theme/ThemeProvider'

const cvRepository = createStaticCvRepository()
const queryClient = createAppQueryClient()
const router = createAppRouter({ cvRepository, queryClient })

export function App() {
  return (
    <ThemeProvider>
      <AppServicesProvider services={{ cvRepository }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppServicesProvider>
    </ThemeProvider>
  )
}

export default App
