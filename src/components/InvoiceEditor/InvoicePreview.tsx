import { cn } from '../../utils/cn'
import type { InvoiceClient, InvoiceProduct, InvoiceFormData } from './InvoiceForm'

export interface InvoicePreviewProps {
  data: Partial<InvoiceFormData>
  clients: InvoiceClient[]
  products: InvoiceProduct[]
  className?: string
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--inkblot-semantic-color-border-default)] py-[var(--inkblot-spacing-2)]">
      <span className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-tertiary)]">
        {label}
      </span>
      <span className="[font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-primary)]">
        {value || '—'}
      </span>
    </div>
  )
}

export function InvoicePreview({ data, clients, products, className }: InvoicePreviewProps) {
  const client = clients.find((c) => c.id === data.clientId)
  const product = products.find((p) => p.id === data.productId)
  const quantity = data.quantity ?? 0
  const unitPrice = product?.unitPrice ?? 0
  const subtotal = quantity * unitPrice

  return (
    <div
      className={cn(
        'rounded-[var(--inkblot-radius-xl)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-6)]',
        className,
      )}
    >
      <h3 className="mb-[var(--inkblot-spacing-4)] [font:var(--inkblot-semantic-typography-heading-4)] text-[var(--inkblot-semantic-color-text-primary)]">
        Preview
      </h3>

      <div className="space-y-0">
        <Row label="Client" value={client?.name ?? ''} />
        <Row label="Product" value={product?.name ?? ''} />
        <Row label="Quantity" value={quantity ? String(quantity) : ''} />
        {unitPrice > 0 && <Row label="Unit price" value={`$${unitPrice.toFixed(2)}`} />}
        {subtotal > 0 && <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />}
        <Row label="Payment" value={data.paymentMethod ?? ''} />
        <Row label="Tax" value={data.taxType ?? ''} />
        <Row label="Type" value={data.invoiceType ?? ''} />
        <Row label="Bank" value={data.bankAccount ?? ''} />
      </div>

      {data.notes && (
        <p className="mt-[var(--inkblot-spacing-4)] [font:var(--inkblot-semantic-typography-body-small)] text-[var(--inkblot-semantic-color-text-secondary)]">
          {data.notes}
        </p>
      )}
    </div>
  )
}
