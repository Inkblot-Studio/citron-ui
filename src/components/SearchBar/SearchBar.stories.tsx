import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Recipients: Story = {
  args: {
    label: 'Recipients',
    placeholder: 'Search contacts, segments, or tags...',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const WithValue: Story = {
  args: {
    label: 'Recipients',
    placeholder: 'Search contacts, segments, or tags...',
    defaultValue: 'Acme Corp',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const Error: Story = {
  args: {
    label: 'Recipients',
    placeholder: 'Search contacts, segments, or tags...',
    error: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-[var(--inkblot-semantic-color-background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
}
