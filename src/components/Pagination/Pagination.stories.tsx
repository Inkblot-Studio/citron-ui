import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

function PaginationPreview({ initialPage = 1 }: { initialPage?: number }) {
  const [page, setPage] = useState(initialPage)
  return <Pagination page={page} totalPages={5} onPageChange={setPage} />
}

export const Default: Story = {
  render: () => <PaginationPreview />,
}

export const MiddlePage: Story = {
  render: () => <PaginationPreview initialPage={3} />,
}
