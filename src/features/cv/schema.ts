import { z } from 'zod'

const socialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
})

const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

const profileSchema = z.object({
  availability: z.string().min(1),
  email: z.string().min(1),
  focusAreas: z.array(z.string().min(1)).min(1),
  location: z.string().min(1),
  metrics: z.array(metricSchema).min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  socials: z.array(socialLinkSchema).min(1),
  summary: z.array(z.string().min(1)).min(1),
  tagline: z.string().min(1),
})

const skillGroupSchema = z.object({
  items: z.array(z.string().min(1)).min(1),
  name: z.string().min(1),
})

const projectSchema = z.object({
  featured: z.boolean(),
  impact: z.string().min(1),
  links: z.array(socialLinkSchema),
  name: z.string().min(1),
  period: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
})

const experienceSchema = z.object({
  achievements: z.array(z.string().min(1)).min(1),
  company: z.string().min(1),
  end: z.string().min(1),
  location: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  start: z.string().min(1),
  summary: z.string().min(1),
})

const educationSchema = z.object({
  details: z.array(z.string().min(1)).min(1),
  end: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  qualification: z.string().min(1),
  start: z.string().min(1),
})

export const cvDocumentSchema = z.object({
  education: z.array(educationSchema).min(1),
  experience: z.array(experienceSchema).min(1),
  profile: profileSchema,
  projects: z.array(projectSchema).min(1),
  skillGroups: z.array(skillGroupSchema).min(1),
})

export type CvDocument = z.infer<typeof cvDocumentSchema>
