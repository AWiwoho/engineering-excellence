# Pilot E2E Automation Architecture

## Pipeline Overview

```
Jira Ticket → Multi-Agent Planning → Code Implementation → QA Loop → Code Review → PR → Human Review
```

## Phase 1: Ticket Intake
- **Source:** Jira (cloud)
- **Trigger:** Issues labeled with `pilot` in configured Jira project
- **Polling:** Every 30 seconds
- Pilot claims the ticket, transitions status to "In Progress"

## Phase 2: Multi-Agent Planning Panel
Four specialist perspectives evaluate the ticket before any code is written:

| Agent | Focus | Responsibilities |
|-------|-------|-----------------|
| BE Architect | API, data, infra | Schema design, service boundaries, performance |
| FE Architect | UI, UX, a11y | Components, state, accessibility, UX patterns |
| QA Engineer | Test strategy | Coverage plan, edge cases, regression risk |
| Security | OWASP, threats | Input validation, auth, vulnerability assessment |

These roles are defined in `CLAUDE.md` and loaded by Pilot's Navigator into the planning context.

### Task Complexity Routing
| Complexity | Model | Examples |
|-----------|-------|---------|
| TRIVIAL | Haiku | Typos, renames, config tweaks |
| SIMPLE | Haiku/Sonnet | Single component changes |
| MEDIUM | Sonnet/Opus | Standard features, clear scope |
| COMPLEX | Opus | Multi-component, architectural |
| EPIC | Opus | Decomposed into subtasks |

## Phase 3: Code Implementation
- **Engine:** Pilot executor → Claude Code CLI
- **Isolation:** Git worktree per task (prevents conflicts)
- Claude Code reads CLAUDE.md + .agent/ context for guidelines
- Navigator guides implementation with codebase awareness

## Phase 4: Code ↔ QA Convergence Loop
Iterative cycle until all quality gates pass:

```
┌─────────────────────────────────────┐
│  Implement → QA Validate → Pass?    │
│       ↑          │                  │
│       └── Fix ←──┘ (if fail)        │
└─────────────────────────────────────┘
```

### Quality Gates
1. **Tests** — Unit + integration tests pass (timeout: 5m)
2. **Lint** — Code style and format validation
3. **Build** — Compilation / type checking (timeout: 10m)
4. **Coverage** — Code coverage thresholds

### Smart Retry
- Max 3 retries with error feedback
- Stagnation detection after repeated failures
- Escalates if no progress

## Phase 5: Multi-Agent Code Review
All Claude-based review layers:

| Reviewer | Method | Purpose |
|----------|--------|---------|
| Self-review | Pilot built-in | Validates code matches requirements |
| Intent Judge | Pilot built-in | Confirms alignment with acceptance criteria |
| Specialist | CLAUDE.md roles | BE/FE/QA/Security perspective checks |
| Pattern learning | Pilot memory | Applies learned patterns from past reviews |

## Phase 6: PR Creation
- Auto-creates PR on GitHub
- Links back to Jira issue
- Adds labels and description
- Transitions Jira status to "Done" (after merge)

## Phase 7: Human Review + Merge
- Human reviews the PR
- Feedback is captured by Pilot's learning system
- Patterns stored for future task improvement
