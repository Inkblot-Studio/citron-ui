import type { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

export interface PageErrorFallbackProps extends FallbackProps {}

export function PageErrorFallback({
  resetErrorBoundary,
}: PageErrorFallbackProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center gap-[var(--inkblot-spacing-6)] px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-8)]',
        'bg-[var(--inkblot-semantic-color-background-primary)]',
        '[font:var(--inkblot-semantic-typography-body-small)]'
      )}
    >
      <p className="text-center text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-medium)]">
        Esta página no está disponible
      </p>
      <div className="flex flex-col items-center gap-[var(--inkblot-spacing-4)] sm:flex-row">
        <button
          type="button"
          onClick={resetErrorBoundary}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
            'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]',
            'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
            'transition-colors duration-[var(--inkblot-duration-fast)]'
          )}
        >
          Reintentar
        </button>
        <Link
          to="/"
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
            'text-[var(--inkblot-semantic-color-interactive-primary)] underline-offset-4 hover:underline',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--inkblot-semantic-color-background-primary)]',
            'transition-colors duration-[var(--inkblot-duration-fast)]'
          )}
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  )
}
