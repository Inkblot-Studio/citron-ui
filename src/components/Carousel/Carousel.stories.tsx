import type { Meta, StoryObj } from '@storybook/react-vite'
import { Carousel } from './Carousel'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

const slides = [
  'Q1: pipeline growth +18%',
  'Q2: average close rate +12%',
  'Q3: account retention +9%',
].map((text) => (
  <div
    key={text}
    className="flex h-[180px] items-center justify-center bg-[var(--inkblot-semantic-color-background-tertiary)] text-center text-sm text-[var(--inkblot-semantic-color-text-primary)]"
  >
    {text}
  </div>
))

export const Default: Story = {
  args: {
    items: slides,
    className: 'w-[520px]',
  },
}

export const Loop: Story = {
  args: {
    items: slides,
    loop: true,
    className: 'w-[520px]',
  },
}

export const DisabledNavigation: Story = {
  args: {
    items: [slides[0]],
    className: 'w-[520px]',
  },
}
