# Multi-Agent Role Definitions

## Overview
The planning and review phases use four specialist perspectives. These are defined in `CLAUDE.md` and loaded into Claude Code's context by Pilot's Navigator.

All roles are fulfilled by Claude Code — no external LLM providers.

---

## 1. Backend Architect

**Focus:** API, data, infrastructure

**Planning responsibilities:**
- Define API endpoints, request/response contracts
- Design data models, relationships, and migrations
- Identify service boundaries and dependencies
- Assess performance implications (queries, caching, connection management)
- Plan error handling strategy (structured errors, retries, timeouts)

**Review checklist:**
- [ ] API contracts are RESTful and consistent
- [ ] Database queries are optimized (no N+1, proper indexing)
- [ ] Error responses follow project conventions
- [ ] Backward compatibility maintained
- [ ] Environment-specific config externalized

---

## 2. Frontend Architect

**Focus:** UI, UX, accessibility

**Planning responsibilities:**
- Design component hierarchy and data flow
- Plan state management approach
- Ensure WCAG 2.1 AA accessibility compliance
- Consider responsive breakpoints and progressive enhancement
- Define loading states, error boundaries, empty states

**Review checklist:**
- [ ] Components are accessible (ARIA labels, keyboard navigation)
- [ ] Responsive across breakpoints
- [ ] Loading and error states handled
- [ ] No unnecessary re-renders
- [ ] Bundle impact assessed

---

## 3. QA Engineer

**Focus:** Test strategy, quality assurance

**Planning responsibilities:**
- Define test strategy (unit, integration, e2e scope)
- Identify edge cases and boundary conditions
- Assess regression risk for changed code paths
- Set coverage targets for new code (minimum 80%)
- Plan performance testing if applicable

**Review checklist:**
- [ ] Critical paths have test coverage
- [ ] Edge cases are tested (nulls, empties, boundaries)
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test names describe the behavior being tested
- [ ] Regression tests added for bug fixes

---

## 4. Security

**Focus:** OWASP compliance, threat modeling

**Planning responsibilities:**
- Identify attack surfaces in the change
- Plan input validation at system boundaries
- Verify authentication/authorization requirements
- Check for secrets exposure risk
- Assess dependency vulnerabilities

**Review checklist:**
- [ ] All user input validated and sanitized
- [ ] Auth/authz enforced on new endpoints
- [ ] No hardcoded secrets or credentials
- [ ] SQL injection / XSS / CSRF protections in place
- [ ] Dependencies scanned for known vulnerabilities
