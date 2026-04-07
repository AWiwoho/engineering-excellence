# Quality Gates

## Overview
All quality gates must pass before Pilot creates a PR. If any gate fails, the Code Fix Agent retries (up to 3 attempts) with error feedback.

---

## Gate 1: Tests
- **What:** Run full test suite (unit + integration)
- **Timeout:** 5 minutes
- **Pass criteria:** All tests pass, no failures or errors
- **On failure:** Error output fed back to Claude Code for fix

## Gate 2: Linting
- **What:** Code style and format validation
- **Tools:** ESLint, Prettier, golangci-lint (depending on stack)
- **Pass criteria:** Zero errors (warnings allowed)
- **On failure:** Lint errors fed back for auto-fix

## Gate 3: Build
- **What:** Compilation and type checking
- **Timeout:** 10 minutes
- **Pass criteria:** Build succeeds with zero errors
- **On failure:** Build errors fed back for fix

## Gate 4: Coverage
- **What:** Code coverage check on new/changed code
- **Target:** 80%+ coverage on new code
- **Pass criteria:** Coverage meets threshold
- **On failure:** Uncovered paths identified, tests generated

---

## Convergence Loop

```
Attempt 1 → Run gates → Fail? → Feed errors to Code Fix Agent
Attempt 2 → Run gates → Fail? → Feed errors to Code Fix Agent
Attempt 3 → Run gates → Fail? → Escalate (stagnation detected)
                       → Pass? → Proceed to Code Review
```

### Smart Retry Config
```yaml
executor:
  smart_retry:
    max_retries: 3
    stagnation_threshold: 3
```

### Stagnation Detection
If the same error persists across 3 retries without progress, Pilot:
1. Marks the task as stalled
2. Posts a comment on the Jira ticket
3. Waits for human intervention
