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
  cvUrl: z.string().trim().optional().default(''),
  email: z.string().min(1),
  focusAreas: z.array(z.string()).default([]),
  hobbies: z.array(z.string()).optional().default([]),
  imageAlt: z.string().trim().optional().default(''),
  imageUrl: z.string().trim().optional().default(''),
  location: z.string().min(1),
  metrics: z.array(metricSchema).default([]),
  name: z.string().min(1),
  phone: z.string().trim().optional().default(''),
  role: z.string().min(1),
  roles: z.array(z.string()).optional().default([]),
  socials: z.array(socialLinkSchema).default([]),
  summary: z.array(z.string()).default([]),
  tagline: z.string().min(1),
})

const skillGroupSchema = z.object({
  items: z.array(z.string()).default([]),
  name: z.string().min(1),
})

const projectSchema = z.object({
  details: z.array(z.string()).optional().default([]),
  featured: z.boolean(),
  impact: z.string().min(1),
  imageAlt: z.string().trim().optional().default(''),
  imageUrl: z.string().trim().optional().default(''),
  links: z.array(socialLinkSchema),
  name: z.string().min(1),
  period: z.string().min(1),
  stack: z.array(z.string()).default([]),
  summary: z.string().min(1),
})

const experienceSchema = z.object({
  achievements: z.array(z.string()).default([]),
  company: z.string().min(1),
  end: z.string().min(1),
  location: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string()).default([]),
  start: z.string().min(1),
  summary: z.string().min(1),
})

const educationSchema = z.object({
  details: z.array(z.string()).default([]),
  end: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  qualification: z.string().min(1),
  start: z.string().min(1),
})

export const cvDocumentSchema = z.object({
  education: z.array(educationSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  profile: profileSchema,
  projects: z.array(projectSchema).default([]),
  skillGroups: z.array(skillGroupSchema).default([]),
})

export type CvDocument = z.infer<typeof cvDocumentSchema>
