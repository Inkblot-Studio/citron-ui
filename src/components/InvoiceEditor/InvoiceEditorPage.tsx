import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { InvoiceForm, type InvoiceFormProps, type InvoiceFormData } from './InvoiceForm'
import { InvoicePreview } from './InvoicePreview'

export interface InvoiceEditorPageProps extends Omit<InvoiceFormProps, 'value' | 'onChange' | 'attempted'> {
  onSubmit?: (data: InvoiceFormData) => void
  isSubmitting?: boolean
  className?: string
}

export function InvoiceEditorPage({
  clients,
  products,
  onSubmit,
  onCreateClient,
  isSubmitting = false,
  className,
  ...formProps
}: InvoiceEditorPageProps) {
  const [data, setData] = useState<Partial<InvoiceFormData>>({})
  const [attempted, setAttempted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!data.clientId || !data.productId || !data.quantity) return
    onSubmit?.({
      clientId: data.clientId,
      productId: data.productId,
      quantity: data.quantity,
      paymentMethod: data.paymentMethod ?? '',
      taxType: data.taxType ?? '',
      invoiceType: data.invoiceType ?? '',
      bankAccount: data.bankAccount ?? '',
      notes: data.notes ?? '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-[var(--inkblot-radius-xl)] bg-[var(--inkblot-semantic-color-background-secondary)] p-[var(--inkblot-spacing-6)]',
        className,
      )}
    >
      <h2 className="mb-[var(--inkblot-spacing-6)] [font:var(--inkblot-semantic-typography-heading-4)] text-[var(--inkblot-semantic-color-text-primary)]">
        New Invoice
      </h2>

      <div className="grid grid-cols-1 gap-[var(--inkblot-spacing-6)] lg:grid-cols-[1fr_20rem]">
        <InvoiceForm
          clients={clients}
          products={products}
          value={data}
          onChange={setData}
          onCreateClient={onCreateClient}
          attempted={attempted}
          {...formProps}
        />
        <InvoicePreview data={data} clients={clients} products={products} />
      </div>

      <div className="mt-[var(--inkblot-spacing-6)] flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-[var(--inkblot-spacing-2)]',
            'rounded-[var(--inkblot-radius-lg)]',
            'bg-[var(--inkblot-semantic-color-interactive-primary)]',
            'px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-2)]',
            '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
            'text-[var(--inkblot-semantic-color-text-inverse)]',
            'transition-colors duration-[var(--inkblot-duration-fast)]',
            'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
            'active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]',
            'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:cursor-not-allowed',
          )}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Invoice
        </button>
      </div>
    </form>
  )
}
