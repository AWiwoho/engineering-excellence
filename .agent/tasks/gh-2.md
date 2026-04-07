# GH-2

**Created:** 2026-04-07

## Problem

GitHub Issue #2: Add /health endpoint that returns server status

## Description
Create a `/health` endpoint that returns the current server status.

## Acceptance Criteria
- GET `/health` returns JSON `{"status": "ok", "timestamp": "<ISO8601>"}`
- Returns HTTP 200
- Include a basic unit test

## Tech
- Simple HTTP handler (any framework or stdlib)
- Add to `src/` directory

## Acceptance Criteria

