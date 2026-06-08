import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Search } from 'lucide-react'
import { motion } from 'motion/react'
import { useDeferredValue, useMemo, useState } from 'react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { slugifyProjectName } from '@/features/cv/projectUtils'
import { useCvData } from '@/features/cv/useCvData'

export function ProjectsPage() {
  const { data } = useCvData()
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return data.projects
    }

    return data.projects.filter((project) => {
      const haystack = [
        project.name,
        project.summary,
        project.impact,
        project.period,
        ...project.stack,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [data.projects, deferredQuery])

  return (
    <PageIntro
      eyebrow="Projects"
      title="Selected work with clear operational impact."
      description="The strongest projects here are the ones that changed delivery speed, architecture quality, or product reach, not just code volume."
    >
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by stack, name, or impact..."
          className="w-full rounded-full border border-black/10 bg-black/5 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--accent)] dark:border-white/10 dark:bg-white/5"
        />
      </label>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="rounded-[2rem] border border-black/10 bg-[var(--panel)] p-6 dark:border-white/10"
          >
            {project.imageUrl ? (
              <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-black/10 dark:border-white/10">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt || project.name}
                  className="h-52 w-full object-cover"
                />
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  {project.period}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{project.name}</h3>
              </div>
              {project.featured ? (
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Featured
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">{project.summary}</p>
            <p className="mt-3 text-sm font-medium leading-7 text-[var(--foreground)]">{project.impact}</p>

            <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)] dark:border-white/10 dark:bg-white/5"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              to="/projects/$projectSlug"
              params={{ projectSlug: slugifyProjectName(project.name) }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10"
            >
              View project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.article>
        ))}
      </div>
    </PageIntro>
  )
}
