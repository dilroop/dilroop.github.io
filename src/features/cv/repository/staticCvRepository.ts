import cvJson from '@/content/cv.json'
import type { CvRepository } from '@/features/cv/repository/cvRepository'
import { cvDocumentSchema, type CvDocument } from '@/features/cv/schema'

export function createStaticCvRepository(): CvRepository {
  let cachedDocument: CvDocument | null = null

  return {
    async getCv() {
      cachedDocument ??= cvDocumentSchema.parse(cvJson)
      return cachedDocument
    },
  }
}
