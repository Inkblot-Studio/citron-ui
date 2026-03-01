import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OnboardingWizard } from './OnboardingWizard'
import { GuidedTour } from '../GuidedTour'

const OnboardingHarness = () => {
  const [completedData, setCompletedData] = useState<Record<string, string | string[]> | null>(null)

  if (completedData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--inkblot-semantic-color-background-primary)]">
        <div className="w-[520px] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] p-5">
          <p className="text-sm text-[var(--inkblot-semantic-color-text-primary)]">Onboarding completed</p>
          <pre className="mt-3 overflow-auto rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-tertiary)] p-3 text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            {JSON.stringify(completedData, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  return <OnboardingWizard onComplete={setCompletedData} />
}

const OnboardingWithTourHarness = () => {
  const [completedData, setCompletedData] = useState<Record<string, string | string[]> | null>(null)
  const [tourOpen, setTourOpen] = useState(false)

  if (!completedData) {
    return (
      <OnboardingWizard
        onComplete={(data) => {
          setCompletedData(data)
          setTourOpen(true)
        }}
      />
    )
  }

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
      <GuidedTour
        open={tourOpen}
        onOpenChange={setTourOpen}
        onComplete={() => setTourOpen(false)}
      />
    </div>
  )
}

const meta = {
  title: 'Components/OnboardingWizard',
  component: OnboardingWizard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onComplete: () => {},
  },
  render: () => <OnboardingHarness />,
} satisfies Meta<typeof OnboardingWizard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnboardingThenTutorial: Story = {
  render: () => <OnboardingWithTourHarness />,
}
