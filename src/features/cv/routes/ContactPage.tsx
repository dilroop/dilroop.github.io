import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

import { PageIntro } from '@/features/cv/components/PageIntro'
import { useCvData } from '@/features/cv/useCvData'

export function ContactPage() {
  const { data } = useCvData()

  return (
    <PageIntro
      eyebrow="Contact"
      title="Direct contact and public work links."
      description="For hiring, contract work, or technical discussions, this keeps the key channels visible without adding friction."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Primary channel</p>
          <a
            href={data.profile.email}
            className="mt-4 inline-flex items-center gap-2 font-display text-2xl font-semibold transition-colors hover:text-[var(--accent)] sm:text-3xl"
          >
            {data.profile.email.replace('mailto:', '')}
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Public links and contact details come directly from the CV-backed content file, so updating the portfolio stays content-first.
          </p>
        </motion.section>

        <section className="grid gap-4">
          {data.profile.socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target={social.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              className="rounded-[2rem] border border-black/10 bg-[var(--panel)] px-5 py-4 transition-transform hover:-translate-y-0.5 dark:border-white/10"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{social.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--muted)]" />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{social.url.replace('mailto:', '')}</p>
            </motion.a>
          ))}
        </section>
      </div>
    </PageIntro>
  )
}
