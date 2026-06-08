import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { useCvData } from '@/features/cv/useCvData'

export function ExperiencePage() {
  const { data } = useCvData()

  return (
    <PageIntro
      eyebrow="Experience"
      title="Roles shaped by architecture and shipping."
      description="The emphasis is on technical ownership, product outcomes, and the systems work required to keep releases stable at scale."
    >
      <div className="grid gap-5">
        {data.experience.map((job, index) => (
          <motion.article
            key={`${job.company}-${job.role}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            className="rounded-[2rem] border border-black/10 bg-[var(--panel)] p-6 dark:border-white/10"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  {job.start} - {job.end}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{job.role}</h3>
                <p className="mt-1 text-[var(--muted)]">
                  {job.company} · {job.location}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)] dark:border-white/10 dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">{job.summary}</p>

            <ul className="mt-5 grid gap-3">
              {job.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm leading-7 text-[var(--muted)] dark:border-white/10 dark:bg-white/5 sm:text-base"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </PageIntro>
  )
}
