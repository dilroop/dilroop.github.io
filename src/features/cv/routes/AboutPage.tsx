import { Link } from '@tanstack/react-router'
import { ArrowDownToLine, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { RotatingRole } from '@/features/cv/components/RotatingRole'
import { slugifyProjectName } from '@/features/cv/projectUtils'
import { useCvData } from '@/features/cv/useCvData'

export function AboutPage() {
  const { data } = useCvData()
  const featuredProjects = data.projects.filter((project) => project.featured).slice(0, 2)
  const email = data.profile.email.trim()
  const phone = data.profile.phone?.trim() ?? ''
  const cvUrl = data.profile.cvUrl?.trim() ?? ''

  return (
    <div className="space-y-14">
      <section className="panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                {data.profile.availability}
              </p>
              <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {data.profile.name}
              </h1>
              <div className="max-w-3xl space-y-3">
                <p className="text-base uppercase tracking-[0.24em] text-[var(--accent)] sm:text-lg">
                  <RotatingRole fallback={data.profile.role} roles={data.profile.roles} />
                </p>
                <p className="text-lg leading-8 text-[var(--muted)] sm:text-xl">
                  {data.profile.tagline}
                </p>
              </div>
            </div>

            {data.profile.focusAreas.length ? (
              <div className="flex flex-wrap gap-2">
                {data.profile.focusAreas.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-3">
              {data.profile.metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[1.5rem] border border-black/10 bg-black/5 px-5 py-5 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="font-display text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                </article>
              ))}
            </div>

            {data.profile.summary.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {data.profile.summary.slice(0, 2).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="rounded-[1.5rem] border border-black/10 bg-white/70 p-4 text-sm leading-7 text-[var(--muted)] dark:border-white/10 dark:bg-white/5"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              {data.profile.location ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {data.profile.location}
                </span>
              ) : null}
              {email ? (
                <a
                  href={email}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--foreground)]"
                >
                  <Mail className="h-4 w-4" />
                  {email.replace('mailto:', '')}
                </a>
              ) : null}
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--foreground)]"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              {cvUrl ? (
                <a
                  href={cvUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--surface)] transition hover:opacity-90"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Download CV
                </a>
              ) : null}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10"
              >
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="grid gap-4"
          >
            {data.profile.imageUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                <img
                  src={data.profile.imageUrl}
                  alt={data.profile.imageAlt || data.profile.name}
                  className="h-[28rem] w-full object-cover"
                />
              </div>
            ) : (
              <div className="grid gap-4">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.name}
                    to="/projects/$projectSlug"
                    params={{ projectSlug: slugifyProjectName(project.name) }}
                    className="rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.62))] p-5 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      {project.period}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold">{project.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                      Open project
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <PageIntro
        eyebrow="Skills"
        title="Core technologies and working methods."
        description="The home page stays lighter now, so skills are shown as compact groups instead of long descriptive blocks."
      >
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.skillGroups.map((group, index) => (
            <motion.article
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.06, duration: 0.35 }}
              className="rounded-[1.75rem] border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">{group.name}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </section>
      </PageIntro>

      <PageIntro
        eyebrow="About Me"
        title="A delivery-focused mobile engineer."
        description={data.profile.role}
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="grid gap-4">
            {data.profile.summary.slice(0, 3).map((paragraph, index) => (
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

          <section className="rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.62))] p-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Focus Areas</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.profile.focusAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                >
                  {item}
                </span>
              ))}
            </div>

            {data.profile.hobbies.length ? (
              <>
                <p className="mt-8 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Outside work</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.profile.hobbies.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        </div>
      </PageIntro>

      <PageIntro
        eyebrow="Featured Projects"
        title="Selected work with clear operational impact."
        description="Each card can open a dedicated project page. If you later add project screenshots, they appear automatically."
      >
        <section className="grid gap-4 xl:grid-cols-2">
          {featuredProjects.map((project, index) => (
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
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Featured
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">{project.summary}</p>
              <p className="mt-3 text-sm font-medium leading-7 text-[var(--foreground)]">{project.impact}</p>

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
        </section>
      </PageIntro>

      <PageIntro
        eyebrow="Contact"
        title="Open to senior mobile roles and good product work."
        description="Short and direct on the home page. The full contact page still keeps the complete link list."
      >
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Primary channel</p>
            {email ? (
              <a
                href={email}
                className="mt-4 inline-flex items-center gap-2 font-display text-2xl font-semibold transition-colors hover:text-[var(--accent)] sm:text-3xl"
              >
                {email.replace('mailto:', '')}
                <ArrowUpRight className="h-5 w-5" />
              </a>
            ) : null}
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="mt-4 block text-base text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {phone}
              </a>
            ) : null}
          </div>

          <div className="grid gap-4">
            {data.profile.socials.slice(0, 3).map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
                className="rounded-[1.75rem] border border-black/10 bg-[var(--panel)] px-5 py-4 transition-transform hover:-translate-y-0.5 dark:border-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{social.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--muted)]" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </PageIntro>
    </div>
  )
}
