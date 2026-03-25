import type { ButtonHTMLAttributes } from 'react'
import { useTheme } from '../ThemeProvider'
import { cn } from '../../utils/cn'

export interface ThemeSwitcherButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function ThemeSwitcherButton({ className, type = 'button', ...props }: ThemeSwitcherButtonProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type={type}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex min-h-[var(--inkblot-size-touch-target-min)] min-w-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)]',
        'border border-[var(--inkblot-semantic-color-border-default)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'text-[var(--inkblot-semantic-color-text-primary)]',
        'transition-colors duration-[var(--inkblot-duration-fast)]',
        'hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
        className
      )}
      {...props}
    >
      <span className="text-lg leading-none" aria-hidden>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
