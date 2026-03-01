import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const rows = [
  { campaign: 'Q2 Launch', owner: 'Ana Rivera', status: 'Active', leads: 128 },
  { campaign: 'Retention 90d', owner: 'Louis Chen', status: 'Paused', leads: 74 },
  { campaign: 'Upsell Pipeline', owner: 'Maya Patel', status: 'Draft', leads: 31 },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Sample active campaigns</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Leads</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.campaign}>
            <TableCell>{row.campaign}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell className="text-right">{row.leads}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Dense: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2">Campaign</TableHead>
          <TableHead className="py-2">Owner</TableHead>
          <TableHead className="py-2">Status</TableHead>
          <TableHead className="py-2 text-right">Leads</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.campaign}>
            <TableCell className="py-2">{row.campaign}</TableCell>
            <TableCell className="py-2">{row.owner}</TableCell>
            <TableCell className="py-2">{row.status}</TableCell>
            <TableCell className="py-2 text-right">{row.leads}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const SortableAndEmptyState: Story = {
  render: () => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [showRows, setShowRows] = useState(true)

    const sortedRows = useMemo(() => {
      const base = showRows ? rows : []
      return [...base].sort((a, b) =>
        sortDirection === 'asc' ? a.leads - b.leads : b.leads - a.leads
      )
    }, [showRows, sortDirection])

    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowRows((previous) => !previous)}
          className="rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)] px-3 py-1.5 text-xs text-[var(--inkblot-semantic-color-text-primary)]"
        >
          {showRows ? 'Show empty state' : 'Show rows'}
        </button>
        <Table>
          <TableCaption>Campaign pipeline preview</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="text-right"
                sortable
                sortDirection={sortDirection}
                onSort={() =>
                  setSortDirection((previous) => (previous === 'asc' ? 'desc' : 'asc'))
                }
              >
                Leads
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.length === 0 ? (
              <TableEmptyState
                colSpan={4}
                title="No campaigns available"
                description="Try another segment or create a new campaign."
              />
            ) : (
              sortedRows.map((row) => (
                <TableRow key={row.campaign}>
                  <TableCell>{row.campaign}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell className="text-right">{row.leads}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    )
  },
}
