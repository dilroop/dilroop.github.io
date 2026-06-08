import type { CvDocument } from '@/features/cv/schema'

export interface CvRepository {
  getCv: () => Promise<CvDocument>
}
