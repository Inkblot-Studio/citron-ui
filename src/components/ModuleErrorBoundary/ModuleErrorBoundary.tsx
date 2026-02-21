import { Component, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../Button'

export interface ModuleErrorBoundaryProps {
  children: ReactNode
  onRetry?: () => void
  className?: string
}

interface ModuleErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ModuleErrorBoundary extends Component<
  ModuleErrorBoundaryProps,
  ModuleErrorBoundaryState
> {
  constructor(props: ModuleErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ModuleErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          role="alert"
          className={cn(
            'flex flex-col gap-4 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-4',
            this.props.className
          )}
        >
          <p className="text-base font-semibold text-[var(--inkblot-semantic-color-text-primary)]">
            This module failed to load
          </p>
          <p className="text-sm text-[var(--inkblot-semantic-color-text-tertiary)]">
            {this.state.error.message}
          </p>
          <Button
            variant="secondary"
            onClick={this.props.onRetry}
            className="w-fit border-[var(--inkblot-semantic-color-status-error)]"
          >
            Retry
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
