import type { IconType } from 'react-icons'
import {
  SiAndroid,
  SiFirebase,
  SiFlutter,
  SiGithubactions,
  SiGraphql,
  SiKotlin,
  SiSwift,
  SiTypescript,
} from 'react-icons/si'
import {
  Blocks,
  BrainCircuit,
  Code2,
  Combine,
  Component,
  Database,
  Droplets,
  GitBranchPlus,
  Layers3,
  Orbit,
  Radar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
  Waypoints,
} from 'lucide-react'

type TechBadgeProps = {
  label: string
}

type TechVisual = {
  accentClassName: string
  icon: IconType | typeof Code2
}

const techIconMap: Array<[string, TechVisual]> = [
  ['kotlin', { icon: SiKotlin, accentClassName: 'text-[#7f52ff]' }],
  ['java', { icon: Code2, accentClassName: 'text-[#ea580c]' }],
  ['android', { icon: SiAndroid, accentClassName: 'text-[#34a853]' }],
  ['jetpack compose', { icon: Component, accentClassName: 'text-sky-500' }],
  ['compose', { icon: Component, accentClassName: 'text-sky-500' }],
  ['coroutines', { icon: Waypoints, accentClassName: 'text-cyan-500' }],
  ['flow', { icon: Droplets, accentClassName: 'text-cyan-500' }],
  ['flutter', { icon: SiFlutter, accentClassName: 'text-[#47c5fb]' }],
  ['swiftui', { icon: SiSwift, accentClassName: 'text-[#f97316]' }],
  ['swift', { icon: SiSwift, accentClassName: 'text-[#f97316]' }],
  ['mvvm', { icon: Layers3, accentClassName: 'text-violet-500' }],
  ['clean architecture', { icon: Blocks, accentClassName: 'text-amber-500' }],
  ['dependency injection', { icon: GitBranchPlus, accentClassName: 'text-emerald-500' }],
  ['kmm', { icon: Combine, accentClassName: 'text-fuchsia-500' }],
  ['multiplatform', { icon: Combine, accentClassName: 'text-fuchsia-500' }],
  ['agentic', { icon: BrainCircuit, accentClassName: 'text-rose-500' }],
  ['github', { icon: SiGithubactions, accentClassName: 'text-sky-600' }],
  ['graphql', { icon: SiGraphql, accentClassName: 'text-pink-500' }],
  ['firebase', { icon: SiFirebase, accentClassName: 'text-amber-500' }],
  ['mixpanel', { icon: Radar, accentClassName: 'text-indigo-500' }],
  ['rest', { icon: Orbit, accentClassName: 'text-teal-500' }],
  ['typescript', { icon: SiTypescript, accentClassName: 'text-[#3178c6]' }],
  ['sap ui5', { icon: Smartphone, accentClassName: 'text-blue-500' }],
  ['tdd', { icon: TestTube2, accentClassName: 'text-red-500' }],
  ['testing', { icon: TestTube2, accentClassName: 'text-red-500' }],
  ['architecture', { icon: ShieldCheck, accentClassName: 'text-lime-500' }],
  ['mobile', { icon: Smartphone, accentClassName: 'text-emerald-500' }],
  ['api', { icon: Database, accentClassName: 'text-cyan-500' }],
]

function resolveTechVisual(label: string): TechVisual {
  const normalized = label.trim().toLowerCase()
  return (
    techIconMap.find(([key]) => normalized.includes(key))?.[1] ?? {
      icon: Sparkles,
      accentClassName: 'text-[var(--accent)]',
    }
  )
}

export function TechBadge({ label }: TechBadgeProps) {
  const { accentClassName, icon: Icon } = resolveTechVisual(label)

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-soft)_70%,white_28%)] px-3 py-2 text-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] dark:bg-[color-mix(in_srgb,var(--accent-soft)_55%,transparent)]">
      <Icon className={`h-4 w-4 shrink-0 ${accentClassName}`} />
      <span>{label}</span>
    </span>
  )
}
