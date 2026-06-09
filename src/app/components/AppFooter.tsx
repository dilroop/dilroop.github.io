import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

import { navItems } from '@/app/navigation'
import { useCvData } from '@/features/cv/useCvData'

export function AppFooter() {
  const { data } = useCvData()
  const socials = data.profile.socials.filter((social) => social.label.trim() && social.url.trim())
  const email = data.profile.email.trim()
  const phone = data.profile.phone?.trim() ?? ''

  return (
    <footer className="border-t border-black/8 bg-[color-mix(in_srgb,var(--surface)_92%,white)] dark:border-white/8 dark:bg-[color-mix(in_srgb,var(--surface)_94%,black)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{data.profile.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
            {data.profile.role}
          </p>
          {data.profile.location ? (
            <p className="mt-3 text-sm text-[var(--muted)]">{data.profile.location}</p>
          ) : null}
        </div>

        {(email || phone) ? (
          <div>
            <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {email ? (
                <a
                  href={email}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                >
                  <Mail className="h-4 w-4" />
                  {email.replace('mailto:', '')}
                </a>
              ) : null}
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-[var(--accent)]">
                {item.label}
              </Link>
            ))}
          </div>
          {socials.length ? (
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]"
                >
                  {social.label}
                  {!social.url.startsWith('mailto:') ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : null}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
