import { Link, notFound, useParams } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { findProjectBySlug } from '@/features/cv/projectUtils'
import { useCvData } from '@/features/cv/useCvData'

export function ProjectDetailPage() {
  const { projectSlug } = useParams({ from: '/projects/$projectSlug' })
  const { data } = useCvData()
  const project = findProjectBySlug(data.projects, projectSlug)

  if (!project) {
    throw notFound()
  }

  return (
    <PageIntro
      eyebrow="Project"
      title={project.name}
      description={project.summary}
    >
      <div className="space-y-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        {project.imageUrl ? (
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
            <img
              src={project.imageUrl}
              alt={project.imageAlt || project.name}
              className="h-[22rem] w-full object-cover sm:h-[28rem]"
            />
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Impact</p>
            <p className="mt-4 text-base leading-8 text-[var(--foreground)]">{project.impact}</p>

            {project.details.length ? (
              <ul className="mt-6 grid gap-3">
                {project.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm leading-7 text-[var(--muted)] dark:border-white/10 dark:bg-white/5 sm:text-base"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          <aside className="grid gap-4">
            <article className="rounded-[2rem] border border-black/10 bg-[var(--panel)] p-6 dark:border-white/10">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Timeline</p>
              <p className="mt-4 font-display text-2xl font-semibold">{project.period}</p>
            </article>

            {project.stack.length ? (
              <article className="rounded-[2rem] border border-black/10 bg-[var(--panel)] p-6 dark:border-white/10">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ) : null}

            {project.links.length ? (
              <article className="rounded-[2rem] border border-black/10 bg-[var(--panel)] p-6 dark:border-white/10">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Links</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </article>
            ) : null}
          </aside>
        </div>
      </div>
    </PageIntro>
  )
}
