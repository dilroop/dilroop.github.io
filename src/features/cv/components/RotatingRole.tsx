import { useEffect, useMemo, useState } from 'react'

type RotatingRoleProps = {
  fallback: string
  roles: string[]
}

const TYPING_SPEED = 65
const DELETING_SPEED = 38
const HOLD_DURATION = 1200

export function RotatingRole({ fallback, roles }: RotatingRoleProps) {
  const safeRoles = useMemo(() => {
    const normalized = roles.filter((role) => role.trim().length > 0)
    return normalized.length ? normalized : [fallback]
  }, [fallback, roles])

  const [roleIndex, setRoleIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = safeRoles[roleIndex] ?? fallback

    if (!isDeleting && visibleText === currentRole) {
      const timer = window.setTimeout(() => setIsDeleting(true), HOLD_DURATION)
      return () => window.clearTimeout(timer)
    }

    if (isDeleting && visibleText === '') {
      const timer = window.setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((currentIndex) => (currentIndex + 1) % safeRoles.length)
      }, 0)
      return () => window.clearTimeout(timer)
    }

    const nextText = isDeleting
      ? currentRole.slice(0, Math.max(visibleText.length - 1, 0))
      : currentRole.slice(0, visibleText.length + 1)

    const timer = window.setTimeout(
      () => setVisibleText(nextText),
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    )

    return () => window.clearTimeout(timer)
  }, [fallback, isDeleting, roleIndex, safeRoles, visibleText])

  return (
    <span className="inline-flex min-h-[1.5em] items-center gap-1">
      <span>{visibleText}</span>
      <span className="inline-block h-[1.05em] w-[2px] animate-pulse bg-[var(--accent)]" />
    </span>
  )
}
