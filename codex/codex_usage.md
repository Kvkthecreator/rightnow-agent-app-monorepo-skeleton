# ✅ FILE: codex_usage.md (top-level)
# 🧠 Codex CLI Usage Cheatsheet

## Common Prompts
```bash
codex
> Write a FastAPI endpoint that returns JSON
> Summarize this Python file for me
> Suggest tests for this function
```

## Codex Modes
- `Suggest` (default): proposes changes and waits for approval
- `Auto Edit`: writes code but asks before running commands
- `Full Auto`: makes all changes and executes without prompts

Use `.env` or shell export:
```bash
export OPENAI_API_KEY=sk-...
```