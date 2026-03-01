import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  disabledDates?: Date[]
  className?: string
}

const WEEK_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getCalendarDays(monthDate: Date) {
  const first = startOfMonth(monthDate)
  const last = endOfMonth(monthDate)
  const firstWeekDay = (first.getDay() + 6) % 7
  const totalDays = last.getDate()
  const cells: Array<Date | null> = []

  for (let i = 0; i < firstWeekDay; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }
  return cells
}

export function Calendar({ value, onChange, disabledDates, className }: CalendarProps) {
  const initialDate = value ?? new Date()
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialDate))
  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth])
  const disabledSet = useMemo(
    () => new Set((disabledDates ?? []).map(toKey)),
    [disabledDates]
  )

  return (
    <div
      className={cn(
        'w-[320px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-4)] text-[var(--inkblot-semantic-color-text-primary)]',
        className
      )}
    >
      <div className="mb-[var(--inkblot-spacing-3)] flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setVisibleMonth(
              new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
            )
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-md)] text-[var(--inkblot-semantic-color-text-secondary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-semibold">
          {visibleMonth.toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <button
          type="button"
          onClick={() =>
            setVisibleMonth(
              new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
            )
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--inkblot-radius-md)] text-[var(--inkblot-semantic-color-text-secondary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-[var(--inkblot-spacing-1)]">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="pb-[var(--inkblot-spacing-1)] text-center text-xs font-medium text-[var(--inkblot-semantic-color-text-tertiary)]"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-9" />
          }
          const disabled = disabledSet.has(toKey(day))
          const selected = value ? isSameDay(day, value) : false
          return (
            <button
              key={toKey(day)}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(day)}
              className={cn(
                'h-9 rounded-[var(--inkblot-radius-md)] text-sm transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
                selected
                  ? 'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
                  : 'text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
                disabled && 'cursor-not-allowed opacity-[var(--inkblot-opacity-disabled)]'
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
