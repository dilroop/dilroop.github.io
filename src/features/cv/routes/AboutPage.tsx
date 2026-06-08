import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { useCvData } from '@/features/cv/useCvData'

export function AboutPage() {
  const { data } = useCvData()
  const featuredProjects = data.projects.filter((project) => project.featured).slice(0, 2)

  return (
    <PageIntro
      eyebrow="Profile"
      title="Senior mobile engineering with delivery depth."
      description="Android is the core, but the work spans cross-platform delivery, release systems, architecture, and product execution across large real-world teams."
    >
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="grid gap-4">
          {data.profile.summary.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-[2rem] border border-black/10 bg-black/5 p-5 text-sm leading-7 text-[var(--muted)] dark:border-white/10 dark:bg-white/5 sm:text-base"
            >
              {paragraph}
            </motion.p>
          ))}
        </section>

        <section className="grid gap-4">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.09, duration: 0.45 }}
              className="rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.62))] p-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                    {project.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{project.name}</h3>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Featured
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
              <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{project.impact}</p>
            </motion.article>
          ))}
        </section>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {data.skillGroups.map((group, index) => (
          <motion.article
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + index * 0.08, duration: 0.45 }}
            className="rounded-[2rem] border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">{group.name}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </section>
    </PageIntro>
  )
}
