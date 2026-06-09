import {
  BriefcaseBusiness,
  GraduationCap,
  House,
  Layers3,
  Mail,
} from 'lucide-react'

export const navItems = [
  { icon: House, label: 'Home', to: '/' },
  { icon: Layers3, label: 'Projects', to: '/projects' },
  { icon: BriefcaseBusiness, label: 'Experience', to: '/experience' },
  { icon: GraduationCap, label: 'Education', to: '/education' },
  { icon: Mail, label: 'Contact', to: '/contact' },
] as const
