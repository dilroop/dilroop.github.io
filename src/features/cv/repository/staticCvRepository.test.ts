import { describe, expect, it } from 'vitest'

import { createStaticCvRepository } from '@/features/cv/repository/staticCvRepository'

describe('createStaticCvRepository', () => {
  it('returns schema-validated content', async () => {
    const repository = createStaticCvRepository()
    const data = await repository.getCv()

    expect(data.profile.name).toBeTruthy()
    expect(data.projects.length).toBeGreaterThan(0)
    expect(data.experience.length).toBeGreaterThan(0)
  })
})
