# Engineering Excellence — Pilot E2E Automation

## Project Overview
Autonomous development pipeline powered by Pilot + Claude Code.
Tickets flow from Jira through multi-agent planning, implementation, QA validation, code review, and PR creation.

## Architecture
See `pilot_e2e_automation_architecture.svg` and `documentations/architecture.md` for the full pipeline.

## Planning Phase — Multi-Agent Perspectives
When planning any task, evaluate from all four specialist perspectives before implementation:

### 1. Backend Architect
- API contract design, request/response schemas
- Data model integrity, migrations, backward compatibility
- Service boundaries, dependency management
- Performance: N+1 queries, caching strategy, connection pooling
- Error handling: structured errors, retry semantics, circuit breakers

### 2. Frontend Architect
- Component hierarchy, state management patterns
- Accessibility (WCAG 2.1 AA minimum)
- Responsive design, progressive enhancement
- Bundle size impact, lazy loading strategy
- User experience: loading states, error boundaries, optimistic updates

### 3. QA Engineer
- Test strategy: unit, integration, e2e coverage
- Edge cases: empty states, boundary values, concurrent access
- Regression risk assessment for changed code paths
- Performance regression: response time budgets, memory usage
- Coverage target: 80%+ for new code

### 4. Security
- Input validation at system boundaries
- Authentication/authorization checks on every endpoint
- OWASP Top 10 compliance (injection, XSS, CSRF, etc.)
- Secrets management: no hardcoded credentials
- Dependency vulnerability scanning

## Code Standards
- Write tests alongside implementation
- Run linter before committing
- Keep PRs focused — one concern per PR
- Prefer simple, readable code over clever abstractions

## Quality Gates
All must pass before PR creation:
1. Unit tests pass
2. Linter clean (no errors)
3. Build succeeds
4. No security vulnerabilities in dependencies

## Review Checklist
- Does the implementation match the ticket requirements?
- Are all four perspectives (BE/FE/QA/Security) addressed?
- Are tests covering the critical paths?
- Is the code self-documenting?
