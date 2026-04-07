# Setup Guide — Pilot E2E Automation

## Prerequisites
- **Pilot CLI** v2.90.6+ — `brew tap qf-studio/pilot && brew install pilot`
- **Claude Code CLI** v2.1.17+ — `claude --version`
- **Go** v1.22+ — `go version`
- **Git** — initialized in project root
- **GitHub account** with repo access
- **Jira Cloud** account with API token

## Environment Variables

Add to `~/.zshrc`:

```bash
# GitHub (required for PR creation)
export GITHUB_TOKEN="ghp_..."

# Jira (required for ticket intake)
export JIRA_BASE_URL="https://your-domain.atlassian.net"
export JIRA_USERNAME="your-email@example.com"
export JIRA_API_TOKEN="..."  # Generate at: id.atlassian.com/manage-profile/security/api-tokens
```

Then: `source ~/.zshrc`

**Note:** No Anthropic API key needed — Pilot uses Claude Code CLI which authenticates via your Claude subscription.

## Installation Steps

### 1. Initialize Pilot
```bash
cd /Users/arifwiwoho/Engineering-excellence
pilot init
```
This creates:
- `~/.pilot/config.yaml` — main configuration
- `.agent/` — Navigator config, system docs, knowledge graph

### 2. Configure Pilot
Edit `~/.pilot/config.yaml` — see `documentations/pilot-config-reference.md` for full config.

Key sections:
- Enable Jira adapter with your project key
- Enable GitHub adapter with your repo
- Set executor to `claude-code`
- Configure quality gates

### 3. Register Project
Ensure your project is listed in config:
```yaml
projects:
  - name: "engineering-excellence"
    path: "/Users/arifwiwoho/Engineering-excellence"
    navigator: true
    default_branch: "main"
```

### 4. Start Pilot
```bash
# With GitHub integration (for PR creation)
pilot start --github

# With dashboard
pilot start --github --dashboard
```

### 5. Create a Test Ticket
1. Go to your Jira project
2. Create an issue (e.g., "Add /health endpoint")
3. Add the `pilot` label
4. Watch Pilot pick it up and process it

## Monitoring
```bash
pilot status              # Active tasks
pilot metrics summary     # Execution stats (7-day)
pilot usage summary       # Cost breakdown
pilot stop                # Stop daemon
```

## Troubleshooting
- **Pilot not picking up tickets:** Check `pilot_label` matches your Jira label
- **Claude Code errors:** Verify `claude --version` works and you're logged in
- **PR creation fails:** Check `GITHUB_TOKEN` has repo scope permissions
- **Quality gate failures:** Check logs in `logs/` directory
