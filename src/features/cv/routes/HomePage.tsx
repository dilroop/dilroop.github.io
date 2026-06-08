import { Link } from '@tanstack/react-router'
import { ArrowDownToLine, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { RotatingRole } from '@/features/cv/components/RotatingRole'
import { TechBadge } from '@/features/cv/components/TechBadge'
import { useCvData } from '@/features/cv/useCvData'

export function HomePage() {
  const { data } = useCvData()
  const email = data.profile.email.trim()
  const phone = data.profile.phone?.trim() ?? ''
  const cvUrl = data.profile.cvUrl?.trim() ?? ''

  return (
    <div className="space-y-[max(3.5rem,14vh)]">
      <section className="panel overflow-hidden px-6 py-[max(2.25rem,11vh)] sm:px-8">
        <div
          className={`grid gap-10 lg:items-center ${
            data.profile.imageUrl ? 'lg:grid-cols-[1.08fr_0.92fr]' : ''
          }`}
        >
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
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-3">
              {data.profile.metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[1.5rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_60%,white_44%),rgba(255,255,255,0.56))] px-5 py-5 shadow-[0_12px_40px_rgba(15,118,110,0.08)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"
                >
                  <p className="font-display text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                    {metric.label}
                  </p>
                </article>
              ))}
            </div>

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
                className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-soft)_45%,transparent)] px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-soft)_45%,transparent)] px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {data.profile.imageUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="grid gap-4"
            >
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                <img
                  src={data.profile.imageUrl}
                  alt={data.profile.imageAlt || data.profile.name}
                  className="h-[28rem] w-full object-cover"
                />
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      <PageIntro
        eyebrow="Skills"
        title="Core Mobile Stack"
        description="Tools used across delivery, architecture, and release work."
      >
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.skillGroups.map((group, index) => (
            <motion.article
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.06, duration: 0.35 }}
              className="rounded-[1.75rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_55%,white_45%),rgba(255,255,255,0.58))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">{group.name}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </motion.article>
          ))}
        </section>
      </PageIntro>

      <PageIntro
        eyebrow="About Me"
        title="Delivery Focused Engineer"
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
                className="rounded-[2rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_42%,white_50%),rgba(255,255,255,0.62))] p-5 text-sm leading-7 text-[var(--muted)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </section>

          <section className="rounded-[2rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_52%,white_50%),rgba(255,255,255,0.66))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">Focus Areas</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.profile.focusAreas.map((item) => (
                <TechBadge key={item} label={item} />
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
        eyebrow="Contact"
        title="Open to Senior Mobile Roles"
        description="Direct contact details and current public links."
      >
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_48%,white_52%),rgba(255,255,255,0.66))] p-6 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">Primary channel</p>
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
                className="rounded-[1.75rem] border border-[color-mix(in_srgb,var(--accent)_18%,transparent)] bg-[var(--panel)] px-5 py-4 transition-transform hover:-translate-y-0.5"
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
