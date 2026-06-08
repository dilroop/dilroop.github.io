import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'

type PageIntroProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description: string
}>

export function PageIntro({ children, description, eyebrow, title }: PageIntroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-5 py-[1vh]"
    >
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{eyebrow}</p>
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {children}
    </motion.section>
  )
}
