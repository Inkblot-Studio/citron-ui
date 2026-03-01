import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { GuidedTour } from './GuidedTour'

const TourHarness = () => {
  const [visible, setVisible] = useState(true)
  return (
    <div className="relative h-screen bg-[var(--inkblot-semantic-color-background-primary)]">
      <div
        data-tour="sidebar"
        className="absolute left-4 top-4 h-[80vh] w-16 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]"
      />
      <div
        data-tour="canvas"
        className="absolute left-24 top-8 h-[70vh] w-[58vw] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]"
      />
      <div
        data-tour="event-feed"
        className="absolute right-8 top-8 h-[70vh] w-72 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)]"
      />
      <div
        data-tour="system-status"
        className="absolute bottom-8 left-10 h-3 w-3 rounded-full bg-[var(--inkblot-semantic-color-status-success)]"
      />
      {visible ? <GuidedTour onComplete={() => setVisible(false)} /> : null}
    </div>
  )
}

const meta = {
  title: 'Components/GuidedTour',
  component: GuidedTour,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onComplete: () => {},
  },
  render: () => <TourHarness />,
} satisfies Meta<typeof GuidedTour>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
