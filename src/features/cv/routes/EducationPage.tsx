import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { useCvData } from '@/features/cv/useCvData'

export function EducationPage() {
  const { data } = useCvData()

  return (
    <PageIntro
      eyebrow="Education"
      title="Formal education behind the engineering base."
      description="This section covers the academic path from core computer science foundations through intelligent systems and applied software study."
    >
      <div className="grid gap-4">
        {data.education.map((item, index) => (
          <motion.article
            key={`${item.institution}-${item.qualification}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="rounded-[2rem] border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  {item.start} - {item.end}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{item.qualification}</h3>
                <p className="mt-1 text-[var(--muted)]">
                  {item.institution} · {item.location}
                </p>
              </div>
            </div>

            <ul className="mt-5 grid gap-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
              {item.details.map((detail) => (
                <li
                  key={detail}
                  className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </PageIntro>
  )
}
