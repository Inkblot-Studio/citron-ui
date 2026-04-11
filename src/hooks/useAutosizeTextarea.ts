import { useLayoutEffect, type RefObject } from 'react'

export interface UseAutosizeTextareaOptions {
  /** Cap growth at this many lines; beyond that the field scrolls. */
  maxLines?: number
  disabled?: boolean
}

/**
 * Keeps a textarea at one line minimum and grows with content up to `maxLines`.
 */
export function useAutosizeTextarea(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  value: string,
  options?: UseAutosizeTextareaOptions,
) {
  const maxLines = options?.maxLines ?? 10
  const disabled = options?.disabled ?? false

  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el || disabled) return

    const computed = window.getComputedStyle(el)
    const lineHeight = parseFloat(computed.lineHeight) || 20
    const padding =
      parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom)
    const minH = lineHeight + padding
    const maxH = lineHeight * maxLines + padding

    el.style.height = 'auto'
    const scrollH = el.scrollHeight
    const next = Math.min(Math.max(scrollH, minH), maxH)
    el.style.height = `${next}px`
    el.style.overflowY = scrollH > maxH ? 'auto' : 'hidden'
  }, [value, maxLines, disabled])
}
