import type { CvDocument } from '@/features/cv/schema'

export function slugifyProjectName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function findProjectBySlug(projects: CvDocument['projects'], slug: string) {
  return projects.find((project) => slugifyProjectName(project.name) === slug)
}
