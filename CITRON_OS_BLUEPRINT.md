# Citron OS CRM Technical Implementation Blueprint

## 1. Core Philosophy and Architectural Constraints

### 1.1 OS-First, SaaS-Second

Citron OS is conceived as an operating system for CRM workflows. The architecture prioritizes:

- **OS-First**: The shell, layout, and module runtime behave like an OS: persistent navigation, modular workspaces, isolated processes (modules), and a system-wide intelligence layer.
- **SaaS-Second**: Multi-tenant hosting, subscriptions, and cloud sync are layers built atop the OS layer. They must not dictate core UX or data structures.

Implication: Design all features to work in a single-tenant, local-first context first. SaaS concerns (auth, sync, billing) plug into the shell without modifying the core module contracts.

### 1.2 Modular Runtime

Every functional unit in Citron OS is a **module**. Modules MUST be isolated:

- Use `ModuleContainer` as the wrapper for all module content.
- Wrap module content in `ModuleErrorBoundary` so a crashed module does not take down the rest of the application.
- Each module receives `loading` (shows `ModuleSkeleton`), `title`, and `onRetry` props.
- The parent shell is responsible for remounting failed modules (e.g. via key increment) when `onRetry` is called.

Pattern:

```
ModuleContainer (loading, title, onRetry)
  └── ModuleErrorBoundary
        └── [Module content or Failure State card]
```

### 1.3 Token Enforcement

**CRITICAL RULE**: All visual styles—colors, spacing, typography, borders, shadows—MUST use Design Tokens from `@citron-systems/citron-ds`. Hardcoded hex codes, raw pixel values, or arbitrary CSS values are **strictly forbidden**.

- Use `var(--inkblot-...)` for every visual property.
- Semantic tokens only: `var(--inkblot-semantic-color-*)`, `var(--inkblot-radius-*)`, `var(--inkblot-spacing-*)`, `var(--inkblot-duration-*)`, `var(--inkblot-easing-default)`.
- NEVER use primitive tokens directly in components.
- This ensures white-label readiness: a new theme swaps token definitions without touching component code.

Reference: `node_modules/@citron-systems/citron-ds/dist/ai/inkblot-ai-reference.json`

---

## 2. Front-End Design Standards

### 2.1 High Information Density

The Citron OS UI follows high-density layouts:

- Compact vertical rhythm using `var(--inkblot-spacing-4)` (gap-4) between list items.
- Tight padding: `p-4` maps to spacing tokens.
- Small, readable text: `text-sm` for secondary, `text-base` for primary content.
- Use `EntityCard`, `EventStreamFeed`, `MetricComparisonList`, `IntelligenceScoreCard`, and `EntityCommandCard` as the building blocks for dense dashboards.

### 2.2 AI-First Interaction Patterns

- **Inference Latency Feedback**: When the AI is processing, show a shimmer animation using `animate-shimmer` and semantic background tokens. Do NOT block the UI; keep the prompt bar editable where possible.
- **Generative UI**: The `CommandInterface` response area accepts `ReactNode`. Render `EntityCard`, `EventRow`, and other components directly from AI responses. Use structured outputs (JSON) that map to component props.
- **Confidence Signals**: Use `StatusBadge` with variants derived from `confidence_score` (e.g. >= 0.8 success, >= 0.5 info, >= 0.2 warning, else error).

### 2.3 Dark Mode Support

- Enable via `[data-theme="dark"]` on a root element (e.g. `document.documentElement`).
- All semantic tokens map to dark variants in `main.css` when `[data-theme="dark"]` is present.
- Never assume a default theme; all components must work in both light and dark.

### 2.4 Principles of Radical Clarity

- Error states must communicate scope: "This module failed to load" not "Something went wrong."
- Loading states use `ModuleSkeleton` so users see structure, not blank space.
- Status indicators (dots, badges) use semantic status tokens (success, warning, error, info).

---

## 3. Data Layer (The Intelligence Core)

### 3.1 Entity Graph

**Nodes** represent entities in the CRM:

```typescript
type EntityType = 'Person' | 'Organization' | 'Deal'

interface GraphNode {
  id: string
  type: EntityType
  name: string
  metadata: Record<string, string>
  createdAt: string
  updatedAt: string
}
```

**Edges** represent relationships:

```typescript
interface GraphEdge {
  id: string
  type: string
  sourceId: string
  targetId: string
  metadata?: Record<string, string>
  createdAt: string
}
```

Edge types are domain-specific (e.g. `WORKS_WITH`, `MANAGES`, `OWNED_BY`, `PARTNER_OF`). The `EntityCard` component displays edges with `type` and optional `target` label.

### 3.2 Event Ingestion Schema

Real-time events follow the Citron OS event structure:

```typescript
interface CitronEvent {
  id: string
  actor: string
  subject: string
  event_type: string
  timestamp: string
  confidence_score: number
  metadata?: Record<string, unknown>
}
```

- `actor`: Who or what performed the action.
- `subject`: The entity or resource affected.
- `event_type`: Enum or string (e.g. `EMAIL_SENT`, `STAGE_CHANGED`, `PHONE_CALL`).
- `timestamp`: ISO 8601 string.
- `confidence_score`: 0–1 value for AI-extracted events.

The event bus ingests `CitronEvent[]` and delivers to `EventStreamFeed` and `EventRow` components.

### 3.3 Intelligence Scoring

**Revenue Confidence**: 0–100 score indicating likelihood of deal closure. Derived from engagement, stage progression, and historical patterns. Display in `IntelligenceScoreCard` with optional `trend` (up/down).

**Momentum Score**: Rate of change in activity (emails, meetings, calls). High momentum correlates with deal velocity. Use `MetricComparisonList` for pipeline stages and account health signals.

Rules:

- Scores are computed server-side or by a background worker.
- Components display scores; they do not compute them.
- Use semantic status tokens for score thresholds (e.g. >= 80 success, 50–79 info, 20–49 warning, < 20 error).

---

## 4. Implementation Roadmap (10 Sequential Blocks)

### Block 1: Shell and Layout

- Implement app shell with `OSNavigationRail` on the left.
- Define main content area, header, and theme switcher.
- Apply `[data-theme="dark"]` toggle.
- Use `bg-[var(--inkblot-semantic-color-background-primary)]` for shell background.

### Block 2: Module Runtime Foundation

- Integrate `ModuleContainer` and `ModuleErrorBoundary` into the shell.
- Implement module registration and lazy-loading (React.lazy).
- Define module slot layout (grid or flex) using spacing tokens.

### Block 3: Entity Graph Service

- Implement GraphService: CRUD for Nodes and Edges.
- Define TypeScript interfaces for GraphNode and GraphEdge.
- Connect to persistence (local first, then sync adapter).

### Block 4: Event Bus

- Implement EventBus: ingest, queue, and broadcast `CitronEvent`.
- Define subscription API for modules.
- Support real-time updates (WebSocket or polling).

### Block 5: Command Interface and AI Integration

- Embed `CommandInterface` in the shell or a dedicated module.
- Connect to AI backend: send prompt, receive structured response.
- Map AI response to `EntityCard`, `EventRow`, and other components.
- Show shimmer during inference.

### Block 6: Entity Views

- Build Person, Organization, and Deal list/detail views.
- Use `EntityCard` for list items and `EntityCommandCard` for focus view.
- Integrate "Connected To" stats and Insights.

### Block 7: Event Stream and Timeline

- Build `EventStreamFeed` module for real-time activity.
- Connect to EventBus.
- Display status dots and timestamps.

### Block 8: Intelligence Lab Dashboard

- Compose `IntelligenceScoreCard`, `MetricComparisonList`, `EntityCommandCard`, `EventStreamFeed`, and `OSNavigationRail` into the Intelligence Lab layout.
- Implement Revenue Confidence and Momentum score display.
- High-density layout with semantic tokens only.

### Block 9: Pipeline and Account Health

- Build pipeline stage views using `MetricComparisonList`.
- Account health signals with variant-based coloring.
- Integrate with GraphService for deal and contact data.

### Block 10: Module Marketplace

- Define module manifest schema (id, name, entry, permissions).
- Implement module discovery and installation.
- Sandbox modules with ModuleErrorBoundary.

---

## 5. Coding Best Practices

### 5.1 TypeScript

- Use strict TypeScript interfaces for Graph and Event data.
- Export interfaces from a shared `types` module.
- No `any`; use `unknown` when type is truly unknown.

### 5.2 No Comments in Code

- Code must be self-documenting via naming and structure.
- Complex logic: extract to named functions. Documentation lives in this Blueprint and Storybook.

### 5.3 Performance

- **List Virtualization**: Use a virtualized list (e.g. react-window, TanStack Virtual) for long lists (events, entities, pipeline items). Minimum viewport height and item height from spacing tokens.
- **Lazy-Loading**: Load modules via `React.lazy` and `Suspense`. Wrap in `ModuleContainer` with `loading` state during hydration.
- **Memoization**: Use `React.memo` for list item components; use `useMemo`/`useCallback` for expensive computations and stable callbacks.

### 5.4 Accessibility

- Follow WCAG AAA as defined in @citron-systems/citron-ds. Semantic tokens ensure 7:1 contrast for text.
- Use `role="alert"` for error boundaries.
- Ensure focus management in modals and command interface.
- Support `prefers-reduced-motion` (already in main.css).

### 5.5 Component Composition

- Compose from primitives: Button, Input, Skeleton, StatusBadge.
- Use `cn()` (tailwind-merge + clsx) for conditional classes.
- Never inline styles; always use Tailwind classes that resolve to `var(--inkblot-*)`.

---

## 6. Token Reference Quick Guide

| Category | Token Pattern | Example |
|----------|---------------|---------|
| Background | `var(--inkblot-semantic-color-background-primary\|secondary\|tertiary)` | Card background |
| Text | `var(--inkblot-semantic-color-text-primary\|secondary\|tertiary)` | Headings, body, muted |
| Border | `var(--inkblot-semantic-color-border-default\|strong\|focus)` | Dividers, outlines |
| Interactive | `var(--inkblot-semantic-color-interactive-primary\|secondary)` + hover/active | Buttons, links |
| Status | `var(--inkblot-semantic-color-status-success\|warning\|error\|info)` | Badges, dots |
| Radius | `var(--inkblot-radius-sm\|md\|lg\|xl)` | Corners |
| Spacing | Use Tailwind `gap-4`, `p-4` (mapped via inkblotTheme) | Layout |
| Motion | `var(--inkblot-duration-fast)`, `var(--inkblot-easing-default)` | Transitions |

---

## 7. Design Tokens as Foundation

The Design Tokens from @citron-systems/citron-ds are the **absolute foundation** of Citron OS. Every pixel of color, every gap, every corner radius flows from these tokens. Components are thin wrappers that compose tokens; they do not define their own aesthetics. This Blueprint and all future prompts must treat token enforcement as non-negotiable.
